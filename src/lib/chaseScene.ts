import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { createToonKit } from './toon';

/**
 * Cartoon 3D chase on a night road: the studio van running from a ghost with a lantern.
 * Toon shading + ink outlines to match the burger. Scenery scrolls; the actors stay framed.
 */

export type ChaseScene = { dispose: () => void };

const ROAD_LEN = 60;

const PETAL = ['#f7931e', '#f7931e', '#f9e27d'];
const CORE = ['#f9e27d', '#f9e27d', '#f7931e'];

function paintFlower(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, rot: number, petal: string, core: string) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rot);
  ctx.lineWidth = Math.max(6, r * 0.12);
  ctx.strokeStyle = '#140a26';
  for (let i = 0; i < 5; i++) {
    ctx.save();
    ctx.rotate((i * Math.PI * 2) / 5);
    ctx.beginPath();
    ctx.ellipse(0, -r * 0.62, r * 0.42, r * 0.62, 0, 0, Math.PI * 2);
    ctx.fillStyle = petal;
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }
  ctx.beginPath();
  ctx.arc(0, 0, r * 0.36, 0, Math.PI * 2);
  ctx.fillStyle = core;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

function canvasTexture(c: HTMLCanvasElement) {
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/** One flower, for stickers on the nose and the rear. */
function flowerTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  paintFlower(c.getContext('2d')!, 128, 128, 112, 0.3, PETAL[0], CORE[0]);
  return canvasTexture(c);
}

/**
 * Livery panels. Each one is sized to the FLAT part of its body box (corners curve away
 * beyond it), so nothing hangs off the van. Texture pixels map to panel metres:
 *   lower  4.00 x 0.80 m  ->  2048 x 410 px   (wheels hide the bottom around x 282 and x 1766)
 *   upper  3.84 x 0.92 m  ->  2048 x 491 px   (windows sit between y 43 and y 342)
 */
export const LOWER_PANEL = { w: 4.0, h: 0.8, y: 1.08 };
export const UPPER_PANEL = { w: 3.84, h: 0.92, y: 2.2 };

function bloom(ctx: CanvasRenderingContext2D, list: [number, number, number, number][]) {
  list.forEach(([x, y, r, rot], i) => paintFlower(ctx, x, y, r, rot, PETAL[i % 3], CORE[i % 3]));
}

