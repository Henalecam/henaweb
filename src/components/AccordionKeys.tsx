'use client';

import { useEffect } from 'react';

const TRIGGERS = ':scope > details > summary, :scope > li > h3 > button[aria-expanded]';

/**
 * The accordion keys of the WAI-ARIA pattern for every question list and the capability rows ([data-acc]):
 * with focus on one question, ↑/↓ move to the previous/next and Home/End to the first/last, instead of tabbing
 * through each answer's links. Enter/Space still open and close, as before. Hidden rows (a filter) are skipped.
 */
export default function AccordionKeys() {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey || e.shiftKey) return;
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
      const t = e.target as HTMLElement | null;
      const group = t?.closest<HTMLElement>('[data-acc]');
      if (!t || !group) return;
      const list = [...group.querySelectorAll<HTMLElement>(TRIGGERS)].filter((el) => el.offsetParent !== null);
      const pos = list.indexOf(t);
      if (pos < 0) return;
      const last = list.length - 1;
      const next = { ArrowDown: pos === last ? 0 : pos + 1, ArrowUp: pos === 0 ? last : pos - 1, Home: 0, End: last }[e.key]!;
      e.preventDefault();
      const el = list[next];
      el.focus({ preventScroll: true });
      // keep the newly focused question in view without the whole page jumping to centre it
      const r = el.getBoundingClientRect();
      if (r.top < 80 || r.bottom > innerHeight - 40) {
        el.scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  return null;
}
