'use client';

import { useEffect, useState } from 'react';

const KEY = 'hena:read';

function readList(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    return Array.isArray(v) ? v.filter((s) => typeof s === 'string') : [];
  } catch {
    return [];
  }
}

/** On a case page: file this case as "investigated" in the visitor's own browser (nothing leaves it). */
export function MarkRead({ slug }: { slug: string }) {
  useEffect(() => {
    try {
      const list = readList();
      if (!list.includes(slug)) localStorage.setItem(KEY, JSON.stringify([...list, slug]));
    } catch {}
  }, [slug]);
  return null;
}

/**
 * On /casos: stamps "✓ investigado" on the window bars of the cases already read and shows how far
 * the visitor got through the archive. Renders nothing for a first-time visitor.
 */
export function ReadProgress({ slugs }: { slugs: string[] }) {
  const [read, setRead] = useState<string[]>([]);
  useEffect(() => {
    const list = readList().filter((s) => slugs.includes(s));
    setRead(list);
    for (const s of list) document.querySelector<HTMLElement>(`[data-read-mark="${s}"]`)?.removeAttribute('hidden');
  }, [slugs]);

  if (!read.length) return null;
  const all = read.length === slugs.length;
  return (
    <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink/75">
      <span aria-hidden className="inline-flex gap-1">
        {slugs.map((s) => (
          <span key={s} className={`inline-block size-2 rounded-full ${read.includes(s) ? 'bg-acid' : 'bg-ink/25'}`} />
        ))}
      </span>
      <span>
        {all ? 'Arquivo completo: você investigou todos os casos. Próximo passo, o seu.' : `Você já investigou ${read.length} de ${slugs.length} casos.`}
      </span>
      <button
        type="button"
        onClick={() => {
          try {
            localStorage.removeItem(KEY);
          } catch {}
          document.querySelectorAll('[data-read-mark]').forEach((el) => el.setAttribute('hidden', ''));
          setRead([]);
        }}
        className="min-h-8 underline underline-offset-2 hover:text-ink"
      >
        limpar
      </button>
    </p>
  );
}
