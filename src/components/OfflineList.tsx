'use client';

import { useEffect, useState } from 'react';

type Kept = { path: string; title: string; at: number };

const when = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' });

/**
 * The pages this browser kept for offline reading (the service worker's "pages-*" cache), each with the title
 * read from its saved HTML. Before the list is read, or with no cache API, it says so instead of showing nothing.
 */
export default function OfflineList() {
  const [kept, setKept] = useState<Kept[] | null>(null);
  useEffect(() => {
    (async () => {
      try {
        const name = (await caches.keys()).find((k) => k.startsWith('pages-'));
        if (!name) return setKept([]);
        const cache = await caches.open(name);
        const out: Kept[] = [];
        for (const req of await cache.keys()) {
          const path = new URL(req.url).pathname;
          if (path === '/offline') continue;
          const res = await cache.match(req);
          const html = (await res?.text()) ?? '';
          const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.replace(/&amp;/g, '&').replace(/ · HenaWeb$/, '') ?? path;
          // when this copy was kept: the date the server answered with, refreshed on every online visit
          const at = Date.parse(res?.headers.get('date') ?? '') || 0;
          out.push({ path, title: path === '/' ? 'Página inicial' : title, at });
        }
        // the freshest copies first: the page read last is the likeliest one to be wanted again
        setKept(out.sort((a, b) => b.at - a.at));
      } catch {
        setKept([]);
      }
    })();
  }, []);

  // a drawer of fixed height (three rows, the rest scrolls): the list is read from the cache after the page shows,
  // and growing from one status line to N rows pushed the redial button, the game and the contact line down
  // (layout shift 0.12 on a phone that had kept a few pages)
  const box = 'mt-5 h-[10.25rem] print:h-auto print:overflow-visible overflow-y-auto overscroll-contain rounded-xl border-2 border-dashed border-acid-ink/25 p-2';
  if (!kept?.length)
    return (
      <div className={`${box} flex items-center justify-center`}>
        <p className="font-mono text-sm text-acid-ink/70">{kept === null ? 'Procurando no arquivo…' : 'Nenhuma página guardada ainda.'}</p>
      </div>
    );
  return (
    <ul data-lenis-prevent aria-label="Páginas guardadas neste navegador" className={`${box} flex flex-col gap-2`}>
      {kept.map((k) => (
        <li key={k.path}>
          {/* phones: the address goes under the title, which had room for 11 letters beside it ("Diconta: ER…",
              "Acessibilid…"); the drawer then shows two and a half rows, the cut-off one hinting that it scrolls */}
          <a href={k.path} className="toon-sm toon-press flex min-h-11 flex-col justify-center rounded-xl bg-white px-4 py-2 font-medium sm:flex-row sm:items-center sm:justify-between sm:gap-3">
            <span className="truncate">{k.title}</span>
            <span className="truncate font-mono text-xs text-acid-ink/60 sm:shrink-0">
              {/* phones: the date alone (the title already says which page); the address joins it from sm up */}
              <span aria-hidden className={k.at > 0 ? 'hidden sm:inline' : ''}>
                {k.path}
              </span>
              {k.at > 0 && (
                <>
                  <span aria-hidden className="hidden sm:inline"> · </span>
                  {/* "guardada 03/11, 05:08": how old the copy that opens without signal is */}
                  <span className="sr-only">, </span>guardada{' '}
                  <time dateTime={new Date(k.at).toISOString()}>{when.format(k.at).replace(', ', ' às ')}</time>
                </>
              )}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
