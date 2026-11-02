'use client';

import { useEffect, useState } from 'react';

import { CASE_VIEW_KEY as KEY } from '@/lib/caseView';

type View = 'icons' | 'details';

/**
 * /casos: Windows Explorer's "Exibir" switch for the archive. "Ícones grandes" is the usual grid of case windows;
 * "Detalhes" folds it into a dense file listing (number, name, kind, problem), quicker to scan when you already
 * know what you're after. Only the CSS changes (globals.css, [data-view=details]); the remembered choice lives in
 * this browser.
 */
export default function CaseView() {
  // null until mounted: the inline script after the list (caseViewScript) has already applied a saved "Detalhes"
  // before the first paint, so the list must not be touched until the choice is read back from it
  const [view, setView] = useState<View | null>(null);

  useEffect(() => {
    setView(document.querySelector('[data-case-list]')?.getAttribute('data-view') === 'details' ? 'details' : 'icons');
  }, []);

  const apply = (v: View) => {
    const list = document.querySelector<HTMLElement>('[data-case-list]');
    if (!list) return;
    if (v === 'details') list.setAttribute('data-view', 'details');
    else list.removeAttribute('data-view');
  };

  const pick = (v: View) => {
    if (v === view) return;
    setView(v);
    // the cards fold into rows (and back) as one morph: each case keeps a view-transition-name for the swap
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } };
    const cards = [...document.querySelectorAll<HTMLElement>('[data-case-list] > li:not([hidden])')];
    if (!doc.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches || cards.length > 30) apply(v);
    else {
      cards.forEach((li) => (li.style.viewTransitionName = `vista-${li.dataset.caseSlug}`));
      doc.startViewTransition(() => apply(v)).finished.finally(() => cards.forEach((li) => (li.style.viewTransitionName = '')));
    }
    try {
      if (v === 'details') localStorage.setItem(KEY, v);
      else localStorage.removeItem(KEY);
    } catch {}
  };

  return (
    <div role="group" aria-label="Exibir casos como" className="case-view mt-8 flex items-center justify-end gap-2 print:hidden">
      <span aria-hidden className="mr-1 font-mono text-[0.7rem] tracking-[0.2em] text-ink/60 uppercase">
        Exibir
      </span>
      <button type="button" aria-pressed={view === 'icons'} onClick={() => pick('icons')} className="case-view-btn">
        <span aria-hidden className="case-view-ico case-view-ico--grid" />
        Ícones grandes
      </button>
      <button type="button" aria-pressed={view === 'details'} onClick={() => pick('details')} className="case-view-btn">
        <span aria-hidden className="case-view-ico case-view-ico--rows" />
        Detalhes
      </button>
    </div>
  );
}
