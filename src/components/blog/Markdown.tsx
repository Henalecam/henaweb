import type { ReactNode } from 'react';
import type { Block, Inline } from '@/lib/markdown';

const external = (href: string) => /^https?:\/\//.test(href) && !href.startsWith('https://henaweb.com');

function inline(c: Inline[], key = ''): ReactNode[] {
  return c.map((x, i) => {
    const k = `${key}${i}`;
    switch (x.t) {
      case 'text':
        return x.v;
      case 'code':
        return <code key={k}>{x.v}</code>;
      case 'strong':
        return <strong key={k}>{inline(x.c, k)}</strong>;
      case 'em':
        return <em key={k}>{inline(x.c, k)}</em>;
      case 'link':
        return external(x.href) ? (
          <a key={k} href={x.href} target="_blank" rel="noopener noreferrer">
            {inline(x.c, k)}
            <span aria-hidden> ↗</span>
            <span className="sr-only"> (abre em nova aba)</span>
          </a>
        ) : (
          <a key={k} href={x.href.replace(/^https:\/\/henaweb\.com/, '') || '/'}>
            {inline(x.c, k)}
          </a>
        );
    }
  });
}

/**
 * A post's body as plain React elements (no raw HTML anywhere). Headings carry ids for the table of contents and for
 * "#secao" links; the FAQ section keeps its ### questions as headings, which is also what the FAQPage JSON-LD reads.
 */
export default function Markdown({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case 'h': {
            const H = b.level === 2 ? 'h2' : 'h3';
            return (
              <H key={i} id={b.id}>
                {inline(b.c)}
              </H>
            );
          }
          case 'p':
            return <p key={i}>{inline(b.c)}</p>;
          case 'ul':
            return (
              <ul key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{inline(it)}</li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={i}>
                {b.items.map((it, j) => (
                  <li key={j}>{inline(it)}</li>
                ))}
              </ol>
            );
          case 'quote':
            return (
              <blockquote key={i}>
                {b.c.map((p, j) => (
                  <p key={j}>{inline(p)}</p>
                ))}
              </blockquote>
            );
          case 'code':
            return (
              <pre key={i} data-lang={b.lang || undefined}>
                <code>{b.v}</code>
              </pre>
            );
          case 'img':
            return (
              <figure key={i}>
                {/* eslint-disable-next-line @next/next/no-img-element -- post images have no known size */}
                <img src={b.src} alt={b.alt} loading="lazy" decoding="async" />
                {b.caption && <figcaption>{b.caption}</figcaption>}
              </figure>
            );
          case 'hr':
            return <hr key={i} />;
        }
      })}
    </>
  );
}
