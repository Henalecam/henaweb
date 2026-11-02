'use client';

import { useState } from 'react';

type Key = 'n' | 'name' | 'kind';

/**
 * /casos, "Detalhes" view: the column headers sort the list, like clicking a header in a file manager's details
 * view (again to reverse it). The server-rendered rows are moved in the DOM, so the reading and Tab order follow
 * what is seen; "O mistério" is a sentence, not something to sort by, and stays a plain header. Shown only where
 * the details view has its headers (globals.css, [data-case-cols]).
 */
export default function CaseSort() {
  const [sort, setSort] = useState<{ key: Key; desc: boolean }>({ key: 'n', desc: false });

  const by = (key: Key) => {
    const desc = sort.key === key ? !sort.desc : false;
    setSort({ key, desc });
    const list = document.querySelector<HTMLElement>('[data-case-list]');
    if (!list) return;
    const value = (li: HTMLElement) =>
      key === 'n'
        ? Number(li.dataset.caseN)
        : (li.querySelector(key === 'name' ? 'h2' : '[id^="tipo-"]')?.textContent ?? '').replace('→', '').trim();
    const rows = [...list.querySelectorAll<HTMLElement>(':scope > li[data-case-n]')];
    rows.sort((a, b) => {
      const va = value(a);
      const vb = value(b);
      const c = typeof va === 'number' && typeof vb === 'number' ? va - vb : String(va).localeCompare(String(vb), 'pt-BR');
      return desc ? -c : c;
    });
    const move = () => rows.forEach((li) => list.append(li));
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { finished: Promise<void> } };
    if (!doc.startViewTransition || matchMedia('(prefers-reduced-motion: reduce)').matches) return move();
    rows.forEach((li) => (li.style.viewTransitionName = `ordem-${li.dataset.caseSlug}`));
    doc.startViewTransition(move).finished.finally(() => rows.forEach((li) => (li.style.viewTransitionName = '')));
  };

  const head = (key: Key, label: string, name: string) => {
    const on = sort.key === key;
    return (
      <button
        type="button"
        onClick={() => by(key)}
        aria-label={`Ordenar por ${name}${on ? (sort.desc ? ', decrescente' : ', crescente') : ''}`}
        aria-pressed={on}
        className="case-sort flex min-h-6 items-center gap-1 text-left uppercase hover:text-ink"
      >
        {label}
        <span aria-hidden className={on ? 'text-acid' : 'opacity-0'}>
          {on && sort.desc ? '▼' : '▲'}
        </span>
      </button>
    );
  };

  return (
    <div role="group" aria-label="Ordenar casos" data-case-cols className="hidden">
      <span>{head('n', 'Nº', 'número')}</span>
      <span>{head('name', 'Nome', 'nome')}</span>
      <span>{head('kind', 'Tipo', 'tipo')}</span>
      <span>O mistério</span>
    </div>
  );
}
