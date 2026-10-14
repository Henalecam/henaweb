import * as THREE from 'three';

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
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
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

  const toon = (color: number, vertexColors = false) => {
    const m = new THREE.MeshToonMaterial({ color, gradientMap: ramp, vertexColors });
    disposables.push(m);
    return m;
  };

  /** mesh + slightly inflated back-face hull for the cartoon outline */
  const inked = (geo: THREE.BufferGeometry, color: number, thickness = 0.045) => {
    disposables.push(geo);
    const g = new THREE.Group();
    g.add(new THREE.Mesh(geo, toon(geo.getAttribute('color') ? 0xffffff : color, !!geo.getAttribute('color'))));
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
    const bun = inked(toastColors(lathe([[0, 0], [1.55, 0], [1.72, 0.06], [1.8, 0.2], [1.82, 0.34], [1.76, 0.44], [0, 0.44]]), 0xf3c27a, 0xd98a36, 0, 0.44), 0xe9a24c);
    const toast = new THREE.Mesh(new THREE.CircleGeometry(1.7, 64), toon(0xd9893a));
    disposables.push(toast.geometry);
    toast.rotation.x = -Math.PI / 2;
    toast.position.y = 0.442;
    bun.add(toast);
    stackAt(0, bun, 0.16);
  }

  // II: lumpy patty with char specks and a ketchup ribbon dripping off the edge
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
    const patty = inked(geo, 0x6e3a1a);
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

    const sauceGeo = new THREE.TorusGeometry(1.84, 0.07, 10, 160);
    sauceGeo.rotateX(Math.PI / 2);
    const sp = sauceGeo.getAttribute('position');
    for (let i = 0; i < sp.count; i++) {
      const ang = Math.atan2(sp.getZ(i), sp.getX(i));
      const drip = Math.pow(Math.max(0, Math.sin(ang * 5 + 0.6)), 6) * 0.22;
      sp.setY(i, sp.getY(i) - drip);
    }
    sauceGeo.computeVertexNormals();
    const sauce = inked(sauceGeo, 0xe23a22, 0.025);
    for (const ang of [0.3, 1.55, 2.8, 4.05, 5.3]) gleam(sauce, Math.cos(ang) * 1.86, 0.04, Math.sin(ang) * 1.86, 0.45, 1.4, -ang);
    stackAt(1, sauce, 1.02);
  }

  // III: melted cheese, double lettuce, tomatoes, pickles and onion rings
  {
    // cheese: a thick sheet that drapes over the patty edge
    const cgeo = new THREE.BoxGeometry(3.0, 0.06, 3.0, 56, 1, 56);
    cgeo.rotateY(Math.PI / 4);
    const cp = cgeo.getAttribute('position');
    for (let i = 0; i < cp.count; i++) {
      const x = cp.getX(i);
      const z = cp.getZ(i);
      const r = Math.hypot(x, z);
      let y = cp.getY(i) + Math.sin(x * 3.1) * Math.cos(z * 2.7) * 0.012;
      let f = 1;
      if (r > 1.62) {
        // drape over the edge, but stop short of the plate
        const d = Math.min(r - 1.62, 0.32);
        y -= d * d * 2.2 + d * 0.15;
        f = 1 - d * 0.35;
      }
      cp.setXYZ(i, x * f, y, z * f);
    }
    cgeo.computeVertexNormals();
    const cheese = inked(cgeo, 0xffc22e, 0.03);
    for (const [ang, len] of [[0.79, 0.55], [2.36, 0.4], [3.93, 0.6], [5.5, 0.45], [1.6, 0.3]] as const) {
      const drip = inked(new THREE.CapsuleGeometry(0.11, len, 6, 12), 0xffc22e, 0.025);
      drip.position.set(Math.cos(ang) * 1.86, -0.12 - len / 2, Math.sin(ang) * 1.86);
      cheese.add(drip);
      gleam(drip, 0.06, len * 0.15, 0.08, 0.35, 0.05);
    }
    gleam(cheese, -0.5, 0.06, 1.55, 0.6, 1.5, 0.4);
    stackAt(2, cheese, 1.06);

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
      return inked(g, color, 0.03);
    };
    stackAt(2, leaf(2.02, 15, 0.09, 0x5fa82b), 1.15);
    const leaf2 = leaf(1.92, 11, 0.07, 0x9be04a);
    leaf2.rotation.y = 0.4;
    stackAt(2, leaf2, 1.22);

    const tomatoes = new THREE.Group();
    for (const [x, z] of [
      [-0.85, 0.2],
      [0.85, -0.2],
      [0, 0.95],
    ]) {
      const t = inked(new THREE.CylinderGeometry(0.85, 0.85, 0.16, 40), 0xf0402c, 0.035);
      gleam(t, -0.25, 0.1, 0.25, 0.35, 1.5, 0.8);
      t.position.set(x, 0, z);
      const inner = new THREE.Mesh(new THREE.CircleGeometry(0.62, 32), toon(0xff8a70));
      disposables.push(inner.geometry);
      inner.rotation.x = -Math.PI / 2;
      inner.position.y = 0.085;
      t.add(inner);
      for (let k = 0; k < 4; k++) {
        const ang = (k / 4) * Math.PI * 2 + 0.4;
        const sd = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 6), toon(0xfff1c9));
        disposables.push(sd.geometry);
        sd.scale.set(1, 0.4, 1.6);
        sd.position.set(Math.cos(ang) * 0.36, 0.09, Math.sin(ang) * 0.36);
        sd.rotation.y = -ang;
        t.add(sd);
      }
      tomatoes.add(t);
    }
    stackAt(2, tomatoes, 1.34);

    const pickles = new THREE.Group();
    for (let k = 0; k < 5; k++) {
      const ang = (k / 5) * Math.PI * 2 + 0.25;
      const pk = inked(new THREE.CylinderGeometry(0.34, 0.34, 0.06, 28), 0x5f8f2a, 0.025);
      const face = new THREE.Mesh(new THREE.CircleGeometry(0.26, 24), toon(0x9cc25a));
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
    const top = inked(toastColors(lathe(pts, 72), 0xf6c983, 0xc9752a, 0.1, 1.3), 0xe9a24c);
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
  };
  resize();
  // the sticky stage changes size with the mobile address bar, not only on window resize
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  const mouse = { x: 0, tx: 0 };
  const onMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    mouse.tx = THREE.MathUtils.clamp((e.clientX - (r.left + r.width / 2)) / r.width, -1, 1);
  };
  window.addEventListener('pointermove', onMove);

  let visible = true;
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
  io.observe(canvas);

  let raf = 0;
  const start = performance.now();
  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    if (!visible || document.hidden) return;
    const t = (now - start) / 1000;
    mouse.x += (mouse.tx - mouse.x) * 0.06;
    burger.rotation.y = (reducedMotion ? 0.4 : t * 0.35) + mouse.x * 0.6;
    wobble *= 0.92;
    burger.scale.setScalar(1 + Math.sin(t * 18) * wobble * 0.05);
    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(frame);

  return {
    setLayer: (step, p) => {
      progress[step] = THREE.MathUtils.clamp(p, 0, 1);
      apply();
    },
    setVersion: (label) => flagPaint(label),
    celebrate: () => {
      wobble = 1;
    },
    dispose: () => {
      cancelAnimationFrame(raf);
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
