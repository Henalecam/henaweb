import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { createToonKit } from './toon';

/**
 * Cartoon 3D chase on a night road: the studio van running from a ghost with a lantern.
 * Toon shading + ink outlines to match the burger. Scenery scrolls; the actors stay framed.
 */

export type ChaseScene = { dispose: () => void };

const ROAD_LEN = 60;

function decalTexture() {
  const c = document.createElement('canvas');
  c.width = 1024;
  c.height = 256;
  const ctx = c.getContext('2d')!;
  ctx.clearRect(0, 0, c.width, c.height);
  // 70s starburst
  ctx.save();
  ctx.translate(150, 128);
  ctx.beginPath();
  for (let i = 0; i < 28; i++) {
    const r = i % 2 ? 46 : 104;
    const a = (Math.PI * i) / 14 - Math.PI / 2;
    ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r);
  }
  ctx.closePath();
  ctx.fillStyle = '#f7931e';
  ctx.fill();
  ctx.lineWidth = 12;
  ctx.strokeStyle = '#140a26';
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(0, 0, 30, 0, Math.PI * 2);
  ctx.fillStyle = '#f9e27d';
  ctx.fill();
  ctx.stroke();
  ctx.restore();
  // logo
  const groovy = getComputedStyle(document.documentElement).getPropertyValue('--font-shrikhand').trim() || 'Georgia';
  ctx.font = `120px ${groovy}, Georgia, serif`;
  ctx.textBaseline = 'middle';
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#140a26';
  ctx.strokeText('HenaWeb', 300, 132);
  ctx.fillStyle = '#f7931e';
  ctx.fillText('HenaWeb', 300, 132);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
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

  // ── van ────────────────────────────────────────────────
  const van = new THREE.Group();
  const vanBody = new THREE.Group();
  van.add(vanBody);
  const lower = inked(new RoundedBoxGeometry(4.2, 0.9, 2.0, 4, 0.22), 0xa6d64b);
  lower.position.y = 0.95;
  vanBody.add(lower);
  const upper = inked(new RoundedBoxGeometry(3.7, 1.15, 1.94, 4, 0.35), 0x3cc6b4);
  upper.position.set(-0.22, 1.95, 0);
  vanBody.add(upper);
  const hood = inked(new RoundedBoxGeometry(0.9, 0.6, 1.94, 4, 0.25), 0x3cc6b4);
  hood.position.set(1.7, 1.55, 0);
  hood.rotation.z = -0.35;
  vanBody.add(hood);
  const stripe = new THREE.Mesh(track(new THREE.BoxGeometry(4.24, 0.12, 2.04)), toon(0xf9e27d));
  stripe.position.y = 1.42;
  vanBody.add(stripe);
  const rack = inked(new THREE.BoxGeometry(2.4, 0.12, 1.5), 0x8b5cc7, 0.03);
  rack.position.set(-0.3, 2.62, 0);
  vanBody.add(rack);

  // windows with scared eyes
  const glass = toon(0x1e1442);
  const eyeWhite = toon(0xffffff);
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x140a26 });
  track(pupilMat);
  const eyeGeo = track(new THREE.SphereGeometry(0.11, 16, 12));
  eyeGeo.scale(1, 1.25, 0.5);
  const pupilGeo = track(new THREE.SphereGeometry(0.045, 10, 8));
  const pupils: THREE.Mesh[] = [];
  for (const x of [-1.35, -0.4, 0.6]) {
    for (const side of [1, -1]) {
      const win = new THREE.Mesh(track(new THREE.BoxGeometry(0.8, 0.6, 0.02)), glass);
      win.position.set(x, 2.0, side * 0.98);
      vanBody.add(win);
      if (side === 1) {
        for (const dx of [-0.11, 0.11]) {
          const e = new THREE.Mesh(eyeGeo, eyeWhite);
          e.position.set(x + dx, 1.98, 1.0);
          vanBody.add(e);
          const p = new THREE.Mesh(pupilGeo, pupilMat);
          p.position.set(x + dx - 0.03, 1.98, 1.06);
          p.userData.baseX = x + dx - 0.03;
          vanBody.add(p);
          pupils.push(p);
        }
      }
    }
  }
  const windshield = new THREE.Mesh(track(new THREE.BoxGeometry(0.02, 0.62, 1.6)), glass);
  windshield.position.set(1.42, 2.0, 0);
  windshield.rotation.z = -0.35;
  vanBody.add(windshield);

  // side decal
  const decal = new THREE.Mesh(
    track(new THREE.PlaneGeometry(2.6, 0.65)),
    track(new THREE.MeshBasicMaterial({ map: track(decalTexture()), transparent: true })),
  );
  decal.position.set(-0.1, 0.95, 1.02);
  vanBody.add(decal);

  // headlights + beam
  for (const z of [0.6, -0.6]) {
    const lamp = inked(new THREE.CylinderGeometry(0.16, 0.16, 0.08, 20), toon(0xfff4c0, { emissive: 0xf9e27d }), 0.025);
    lamp.rotation.z = Math.PI / 2;
    lamp.position.set(2.12, 1.1, z);
    vanBody.add(lamp);
  }
  const beamMat = track(
    new THREE.MeshBasicMaterial({ color: 0xf9e27d, transparent: true, opacity: 0.16, depthWrite: false, side: THREE.DoubleSide }),
  );
  const beam = new THREE.Mesh(track(new THREE.ConeGeometry(1.4, 5, 24, 1, true)), beamMat);
  beam.rotation.z = Math.PI / 2;
  beam.position.set(4.6, 0.9, 0);
  van.add(beam);
  const headlight = new THREE.SpotLight(0xf9e27d, 30, 12, 0.5, 0.6, 1.5);
  headlight.position.set(2.2, 1.1, 0);
  headlight.target.position.set(8, 0, 0);
  van.add(headlight, headlight.target);

  // bumpers
  for (const x of [2.15, -2.15]) {
    const b = inked(new RoundedBoxGeometry(0.2, 0.22, 2.1, 2, 0.08), 0xd8d2c4, 0.03);
    b.position.set(x, 0.55, 0);
    vanBody.add(b);
  }

  // wheels
  const wheels: THREE.Group[] = [];
  for (const x of [-1.35, 1.35]) {
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
      p.m.position.set(van.position.x - 2.3 - p.t * 3, 0.45 + p.t * 0.7, 0.2 + Math.sin(p.t * 9) * 0.2);
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
