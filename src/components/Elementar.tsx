'use client';

import { useEffect, useState } from 'react';

const WORD = 'elementar';

/**
 * A detective's easter egg: typing "elementar" anywhere on the page (outside a form field) gets the classic
 * reply in a small Win95 note at the corner. No hint anywhere but the console kit's help; it just rewards the
 * curious. Closes itself after a few seconds; the text is announced to screen readers too.
 */
export default function Elementar() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let typed = '';
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (e.ctrlKey || e.metaKey || e.altKey || t?.closest('input, textarea, select, [contenteditable="true"]')) return;
      if (e.key.length !== 1) return;
      typed = (typed + e.key.toLowerCase()).slice(-WORD.length);
      if (typed === WORD) {
        typed = '';
        setShown(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!shown) return;
    const id = window.setTimeout(() => setShown(false), 6000);
    return () => window.clearTimeout(id);
  }, [shown]);

  return (
    <div role="status" className="pointer-events-none fixed top-[4.5rem] right-4 z-[60]" data-print-hide>
      {shown && (
        <div data-elementar className="win w-[min(calc(100vw-2rem),19rem)] text-acid-ink">
          <div className="win-bar">
            <span aria-hidden>pista_secreta.txt</span>
          </div>
          <div className="m-1.5 border-2 border-[#7d7394] bg-paper px-3 py-2.5">
            <p className="font-groovy text-lg leading-tight text-[#c2410c]">Elementar, meu caro.</p>
            <p className="mt-1 text-xs text-acid-ink/80">Você achou uma pista escondida. Detetive que repara em detalhe é bem-vindo por aqui.</p>
          </div>
        </div>
      )}
    </div>
  );
}
