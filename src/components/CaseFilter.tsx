'use client';

import { useEffect, useState } from 'react';

type Option = { slug: string; name: string; count: number };

/**
 * Service chips above the case grid. Filters the server-rendered cards in place (no re-render of the
 * list), keeps the choice in ?servico= so a filtered archive can be shared, and lets the cards glide
 * to their new places with a same-document view transition where supported.
 */
export default function CaseFilter({ options, total }: { options: Option[]; total: number }) {
  const [active, setActive] = useState<string | null>(null);

  const apply = (slug: string | null, animate: boolean) => {
    const cards = [...document.querySelectorAll<HTMLElement>('[data-case-service]')];
    const update = () => {
      cards.forEach((li) => {
        li.hidden = !!slug && li.dataset.caseService !== slug;
      });
      setActive(slug);
    };
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } };
    if (!animate || reduce || !doc.startViewTransition) return update();
    // each card gets a name only for the duration of the transition (the case-page morph assigns its own)
    cards.forEach((li) => (li.style.viewTransitionName = `filtro-${li.dataset.caseSlug}`));
    doc.startViewTransition(update).finished.finally(() => cards.forEach((li) => (li.style.viewTransitionName = '')));
  };

  useEffect(() => {
    const slug = new URLSearchParams(location.search).get('servico');
    if (slug && options.some((o) => o.slug === slug)) apply(slug, false);
  }, []);

  // the cards change silently for screen readers: say how many are now listed (only after a choice, not on load)
  const [announce, setAnnounce] = useState('');

  const choose = (slug: string | null) => {
    const url = new URL(location.href);
    if (slug) url.searchParams.set('servico', slug);
    else url.searchParams.delete('servico');
    history.replaceState(null, '', url);
    apply(slug, true);
    const o = options.find((x) => x.slug === slug);
    setAnnounce(o ? `Mostrando ${o.count} ${o.count === 1 ? 'caso' : 'casos'} de ${o.name}.` : `Mostrando todos os ${total} casos.`);
  };

  const chip = (on: boolean) =>
    `toon-sm rounded-full px-4 py-2 text-sm font-medium transition-colors ${on ? 'bg-acid text-acid-ink' : 'bg-paper text-acid-ink hover:bg-lemon'}`;

  return (
    <div role="group" aria-label="Filtrar casos por serviço" className="mt-10 flex flex-wrap gap-2" data-print-hide>
      <button type="button" aria-pressed={active === null} onClick={() => choose(null)} className={chip(active === null)}>
        Todos <span className="font-mono text-xs">({total})</span>
      </button>
      {options.map((o) => (
        <button key={o.slug} type="button" aria-pressed={active === o.slug} onClick={() => choose(o.slug)} className={chip(active === o.slug)}>
          {o.name} <span className="font-mono text-xs">({o.count})</span>
        </button>
      ))}
      <p className="sr-only" aria-live="polite">
        {announce}
      </p>
    </div>
  );
}
