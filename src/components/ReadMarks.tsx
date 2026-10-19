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
    const before = readList();
    // badges reflect what was read before this visit: the current case marking itself would be noise
    revealMarks(before);
    try {
      if (!before.includes(slug)) localStorage.setItem(KEY, JSON.stringify([...before, slug]));
    } catch {}
  }, [slug]);
  return null;
}

function revealMarks(list: string[]) {
  for (const s of list) document.querySelectorAll<HTMLElement>(`[data-read-mark="${s}"]`).forEach((el) => el.removeAttribute('hidden'));
}

/**
 * Under the prev/next links of a case: when both neighbours were already read, point at the first
 * case still unread, so a visitor going through the archive never loops over the same two.
 */
export function UnreadHint({ cases, current }: { cases: { slug: string; name: string }[]; current: string }) {
  const [hint, setHint] = useState<{ slug: string; name: string } | null>(null);
  useEffect(() => {
    const read = new Set([...readList(), current]);
    const i = cases.findIndex((c) => c.slug === current);
    const prev = cases[(i - 1 + cases.length) % cases.length];
    const next = cases[(i + 1) % cases.length];
    if (!read.has(prev.slug) || !read.has(next.slug)) return;
    // the first unread one going forward, wrapping around
    const rest = [...cases.slice(i + 1), ...cases.slice(0, i)];
    setHint(rest.find((c) => !read.has(c.slug)) ?? null);
  }, [cases, current]);
  if (!hint) return null;
  return (
    <p className="mt-4 text-center font-mono text-sm text-ink/75" data-print-hide>
      Ainda sem investigar:{' '}
      <a href={`/casos/${hint.slug}`} className="text-acid underline underline-offset-4 hover:text-ink">
        {hint.name} →
      </a>
    </p>
  );
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
    revealMarks(list);
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
