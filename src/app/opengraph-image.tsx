import { ImageResponse } from 'next/og';

export const alt = 'HenaWeb · Sistemas esculpidos para empresas e governos';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const INK = '#140a26';
const tags = ['Sistemas sob medida', 'Setor público', 'Automação & IA', 'Sites'];
const BG_LOW = '#28194f';

// the site's synthwave floor, drawn as an SVG: horizontal lines bunching toward the horizon and rays
// fanning out from a vanishing point under the sun (satori has no CSS perspective)
const FLOOR_H = 170;
const VX = 1010;
const rows = Array.from({ length: 7 }, (_, i) => Math.round(FLOOR_H * ((i + 1) / 7) ** 1.9));
const rays = Array.from({ length: 23 }, (_, i) => (i - 11) * 150);

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 64,
          background: 'linear-gradient(180deg, #140c2e 0%, #2b1a58 70%, #1f3b4a 100%)',
          color: '#fdf3e1',
          position: 'relative',
        }}
      >
        {/* the retro sun, sliced by bands of sky that get thicker toward the horizon, sinking into the floor */}
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
            <div key={h} style={{ display: 'flex', height: h, marginBottom: 16 - i * 2, background: BG_LOW }} />
          ))}
        </div>
        <svg
          width="1200"
          height={FLOOR_H}
          viewBox={`0 0 1200 ${FLOOR_H}`}
          style={{ position: 'absolute', left: 0, bottom: 0 }}
        >
          <rect x="0" y="0" width="1200" height={FLOOR_H} fill="#1a1440" />
          <line x1="0" y1="1" x2="1200" y2="1" stroke="#f7931e" strokeWidth="3" />
          {rows.map((y) => (
            <line key={y} x1="0" y1={y} x2="1200" y2={y} stroke="#8b5cc7" strokeOpacity="0.55" strokeWidth="2" />
          ))}
          {rays.map((dx) => (
            <line key={dx} x1={VX} y1="0" x2={VX + dx * 2.2} y2={FLOOR_H} stroke="#8b5cc7" strokeOpacity="0.55" strokeWidth="2" />
          ))}
        </svg>
        <div style={{ display: 'flex', fontSize: 30, letterSpacing: 6, color: '#3cc6b4' }}>HENAWEB · STUDIO DE ENGENHARIA DE SOFTWARE</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>Sistemas esculpidos</div>
          <div style={{ fontSize: 92, fontWeight: 700, lineHeight: 1, letterSpacing: -3, color: '#f7931e' }}>para empresas e governos.</div>
        </div>
        <div style={{ display: 'flex', gap: 16, marginBottom: 6 }}>
          {tags.map((t) => (
            <div
              key={t}
              style={{
                display: 'flex',
                padding: '10px 22px',
                borderRadius: 999,
                background: '#fdf3e1',
                color: INK,
                fontSize: 26,
                border: `4px solid ${INK}`,
                boxShadow: `5px 5px 0 ${INK}`,
              }}
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
