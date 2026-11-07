'use client';

import { useEffect, useRef, useState } from 'react';

type Peek = { dir: 'next' | 'prev'; progress: number };

/**
 * ← / → walk through the case files, like flipping folders in a cabinet. On touch screens a firm
 * horizontal swipe does the same; swipes that start near the screen edges are left alone (that's
 * the browser's own back/forward gesture), as are vertical-ish drags and anything inside a dialog.
 * While the finger drags sideways, the file it leads to slides in from that edge as a folder tab
 * ("Próximo caso: Scheduly"), saying "solte para abrir" once the drag is far enough, so the swipe
 * is never a blind gesture.
 */
export default function CaseKeys({
  prev,
  next,
  prevName,
  nextName,
  noun = 'caso',
}: {
  prev: string;
  next: string;
  prevName: string;
  nextName: string;
  /** what is being flipped through, for the tab's label ("Próximo caso", "Próximo serviço") */
  noun?: 'caso' | 'serviço';
}) {
  const [peek, setPeek] = useState<Peek | null>(null);
  const raf = useRef(0);

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
    const DIST = 100;
    let start: { x: number; y: number; t: number } | null = null;
    const onStart = (e: TouchEvent) => {
      const p = e.touches[0];
      const edge = 32;
      start =
        e.touches.length === 1 && p.clientX > edge && p.clientX < window.innerWidth - edge && !document.querySelector('dialog[open]')
          ? { x: p.clientX, y: p.clientY, t: e.timeStamp }
          : null;
    };
    const onMove = (e: TouchEvent) => {
      if (!start) return;
      const p = e.touches[0];
      const dx = p.clientX - start.x;
      const dy = p.clientY - start.y;
      // only a clearly sideways drag shows the tab; scrolling the page shows nothing
      const sideways = Math.abs(dx) > 24 && Math.abs(dx) > Math.abs(dy) * 2.5;
      cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() =>
        setPeek(sideways ? { dir: dx < 0 ? 'next' : 'prev', progress: Math.min(1, Math.abs(dx) / DIST) } : null),
      );
    };
    const onEnd = (e: TouchEvent) => {
      cancelAnimationFrame(raf.current);
      setPeek(null);
      if (!start) return;
      const p = e.changedTouches[0];
      const dx = p.clientX - start.x;
      const dy = p.clientY - start.y;
      const quick = e.timeStamp - start.t < 700;
      start = null;
      if (!quick || Math.abs(dx) < DIST || Math.abs(dx) < Math.abs(dy) * 2.5) return;
      // finger moving left reveals the next file, like turning a page
      window.location.href = dx < 0 ? next : prev;
    };
    const onCancel = () => {
      start = null;
      setPeek(null);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onStart, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd, { passive: true });
    window.addEventListener('touchcancel', onCancel, { passive: true });
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onStart);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
      window.removeEventListener('touchcancel', onCancel);
    };
  }, [prev, next]);

  if (!peek) return null;
  const ready = peek.progress >= 1;
  const isNext = peek.dir === 'next';
  return (
    <div
      aria-hidden
      data-swipe-peek={peek.dir}
      data-ready={ready ? '' : undefined}
      className={`swipe-peek pointer-events-none fixed top-1/2 z-[65] w-44 -translate-y-1/2 border-[3px] border-toon px-3 py-2.5 font-mono text-xs text-acid-ink ${
        isNext ? 'right-0 rounded-l-xl border-r-0' : 'left-0 rounded-r-xl border-l-0'
      } ${ready ? 'bg-acid' : 'bg-paper'}`}
      style={{ translate: `${(isNext ? 1 : -1) * (1 - peek.progress) * 100}% -50%` }}
    >
      <span className="block text-[0.65rem] tracking-[0.12em] text-acid-ink/70 uppercase">{isNext ? `Próximo ${noun} →` : `← ${noun === 'caso' ? 'Caso' : 'Serviço'} anterior`}</span>
      <span className="mt-0.5 block truncate text-sm font-bold">{isNext ? nextName : prevName}</span>
      <span className="mt-1 block text-[0.65rem]">{ready ? 'solte para abrir' : 'continue arrastando'}</span>
    </div>
  );
}
