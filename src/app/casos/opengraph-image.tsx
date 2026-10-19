import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { projects } from '@/lib/content';

export const alt = 'Arquivo de casos da HenaWeb: capturas dos projetos entregues';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const INK = '#140a26';

/** /casos share card: the archive as a wall of little Win95 windows, one per case, with the real screenshots. */
export default async function Image() {
  const cases = await Promise.all(
    projects.slice(0, 6).map(async (p) => ({
      name: p.name,
      shot: p.shot
        ? `data:image/jpeg;base64,${(await readFile(join(process.cwd(), 'public', p.shot.desktop.replace(/\.jpg$/, '-top.jpg')))).toString('base64')}`
        : null,
    })),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: 52,
          gap: 40,
          alignItems: 'center',
          background: 'linear-gradient(180deg, #140c2e 0%, #2b1a58 70%, #1f3b4a 100%)',
          color: '#fdf3e1',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', width: 360, gap: 16 }}>
          <div style={{ display: 'flex', fontSize: 22, letterSpacing: 5, color: '#3cc6b4' }}>ARQUIVO DE CASOS</div>
          <div style={{ display: 'flex', flexDirection: 'column', fontSize: 78, fontWeight: 700, lineHeight: 0.92, letterSpacing: -3 }}>
            <span>Casos</span>
            <span style={{ color: '#f7931e' }}>resolvidos.</span>
          </div>
          <div style={{ display: 'flex', fontSize: 26, color: '#fdf3e1', opacity: 0.8 }}>{projects.length} projetos · ERPs, IA, finanças e sites</div>
          <div
            style={{
              display: 'flex',
              marginTop: 14,
              padding: '8px 20px',
              borderRadius: 999,
              background: '#fdf3e1',
              color: INK,
              fontSize: 24,
              border: `4px solid ${INK}`,
              boxShadow: `5px 5px 0 ${INK}`,
              alignSelf: 'flex-start',
            }}
          >
            henaweb.com/casos
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, flex: 1 }}>
          {cases.map((c, i) => (
            <div
              key={c.name}
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: 236,
                height: 168,
                background: '#c9c3d8',
                border: `4px solid ${INK}`,
                boxShadow: `6px 6px 0 ${INK}`,
                transform: `rotate(${[-2, 1.5, -1, 2, -1.5, 1][i]}deg)`,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  height: 26,
                  padding: '0 8px',
                  background: 'linear-gradient(90deg, #f7931e, #8b5cc7 55%, #3cc6b4)',
                  color: '#fff',
                  fontSize: 14,
                  fontWeight: 700,
                }}
              >
                {c.name}
              </div>
              <div style={{ display: 'flex', flex: 1, margin: 4, overflow: 'hidden', border: '2px solid #7d7394', background: '#1a0f2e' }}>
                {c.shot ? (
                  // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
                  <img src={c.shot} width={220} height={129} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} />
                ) : (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, padding: 8, alignContent: 'flex-start' }}>
                    {Array.from({ length: 24 }, (_, n) => (
                      <div
                        key={n}
                        style={{
                          display: 'flex',
                          width: 26,
                          height: 26,
                          borderRadius: 5,
                          background: [2, 7, 11, 18, 21].includes(n) ? '#f7931e' : '#2b1a58',
                          border: '2px solid #3a2a6e',
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
