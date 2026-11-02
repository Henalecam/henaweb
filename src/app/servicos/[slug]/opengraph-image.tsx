import { ImageResponse } from 'next/og';
import { services, serviceBySlug } from '@/lib/services';
import { OgFloor, OgSun } from '@/lib/og-scene';

const size = { width: 1200, height: 630 };

// a per-service alt for link previews and screen readers (a fixed `alt` export can't see the slug)
export function generateImageMetadata({ params }: { params: { slug: string } }) {
  const s = serviceBySlug(params.slug);
  return [
    {
      id: 'card',
      size,
      contentType: 'image/png',
      alt: s ? `HenaWeb · ${s.name}: ${s.h1} ${s.h1Accent}` : 'Serviço da HenaWeb',
    },
  ];
}

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
  const words = s
    ? [...s.h1.split(' ').map((text) => ({ text, accent: false })), ...s.h1Accent.split(' ').map((text) => ({ text, accent: true }))]
    : headline.split(' ').map((text) => ({ text, accent: false }));

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
        {/* stops short of the sun (its left edge sits at x≈910): the headline used to run across its stripes */}
        {/* word by word so the accent words (the page's orange h1 accent) can wrap with the rest */}
        <div style={{ display: 'flex', flexWrap: 'wrap', columnGap: 20, fontSize: 80, fontWeight: 700, lineHeight: 1.02, letterSpacing: -3, maxWidth: 820 }}>
          {words.map((w, i) => (
            <span key={i} style={{ color: w.accent ? '#f7931e' : undefined }}>
              {w.text}
            </span>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 14, marginBottom: 6 }}>
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
