import { ImageResponse } from 'next/og';
import { pastimes } from '@/lib/pastimes';

export const alt = 'Passa tempo da HenaWeb: Fortrex, Arena e Forno em gabinetes de fliperama';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const INK = '#140a26';

/** /passatempo share card: the three cabinets side by side, each with its attract screen (sunset + name). */
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: '48px 56px',
          background: 'linear-gradient(180deg, #140c2e 0%, #2b1a58 70%, #1f3b4a 100%)',
          color: '#fdf3e1',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', fontSize: 72, fontWeight: 700, letterSpacing: -3 }}>
            <span>Passa&nbsp;</span>
            <span style={{ color: '#f7931e' }}>tempo.</span>
          </div>
          <div style={{ display: 'flex', fontSize: 22, letterSpacing: 5, color: '#3cc6b4' }}>FLIPERAMA DA HENAWEB</div>
        </div>

        <div style={{ display: 'flex', gap: 36, marginTop: 36, flex: 1 }}>
          {pastimes.map((p, i) => (
            <div
              key={p.slug}
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                background: '#c9c3d8',
                border: `4px solid ${INK}`,
                boxShadow: `7px 7px 0 ${INK}`,
                transform: `rotate(${[-1.5, 1, -0.5][i % 3]}deg)`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', height: 34, padding: '0 10px', background: 'linear-gradient(90deg, #f7931e, #8b5cc7 55%, #3cc6b4)', color: '#fff', fontSize: 18 }}>
                {p.slug}.exe
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  flex: 1,
                  margin: 6,
                  border: '3px solid #7d7394',
                  background: `linear-gradient(180deg, ${p.from} 0%, ${p.from} 45%, ${p.to} 100%)`,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    width: 120,
                    height: 120,
                    borderRadius: 999,
                    background: `repeating-linear-gradient(180deg, ${p.accent} 0px, ${p.accent} 11px, transparent 11px, transparent 16px)`,
                  }}
                />
                <div style={{ display: 'flex', marginTop: -40, fontSize: 56, fontWeight: 700, color: '#fdf3e1', textShadow: `4px 4px 0 ${INK}` }}>{p.name}</div>
                <div style={{ display: 'flex', marginTop: 18, fontSize: 18, letterSpacing: 5, color: '#fdf3e1' }}>&gt; PRESS START</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', marginTop: 30, fontSize: 24, opacity: 0.85 }}>henaweb.com/passatempo · jogos e experimentos das horas vagas</div>
      </div>
    ),
    size,
  );
}
