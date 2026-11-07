import { ImageResponse } from 'next/og';
import { services } from '@/lib/services';
import { OgFloor, OgSun } from '@/lib/og-scene';

export const alt = 'HenaWeb · links: WhatsApp, serviços, casos e redes';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const INK = '#140a26';

/** /links share card: the synthwave scene with the page's own buttons stacked like the phone layout. */
export default function Image() {
  const rows = ['WhatsApp', 'Abrir um caso', ...services.map((s) => s.name)];
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: 64,
          background: 'linear-gradient(180deg, #140c2e 0%, #2b1a58 70%, #1f3b4a 100%)',
          color: '#fdf3e1',
          position: 'relative',
        }}
      >
        <OgSun />
        <OgFloor />
        <div style={{ display: 'flex', flexDirection: 'column', width: 520 }}>
          <div style={{ display: 'flex', fontSize: 26, letterSpacing: 6, color: '#3cc6b4' }}>HENAWEB · LINKS</div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 24, fontSize: 84, fontWeight: 700, lineHeight: 0.95, letterSpacing: -3 }}>
            <span>Todos os</span>
            <span style={{ color: '#f7931e' }}>caminhos.</span>
          </div>
          <div style={{ display: 'flex', marginTop: 24, fontSize: 30, opacity: 0.85 }}>henaweb.com/links</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginLeft: 40, width: 360 }}>
          {rows.slice(0, 6).map((r, i) => (
            <div
              key={r}
              style={{
                display: 'flex',
                padding: '12px 22px',
                borderRadius: 18,
                background: i === 0 ? '#25d366' : i === 1 ? '#f7931e' : '#fdf3e1',
                color: INK,
                fontSize: 26,
                border: `4px solid ${INK}`,
                boxShadow: `5px 5px 0 ${INK}`,
              }}
            >
              {r}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
