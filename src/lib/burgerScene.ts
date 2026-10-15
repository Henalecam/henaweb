import * as THREE from 'three';
import { createAdaptiveLoop } from './adaptiveLoop';

/**
 * Cartoon 3D burger, built from primitives: toon shading (3-step ramp) and
 * inverted-hull outlines. Layers drop in individually (setLayer) as the
 * process steps scroll by; the whole thing sits on a slow turntable.
 */

const INK = 0x140a26;

export type BurgerScene = {
  /** step index 0..3, progress 0..1 */
  setLayer: (step: number, progress: number) => void;
  setVersion: (label: string) => void;
  celebrate: () => void;
  dispose: () => void;
};

function toonRamp() {
  const data = new Uint8Array([95, 95, 95, 255, 160, 160, 160, 255, 215, 215, 215, 255, 255, 255, 255, 255]);
  const tex = new THREE.DataTexture(data, 4, 1, THREE.RGBAFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.generateMipmaps = false;
  tex.needsUpdate = true;
  return tex;
}

export function createBurgerScene(canvas: HTMLCanvasElement, { reducedMotion }: { reducedMotion: boolean }): BurgerScene {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(dpr);
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 100);
  scene.add(new THREE.HemisphereLight(0xfff1d6, 0x3a2350, 1.0));
  const key = new THREE.DirectionalLight(0xffe2b0, 2.6);
  key.position.set(-3, 6, 5);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x3cc6b4, 1.6);
  rim.position.set(2, 3, -6);
  scene.add(rim);
  const warm = new THREE.PointLight(0xffa64a, 6, 9, 1.4);
  warm.position.set(2.6, 2.4, 3.2);
  scene.add(warm);

  const ramp = toonRamp();
  const outlineMat = new THREE.MeshBasicMaterial({ color: INK, side: THREE.BackSide });
  const disposables: { dispose: () => void }[] = [ramp, outlineMat];

  const toon = (color: number, vertexColors = false, map: THREE.Texture | null = null) => {
    const m = new THREE.MeshToonMaterial({ color, gradientMap: ramp, vertexColors, map });
    disposables.push(m);
    return m;
  };

  /** mesh + slightly inflated back-face hull for the cartoon outline */
  const inked = (geo: THREE.BufferGeometry, color: number, thickness = 0.045, map: THREE.Texture | null = null) => {
    disposables.push(geo);
    const g = new THREE.Group();
    g.add(new THREE.Mesh(geo, toon(geo.getAttribute('color') ? 0xffffff : color, !!geo.getAttribute('color'), map)));
    const hullGeo = geo.clone();
    const pos = hullGeo.getAttribute('position');
    const nor = hullGeo.getAttribute('normal');
    for (let i = 0; i < pos.count; i++) {
      pos.setXYZ(i, pos.getX(i) + nor.getX(i) * thickness, pos.getY(i) + nor.getY(i) * thickness, pos.getZ(i) + nor.getZ(i) * thickness);
    }
    disposables.push(hullGeo);
    g.add(new THREE.Mesh(hullGeo, outlineMat));
    return g;
  };

  const lathe = (pts: [number, number][], segs = 64) => {
    const geo = new THREE.LatheGeometry(
      pts.map(([x, y]) => new THREE.Vector2(x, y)),
      segs,
    );
    geo.computeVertexNormals();
    return geo;
  };

  /** golden-brown toast: darker on top, lighter toward the rim, by height */
  const toastColors = (geo: THREE.BufferGeometry, light: number, dark: number, y0: number, y1: number) => {
    const pos = geo.getAttribute('position');
    const a = new THREE.Color(light);
    const b = new THREE.Color(dark);
    const c = new THREE.Color();
    const arr = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i++) {
      const t = THREE.MathUtils.smoothstep(pos.getY(i), y0, y1);
      c.copy(a).lerp(b, t);
      arr.set([c.r, c.g, c.b], i * 3);
    }
    geo.setAttribute('color', new THREE.BufferAttribute(arr, 3));
    return geo;
  };
  const gleamMat = new THREE.MeshBasicMaterial({ color: 0xfffbea });
  disposables.push(gleamMat);
  const gleamGeo = new THREE.CapsuleGeometry(0.05, 0.3, 4, 10);
  disposables.push(gleamGeo);
  /** the little white shine streak cartoons put on tasty food */
  const gleam = (parent: THREE.Object3D, x: number, y: number, z: number, scale = 1, rotZ = 0.9, rotY = 0) => {
    const m = new THREE.Mesh(gleamGeo, gleamMat);
    m.position.set(x, y, z);
    m.rotation.set(0, rotY, rotZ);
    m.scale.setScalar(scale);
    parent.add(m);
  };

  // ── painted textures ──────────────────────────────
  let tseed = 11;
  const trand = () => ((tseed = (tseed * 16807) % 2147483647) / 2147483647);
  const paint = (w: number, h: number, draw: (ctx: CanvasRenderingContext2D) => void, wrap = false) => {
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    draw(c.getContext('2d')!);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    if (wrap) tex.wrapS = THREE.RepeatWrapping;
    disposables.push(tex);
    return tex;
  };
  const dots = (ctx: CanvasRenderingContext2D, n: number, w: number, h: number, rMin: number, rMax: number, color: string) => {
    ctx.fillStyle = color;
    for (let i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.ellipse(trand() * w, trand() * h, rMin + trand() * (rMax - rMin), (rMin + trand() * (rMax - rMin)) * 0.7, trand() * Math.PI, 0, Math.PI * 2);
      ctx.fill();
    }
  };
  // bun crust: toasted mottling, flour flecks and fine cracks (white base multiplies with the toast gradient)
  const bunTex = paint(1024, 256, (ctx) => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 1024, 256);
    dots(ctx, 260, 1024, 256, 8, 26, 'rgba(160, 82, 28, 0.07)');
    dots(ctx, 120, 1024, 256, 3, 7, 'rgba(120, 58, 18, 0.12)');
    dots(ctx, 380, 1024, 256, 1.2, 2.6, 'rgba(255, 252, 240, 0.9)');
    ctx.strokeStyle = 'rgba(130, 64, 20, 0.14)';
    ctx.lineWidth = 1.6;
    for (let i = 0; i < 70; i++) {
      const x = trand() * 1024;
      const y = trand() * 256;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.quadraticCurveTo(x + 6 + trand() * 10, y - 4 + trand() * 8, x + 12 + trand() * 16, y - 2 + trand() * 4);
      ctx.stroke();
    }
  }, true);
  // patty: seared crust with darker grill streaks and juicy highlights
  const pattyTex = paint(1024, 256, (ctx) => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 1024, 256);
    dots(ctx, 500, 1024, 256, 3, 12, 'rgba(60, 25, 8, 0.28)');
    dots(ctx, 220, 1024, 256, 2, 6, 'rgba(255, 196, 140, 0.35)');
    ctx.strokeStyle = 'rgba(40, 16, 5, 0.35)';
    ctx.lineWidth = 9;
    for (let x = -256; x < 1024; x += 64) {
      ctx.beginPath();
      ctx.moveTo(x, 256);
      ctx.lineTo(x + 256, 0);
      ctx.stroke();
    }
  }, true);
  // tomato cross section: skin ring, pink flesh, jelly chambers with seeds
  const tomatoTex = paint(256, 256, (ctx) => {
    ctx.fillStyle = '#e8402a';
    ctx.beginPath();
    ctx.arc(128, 128, 128, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ff8a72';
    ctx.beginPath();
    ctx.arc(128, 128, 112, 0, Math.PI * 2);
    ctx.fill();
    for (let k = 0; k < 4; k++) {
      const a = (k / 4) * Math.PI * 2 + 0.4;
      const cx = 128 + Math.cos(a) * 58;
      const cy = 128 + Math.sin(a) * 58;
      ctx.fillStyle = '#ff5a3e';
      ctx.beginPath();
      ctx.ellipse(cx, cy, 34, 24, a, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fff1c9';
      for (let j = 0; j < 4; j++) {
        ctx.beginPath();
        ctx.ellipse(cx + Math.cos(a + 1.57) * (j - 1.5) * 12, cy + Math.sin(a + 1.57) * (j - 1.5) * 12, 5, 3, a, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.fillStyle = '#ffb3a0';
    ctx.beginPath();
    ctx.arc(128, 128, 18, 0, Math.PI * 2);
    ctx.fill();
  });
  // pickle chip: dark skin ring, pale flesh, a ring of seeds
  const pickleTex = paint(256, 256, (ctx) => {
    ctx.fillStyle = '#4f7f22';
    ctx.beginPath();
    ctx.arc(128, 128, 128, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#a9cf62';
    ctx.beginPath();
    ctx.arc(128, 128, 104, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#d6ec9a';
    ctx.beginPath();
    ctx.arc(128, 128, 56, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#f4f8d8';
    for (let k = 0; k < 9; k++) {
      const a = (k / 9) * Math.PI * 2;
      ctx.beginPath();
      ctx.ellipse(128 + Math.cos(a) * 40, 128 + Math.sin(a) * 40, 7, 4, a, 0, Math.PI * 2);
      ctx.fill();
    }
  });
  // lettuce veins radiating from the middle (cylinder cap UVs are radial)
  const leafTex = paint(512, 512, (ctx) => {
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, 512, 512);
    ctx.strokeStyle = 'rgba(235, 255, 200, 0.9)';
    ctx.lineCap = 'round';
    for (let k = 0; k < 18; k++) {
      const a = (k / 18) * Math.PI * 2;
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(256, 256);
      ctx.quadraticCurveTo(256 + Math.cos(a + 0.15) * 140, 256 + Math.sin(a + 0.15) * 140, 256 + Math.cos(a) * 250, 256 + Math.sin(a) * 250);
      ctx.stroke();
      ctx.lineWidth = 2.5;
      for (let j = 1; j < 4; j++) {
        const r = j * 60;
        const bx = 256 + Math.cos(a) * r;
        const by = 256 + Math.sin(a) * r;
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(bx + Math.cos(a + 0.6) * 40, by + Math.sin(a + 0.6) * 40);
        ctx.stroke();
      }
    }
    dots(ctx, 120, 512, 512, 4, 12, 'rgba(60, 120, 20, 0.12)');
  });

  const burger = new THREE.Group();
  scene.add(burger);
  let flagPaint: (t: string) => void = () => {};

  // deterministic jitter so the burger looks the same on every visit
  let seed = 7;
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

  // plate + checkered diner paper (always there)
  const plate = inked(lathe([[0, 0], [2.3, 0], [2.4, 0.12], [2.05, 0.16], [0, 0.16]]), 0xffffff, 0.04);
  burger.add(plate);
  {
    const c = document.createElement('canvas');
    c.width = c.height = 256;
    const ctx = c.getContext('2d')!;
    for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) {
      ctx.fillStyle = (x + y) % 2 ? '#fdf3e1' : '#e8553f';
      ctx.fillRect(x * 32, y * 32, 32, 32);
    }
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    disposables.push(tex);
    const paperGeo = new THREE.PlaneGeometry(3.0, 3.0);
    disposables.push(paperGeo);
    const paperMat = new THREE.MeshToonMaterial({ map: tex, gradientMap: ramp, polygonOffset: true, polygonOffsetFactor: -1 });
    disposables.push(paperMat);
    const paper = new THREE.Mesh(paperGeo, paperMat);
    paper.rotation.set(-Math.PI / 2, 0, 0.35);
    paper.position.y = 0.162;
    burger.add(paper);
  }

  const layers: THREE.Group[][] = [[], [], [], []];
  const rest = new Map<THREE.Group, number>();
  const stackAt = (step: number, obj: THREE.Group, y: number) => {
    obj.position.y = y;
    rest.set(obj, y);
    layers[step].push(obj);
    burger.add(obj);
  };

  // I: bottom bun with a toasted cut face
  {
    const bun = inked(toastColors(lathe([[0, 0], [1.55, 0], [1.72, 0.06], [1.8, 0.2], [1.82, 0.34], [1.76, 0.44], [0, 0.44]]), 0xf3c27a, 0xd98a36, 0, 0.44), 0xe9a24c, 0.045, bunTex);
    const toast = new THREE.Mesh(new THREE.CircleGeometry(1.7, 64), toon(0xd9893a));
    disposables.push(toast.geometry);
    toast.rotation.x = -Math.PI / 2;
    toast.position.y = 0.442;
    bun.add(toast);
    stackAt(0, bun, 0.16);
  }

  // II: seared, lumpy patty with char specks
  {
    const prof: [number, number][] = [[0, 0], [1.6, 0], [1.82, 0.06], [1.9, 0.21], [1.82, 0.36], [1.6, 0.42], [1.2, 0.43], [0.8, 0.42], [0.4, 0.43], [0, 0.42]];
    const geo = lathe(prof, 96);
    const p = geo.getAttribute('position');
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const z = p.getZ(i);
      const y = p.getY(i);
      const r = Math.hypot(x, z);
      const ang = Math.atan2(z, x);
      const k = r > 1.4 ? 1 + Math.sin(ang * 9) * 0.025 + Math.sin(ang * 23) * 0.015 : 1;
      const lump = y > 0.38 ? (Math.sin(x * 5.1) * Math.cos(z * 4.3) + Math.sin((x + z) * 7.7) * 0.5) * 0.025 : 0;
      p.setXYZ(i, x * k, y + lump, z * k);
    }
    geo.computeVertexNormals();
    const patty = inked(geo, 0x7a4220, 0.045, pattyTex);
    gleam(patty, -0.9, 0.3, 1.55, 0.8, 0.2, 0.5);
    gleam(patty, 0.6, 0.32, 1.7, 0.6, 0.15, -0.3);
    const speckGeo = new THREE.SphereGeometry(0.035, 6, 5);
    disposables.push(speckGeo);
    const specks = new THREE.InstancedMesh(speckGeo, toon(0x3e200f), 70);
    const m = new THREE.Matrix4();
    for (let i = 0; i < 70; i++) {
      const r = Math.sqrt(rand()) * 1.55;
      const t = rand() * Math.PI * 2;
      m.makeTranslation(Math.cos(t) * r, 0.445, Math.sin(t) * r);
      specks.setMatrixAt(i, m);
    }
    patty.add(specks);
    stackAt(1, patty, 0.58);

  }

  // III: melted cheese, double lettuce, tomatoes, pickles and onion rings
  {
    // cheese: a thick sheet that drapes over the patty edge
    const cgeo = new THREE.BoxGeometry(3.4, 0.06, 3.4, 64, 1, 64);
    cgeo.rotateY(Math.PI / 4);
    const cp = cgeo.getAttribute('position');
    for (let i = 0; i < cp.count; i++) {
      const x = cp.getX(i);
      const z = cp.getZ(i);
      const r = Math.hypot(x, z);
      let y = cp.getY(i) + Math.sin(x * 3.1) * Math.cos(z * 2.7) * 0.012;
      let f = 1;
      if (r > 1.6) {
        // follow the patty's rounded shoulder, then let the corners hang down its side
        const d = r - 1.6;
        let nr: number;
        if (d < 0.37) {
          nr = 1.6 + d;
          y -= (d / 0.37) ** 2 * 0.27;
        } else {
          const h = Math.min(d - 0.37, 0.26);
          nr = 1.97 + h * 0.06;
          y -= 0.27 + h * 0.9;
        }
        f = nr / r;
      }
      cp.setXYZ(i, x * f, y, z * f);
    }
    cgeo.computeVertexNormals();
    const cheese = inked(cgeo, 0xffc22e, 0.03);
    // drips: a thin neck that swells into a round drop, hanging from the draped edge
    for (const [ang, len] of [[0, 0.26], [Math.PI / 2, 0.18], [Math.PI, 0.3], [Math.PI * 1.5, 0.2]] as const) {
      const prof: [number, number][] = [
        [0, 0.02], [0.13, 0.02], [0.105, -len * 0.25], [0.085, -len * 0.55], [0.095, -len * 0.78], [0.112, -len * 0.95],
        [0.115, -len - 0.03], [0.1, -len - 0.09], [0.06, -len - 0.13], [0, -len - 0.145],
      ];
      const drip = inked(new THREE.LatheGeometry(prof.map(([x, y]) => new THREE.Vector2(x, y)).reverse(), 28), 0xffc22e, 0.022);
      drip.position.set(Math.cos(ang) * 1.99, -0.47, Math.sin(ang) * 1.99);
      cheese.add(drip);
      gleam(drip, 0.05, -len - 0.02, 0.07, 0.22, 0.1);
    }
    gleam(cheese, -0.5, 0.06, 1.55, 0.6, 1.5, 0.4);
    stackAt(2, cheese, 1.06);

    const bacon = (phase: number) => {
      const g = new THREE.BoxGeometry(4.5, 0.08, 0.6, 100, 1, 8);
      const bp = g.getAttribute('position');
      const colors = new Float32Array(bp.count * 3);
      const bands: [number, number][] = [[0.18, 0x8e2a18], [0.42, 0xf6d4ab], [0.74, 0xc4412a], [1, 0xf3c99a]];
      const c = new THREE.Color();
      for (let i = 0; i < bp.count; i++) {
        const x = bp.getX(i);
        const z = bp.getZ(i);
        const t = (z + 0.3) / 0.6;
        c.set(bands.find(([edge]) => t <= edge)?.[1] ?? 0xf3c99a);
        // crispy, darker ends
        const crisp = THREE.MathUtils.smoothstep(Math.abs(x), 1.8, 2.25);
        c.lerp(new THREE.Color(0x6a2410), crisp * 0.55);
        colors.set([c.r, c.g, c.b], i * 3);
        // wavy like real fried bacon, ends curling down over the edge
        const droop = THREE.MathUtils.smoothstep(Math.abs(x), 1.85, 2.25) * 0.16;
        bp.setXYZ(i, x, bp.getY(i) + Math.sin(x * 4.6 + phase) * 0.08 - droop, z + Math.sin(x * 2.2 + phase) * 0.07);
      }
      g.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      g.computeVertexNormals();
      return inked(g, 0xffffff, 0.025);
    };

    const leaf = (radius: number, waves: number, amp: number, color: number) => {
      const g = new THREE.CylinderGeometry(radius, radius, 0.08, 160, 1);
      const lp = g.getAttribute('position');
      for (let i = 0; i < lp.count; i++) {
        const x = lp.getX(i);
        const z = lp.getZ(i);
        const r = Math.hypot(x, z);
        if (r > radius * 0.6) {
          const ang = Math.atan2(z, x);
          const w = Math.sin(ang * waves) + Math.sin(ang * waves * 2) * 0.3;
          lp.setXYZ(i, x * (1 + w * 0.04), lp.getY(i) + w * amp, z * (1 + w * 0.04));
        }
      }
      g.computeVertexNormals();
      return inked(g, color, 0.03, leafTex);
    };
    stackAt(2, leaf(2.02, 15, 0.09, 0x5fa82b), 1.15);
    const leaf2 = leaf(1.92, 11, 0.07, 0x9be04a);
    leaf2.rotation.y = 0.4;
    stackAt(2, leaf2, 1.22);
    const bacon1 = bacon(0);
    bacon1.rotation.y = 0.35;
    stackAt(2, bacon1, 1.32);
    const bacon2 = bacon(1.7);
    bacon2.rotation.y = -1.05;
    stackAt(2, bacon2, 1.34);

    const tomatoes = new THREE.Group();
    for (const [x, z] of [
      [-0.85, 0.2],
      [0.85, -0.2],
      [0, 0.95],
    ]) {
      const t = inked(new THREE.CylinderGeometry(0.85, 0.85, 0.16, 40), 0xf0402c, 0.035);
      gleam(t, -0.25, 0.1, 0.25, 0.35, 1.5, 0.8);
      t.position.set(x, 0, z);
      const inner = new THREE.Mesh(new THREE.CircleGeometry(0.84, 40), toon(0xffffff, false, tomatoTex));
      disposables.push(inner.geometry);
      inner.rotation.x = -Math.PI / 2;
      inner.position.y = 0.082;
      t.add(inner);
      tomatoes.add(t);
    }
    stackAt(2, tomatoes, 1.34);

    const pickles = new THREE.Group();
    for (let k = 0; k < 5; k++) {
      const ang = (k / 5) * Math.PI * 2 + 0.25;
      const pg = new THREE.CylinderGeometry(0.36, 0.36, 0.06, 56);
      const pp = pg.getAttribute('position');
      for (let i = 0; i < pp.count; i++) {
        const x = pp.getX(i);
        const z = pp.getZ(i);
        if (Math.hypot(x, z) > 0.3) {
          const k = 1 + Math.sin(Math.atan2(z, x) * 16) * 0.05;
          pp.setXYZ(i, x * k, pp.getY(i), z * k);
        }
      }
      pg.computeVertexNormals();
      const pk = inked(pg, 0x4f7f22, 0.025);
      const face = new THREE.Mesh(new THREE.CircleGeometry(0.35, 40), toon(0xffffff, false, pickleTex));
      disposables.push(face.geometry);
      face.rotation.x = -Math.PI / 2;
      face.position.y = 0.032;
      pk.add(face);
      pk.position.set(Math.cos(ang) * 1.12, 0, Math.sin(ang) * 1.12);
      pk.rotation.set((rand() - 0.5) * 0.25, 0, (rand() - 0.5) * 0.25);
      pickles.add(pk);
    }
    stackAt(2, pickles, 1.46);

    const onions = new THREE.Group();
    for (const [x, z, rr] of [
      [-0.5, -0.45, 0.42],
      [0.55, 0.5, 0.36],
      [0.1, -0.05, 0.5],
    ]) {
      const ring = inked(new THREE.TorusGeometry(rr, 0.045, 8, 40), 0xdcc1ef, 0.02);
      ring.rotation.x = Math.PI / 2;
      ring.position.set(x, 0, z);
      onions.add(ring);
    }
    stackAt(2, onions, 1.51);
  }

  // IV: domed top bun with sesame, a glossy highlight and the version flag
  {
    const pts: [number, number][] = [[0, 0], [1.78, 0], [1.9, 0.08]];
    for (let i = 1; i <= 18; i++) {
      const a = (i / 18) * (Math.PI / 2);
      pts.push([Math.cos(a) * 1.9, 0.08 + Math.sin(a) * 1.22]);
    }
    const top = inked(toastColors(lathe(pts, 72), 0xf6c983, 0xc9752a, 0.1, 1.3), 0xe9a24c, 0.045, bunTex);
    // shine streaks all around the dome so one always faces the camera on the turntable
    for (let k = 0; k < 4; k++) {
      const ang = (k / 4) * Math.PI * 2 + 0.6;
      // radius of the dome surface at a given height (ellipse 1.9 wide, 1.22 tall, base at 0.08)
      const surf = (y: number) => 1.9 * Math.sqrt(1 - ((y - 0.08) / 1.22) ** 2) + 0.03;
      gleam(top, Math.cos(ang) * surf(0.78), 0.78, Math.sin(ang) * surf(0.78), 1.1, 0.5, -ang + Math.PI / 2);
      gleam(top, Math.cos(ang + 0.3) * surf(1.02), 1.02, Math.sin(ang + 0.3) * surf(1.02), 0.55, 0.6, -ang + Math.PI / 2 - 0.3);
    }
    const seedGeo = new THREE.SphereGeometry(0.07, 10, 8);
    seedGeo.scale(1, 0.5, 1.9);
    disposables.push(seedGeo);
    const seeds = new THREE.InstancedMesh(seedGeo, toon(0xfff1d2), 52);
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const v = new THREE.Vector3();
    for (let i = 0; i < 52; i++) {
      const theta = i * 2.399963;
      const phi = 0.12 + (i / 52) * 1.12;
      const x = Math.sin(phi) * Math.cos(theta) * 1.91;
      const z = Math.sin(phi) * Math.sin(theta) * 1.91;
      const y = 0.08 + Math.cos(phi) * 1.23;
      v.set(x, y, z);
      q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.clone().setY(v.y * 1.6).normalize());
      q.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), theta * 3));
      m.compose(v, q, new THREE.Vector3(1, 1, 1));
      seeds.setMatrixAt(i, m);
    }
    top.add(seeds);
    stackAt(3, top, 1.56);

    // toothpick flag with a live version label
    const flag = new THREE.Group();
    const stick = inked(new THREE.CylinderGeometry(0.04, 0.04, 1.3, 8), 0xc89b5a, 0.02);
    stick.position.y = 0.65;
    flag.add(stick);
    const olive = inked(new THREE.SphereGeometry(0.16, 16, 12), 0x5f8f2a, 0.02);
    olive.position.y = 0.2;
    flag.add(olive);
    const label = document.createElement('canvas');
    label.width = 256;
    label.height = 128;
    const ctx = label.getContext('2d')!;
    const tex = new THREE.CanvasTexture(label);
    tex.colorSpace = THREE.SRGBColorSpace;
    disposables.push(tex);
    const paint = (text: string) => {
      ctx.fillStyle = '#f7931e';
      ctx.fillRect(0, 0, 256, 128);
      ctx.strokeStyle = '#140a26';
      ctx.lineWidth = 14;
      ctx.strokeRect(0, 0, 256, 128);
      ctx.fillStyle = '#140a26';
      ctx.font = 'bold 64px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, 128, 68);
      tex.needsUpdate = true;
    };
    paint('v1.0');
    const flagGeo = new THREE.PlaneGeometry(0.75, 0.38);
    disposables.push(flagGeo);
    const flagMat = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide });
    disposables.push(flagMat);
    const cloth = new THREE.Mesh(flagGeo, flagMat);
    cloth.position.set(0.4, 1.12, 0);
    flag.add(cloth);
    stackAt(3, flag, 2.62);
    flagPaint = paint;
  }

  // drop state per step
  const progress = [0, 0, 0, 0];
  const apply = () => {
    layers.forEach((objs, step) => {
      objs.forEach((o, j) => {
        // stagger multiple items of the same step
        const local = THREE.MathUtils.clamp(progress[step] * (1 + objs.length * 0.25) - j * 0.25, 0, 1);
        o.visible = local > 0.001;
        const fall = 1 - bounce(local);
        o.position.y = (rest.get(o) ?? 0) + fall * 7;
        o.rotation.z = fall * (j % 2 ? 0.35 : -0.35);
      });
    });
  };
  apply();

  let wobble = 0;
  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // keep the whole stack in frame on narrow screens
    const dist = camera.aspect < 0.9 ? 19 : 16.5;
    camera.position.set(0, dist * 0.4, dist);
    camera.lookAt(0, 2.55, 0);
    camera.updateProjectionMatrix();
    loop.request(); // resizing clears the canvas
  };

  const mouse = { x: 0, tx: 0 };
  const onMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    mouse.tx = THREE.MathUtils.clamp((e.clientX - (r.left + r.width / 2)) / r.width, -1, 1);
  };

  let visible = true;
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
  io.observe(canvas);

  const start = performance.now();
  const draw = (now: number, live: boolean) => {
    const t = (now - start) / 1000;
    // still frames (reduced motion, slow device) hold the turntable and skip the pointer drift
    if (live) mouse.x += (mouse.tx - mouse.x) * 0.06;
    burger.rotation.y = (reducedMotion ? 0.4 : t * 0.35) + mouse.x * 0.6;
    wobble = live ? wobble * 0.92 : 0;
    burger.scale.setScalar(1 + Math.sin(t * 18) * wobble * 0.05);
    renderer.render(scene, camera);
  };
  const loop = createAdaptiveLoop({
    draw,
    visible: () => visible,
    reducedMotion,
    stillTime: start,
    onTier: (tier) => {
      if (tier === 1) {
        dpr = 1;
        renderer.setPixelRatio(dpr);
        resize();
      } else {
        window.removeEventListener('pointermove', onMove);
      }
    },
  });
  resize();
  // the sticky stage changes size with the mobile address bar, not only on window resize
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  if (!reducedMotion) window.addEventListener('pointermove', onMove);

  return {
    setLayer: (step, p) => {
      progress[step] = THREE.MathUtils.clamp(p, 0, 1);
      apply();
      loop.request();
    },
    setVersion: (label) => {
      flagPaint(label);
      loop.request();
    },
    celebrate: () => {
      wobble = 1;
    },
    dispose: () => {
      loop.stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    },
  };
}

function bounce(x: number) {
  const n1 = 7.5625;
  const d1 = 2.75;
  if (x < 1 / d1) return n1 * x * x;
  if (x < 2 / d1) return n1 * (x -= 1.5 / d1) * x + 0.75;
  if (x < 2.5 / d1) return n1 * (x -= 2.25 / d1) * x + 0.9375;
  return n1 * (x -= 2.625 / d1) * x + 0.984375;
}
