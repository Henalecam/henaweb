'use client';

import { useEffect, useState } from 'react';

const KEY = 'hena:case-view';
type View = 'icons' | 'details';

/**
 * /casos: Windows Explorer's "Exibir" switch for the archive. "Ícones grandes" is the usual grid of case windows;
 * "Detalhes" folds it into a dense file listing (number, name, kind, problem), quicker to scan when you already
 * know what you're after. Only the CSS changes (globals.css, [data-view=details]); the remembered choice lives in
 * this browser.
 */
export default function CaseView() {
  const [view, setView] = useState<View>('icons');

  useEffect(() => {
    try {
      if (localStorage.getItem(KEY) === 'details') setView('details');
    } catch {}
  }, []);

  useEffect(() => {
    const list = document.querySelector<HTMLElement>('[data-case-list]');
    if (!list) return;
    if (view === 'details') list.setAttribute('data-view', 'details');
    else list.removeAttribute('data-view');
  }, [view]);

  const pick = (v: View) => {
    setView(v);
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
