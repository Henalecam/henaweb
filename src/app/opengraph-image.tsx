import { ImageResponse } from 'next/og';
import { OgFloor, OgSun } from '@/lib/og-scene';

export const alt = 'HenaWeb · Sistemas esculpidos para empresas e governos';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const INK = '#140a26';
const tags = ['Sistemas sob medida', 'Setor público', 'Automação & IA', 'Sites'];

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
        <OgSun />
        <OgFloor />
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
