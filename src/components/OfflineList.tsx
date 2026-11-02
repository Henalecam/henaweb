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

  if (kept === null) return <p className="mt-5 font-mono text-sm text-acid-ink/70">Procurando no arquivo…</p>;
  if (!kept.length) return <p className="mt-5 font-mono text-sm text-acid-ink/70">Nenhuma página guardada ainda.</p>;
  return (
    <ul className="mt-5 flex flex-col gap-2">
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
