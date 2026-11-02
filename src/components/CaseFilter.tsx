'use client';

import { useEffect, useRef, useState } from 'react';

// same as the /casos metadata title + the layout's "%s · HenaWeb" template
const BASE_TITLE = 'Casos e projetos de software sob medida · HenaWeb';

type Option = { slug: string; name: string; count: number };

/**
 * Service chips above the case grid. Filters the server-rendered cards in place (no re-render of the
 * list), keeps the choice in ?servico= so a filtered archive can be shared, and lets the cards glide
 * to their new places with a same-document view transition where supported.
 */
export default function CaseFilter({
  options,
  total,
  empty = [],
}: {
  options: Option[];
  total: number;
  /** services that exist but have no case in the archive yet: a link to one of them gets a note, not a silent "all" */
  empty?: { slug: string; name: string }[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const [missing, setMissing] = useState<{ slug: string; name: string } | null>(null);
  const wanted = useRef(BASE_TITLE);

  const apply = (slug: string | null, animate: boolean) => {
    const cards = [...document.querySelectorAll<HTMLElement>('[data-case-service]')];
    const update = () => {
      cards.forEach((li) => {
        li.hidden = !!slug && li.dataset.caseService !== slug;
      });
      setActive(slug);
      // the tab (and bookmarks, history) name the filtered archive: "Casos de Automação & IA · HenaWeb"
      const o = options.find((x) => x.slug === slug);
      wanted.current = o ? `Casos de ${o.name} · HenaWeb` : BASE_TITLE;
      document.title = wanted.current;
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
    else if (slug) {
      // a filter that matches nothing (a service with no published case yet, or a stale/mistyped link) used to
      // keep ?servico= in the address while every card showed: drop it, and say why for a real service
      const url = new URL(location.href);
      url.searchParams.delete('servico');
      history.replaceState(history.state, '', url);
      setMissing(empty.find((s) => s.slug === slug) ?? null);
    }
    // React re-asserts the metadata <title> right after hydration, which undid the filtered name on a direct
    // load of /casos?servico=…; put it back whenever the plain archive title comes back while a filter is on
    // (any other title means the visitor is already navigating elsewhere, so leave it alone)
    const el = document.querySelector('title');
    if (!el) return;
    const obs = new MutationObserver(() => {
      if (document.title === BASE_TITLE && wanted.current !== BASE_TITLE) document.title = wanted.current;
    });
    obs.observe(el, { childList: true, characterData: true, subtree: true });
    return () => obs.disconnect();
  }, []);

  // the cards change silently for screen readers: say how many are now listed (only after a choice, not on load)
  const [announce, setAnnounce] = useState('');

  const choose = (slug: string | null) => {
    const url = new URL(location.href);
    if (slug) url.searchParams.set('servico', slug);
    else url.searchParams.delete('servico');
    history.replaceState(null, '', url);
    setMissing(null);
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
      {missing && (
        <p role="status" data-filter-empty className="mt-3 w-full max-w-2xl font-mono text-sm leading-relaxed text-ink/75">
          <span aria-hidden className="text-acid">∅ </span>
          Ainda não há caso de {missing.name} publicado no arquivo, então aqui estão todos os {total}. Sobre esse serviço:{' '}
          <a href={`/servicos/${missing.slug}`} className="text-acid underline decoration-2 underline-offset-4 hover:text-ink">
            {missing.name} →
          </a>
        </p>
      )}
    </div>
  );
}
