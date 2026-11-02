'use client';

import { useEffect, useState } from 'react';

type Kept = { path: string; title: string };

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
          const html = (await (await cache.match(req))?.text()) ?? '';
          const title = html.match(/<title>([^<]*)<\/title>/)?.[1]?.replace(/&amp;/g, '&').replace(/ · HenaWeb$/, '') ?? path;
          out.push({ path, title: path === '/' ? 'Página inicial' : title });
        }
        setKept(out);
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
          <a href={k.path} className="toon-sm toon-press flex min-h-11 items-center justify-between gap-3 rounded-xl bg-white px-4 py-2 font-medium">
            <span className="truncate">{k.title}</span>
            <span aria-hidden className="shrink-0 font-mono text-xs text-acid-ink/60">
              {k.path}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
