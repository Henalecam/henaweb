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
  for (const s of list)
    document.querySelectorAll<HTMLElement>(`[data-read-mark="${s}"]`).forEach((el) => {
      el.removeAttribute('hidden');
      // a link named with aria-labelledby ignores its own text, so the revealed mark joins its description
      // (referencing it while hidden would have read "investigado" for unread cases too)
      const link = el.closest<HTMLElement>('a[aria-describedby]');
      if (link && el.id && !link.getAttribute('aria-describedby')!.split(' ').includes(el.id))
        link.setAttribute('aria-describedby', `${link.getAttribute('aria-describedby')} ${el.id}`);
    });
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
  // the empty-filter notice (CasesEmpty) can switch "só os que faltam" back off
  useEffect(() => {
    const showAll = () => setOnlyUnread(false);
    window.addEventListener('hena:show-read', showAll);
    return () => window.removeEventListener('hena:show-read', showAll);
  }, []);

  if (!read.length) return null;
  const all = read.length === slugs.length;
  return (
    <p className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-ink/75">
      <span aria-hidden className="inline-flex gap-1">
        {slugs.map((s) => (
          <span key={s} data-dot={read.includes(s) ? 'on' : ''} className={`inline-block size-2 rounded-full ${read.includes(s) ? 'bg-acid' : 'bg-ink/25'}`} />
        ))}
      </span>
      <span>
        {all ? (
          <>
            Arquivo completo: você investigou todos os casos. Próximo passo, o seu:{' '}
            {/* the whole archive read is the warmest moment to ask: the sentence now leads straight to the form */}
            <a href="/#contato" className="font-medium text-acid underline underline-offset-2 hover:text-ink">
              abrir o seu caso <span aria-hidden>→</span>
            </a>
          </>
        ) : (
          `Você já investigou ${read.length} de ${slugs.length} casos.`
        )}
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
          document.querySelectorAll<HTMLElement>('[data-read-mark]').forEach((el) => {
            el.setAttribute('hidden', '');
            const link = el.closest<HTMLElement>('a[aria-describedby]');
            if (link && el.id)
              link.setAttribute('aria-describedby', link.getAttribute('aria-describedby')!.split(' ').filter((x) => x !== el.id).join(' '));
          });
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
  // once every case on screen was read, "ainda não leu" would be a promise the button can't keep:
  // it then offers a re-read (the filter and "só os que faltam" change what is on screen, so re-check then)
  const [allRead, setAllRead] = useState(false);
  useEffect(() => {
    const check = () => {
      const visible = [...document.querySelectorAll<HTMLElement>('li[data-case-slug]:not([hidden])')].map((li) => li.dataset.caseSlug!);
      const read = readList();
      setAllRead(visible.length > 0 && visible.every((s) => read.includes(s)));
    };
    check();
    const list = document.querySelector('li[data-case-slug]')?.parentElement;
    if (!list) return;
    const obs = new MutationObserver(check);
    obs.observe(list, { subtree: true, attributes: true, attributeFilter: ['hidden'] });
    return () => obs.disconnect();
  }, []);

  // a real roll: the die spins and the drawn card lights up on screen for a beat before the page opens
  // (reduced motion: straight to the case)
  const [rolling, setRolling] = useState(false);
  // coming back with the browser's back button restores this page as it was left: undo the roll
  useEffect(() => {
    const reset = (e: PageTransitionEvent) => {
      if (!e.persisted) return;
      setRolling(false);
      document.querySelectorAll('li[data-picked]').forEach((li) => li.removeAttribute('data-picked'));
    };
    window.addEventListener('pageshow', reset);
    return () => window.removeEventListener('pageshow', reset);
  }, []);
  const go = () => {
    if (rolling) return;
    const visible = [...document.querySelectorAll<HTMLElement>('li[data-case-slug]:not([hidden])')].map((li) => li.dataset.caseSlug!);
    if (!visible.length) return;
    const read = readList();
    const pool = visible.filter((s) => !read.includes(s));
    const from = pool.length ? pool : visible;
    const pick = from[Math.floor(Math.random() * from.length)];
    const open = () => (location.href = `/casos/${pick}`);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return open();
    setRolling(true);
    const li = document.querySelector<HTMLElement>(`li[data-case-slug="${pick}"]`);
    li?.setAttribute('data-picked', '');
    li?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    window.setTimeout(open, 1150);
  };
  return (
    <button
      type="button"
      onClick={go}
      data-print-hide
      className="label mt-4 inline-flex min-h-9 items-center gap-2 !text-ink/80 underline underline-offset-4 hover:!text-acid"
    >
      <span aria-hidden className={`inline-block ${rolling ? 'animate-[dice-roll_0.8s_cubic-bezier(0.2,0.8,0.2,1)]' : ''}`}>
        🎲
      </span>{' '}
      {rolling ? 'Sorteando…' : allRead ? 'Sortear um caso para reler' : 'Sortear um caso que você ainda não leu'}
    </button>
  );
}

/**
 * /casos: when "só os que faltam" and the service filter together leave no card on screen, the grid used
 * to just vanish. This notice is shown by CSS (globals.css, `[data-case-empty]`) only in that case.
 */
export function CasesEmpty() {
  return (
    <p data-case-empty data-print-hide className="mt-10 rounded-2xl border-2 border-dashed border-ink/30 px-6 py-8 text-center font-mono text-sm text-ink/80">
      Nada em aberto aqui: você já investigou todos os casos deste filtro.{' '}
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event('hena:show-read'))}
        className="min-h-8 font-medium text-acid underline underline-offset-2 hover:text-ink"
      >
        Mostrar os já lidos
      </button>
    </p>
  );
}

/**
 * Home case index, for a returning visitor: "Você já investigou 3 de 7 · próximo sem ler: Scheduly →".
 * Nothing for a first visit, and nothing once every case was read (the archive page congratulates then).
 */
export function ResumeReading({ cases }: { cases: { slug: string; name: string }[] }) {
  const [state, setState] = useState<{ n: number; next: { slug: string; name: string } } | null>(null);
  useEffect(() => {
    const read = new Set(readList());
    const n = cases.filter((c) => read.has(c.slug)).length;
    const next = cases.find((c) => !read.has(c.slug));
    if (n > 0 && next) setState({ n, next });
    // the list is static (built from the case data); a new array on each parent render must not re-run this
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cases.length]);
  if (!state) return null;
  return (
    <p className="mt-3 font-mono text-sm text-ink/75" data-print-hide>
      Você já investigou {state.n} de {cases.length}. Próximo sem ler:{' '}
      <a href={`/casos/${state.next.slug}`} className="text-acid underline underline-offset-4 hover:text-ink">
        {state.next.name} →
      </a>
    </p>
  );
}
