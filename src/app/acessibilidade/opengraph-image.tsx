import { ImageResponse } from 'next/og';
import { OgFloor, OgSun } from '@/lib/og-scene';

export const alt = 'HenaWeb · declaração de acessibilidade: um site para todo mundo';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const INK = '#140a26';
const CHECKS = ['Teclado', 'Menos movimento', 'Alto contraste', 'Leitores de tela', 'Alvos de 24 px'];

/** /acessibilidade share card: the synthwave scene with the page's "✓ ok" checklist. */
export default function Image() {
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
        <div style={{ display: 'flex', flexDirection: 'column', width: 560 }}>
          <div style={{ display: 'flex', fontSize: 26, letterSpacing: 6, color: '#3cc6b4' }}>HENAWEB · ACESSIBILIDADE</div>
          <div style={{ display: 'flex', flexDirection: 'column', marginTop: 24, fontSize: 84, fontWeight: 700, lineHeight: 0.95, letterSpacing: -3 }}>
            <span>Um site para</span>
            <span style={{ color: '#f7931e' }}>todo mundo.</span>
          </div>
          <div style={{ display: 'flex', marginTop: 24, fontSize: 30, opacity: 0.85 }}>henaweb.com/acessibilidade</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginLeft: 40, width: 340 }}>
          {CHECKS.map((c) => (
            <div
              key={c}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '12px 20px',
                borderRadius: 14,
                background: '#fdf3e1',
                color: INK,
                fontSize: 26,
                border: `4px solid ${INK}`,
                boxShadow: `5px 5px 0 ${INK}`,
              }}
            >
              {/* drawn, not typed: the OG font has no ✓ glyph */}
              <svg width="26" height="26" viewBox="0 0 16 16">
                <path d="M2.6 8.9c1.3.8 2.4 2 3.3 3.4C7.6 8.6 10 5.6 13.6 3" fill="none" stroke="#1f6f63" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              {c}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
