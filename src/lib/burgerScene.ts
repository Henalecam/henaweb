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
  const data = new Uint8Array([90, 90, 90, 255, 180, 180, 180, 255, 255, 255, 255, 255]);
  const tex = new THREE.DataTexture(data, 3, 1, THREE.RGBAFormat);
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
  scene.add(new THREE.AmbientLight(0xffffff, 1.1));
  const key = new THREE.DirectionalLight(0xffffff, 2.2);
  key.position.set(-3, 6, 5);
  scene.add(key);

  const ramp = toonRamp();
  const outlineMat = new THREE.MeshBasicMaterial({ color: INK, side: THREE.BackSide });
  const disposables: { dispose: () => void }[] = [ramp, outlineMat];

  const toon = (color: number) => {
    const m = new THREE.MeshToonMaterial({ color, gradientMap: ramp });
    disposables.push(m);
    return m;
  };

  /** mesh + slightly inflated back-face hull for the cartoon outline */
  const inked = (geo: THREE.BufferGeometry, color: number, thickness = 0.045) => {
    disposables.push(geo);
    const g = new THREE.Group();
    g.add(new THREE.Mesh(geo, toon(color)));
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

  const burger = new THREE.Group();
  scene.add(burger);
  let flagPaint: (t: string) => void = () => {};

  // plate (always there)
  const plate = inked(lathe([[0, 0], [2.3, 0], [2.4, 0.12], [2.05, 0.16], [0, 0.16]]), 0xffffff, 0.04);
  burger.add(plate);

  const layers: THREE.Group[][] = [[], [], [], []];
  const rest = new Map<THREE.Group, number>();
  const stackAt = (step: number, obj: THREE.Group, y: number) => {
    obj.position.y = y;
    rest.set(obj, y);
    layers[step].push(obj);
    burger.add(obj);
  };

  // I: bottom bun
  stackAt(0, inked(lathe([[0, 0], [1.6, 0], [1.75, 0.12], [1.78, 0.32], [1.7, 0.42], [0, 0.42]]), 0xe9a24c), 0.16);

  // II: patty (bumpy edge)
  {
    const geo = new THREE.CylinderGeometry(1.85, 1.85, 0.42, 72, 3);
    const p = geo.getAttribute('position');
    for (let i = 0; i < p.count; i++) {
      const x = p.getX(i);
      const z = p.getZ(i);
      const r = Math.hypot(x, z);
      if (r > 1.5) {
        const a = Math.atan2(z, x);
        const k = 1 + Math.sin(a * 9) * 0.025 + Math.sin(a * 23) * 0.015;
        p.setXYZ(i, x * k, p.getY(i), z * k);
      }
    }
    geo.computeVertexNormals();
    const patty = inked(geo, 0x7a4a24);
    patty.children[0].position.y = 0.21;
    patty.children[1].position.y = 0.21;
    // grill marks
    for (const dx of [-0.8, -0.27, 0.27, 0.8]) {
      const mark = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.02, 2.6), toon(0x4a2a12));
      disposables.push(mark.geometry);
      mark.position.set(dx, 0.43, 0);
      mark.rotation.y = 0.5;
      patty.add(mark);
    }
    stackAt(1, patty, 0.58);
  }

  // III: cheese (with drips), lettuce, tomatoes
  {
    const cheese = new THREE.Group();
    const slab = inked(new THREE.BoxGeometry(3.4, 0.07, 3.4), 0xf9e27d, 0.035);
    slab.rotation.y = Math.PI / 4;
    cheese.add(slab);
    for (const a of [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2]) {
      const drip = inked(new THREE.CapsuleGeometry(0.13, 0.35, 6, 12), 0xf9e27d, 0.03);
      drip.position.set(Math.cos(a) * 2.25, -0.22, Math.sin(a) * 2.25);
      cheese.add(drip);
    }
    stackAt(2, cheese, 1.05);

    const lgeo = new THREE.CylinderGeometry(2.0, 2.0, 0.1, 96, 1);
    const lp = lgeo.getAttribute('position');
    for (let i = 0; i < lp.count; i++) {
      const x = lp.getX(i);
      const z = lp.getZ(i);
      const r = Math.hypot(x, z);
      if (r > 1.2) {
        const a = Math.atan2(z, x);
        const k = 1 + Math.sin(a * 14) * 0.06;
        lp.setXYZ(i, x * k, lp.getY(i) + Math.sin(a * 14) * 0.08, z * k);
      }
    }
    lgeo.computeVertexNormals();
    stackAt(2, inked(lgeo, 0xa6d64b, 0.035), 1.16);

    const tomatoes = new THREE.Group();
    for (const [x, z] of [
      [-0.85, 0.2],
      [0.85, -0.2],
      [0, 0.95],
    ]) {
      const t = inked(new THREE.CylinderGeometry(0.85, 0.85, 0.16, 40), 0xe8553f, 0.035);
      t.position.set(x, 0, z);
      const inner = new THREE.Mesh(new THREE.CircleGeometry(0.6, 32), toon(0xff8a70));
      disposables.push(inner.geometry);
      inner.rotation.x = -Math.PI / 2;
      inner.position.y = 0.085;
      t.add(inner);
      tomatoes.add(t);
    }
    stackAt(2, tomatoes, 1.3);
  }

  // IV: top bun + sesame + flag
  {
    const pts: [number, number][] = [[0, 0], [1.8, 0]];
    for (let i = 0; i <= 16; i++) {
      const a = (i / 16) * (Math.PI / 2);
      pts.push([Math.cos(a) * 1.85, 0.1 + Math.sin(a) * 1.15]);
    }
    const top = inked(lathe(pts), 0xe9a24c);
    const seedGeo = new THREE.SphereGeometry(0.07, 10, 8);
    seedGeo.scale(1, 0.5, 1.9);
    disposables.push(seedGeo);
    const seeds = new THREE.InstancedMesh(seedGeo, toon(0xfff4dc), 34);
    const m = new THREE.Matrix4();
    const q = new THREE.Quaternion();
    const v = new THREE.Vector3();
    for (let i = 0; i < 34; i++) {
      const theta = i * 2.399963;
      const phi = 0.15 + (i / 34) * 1.05;
      const x = Math.sin(phi) * Math.cos(theta) * 1.86;
      const z = Math.sin(phi) * Math.sin(theta) * 1.86;
      const y = 0.1 + Math.cos(phi) * 1.16;
      v.set(x, y, z);
      q.setFromUnitVectors(new THREE.Vector3(0, 1, 0), v.clone().setY(v.y * 1.6).normalize());
      q.multiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), theta * 3));
      m.compose(v, q, new THREE.Vector3(1, 1, 1));
      seeds.setMatrixAt(i, m);
    }
    top.add(seeds);
    stackAt(3, top, 1.42);

    // toothpick flag with a live version label
    const flag = new THREE.Group();
    const stick = inked(new THREE.CylinderGeometry(0.04, 0.04, 1.3, 8), 0xc89b5a, 0.02);
    stick.position.y = 0.65;
    flag.add(stick);
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
    stackAt(3, flag, 2.4);
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
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // keep the whole stack in frame on narrow screens
    const dist = camera.aspect < 0.9 ? 17 : 14.5;
    camera.position.set(0, dist * 0.4, dist);
    camera.lookAt(0, 2.1, 0);
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

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
      window.removeEventListener('resize', resize);
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
