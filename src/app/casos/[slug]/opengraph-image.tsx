import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { projects } from '@/lib/content';

export const alt = 'Caso resolvido pela HenaWeb';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const INK = '#140a26';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  const shot = p?.shot ? `data:image/jpeg;base64,${(await readFile(join(process.cwd(), 'public', p.shot.desktop))).toString('base64')}` : null;
  const host = p ? new URL(p.href).hostname : 'henaweb.com';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: 56,
          gap: 48,
          alignItems: 'center',
          background: 'linear-gradient(180deg, #140c2e 0%, #2b1a58 70%, #1f3b4a 100%)',
          color: '#fdf3e1',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', width: 430, gap: 18 }}>
          <div style={{ display: 'flex', fontSize: 24, letterSpacing: 5, color: '#3cc6b4' }}>CASO RESOLVIDO</div>
          <div style={{ display: 'flex', fontSize: 84, fontWeight: 700, lineHeight: 0.95, letterSpacing: -3 }}>{p?.name ?? 'HenaWeb'}</div>
          <div style={{ display: 'flex', fontSize: 32, color: '#f7931e' }}>{p?.kind ?? ''}</div>
          <div
            style={{
              display: 'flex',
              marginTop: 18,
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
            HenaWeb
          </div>
        </div>

        {/* Win95 window with the real screenshot */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            height: 470,
            background: '#c9c3d8',
            border: `5px solid ${INK}`,
            boxShadow: `10px 10px 0 ${INK}`,
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              height: 40,
              padding: '0 14px',
              background: 'linear-gradient(90deg, #f7931e, #8b5cc7 55%, #3cc6b4)',
              color: '#fff',
              fontSize: 20,
              fontWeight: 700,
            }}
          >
            {host}
          </div>
          <div style={{ display: 'flex', flex: 1, margin: 8, overflow: 'hidden', border: '3px solid #7d7394', background: '#1a0f2e' }}>
            {shot ? (
              // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
              <img src={shot} width={620} height={1163} style={{ width: '100%', height: 'auto', objectFit: 'cover', objectPosition: 'top' }} />
            ) : (
              // no screenshot: a drawn number board, like the gallery mock
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, padding: 18, alignContent: 'flex-start' }}>
                {Array.from({ length: 40 }, (_, i) => {
                  const hit = [3, 9, 14, 22, 27, 33, 38].includes(i);
                  return (
                    <div
                      key={i}
                      style={{
                        display: 'flex',
                        width: 52,
                        height: 52,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 8,
                        fontSize: 20,
                        fontWeight: 700,
                        border: hit ? `3px solid ${INK}` : '2px solid #3a2a6e',
                        background: hit ? '#f7931e' : '#2b1a58',
                        color: hit ? INK : '#a8a0c4',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
