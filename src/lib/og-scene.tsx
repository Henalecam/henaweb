/**
 * The synthwave scene shared by the share cards (home and service pages), drawn for satori / next/og:
 * a striped retro sun setting behind a perspective grid floor. Plain elements only (no hooks, no CSS
 * perspective, which satori lacks): the floor is an SVG of horizon lines bunching toward the horizon and
 * rays fanning out from a vanishing point under the sun. 1200×630 canvas; place both inside a relative root.
 */

const FLOOR_H = 170;
const VX = 1010;
const rows = Array.from({ length: 7 }, (_, i) => Math.round(FLOOR_H * ((i + 1) / 7) ** 1.9));
const rays = Array.from({ length: 23 }, (_, i) => (i - 11) * 150);
// the sky color behind the sun's lower half: the bands are cut out of the disc in this color
const SKY_LOW = '#28194f';

export function OgSun() {
  return (
    <div
      style={{
        position: 'absolute',
        right: -40,
        top: 132,
        width: 340,
        height: 340,
        borderRadius: 340,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #f9e27d 0%, #f4b942 45%, #f7931e 75%, #8b5cc7 100%)',
      }}
    >
      {[4, 7, 10, 13, 16].map((h, i) => (
        <div key={h} style={{ display: 'flex', height: h, marginBottom: 16 - i * 2, background: SKY_LOW }} />
      ))}
    </div>
  );
}

export function OgFloor() {
  return (
    <svg width="1200" height={FLOOR_H} viewBox={`0 0 1200 ${FLOOR_H}`} style={{ position: 'absolute', left: 0, bottom: 0 }}>
      <rect x="0" y="0" width="1200" height={FLOOR_H} fill="#1a1440" />
      <line x1="0" y1="1" x2="1200" y2="1" stroke="#f7931e" strokeWidth="3" />
      {rows.map((y) => (
        <line key={y} x1="0" y1={y} x2="1200" y2={y} stroke="#8b5cc7" strokeOpacity="0.55" strokeWidth="2" />
      ))}
      {rays.map((dx) => (
        <line key={dx} x1={VX} y1="0" x2={VX + dx * 2.2} y2={FLOOR_H} stroke="#8b5cc7" strokeOpacity="0.55" strokeWidth="2" />
      ))}
    </svg>
  );
}