/** Green lower body: the name in the middle, flowers over the wheel arches and a garland under the name. */
function lowerLivery() {
  const c = document.createElement('canvas');
  c.width = 2048;
  c.height = 410;
  const ctx = c.getContext('2d')!;
  bloom(ctx, [
    // over the rear wheel
    [282, 120, 78, 0.9], [150, 215, 44, 2.2], [420, 205, 48, 1.4],
    // over the front wheel
    [1766, 120, 78, 0.3], [1898, 215, 44, 1.1], [1628, 205, 48, 2.5],
    // garland under the name, between the wheels
    [600, 345, 46, 0.4], [730, 330, 60, 1.3], [870, 355, 40, 2.1], [1178, 355, 40, 0.7], [1318, 330, 60, 1.9], [1448, 345, 46, 0.2],
  ]);
  const groovy = getComputedStyle(document.documentElement).getPropertyValue('--font-shrikhand').trim() || 'Georgia';
  ctx.font = `176px ${groovy}, Georgia, serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 24;
  ctx.strokeStyle = '#140a26';
  ctx.strokeText('HenaWeb', 1024, 175);
  ctx.fillStyle = '#f7931e';
  ctx.fillText('HenaWeb', 1024, 175);
  return canvasTexture(c);
}

/** Turquoise upper body: a band of flowers under the windows and blooms peeking between them. */
function upperLivery() {
  const c = document.createElement('canvas');
  c.width = 2048;
  c.height = 491;
  const ctx = c.getContext('2d')!;
  const band: [number, number, number, number][] = [];
  for (let i = 0; i < 14; i++) {
    const x = 70 + i * 147;
    band.push([x, i % 2 ? 440 : 420, i % 3 === 0 ? 62 : 46, i * 0.7]);
  }
  bloom(ctx, [
    ...band,
    // between the windows (gap centres at x 410, 837, 1264, 1725)
    [410, 150, 52, 0.5], [837, 250, 46, 1.8], [1264, 140, 52, 1.1], [1725, 230, 48, 2.4],
  ]);
  return canvasTexture(c);
}

export function createChaseScene(canvas: HTMLCanvasElement, { reducedMotion }: { reducedMotion: boolean }): ChaseScene {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const kit = createToonKit();
  const { toon, inked, track } = kit;

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x241a4a, 18, 42);
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  scene.add(new THREE.HemisphereLight(0xbfb4ff, 0x1a1036, 1.4));
  const moon = new THREE.DirectionalLight(0xfff2c0, 1.8);
  moon.position.set(6, 10, 4);
  scene.add(moon);

  // ── road ───────────────────────────────────────────────
  const road = new THREE.Mesh(track(new THREE.PlaneGeometry(ROAD_LEN, 6)), toon(0x2a1f48));
  road.rotation.x = -Math.PI / 2;
  scene.add(road);
  const verge = new THREE.Mesh(track(new THREE.PlaneGeometry(ROAD_LEN, 14)), toon(0x1a1036));
  verge.rotation.x = -Math.PI / 2;
  verge.position.set(0, -0.01, -8);
  scene.add(verge);
  const near = new THREE.Mesh(track(new THREE.PlaneGeometry(ROAD_LEN, 12)), toon(0x1f1640));
  near.rotation.x = -Math.PI / 2;
  near.position.set(0, -0.01, 9);
  scene.add(near);
  const nearCurb = inked(new THREE.BoxGeometry(ROAD_LEN, 0.12, 0.25), 0x3cc6b4, 0.03);
  nearCurb.position.set(0, 0.06, 3.05);
  scene.add(nearCurb);
  const curb = inked(new THREE.BoxGeometry(ROAD_LEN, 0.12, 0.25), 0x3cc6b4, 0.03);
  curb.position.set(0, 0.06, -3.05);
  scene.add(curb);

  const dashGeo = track(new THREE.BoxGeometry(1.6, 0.02, 0.18));
  const dashes = new THREE.InstancedMesh(dashGeo, toon(0xf9e27d, { emissive: 0x6b5a10 }), 20);
  scene.add(dashes);
  const posts: THREE.Group[] = [];
  for (let i = 0; i < 16; i++) {
    const post = inked(new THREE.BoxGeometry(0.18, 1.0, 0.18), 0x3a2a6e, 0.03);
    const tip = inked(new THREE.ConeGeometry(0.16, 0.3, 4), 0x3a2a6e, 0.03);
    tip.position.y = 0.65;
    tip.rotation.y = Math.PI / 4;
    post.add(tip);
    post.position.set(0, 0.5, -3.7);
    scene.add(post);
    posts.push(post);
  }
  const rail = inked(new THREE.BoxGeometry(ROAD_LEN, 0.1, 0.08), 0x3a2a6e, 0.02);
  rail.position.set(0, 0.7, -3.7);
  scene.add(rail);

  // ── van: classic 60s/70s split-window bus ───────────
  const van = new THREE.Group();
  const vanBody = new THREE.Group();
  van.add(vanBody);
  const lower = inked(new RoundedBoxGeometry(4.4, 1.1, 2.0, 5, 0.14), 0xa6d64b);
  lower.position.y = 1.08;
  vanBody.add(lower);
  const upper = inked(new RoundedBoxGeometry(4.34, 1.4, 1.96, 5, 0.22), 0x3cc6b4);
  upper.position.y = 2.2;
  vanBody.add(upper);
  const belt = new THREE.Mesh(track(new RoundedBoxGeometry(4.46, 0.14, 2.06, 2, 0.06)), toon(0xf7931e));
  belt.position.y = 1.6;
  vanBody.add(belt);
  const rack = inked(new THREE.BoxGeometry(2.6, 0.1, 1.5), 0x8b5cc7, 0.03);
  rack.position.set(-0.4, 3.0, 0);
  vanBody.add(rack);
  for (const x of [-1.5, 0.7]) {
    const leg = new THREE.Mesh(track(new THREE.BoxGeometry(0.08, 0.16, 1.5)), toon(0x8b5cc7));
    leg.position.set(x, 2.92, 0);
    vanBody.add(leg);
  }

  // split windshield on the flat nose
  const glass = toon(0x1e1442);
  for (const z of [0.45, -0.45]) {
    const pane = inked(new RoundedBoxGeometry(0.06, 0.62, 0.78, 2, 0.04), glass, 0.025);
    pane.position.set(2.17, 2.3, z);
    vanBody.add(pane);
  }
  // the V on the nose
  const vShape = new THREE.Shape();
  vShape.moveTo(-0.95, 0.42);
  vShape.lineTo(0, -0.38);
  vShape.lineTo(0.95, 0.42);
  vShape.lineTo(0.62, 0.42);
  vShape.lineTo(0, -0.08);
  vShape.lineTo(-0.62, 0.42);
  vShape.closePath();
  const vPanel = new THREE.Mesh(track(new THREE.ShapeGeometry(vShape)), toon(0x3cc6b4, { side: THREE.DoubleSide }));
  vPanel.rotation.y = Math.PI / 2;
  vPanel.position.set(2.21, 1.28, 0);
  vanBody.add(vPanel);
  const badge = inked(new THREE.CylinderGeometry(0.16, 0.16, 0.05, 24), 0xfdf3e1, 0.02);
  badge.rotation.z = Math.PI / 2;
  badge.position.set(2.22, 1.6, 0);
  vanBody.add(badge);

  // side windows with scared eyes peeking out
  const eyeWhite = toon(0xffffff);
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x140a26 });
  track(pupilMat);
  const eyeGeo = track(new THREE.SphereGeometry(0.11, 16, 12));
  eyeGeo.scale(1, 1.25, 0.5);
  const pupilGeo = track(new THREE.SphereGeometry(0.045, 10, 8));
  const pupils: THREE.Mesh[] = [];
  const windowXs = [-1.55, -0.75, 0.05, 0.85];
  windowXs.forEach((x, wi) => {
    for (const side of [1, -1]) {
      const win = inked(new RoundedBoxGeometry(0.66, 0.56, 0.04, 2, 0.08), glass, 0.025);
      win.position.set(x, 2.3, side * 0.99);
      vanBody.add(win);
      if (side === 1 && wi !== 2) {
        for (const dx of [-0.11, 0.11]) {
          const e = new THREE.Mesh(eyeGeo, eyeWhite);
          e.position.set(x + dx, 2.28, 1.03);
          vanBody.add(e);
          const p = new THREE.Mesh(pupilGeo, pupilMat);
          p.position.set(x + dx - 0.03, 2.28, 1.08);
          p.userData.baseX = x + dx - 0.03;
          vanBody.add(p);
          pupils.push(p);
        }
      }
    }
  });
  // cab door window
  for (const side of [1, -1]) {
    const cab = inked(new RoundedBoxGeometry(0.5, 0.56, 0.04, 2, 0.08), glass, 0.025);
    cab.position.set(1.7, 2.3, side * 0.99);
    vanBody.add(cab);
  }

  // flower livery on both sides, upper and lower, sitting flush on the flat faces
  const panels = [
    { tex: lowerLivery(), ...LOWER_PANEL, z: 1.006 },
    { tex: upperLivery(), ...UPPER_PANEL, z: 0.986 },
  ];
  for (const pnl of panels) {
    const mat = track(new THREE.MeshBasicMaterial({ map: track(pnl.tex), transparent: true, polygonOffset: true, polygonOffsetFactor: -2 }));
    const geo = track(new THREE.PlaneGeometry(pnl.w, pnl.h));
    for (const side of [1, -1]) {
      const decal = new THREE.Mesh(geo, mat);
      decal.position.set(0, pnl.y, side * pnl.z);
      if (side === -1) decal.rotation.y = Math.PI;
      vanBody.add(decal);
    }
  }

  // flower stickers: two on the nose under the headlights, a cluster on the tail
  const stickerMat = track(new THREE.MeshBasicMaterial({ map: track(flowerTexture()), transparent: true, side: THREE.DoubleSide }));
  const stickerGeo = track(new THREE.PlaneGeometry(1, 1));
  const sticker = (x: number, y: number, z: number, size: number, rotY: number, spin: number) => {
    const m = new THREE.Mesh(stickerGeo, stickerMat);
    m.position.set(x, y, z);
    m.rotation.set(0, rotY, spin);
    m.scale.setScalar(size);
    vanBody.add(m);
  };
  sticker(2.215, 0.86, 0.72, 0.34, Math.PI / 2, 0.3);
  sticker(2.215, 0.86, -0.72, 0.34, Math.PI / 2, 1.1);
  sticker(-2.215, 1.25, 0.0, 0.62, -Math.PI / 2, 0.6);
  sticker(-2.215, 1.02, 0.55, 0.3, -Math.PI / 2, 1.9);
  sticker(-2.215, 1.5, -0.52, 0.34, -Math.PI / 2, 2.4);

  // round headlights + beam
  for (const z of [0.68, -0.68]) {
    const ring = inked(new THREE.CylinderGeometry(0.21, 0.21, 0.08, 24), 0xd8d2c4, 0.025);
    ring.rotation.z = Math.PI / 2;
    ring.position.set(2.2, 1.25, z);
    vanBody.add(ring);
    const lamp = new THREE.Mesh(track(new THREE.CylinderGeometry(0.15, 0.15, 0.1, 24)), toon(0xfff4c0, { emissive: 0xf9e27d }));
    lamp.rotation.z = Math.PI / 2;
    lamp.position.set(2.23, 1.25, z);
    vanBody.add(lamp);
  }
  const beamMat = track(
    new THREE.MeshBasicMaterial({ color: 0xf9e27d, transparent: true, opacity: 0.16, depthWrite: false, side: THREE.DoubleSide }),
  );
  const beam = new THREE.Mesh(track(new THREE.ConeGeometry(1.4, 5, 24, 1, true)), beamMat);
  beam.rotation.z = Math.PI / 2;
  beam.position.set(4.7, 1.0, 0);
  van.add(beam);
  const headlight = new THREE.SpotLight(0xf9e27d, 30, 12, 0.5, 0.6, 1.5);
  headlight.position.set(2.3, 1.25, 0);
  headlight.target.position.set(8, 0, 0);
  van.add(headlight, headlight.target);

  // chrome bumpers
  for (const x of [2.3, -2.3]) {
    const b = inked(new RoundedBoxGeometry(0.16, 0.2, 2.16, 2, 0.07), 0xd8d2c4, 0.03);
    b.position.set(x, 0.62, 0);
    vanBody.add(b);
  }

  // wheels
  const wheels: THREE.Group[] = [];
  for (const x of [-1.45, 1.45]) {
    for (const z of [1.0, -1.0]) {
      const w = new THREE.Group();
      const tire = inked(new THREE.CylinderGeometry(0.48, 0.48, 0.36, 28), 0x140a26, 0.03);
      tire.rotation.x = Math.PI / 2;
      w.add(tire);
      const cap = inked(new THREE.CylinderGeometry(0.22, 0.22, 0.38, 16), 0xd8d2c4, 0.02);
      cap.rotation.x = Math.PI / 2;
      w.add(cap);
      const spoke = new THREE.Mesh(track(new THREE.BoxGeometry(0.42, 0.06, 0.4)), toon(0x140a26));
      w.add(spoke);
      w.position.set(x, 0.48, z);
      van.add(w);
      wheels.push(w);
    }
  }
  scene.add(van);

  // dust puffs
  const puffGeo = track(new THREE.IcosahedronGeometry(0.28, 1));
  const puffs: { m: THREE.Group; t: number }[] = [];
  for (let i = 0; i < 6; i++) {
    const m = inked(puffGeo.clone(), toon(0xe9f6e4, { transparent: true }), 0.03);
    scene.add(m);
    puffs.push({ m, t: i / 6 });
  }

  // ── ghost ──────────────────────────────────────────────
  const ghost = new THREE.Group();
  // dome top at y=2.6, then the sheet flares down to y=0
  const prof = [new THREE.Vector2(0, 2.6)];
  for (let i = 1; i <= 12; i++) {
    const a = (i / 12) * (Math.PI / 2);
    prof.push(new THREE.Vector2(Math.sin(a) * 0.95, 1.65 + Math.cos(a) * 0.95));
  }
  for (let i = 1; i <= 14; i++) {
    const t = i / 14;
    prof.push(new THREE.Vector2(0.95 + t * t * 0.45, 1.65 - t * 1.65));
  }
  // lathe winds outward when the profile runs bottom to top
  prof.reverse();
  const sheetGeo = track(new THREE.LatheGeometry(prof, 48));
  sheetGeo.computeVertexNormals();
  const rest = Float32Array.from(sheetGeo.getAttribute('position').array as Float32Array);
  const sheetMat = toon(0xe9f6e4, { emissive: 0x23301a });
  const sheet = new THREE.Mesh(sheetGeo, sheetMat);
  ghost.add(sheet);
  const sheetHull = new THREE.Mesh(sheetGeo, new THREE.MeshBasicMaterial({ color: 0x140a26, side: THREE.BackSide }));
  track(sheetHull.material as THREE.Material);
  sheetHull.scale.setScalar(1.045);
  sheetHull.position.y = -0.04;
  ghost.add(sheetHull);

  // face (front = +x, toward the van)
  const holeMat = new THREE.MeshBasicMaterial({ color: 0x140a26 });
  track(holeMat);
  const glowMat = new THREE.MeshBasicMaterial({ color: 0xc6f26b });
  track(glowMat);
  for (const z of [0.3, -0.3]) {
    const socket = new THREE.Mesh(track(new THREE.SphereGeometry(0.19, 16, 12)), holeMat);
    socket.scale.set(0.6, 1.45, 1.15);
    socket.position.set(0.86, 2.0, z);
    ghost.add(socket);
    const glow = new THREE.Mesh(track(new THREE.SphereGeometry(0.09, 10, 8)), glowMat);
    glow.position.set(0.93, 1.98, z * 0.9);
    ghost.add(glow);
    const brow = new THREE.Mesh(track(new THREE.BoxGeometry(0.06, 0.06, 0.34)), holeMat);
    brow.position.set(0.9, 2.3, z * 1.05);
    brow.rotation.x = z > 0 ? -0.5 : 0.5;
    ghost.add(brow);
  }
  const mouth = new THREE.Mesh(track(new THREE.SphereGeometry(0.16, 16, 12)), holeMat);
  mouth.scale.set(0.4, 0.8, 1.3);
  mouth.position.set(0.98, 1.55, 0);
  ghost.add(mouth);

  // reaching arm + lantern
  const arm = inked(new THREE.CapsuleGeometry(0.16, 0.9, 6, 12), sheetMat, 0.035);
  arm.position.set(1.15, 1.75, 0.55);
  arm.rotation.z = -1.1;
  ghost.add(arm);
  const lantern = new THREE.Group();
  const cage = inked(new THREE.CylinderGeometry(0.2, 0.2, 0.45, 12), toon(0xa6d64b, { emissive: 0x5a8a1a, transparent: true, opacity: 0.85 }), 0.03);
  lantern.add(cage);
  for (const y of [0.27, -0.27]) {
    const cap = inked(new THREE.CylinderGeometry(0.24, 0.24, 0.08, 12), 0x8b5cc7, 0.025);
    cap.position.y = y;
    lantern.add(cap);
  }
  const flame = new THREE.Mesh(track(new THREE.SphereGeometry(0.11, 12, 10)), new THREE.MeshBasicMaterial({ color: 0xf4ffd0 }));
  track(flame.material as THREE.Material);
  lantern.add(flame);
  const halo = new THREE.Mesh(
    track(new THREE.SphereGeometry(0.6, 16, 12)),
    track(new THREE.MeshBasicMaterial({ color: 0xa6d64b, transparent: true, opacity: 0.18, depthWrite: false })),
  );
  lantern.add(halo);
  const lanternLight = new THREE.PointLight(0xa6d64b, 14, 7, 1.6);
  lantern.add(lanternLight);
  lantern.position.set(1.75, 1.3, 0.75);
  ghost.add(lantern);
  scene.add(ghost);

  // ── layout & loop ──────────────────────────────────────
  const view = { mobile: false };
  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    view.mobile = camera.aspect < 1.3;
    camera.fov = view.mobile ? 42 : 30;
    camera.updateProjectionMatrix();
  };
  resize();
  window.addEventListener('resize', resize);

  const mouse = { x: 0, tx: 0 };
  const onMove = (e: PointerEvent) => {
    mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
  };
  window.addEventListener('pointermove', onMove);

  let visible = true;
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
  io.observe(canvas);

  const dummy = new THREE.Object3D();
  const speed = 9;
  const start = performance.now();
  let last = start;
  let raf = 0;
  const pos = sheetGeo.getAttribute('position');

  const draw = (now: number) => {
    const t = (now - start) / 1000;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    const travel = t * speed;

    // camera: three-quarter view from the roadside, drifting with the mouse
    mouse.x += (mouse.tx - mouse.x) * 0.04;
    const camX = view.mobile ? 0.6 : 0.4;
    camera.position.set(camX + mouse.x * 1.2, view.mobile ? 3.8 : 3.4, view.mobile ? 13.5 : 13);
    camera.lookAt(camX * 0.6, 1.4, 0);

    // the chase gap breathes: the ghost surges, the van pulls away
    const gap = (view.mobile ? 4.9 : 6.2) + Math.sin(t * 0.7) * 1.1 + Math.sin(t * 1.9) * 0.35;
    const vanX = view.mobile ? 2.0 : 3.2;
    van.position.set(vanX + Math.sin(t * 0.5) * 0.3, 0, 0.6);
    vanBody.position.y = Math.abs(Math.sin(t * 9)) * 0.06;
    vanBody.rotation.z = Math.sin(t * 9) * 0.012 - 0.02;
    wheels.forEach((w) => (w.rotation.z = -travel / 0.48));
    // nervous glances back at the ghost
    pupils.forEach((p) => (p.position.x = p.userData.baseX - 0.02 + Math.sin(t * 6) * 0.015));

    ghost.position.set(van.position.x - gap, 0.9 + Math.sin(t * 2.2) * 0.22, 0.6);
    ghost.rotation.z = -0.12 + Math.sin(t * 1.1) * 0.05;
    // turned toward the camera so the face reads
    ghost.rotation.y = -0.75 + Math.sin(t * 0.9) * 0.08;
    lantern.rotation.z = Math.sin(t * 3) * 0.25;
    const flick = 0.85 + Math.sin(t * 23) * 0.1 + Math.sin(t * 37) * 0.06;
    lanternLight.intensity = 14 * flick;
    halo.scale.setScalar(flick);

    // cloth: the hem streams backward and ripples
    for (let i = 0; i < pos.count; i++) {
      const x0 = rest[i * 3];
      const y0 = rest[i * 3 + 1];
      const z0 = rest[i * 3 + 2];
      const k = THREE.MathUtils.clamp((1.65 - y0) / 1.65, 0, 1);
      const a = Math.atan2(z0, x0);
      const wave = Math.sin(t * 7 + a * 5 + y0 * 3) * 0.12 * k;
      pos.setXYZ(i, x0 - k * k * 1.1 + wave * 0.6, y0 + Math.sin(t * 8 + a * 6) * 0.08 * k, z0 + wave);
    }
    pos.needsUpdate = true;
    sheetGeo.computeVertexNormals();

    // scrolling scenery
    for (let i = 0; i < 20; i++) {
      const x = (((i * 3 - travel) % ROAD_LEN) + ROAD_LEN) % ROAD_LEN - ROAD_LEN / 2;
      dummy.position.set(x, 0.011, 0.6);
      dummy.updateMatrix();
      dashes.setMatrixAt(i, dummy.matrix);
    }
    dashes.instanceMatrix.needsUpdate = true;
    posts.forEach((p, i) => (p.position.x = (((i * 3.8 - travel) % ROAD_LEN) + ROAD_LEN) % ROAD_LEN - ROAD_LEN / 2));

    puffs.forEach((p) => {
      p.t = (p.t + dt * 1.4) % 1;
      p.m.position.set(van.position.x - 2.5 - p.t * 3, 0.45 + p.t * 0.7, 0.2 + Math.sin(p.t * 9) * 0.2);
      p.m.scale.setScalar(0.5 + p.t * 1.4);
      ((p.m.children[0] as THREE.Mesh).material as THREE.MeshToonMaterial).opacity = 1 - p.t;
      p.m.children[1].visible = p.t < 0.6;
    });

    renderer.render(scene, camera);
  };

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame);
    if (!visible || document.hidden) {
      last = now;
      return;
    }
    draw(now);
  };
  if (reducedMotion) draw(start + 1500);
  else raf = requestAnimationFrame(frame);

  return {
    dispose: () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onMove);
      kit.dispose();
      renderer.dispose();
    },
  };
}
