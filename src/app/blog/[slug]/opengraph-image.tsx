import { ImageResponse } from 'next/og';
import { visiblePosts } from '@/lib/blog';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Artigo do blog da HenaWeb';

const INK = '#140a26';

export function generateStaticParams() {
  return visiblePosts().map((p) => ({ slug: p.slug }));
}

/** The link preview of a post (WhatsApp, LinkedIn, X): its title on the site's sunset, with the reading time. */
export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = visiblePosts().find((x) => x.slug === slug);
  const title = p?.title ?? 'Blog da HenaWeb';
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 72,
          background: 'linear-gradient(180deg, #140c2e 0%, #2b1a58 70%, #1f3b4a 100%)',
          color: '#fdf3e1',
        }}
      >
        <div style={{ display: 'flex', fontSize: 26, letterSpacing: 6, color: '#3cc6b4' }}>BLOG · HENAWEB</div>
        <div style={{ display: 'flex', fontSize: title.length > 60 ? 64 : 78, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2, maxWidth: 1000 }}>
          {title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 28 }}>
          <div style={{ display: 'flex', padding: '8px 22px', borderRadius: 999, background: '#fdf3e1', color: INK, border: `4px solid ${INK}` }}>
            henaweb.com/blog
          </div>
          {p && <div style={{ display: 'flex', color: '#f7931e' }}>{p.minutes} min de leitura</div>}
        </div>
      </div>
    ),
    size,
  );
}
