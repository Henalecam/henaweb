import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';

/**
 * Halftone David.
 *  pass 1: fbm flow field, one texel per dot          -> fieldRT
 *  pass 2: the bust lit like marble (lum, mask, rim)   -> statueRT (2x grid, linear)
 *  pass 3: one dot per cell, sized by either source, with RGB split + glitch rows
 */

const QUAD_VERT = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }
`;

const FIELD_FRAG = /* glsl */ `
precision highp float;
uniform vec2 uGrid;
uniform float uTime;
uniform vec2 uMouse;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 5; i++) { v += a * noise(p); p = p * 2.03 + 17.0; a *= 0.5; }
  return v;
}
void main() {
  vec2 uv = gl_FragCoord.xy / uGrid.y;
  vec2 m = uMouse / uGrid.y;
  float t = uTime * 0.045;
  vec2 q = vec2(fbm(uv * 1.3 + t), fbm(uv * 1.3 + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(uv * 1.3 + 3.5 * q + vec2(1.7, 9.2) + t * 1.4), fbm(uv * 1.3 + 3.5 * q + vec2(8.3, 2.8) - t));
  float f = fbm(uv * 1.3 + 3.8 * r);
  float d = distance(uv, m);
  float lens = exp(-d * d * 9.0);
  f += lens * 0.35;
  gl_FragColor = vec4(clamp(f, 0.0, 1.0), lens, 0.0, 1.0);
}
`;

const STATUE_VERT = /* glsl */ `
varying vec3 vN;
varying vec3 vV;
void main() {
  vN = normalize(normalMatrix * normal);
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  vV = normalize(-mv.xyz);
  gl_Position = projectionMatrix * mv;
}
`;

const STATUE_FRAG = /* glsl */ `
precision highp float;
varying vec3 vN;
varying vec3 vV;
uniform vec3 uKey;
void main() {
  vec3 N = normalize(vN);
  float key = max(dot(N, normalize(uKey)), 0.0);
  float fill = max(dot(N, normalize(vec3(0.95, -0.2, 0.35))), 0.0);
  float rim = pow(1.0 - max(dot(N, vV), 0.0), 2.4);
  float lum = key * 0.9 + fill * 0.3 + 0.06;
  // r: luminance, g: coverage, b: rim (pink), a: fill (cyan)
  gl_FragColor = vec4(lum, 1.0, rim, fill);
}
`;

const DOTS_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D uField;
uniform sampler2D uStatue;
uniform vec2 uGrid;
uniform float uCell;
uniform float uTime;
uniform float uIntro;
uniform float uReveal;
uniform float uFieldAmt;
uniform float uStatueAmt;
uniform vec2 uAberr;
uniform float uGlitch;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float disc(vec2 p, float r) { return 1.0 - smoothstep(r - 0.06, r + 0.02, length(p)); }

void main() {
  vec2 cell = gl_FragCoord.xy / uCell;
  vec2 cid = floor(cell);
  vec2 cuv = fract(cell) - 0.5;

  // glitch: shift bands of rows sideways for a few frames
  float band = floor(cid.y / 3.0);
  float tick = floor(uTime * 9.0);
  float g = step(0.965, hash(vec2(band, tick))) * uGlitch;
  cid.x += g * floor((hash(vec2(tick, band)) - 0.5) * 14.0);

  vec2 uv = (cid + 0.5) / uGrid;
  vec4 fld = texture2D(uField, uv);
  vec4 st = texture2D(uStatue, uv);

  // carving reveal: dots appear from the top of the bust down
  float carve = 1.0 - smoothstep(uReveal - 0.12, uReveal, 1.0 - uv.y + hash(cid) * 0.08);
  float mask = st.g * carve * uStatueAmt;

  // background flow field: vaporwave pink/violet/cyan, hushed behind the statue and the headline corner
  float calm = mix(0.4, 1.0, smoothstep(0.0, 0.75, uv.y) * 0.55 + smoothstep(0.1, 0.85, uv.x) * 0.45);
  float v = smoothstep(0.42, 0.95, fld.r * calm) * uIntro * uFieldAmt;
  float bgR = mix(0.05, 0.42, v);
  float bgA = disc(cuv, bgR) * mix(0.25, 0.95, v);
  // haunted-night palette: rim in flower orange, fill in van teal, field drifting violet → teal → lime
  vec3 pink = vec3(0.97, 0.58, 0.12);
  vec3 cyan = vec3(0.24, 0.78, 0.71);
  vec3 violet = vec3(0.55, 0.36, 0.78);
  vec3 lime = vec3(0.65, 0.84, 0.29);
  vec3 bgCol = mix(mix(violet, cyan, uv.x), lime, smoothstep(0.35, 0.85, v + fld.g * 0.3));

  // statue: cream marble lit by a cyan fill and a pink rim, RGB split on fast motion
  float lum = smoothstep(0.06, 1.05, st.r) + fld.g * 0.12;
  float r = mix(0.16, 0.56, clamp(lum + st.a * 0.25, 0.0, 1.0));
  vec3 marble = vec3(1.0, 0.97, 0.9);
  vec3 sCol = marble;
  sCol = mix(sCol, cyan, smoothstep(0.25, 0.9, st.a) * 0.75 * (1.0 - smoothstep(0.5, 0.9, st.r)));
  sCol = mix(sCol, pink, smoothstep(0.35, 0.9, st.b) * 0.9);
  float aR = disc(cuv + uAberr, r);
  float aG = disc(cuv, r);
  float aB = disc(cuv - uAberr, r);
  vec3 statue = vec3(aR * sCol.r, aG * sCol.g, aB * sCol.b);
  statue += pink * max(aR - aG, 0.0) * 0.6 + cyan * max(aB - aG, 0.0) * 0.6;
  float sA = clamp(mask * max(max(aR, aG), aB), 0.0, 1.0);

  // dark silhouette behind the dots so the bust reads as a cut-out against the sun
  float sil = smoothstep(0.15, 0.6, mask) * 0.94;
  vec3 silCol = vec3(0.08, 0.05, 0.18);

  // premultiplied alpha so the CSS sunset shows through everywhere else
  vec3 rgb = bgCol * bgA;
  float a = bgA;
  rgb = silCol * sil + rgb * (1.0 - sil);
  a = sil + a * (1.0 - sil);
  rgb = statue * sA + rgb * (1.0 - sA);
  a = sA + a * (1.0 - sA);
  gl_FragColor = vec4(rgb, a);
}
`;

export type DavidScene = {
  setProgress: (p: number) => void;
  reveal: () => void;
  dispose: () => void;
};

type Opts = { reducedMotion: boolean; onDots?: (n: number) => void };

// the bust faces +Z; start in a three-quarter view
const BASE_YAW = 0.55;

export function createDavidScene(canvas: HTMLCanvasElement, { reducedMotion, onDots }: Opts): DavidScene {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: true, premultipliedAlpha: true, powerPreference: 'high-performance' });
  let dpr = Math.min(window.devicePixelRatio || 1, 1.5);
  renderer.setPixelRatio(dpr);
  renderer.autoClear = true;

  const quadGeo = new THREE.PlaneGeometry(2, 2);
  const orthoCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  // pass 1
  const fieldRT = new THREE.WebGLRenderTarget(1, 1, { minFilter: THREE.NearestFilter, magFilter: THREE.NearestFilter, depthBuffer: false });
  const fieldMat = new THREE.ShaderMaterial({
    vertexShader: QUAD_VERT,
    fragmentShader: FIELD_FRAG,
    uniforms: { uGrid: { value: new THREE.Vector2() }, uTime: { value: 0 }, uMouse: { value: new THREE.Vector2() } },
    depthTest: false,
  });
  const fieldScene = new THREE.Scene().add(new THREE.Mesh(quadGeo, fieldMat));

  // pass 2
  const statueRT = new THREE.WebGLRenderTarget(1, 1, { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter });
  const statueMat = new THREE.ShaderMaterial({
    vertexShader: STATUE_VERT,
    fragmentShader: STATUE_FRAG,
    uniforms: { uKey: { value: new THREE.Vector3(-0.55, 0.75, 0.65) } },
  });
  const statueScene = new THREE.Scene();
  const pivot = new THREE.Group();
  const tilt = new THREE.Group();
  pivot.add(tilt);
  statueScene.add(pivot);
  const cam = new THREE.PerspectiveCamera(24, 1, 0.01, 50);
  let statueH = 0.68;

  // pass 3
  const dotsMat = new THREE.ShaderMaterial({
    vertexShader: QUAD_VERT,
    fragmentShader: DOTS_FRAG,
    uniforms: {
      uField: { value: fieldRT.texture },
      uStatue: { value: statueRT.texture },
      uGrid: { value: new THREE.Vector2() },
      uCell: { value: 9 },
      uTime: { value: 0 },
      uIntro: { value: 0 },
      uReveal: { value: reducedMotion ? 1.2 : 0 },
      uFieldAmt: { value: 1 },
      uStatueAmt: { value: 1 },
      uAberr: { value: new THREE.Vector2() },
      uGlitch: { value: reducedMotion ? 0 : 1 },
    },
    depthTest: false,
  });
  const dotsScene = new THREE.Scene().add(new THREE.Mesh(quadGeo, dotsMat));

  const grid = { w: 1, h: 1, cell: 9 };
  const view = { w: 1, h: 1, mobile: false };
  const mouse = { x: 0.7, y: 0.5, tx: 0.7, ty: 0.5, px: 0.7, py: 0.5 };
  const state = { progress: 0, reveal: reducedMotion ? 1.2 : 0, revealing: false, loaded: false };

  const resize = () => {
    view.w = canvas.clientWidth;
    view.h = canvas.clientHeight;
    view.mobile = view.w < 768;
    renderer.setSize(view.w, view.h, false);
    grid.cell = (view.mobile ? 5 : 6) * dpr;
    grid.w = Math.ceil((view.w * dpr) / grid.cell);
    grid.h = Math.ceil((view.h * dpr) / grid.cell);
    fieldRT.setSize(grid.w, grid.h);
    statueRT.setSize(grid.w * 2, grid.h * 2);
    cam.aspect = view.w / view.h;
    cam.updateProjectionMatrix();
    fieldMat.uniforms.uGrid.value.set(grid.w, grid.h);
    dotsMat.uniforms.uGrid.value.set(grid.w, grid.h);
    dotsMat.uniforms.uCell.value = grid.cell;
    onDots?.(grid.w * grid.h);
  };
  resize();
  const onResize = () => {
    resize();
    if (state.loaded && (reducedMotion || perf.tier >= 2)) draw(reducedMotion ? start + 4000 : performance.now());
  };
  window.addEventListener('resize', onResize);

  const onMove = (e: PointerEvent) => {
    const r = canvas.getBoundingClientRect();
    mouse.tx = (e.clientX - r.left) / r.width;
    mouse.ty = 1 - (e.clientY - r.top) / r.height;
  };
  window.addEventListener('pointermove', onMove);

  new GLTFLoader()
    .setMeshoptDecoder(MeshoptDecoder)
    .loadAsync('/models/detective.glb')
    .then((gltf) => {
      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const ctr = box.getCenter(new THREE.Vector3());
      model.position.sub(ctr);
      statueH = size.y;
      model.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh) return;
        if (!mesh.geometry.getAttribute('normal')) mesh.geometry.computeVertexNormals();
        mesh.material = statueMat;
      });
      tilt.add(model);
      state.loaded = true;
    })
    .catch(() => {});

  const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
  const ease = (t: number) => t * t * (3 - 2 * t);

  const layout = () => {
    const p = ease(Math.min(1, Math.max(0, state.progress)));
    // the horizontal glide finishes early so the manifesto column is clear
    const px = ease(Math.min(1, Math.max(0, state.progress * 2.1)));
    const tanHalf = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2));
    // desktop: bust fills the height on the right, glides left while scrolling; mobile: upper center
    const fill = view.mobile ? 1.8 : lerp(1.16, 1.3, p);
    const dist = (statueH * fill) / (2 * tanHalf);
    cam.position.set(0, 0, dist);
    cam.lookAt(0, 0, 0);
    const halfW = tanHalf * dist * cam.aspect;
    const halfH = tanHalf * dist;
    const fx = view.mobile ? 0.56 : lerp(0.74, 0.21, px);
    pivot.position.x = (fx * 2 - 1) * halfW;
    pivot.position.y = view.mobile ? halfH * lerp(0.3, 0.22, p) : lerp(-0.05, 0.0, p) * statueH;
    dotsMat.uniforms.uFieldAmt.value = lerp(1, 0.45, p);
    dotsMat.uniforms.uStatueAmt.value = view.mobile ? lerp(0.95, 0.4, p) : 1;
    return p;
  };

  const start = performance.now();
  let last = start;
  let raf = 0;
  let visible = true;
  const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
  io.observe(canvas);
  // the sky is sticky, so the canvas counts as "in view" even once the opaque sheets below have slid over it;
  // DavidStage marks the sky data-offscreen then, and the loop idles as it does for a hidden tab
  const sky = canvas.closest<HTMLElement>('.sky');

  const draw = (now: number) => {
    const t = (now - start) / 1000;
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;

    mouse.x += (mouse.tx - mouse.x) * 0.07;
    mouse.y += (mouse.ty - mouse.y) * 0.07;
    const vx = (mouse.x - mouse.px) / Math.max(dt, 0.001);
    const vy = (mouse.y - mouse.py) / Math.max(dt, 0.001);
    mouse.px = mouse.x;
    mouse.py = mouse.y;

    const p = layout();
    // the gaze follows the cursor
    const yaw = BASE_YAW + p * 0.35 + (mouse.x - 0.6) * 0.75 + Math.sin(t * 0.35) * 0.04;
    const pitch = -(mouse.y - 0.55) * 0.28 + Math.sin(t * 0.27) * 0.02;
    pivot.rotation.y += (yaw - pivot.rotation.y) * 0.08;
    tilt.rotation.x += (pitch - tilt.rotation.x) * 0.08;

    if (state.revealing && state.reveal < 1.2) state.reveal = Math.min(1.2, state.reveal + dt * 0.55);

    const ab = dotsMat.uniforms.uAberr.value as THREE.Vector2;
    ab.lerp(new THREE.Vector2(THREE.MathUtils.clamp(vx * 0.05, -0.22, 0.22), THREE.MathUtils.clamp(vy * 0.05, -0.22, 0.22)), 0.15);

    fieldMat.uniforms.uTime.value = t + 20;
    fieldMat.uniforms.uMouse.value.set(mouse.x * grid.w, mouse.y * grid.h);
    dotsMat.uniforms.uTime.value = t;
    dotsMat.uniforms.uIntro.value = Math.min(1, t / 2);
    dotsMat.uniforms.uReveal.value = state.loaded ? state.reveal : 0;

    renderer.setRenderTarget(fieldRT);
    renderer.render(fieldScene, orthoCam);
    renderer.setRenderTarget(statueRT);
    renderer.setClearColor(0x000000, 0);
    renderer.clear();
    if (state.loaded) renderer.render(statueScene, cam);
    renderer.setRenderTarget(null);
    renderer.setClearColor(0x000000, 0);
    renderer.render(dotsScene, orthoCam);
  };

  // Adaptive quality: a phone that cannot keep up first drops to 1x pixels at 30 fps, then settles
  // on a still frame (redrawn on scroll and resize) instead of burning the main thread.
  const perf = { tier: 0, frames: 0, slow: 0, total: 0, since: 0, prev: 0, skip: false };
  const WINDOW = 1500; // judge the device on about a second and a half of drawn frames
  const watch = (now: number) => {
    const gap = perf.prev ? now - perf.prev : 0;
    perf.prev = now;
    if (!state.loaded || !gap || gap > 1000) {
      perf.since = now; // still loading, first frame, or back from a hidden tab
      return;
    }
    perf.frames++;
    perf.total += gap;
    if (gap > (perf.tier ? 50 : 34)) perf.slow++;
    if (now - perf.since < WINDOW || perf.frames < 6) return;
    const avg = perf.total / perf.frames;
    const struggling = perf.slow > perf.frames * 0.5;
    perf.frames = perf.slow = perf.total = 0;
    perf.since = now;
    if (!struggling) return;
    // far too slow for a half step: straight to the still frame
    perf.tier = avg > 120 ? 2 : perf.tier + 1;
    if (perf.tier === 1) {
      dpr = 1;
      renderer.setPixelRatio(dpr);
      resize();
    } else if (state.revealing) {
      // finish the reveal so the still frame shows the whole bust
      state.reveal = 1.2;
    }
  };

  const frame = (now: number) => {
    if (perf.tier >= 2) {
      raf = 0;
      draw(now); // last frame, now fully revealed, stays on screen
      return;
    }
    raf = requestAnimationFrame(frame);
    if (!visible || sky?.hasAttribute('data-offscreen') || document.hidden) {
      last = now;
      perf.prev = 0;
      return;
    }
    // tier 1 draws every other frame
    if (perf.tier === 1 && (perf.skip = !perf.skip)) return;
    draw(now);
    watch(now);
  };

  const still = () => perf.tier >= 2 || reducedMotion;

  if (reducedMotion) {
    // static frame once the model is in
    const settle = () => (state.loaded ? draw(start + 4000) : requestAnimationFrame(settle));
    raf = requestAnimationFrame(settle);
  } else {
    raf = requestAnimationFrame(frame);
  }

  return {
    setProgress: (p) => {
      state.progress = p;
      if (still() && state.loaded) draw(reducedMotion ? start + 4000 : performance.now());
    },
    reveal: () => {
      state.revealing = true;
      if (perf.tier >= 2) {
        state.reveal = 1.2;
        draw(performance.now());
      }
    },
    dispose: () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onMove);
      fieldRT.dispose();
      statueRT.dispose();
      fieldMat.dispose();
      statueMat.dispose();
      dotsMat.dispose();
      quadGeo.dispose();
      tilt.traverse((o) => (o as THREE.Mesh).geometry?.dispose());
      renderer.dispose();
    },
  };
}
