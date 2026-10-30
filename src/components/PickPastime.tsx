'use client';

import { useRef, useState } from 'react';
import { pastimes } from '@/lib/pastimes';

/**
 * "Can't decide?": a roulette over the arcade cabinets. The highlight hops from machine to machine,
 * slows down and stops on one, which then gets keyboard focus (opening it stays the visitor's call).
 */
export default function PickPastime() {
  const [label, setLabel] = useState('');
  const busy = useRef(false);

  const spin = () => {
    if (busy.current) return;
    const cards = [...document.querySelectorAll<HTMLElement>('[data-pastime]')];
    if (!cards.length) return;
    busy.current = true;
    cards.forEach((c) => c.removeAttribute('data-picked'));
    const pick = Math.floor(Math.random() * cards.length);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    // a few laps that end on the picked one, each hop a little slower than the last
    const hops = reduce ? 0 : cards.length * 2 + pick;
    let i = 0;
    const land = () => {
      cards.forEach((c) => c.removeAttribute('data-spin'));
      const card = cards[pick];
      card.setAttribute('data-picked', '');
      card.querySelector('a')?.focus({ preventScroll: false });
      setLabel(`Saiu: ${card.dataset.pastime}! Aperte Enter para ${card.dataset.action === 'Jogar' ? 'jogar' : 'abrir'}.`);
      busy.current = false;
    };
    const step = () => {
      cards.forEach((c, k) => c.toggleAttribute('data-spin', k === i % cards.length));
      if (i >= hops) return land();
      i++;
      setTimeout(step, 70 + i * 18);
    };
    if (reduce) land();
    else step();
  };

  return (
    <div className="mt-10 flex flex-wrap items-center gap-4" data-print-hide>
      <button type="button" onClick={spin} className="toon-sm toon-press rounded-full bg-paper px-5 py-2.5 font-medium text-acid-ink">
        <span aria-hidden>🎲 </span>Não sabe qual? Sorteia pra mim
      </button>
      <p role="status" className="font-mono text-sm text-ink/80">
        {label}
      </p>
      {/* PastimeKeys: the number keys step up to P1, P2, P3 (only worth saying where there is a keyboard) */}
      <p aria-hidden className="hidden font-mono text-xs text-ink/65 pointer-fine:block sm:ml-auto">
        ou aperte{' '}
        {pastimes.map((p, i) => (
          <kbd key={p.slug} className="mr-1 rounded border border-ink/40 px-1">
            {i + 1}
          </kbd>
        ))}
        no teclado
      </p>
    </div>
  );
}
