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

/** Anywhere else (the home's case index): just show the "read" marks already on the page. */
export function RevealRead() {
  useEffect(() => revealMarks(readList()), []);
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
  // "só os que faltam": folds away the cases already read (a CSS flag, so it composes with the service filter)
  const [onlyUnread, setOnlyUnread] = useState(false);
  useEffect(() => {
    const list = readList().filter((s) => slugs.includes(s));
    setRead(list);
    revealMarks(list);
    document.querySelectorAll<HTMLElement>('li[data-case-slug]').forEach((li) => {
      if (list.includes(li.dataset.caseSlug!)) li.dataset.caseRead = '';
      else delete li.dataset.caseRead;
    });
  }, [slugs]);
  useEffect(() => {
    document.documentElement.toggleAttribute('data-only-unread', onlyUnread);
    return () => document.documentElement.removeAttribute('data-only-unread');
  }, [onlyUnread]);

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
      {!all && (
        <button
          type="button"
          data-print-hide
          aria-pressed={onlyUnread}
          onClick={() => setOnlyUnread((v) => !v)}
          className={`min-h-8 rounded-full border px-2.5 ${onlyUnread ? 'border-acid bg-acid text-acid-ink' : 'border-ink/30 hover:border-ink hover:text-ink'}`}
        >
          {onlyUnread ? '✓ só os que faltam' : 'mostrar só os que faltam'}
        </button>
      )}
      <button
        type="button"
        data-print-hide
        onClick={() => {
          try {
            localStorage.removeItem(KEY);
          } catch {}
          document.querySelectorAll('[data-read-mark]').forEach((el) => el.setAttribute('hidden', ''));
          document.querySelectorAll<HTMLElement>('li[data-case-read]').forEach((li) => delete li.dataset.caseRead);
          setOnlyUnread(false);
          setRead([]);
        }}
        className="min-h-8 underline underline-offset-2 hover:text-ink"
      >
        limpar
      </button>
    </p>
  );
}

/**
 * Arriving from a filtered archive (/casos?servico=…), the "Casos" breadcrumb returns to that same
 * filtered list instead of the full one.
 */
export function ArchiveReturn() {
  useEffect(() => {
    try {
      const ref = document.referrer ? new URL(document.referrer) : null;
      if (!ref || ref.origin !== location.origin || ref.pathname !== '/casos' || !ref.search) return;
      document.querySelectorAll<HTMLAnchorElement>('a[data-archive-link]').forEach((a) => (a.href = ref.pathname + ref.search));
    } catch {}
  }, []);
  return null;
}

/**
 * "Sortear um caso": opens a random case the visitor hasn't read yet (any case once all were read),
 * picked among the ones the archive filter is currently showing.
 */
export function RandomCase() {
  const go = () => {
    const visible = [...document.querySelectorAll<HTMLElement>('li[data-case-slug]:not([hidden])')].map((li) => li.dataset.caseSlug!);
    if (!visible.length) return;
    const read = readList();
    const pool = visible.filter((s) => !read.includes(s));
    const from = pool.length ? pool : visible;
    location.href = `/casos/${from[Math.floor(Math.random() * from.length)]}`;
  };
  return (
    <button
      type="button"
      onClick={go}
      data-print-hide
      className="label mt-4 inline-flex min-h-9 items-center gap-2 !text-ink/80 underline underline-offset-4 hover:!text-acid"
    >
      <span aria-hidden>🎲</span> Sortear um caso que você ainda não leu
    </button>
  );
}
