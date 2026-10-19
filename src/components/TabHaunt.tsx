'use client';

import { useEffect } from 'react';

const AWAY = '👻 Volte! O caso ainda não acabou';
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

/**
 * "Modo lanterna": the lights go out and the pointer becomes a detective's flashlight. A CSS
 * radial mask over a dark layer, pointer-events none, so the page stays fully usable. Esc or the
 * code again turns the lights back on.
 */
function toggleFlashlight() {
  const existing = document.getElementById('lanterna');
  if (existing) {
    existing.remove();
    return;
  }
  const el = document.createElement('div');
  el.id = 'lanterna';
  el.setAttribute('aria-hidden', 'true');
  el.dataset.printHide = '';
  Object.assign(el.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '95',
    pointerEvents: 'none',
    background: 'radial-gradient(circle 170px at var(--lx, 50%) var(--ly, 40%), transparent 0 60%, rgb(6 3 16 / 0.94) 100%)',
  });
  document.body.appendChild(el);
  const move = (e: PointerEvent) => {
    el.style.setProperty('--lx', `${e.clientX}px`);
    el.style.setProperty('--ly', `${e.clientY}px`);
  };
  const off = (e: KeyboardEvent) => {
    if (e.key !== 'Escape') return;
    el.remove();
  };
  window.addEventListener('pointermove', move, { passive: true });
  window.addEventListener('keydown', off);
  new MutationObserver((_, obs) => {
    if (el.isConnected) return;
    window.removeEventListener('pointermove', move);
    window.removeEventListener('keydown', off);
    obs.disconnect();
  }).observe(document.body, { childList: true });
}

/** The tab gets haunted while the visitor is away; a note (and a Konami code) waits in the console for curious devs. */
export default function TabHaunt() {
  useEffect(() => {
    let original = document.title;
    const onVisibility = () => {
      if (document.hidden) {
        original = document.title;
        document.title = AWAY;
      } else if (document.title === AWAY) {
        document.title = original;
      }
    };
    document.addEventListener('visibilitychange', onVisibility);

    // the Konami code turns the site into a flashlight search; the console hints at it
    let progress = 0;
    const onKey = (e: KeyboardEvent) => {
      const typing = (e.target as HTMLElement | null)?.closest?.('input, textarea, select, [contenteditable="true"]');
      if (typing) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      progress = key === KONAMI[progress] ? progress + 1 : key === KONAMI[0] ? 1 : 0;
      // mid-code (after ↑ ↑) other arrow shortcuts, like ← → between cases, stand down
      if (progress >= 2) document.documentElement.dataset.konami = '';
      else delete document.documentElement.dataset.konami;
      if (progress === KONAMI.length) {
        progress = 0;
        delete document.documentElement.dataset.konami;
        toggleFlashlight();
      }
    };
    window.addEventListener('keydown', onKey);

    console.log(
      '%cHenaWeb%c\nInvestigando o código? A gente gosta de gente curiosa.\nhenrique@henaweb.com\n\nPista: ↑ ↑ ↓ ↓ ← → ← → B A apaga as luzes.',
      'font: 700 28px Georgia, serif; color: #f7931e; text-shadow: 3px 3px 0 #140a26;',
      'font: 13px monospace; color: #3cc6b4;',
    );

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  return null;
}
