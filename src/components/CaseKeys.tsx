'use client';

import { useEffect } from 'react';

/**
 * ← / → walk through the case files, like flipping folders in a cabinet. On touch screens a firm
 * horizontal swipe does the same; swipes that start near the screen edges are left alone (that's
 * the browser's own back/forward gesture), as are vertical-ish drags and anything inside a dialog.
 */
export default function CaseKeys({ prev, next }: { prev: string; next: string }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
      const t = e.target as HTMLElement | null;
      if (t?.closest('input, textarea, select, [contenteditable="true"], [role="tablist"], dialog[open]')) return;
      if (document.querySelector('dialog[open]') || 'konami' in document.documentElement.dataset) return;
      e.preventDefault();
      window.location.href = e.key === 'ArrowLeft' ? prev : next;
    };
    let start: { x: number; y: number; t: number } | null = null;
    const onStart = (e: TouchEvent) => {
      const p = e.touches[0];
      const edge = 32;
      start =
        e.touches.length === 1 && p.clientX > edge && p.clientX < window.innerWidth - edge && !document.querySelector('dialog[open]')
          ? { x: p.clientX, y: p.clientY, t: e.timeStamp }
          : null;
    };
    const onEnd = (e: TouchEvent) => {
      if (!start) return;
      const p = e.changedTouches[0];
      const dx = p.clientX - start.x;
      const dy = p.clientY - start.y;
      const quick = e.timeStamp - start.t < 700;
      start = null;
      if (!quick || Math.abs(dx) < 100 || Math.abs(dx) < Math.abs(dy) * 2.5) return;
      // finger moving left reveals the next file, like turning a page
      window.location.href = dx < 0 ? next : prev;
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchend', onEnd);
    };
  }, [prev, next]);
  return null;
}
