import { ImageResponse } from 'next/og';
import { services, serviceBySlug } from '@/lib/services';

export const alt = 'Serviço da HenaWeb';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const INK = '#140a26';

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = serviceBySlug(slug);
  const name = s?.name ?? 'HenaWeb';
  const headline = s ? `${s.h1} ${s.h1Accent}` : 'Sistemas esculpidos para empresas e governos.';
  const tags = s?.stack.slice(0, 4) ?? [];

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
        <div
          style={{
            position: 'absolute',
            right: -70,
            top: 150,
            width: 360,
            height: 360,
            borderRadius: 360,
            background: 'linear-gradient(180deg, #f9e27d 0%, #f4b942 45%, #f7931e 75%, #8b5cc7 100%)',
          }}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              display: 'flex',
              padding: '8px 20px',
              borderRadius: 999,
              background: '#f7931e',
              color: INK,
              fontSize: 26,
              border: `4px solid ${INK}`,
              boxShadow: `5px 5px 0 ${INK}`,
            }}
          >
            {name}
          </div>
          <div style={{ display: 'flex', fontSize: 26, letterSpacing: 5, color: '#3cc6b4' }}>HENAWEB</div>
        </div>
        <div style={{ display: 'flex', fontSize: 80, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3, maxWidth: 900 }}>{headline}</div>
        <div style={{ display: 'flex', gap: 14 }}>
          {tags.map((t) => (
            <div
              key={t}
              style={{
                display: 'flex',
                padding: '8px 18px',
                borderRadius: 999,
                background: '#fdf3e1',
                color: INK,
                fontSize: 24,
                border: `4px solid ${INK}`,
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
