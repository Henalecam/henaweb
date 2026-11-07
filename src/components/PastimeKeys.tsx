'use client';

import { useEffect } from 'react';

/**
 * /passatempo: the cabinets are labelled P1, P2, P3 on their screens, so the number keys pick them, like
 * a player stepping up to a machine. The key only focuses the cabinet (the coin drops, via :focus-visible);
 * opening the game stays on Enter, as with the roulette.
 */
export default function PastimeKeys() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      const n = Number(e.key);
      if (!Number.isInteger(n) || n < 1) return;
      const t = e.target as HTMLElement | null;
      if (t?.closest('input, textarea, select, [contenteditable="true"]') || document.querySelector('dialog[open]')) return;
      const link = document.querySelectorAll<HTMLAnchorElement>('li[data-pastime-slug] a[target="_blank"]')[n - 1];
      if (!link) return;
      e.preventDefault();
      link.focus({ preventScroll: true });
      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      link.scrollIntoView({ block: 'center', behavior: smooth ? 'smooth' : 'auto' });
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  return null;
}
