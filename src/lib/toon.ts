import * as THREE from 'three';

export const INK = 0x140a26;

/** Shared cartoon look: 3-step toon ramp + inverted-hull outlines. Track everything for disposal. */
export function createToonKit() {
  const disposables: { dispose: () => void }[] = [];
  const track = <T extends { dispose: () => void }>(d: T) => {
    disposables.push(d);
    return d;
  };

  const data = new Uint8Array([90, 90, 90, 255, 180, 180, 180, 255, 255, 255, 255, 255]);
  const ramp = track(new THREE.DataTexture(data, 3, 1, THREE.RGBAFormat));
  ramp.minFilter = THREE.NearestFilter;
  ramp.magFilter = THREE.NearestFilter;
  ramp.generateMipmaps = false;
  ramp.needsUpdate = true;

  const outlineMat = track(new THREE.MeshBasicMaterial({ color: INK, side: THREE.BackSide }));

  const toon = (color: number, extra: THREE.MeshToonMaterialParameters = {}) =>
    track(new THREE.MeshToonMaterial({ color, gradientMap: ramp, ...extra }));

  /** Mesh plus a slightly inflated back-face hull for the cartoon outline. */
  const inked = (geo: THREE.BufferGeometry, mat: THREE.Material | number, thickness = 0.045) => {
    track(geo);
    if (!geo.getAttribute('normal')) geo.computeVertexNormals();
    const g = new THREE.Group();
    const body = new THREE.Mesh(geo, typeof mat === 'number' ? toon(mat) : mat);
    g.add(body);
    const hull = track(geo.clone());
    const pos = hull.getAttribute('position');
    const nor = hull.getAttribute('normal');
    for (let i = 0; i < pos.count; i++) {
      pos.setXYZ(i, pos.getX(i) + nor.getX(i) * thickness, pos.getY(i) + nor.getY(i) * thickness, pos.getZ(i) + nor.getZ(i) * thickness);
    }
    g.add(new THREE.Mesh(hull, outlineMat));
    return g;
  };

  return { toon, inked, track, dispose: () => disposables.forEach((d) => d.dispose()) };
}
