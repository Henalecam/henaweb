'use client';

import { useEffect } from 'react';
import { whatsappLink } from '@/lib/site';

/**
 * Last line of defence: when the root layout itself breaks, `error.tsx` can't show (it lives inside that layout)
 * and Next falls back to a bare English page. This replaces it with a self-contained Win95 "blue screen" in the
 * site's colours. Styles are inline on purpose: whatever broke may have taken the stylesheet and fonts with it.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  const code = error.digest ? `código ${error.digest}` : '';
  const report = whatsappLink(`Olá! O site da HenaWeb não abriu${code ? ` (${code})` : ''}. Dá uma olhada?`);

  const button = {
    display: 'inline-block',
    padding: '0.7rem 1.3rem',
    borderRadius: 999,
    border: '2.5px solid #12082a',
    boxShadow: '3px 3px 0 #12082a',
    color: '#1a0f2e',
    font: '600 1rem/1 system-ui, sans-serif',
    textDecoration: 'none',
    cursor: 'pointer',
  } as const;

  return (
    <html lang="pt-BR">
      <head>
        <title>O sistema tropeçou · HenaWeb</title>
        <meta name="robots" content="noindex" />
      </head>
      <body
        style={{
          margin: 0,
          minHeight: '100svh',
          display: 'grid',
          placeItems: 'center',
          padding: '2rem 1rem',
          background: 'linear-gradient(180deg,#140c2e,#2b1a58)',
          color: '#fdf3e1',
          font: '400 1rem/1.6 system-ui, sans-serif',
          boxSizing: 'border-box',
        }}
      >
        <main style={{ width: '100%', maxWidth: '30rem' }}>
          <div
            data-global-error
            style={{ background: '#c9c3d8', border: '3px solid #12082a', boxShadow: 'inset -2px -2px 0 #7d7394, inset 2px 2px 0 #fff, 7px 7px 0 #12082a' }}
          >
            <div
              style={{
                padding: '0.3rem 0.65rem',
                background: 'linear-gradient(90deg,#f7931e,#8b5cc7 55%,#3cc6b4)',
                color: '#fff',
                font: '700 0.72rem/1.4 ui-monospace, monospace',
                letterSpacing: '0.04em',
              }}
            >
              HENAWEB.EXE
            </div>
            <div style={{ margin: 6, border: '2px solid #7d7394', background: '#fdf3e1', color: '#1a0f2e', padding: '1.25rem' }}>
              <h1 style={{ margin: 0, font: '600 1.6rem/1.15 system-ui, sans-serif', letterSpacing: '-0.03em' }}>O sistema tropeçou.</h1>
              <p style={{ margin: '0.75rem 0 0' }}>
                O site não conseguiu abrir agora. Foi um tropeço nosso, não seu: tentar de novo costuma resolver.
              </p>
              {code && <p style={{ margin: '0.5rem 0 0', font: '400 0.75rem/1.4 ui-monospace, monospace', opacity: 0.75 }}>{code}</p>}
              <div style={{ marginTop: '1.25rem', display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                <button type="button" onClick={reset} style={{ ...button, background: '#f7931e' }}>
                  Tentar de novo ↻
                </button>
                <a href="/" style={{ ...button, background: '#fff' }}>
                  Página inicial
                </a>
                <a href={report} target="_blank" rel="noopener noreferrer" style={{ ...button, background: '#3cc6b4' }}>
                  Avisar pelo WhatsApp<span style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}> (abre em nova aba)</span>
                </a>
              </div>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
