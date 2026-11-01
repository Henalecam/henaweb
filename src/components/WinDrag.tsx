'use client';

import { useEffect } from 'react';

/** The floating window a title bar belongs to: a dialog, or a window pinned to the screen (position: fixed). */
function floating(bar: Element): HTMLElement | null {
  const win = bar.closest<HTMLElement>('.win');
  if (!win) return null;
  if (win instanceof HTMLDialogElement && win.open) return win;
  for (const el of [win, win.parentElement]) if (el && getComputedStyle(el).position === 'fixed') return el;
  return null;
}

/**
 * Like real Windows 95, the site's floating windows (the search, the shortcuts help, the full-page capture, the
 * * cookie notice, the copy fallback) move by their title bar: grab it with the mouse and
 * drag. The window keeps inside the screen, and a dialog comes back centred the next time it opens.
 * Mouse only: on touch the bar stays a bar, and in-page windows never move.
 */
export default function WinDrag() {
  useEffect(() => {
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      const bar = (e.target as Element | null)?.closest?.('.win-bar');
      if (!bar || (e.target as Element).closest('button, a, input, select, textarea, [role="button"]')) return;
      const win = floating(bar);
      if (!win) return;
      e.preventDefault();
      const r = win.getBoundingClientRect();
      const dx = e.clientX - r.left;
      const dy = e.clientY - r.top;
      // pin it where it is in plain left/top, so whatever centred it (margins, translate) stops mattering
      Object.assign(win.style, { inset: 'auto', left: `${r.left}px`, top: `${r.top}px`, margin: '0', translate: 'none', transform: 'none' });
      win.dataset.dragging = '';
      const move = (ev: PointerEvent) => {
        const barH = bar.getBoundingClientRect().height;
        const x = Math.min(innerWidth - 48, Math.max(48 - r.width, ev.clientX - dx));
        const y = Math.min(innerHeight - barH, Math.max(0, ev.clientY - dy));
        win.style.left = `${x}px`;
        win.style.top = `${y}px`;
      };
      const up = () => {
        delete win.dataset.dragging;
        removeEventListener('pointermove', move);
        removeEventListener('pointerup', up);
        removeEventListener('pointercancel', up);
      };
      addEventListener('pointermove', move);
      addEventListener('pointerup', up);
      addEventListener('pointercancel', up);
      // a dialog that was moved reopens centred, where its own styles put it
      if (win instanceof HTMLDialogElement && !win.dataset.dragReset) {
        win.dataset.dragReset = '';
        win.addEventListener(
          'close',
          () => {
            for (const p of ['inset', 'left', 'top', 'margin', 'translate', 'transform']) win.style.removeProperty(p);
            delete win.dataset.dragReset;
          },
          { once: true },
        );
      }
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, []);
  return null;
}
