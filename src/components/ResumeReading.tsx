'use client';

import { useEffect, useState } from 'react';
import WinClose from './WinClose';

const KEY = 'hena:resume';
const WEEK = 7 * 24 * 3600 * 1000;
const NAMES: Record<string, string> = {
  clientes: 'Clientes',
  capacidades: 'Capacidades',
  caso: 'O mistério',
  govtech: 'Setor público',
  projetos: 'Casos',
  processo: 'Processo',
  studio: 'Studio',
  perguntas: 'Perguntas',
  contato: 'Contato',
};

/** The home section under the middle of the screen right now. */
function sectionHere(): string | null {
  const mid = innerHeight / 2;
  for (const id of Object.keys(NAMES)) {
    const r = document.getElementById(id)?.getBoundingClientRect();
    if (r && r.top <= mid && r.bottom >= mid) return id;
  }
  return null;
}

/**
 * The home is a long read. Leave it halfway (close the tab, come back tomorrow) and the next visit offers to pick
 * up where you stopped: a small "continuar_leitura.exe" window names the section ("Processo") and glides there on
 * a click. Kept in this browser only (localStorage, a week at most), never on a reload or a link to a section,
 * never near the top or the very end, and it closes itself after a few seconds if ignored.
 */
export default function ResumeReading() {
  const [at, setAt] = useState<string | null>(null);

  useEffect(() => {
    // remember: the section in view when the visitor leaves (not the pixel offset: the layout may differ next time)
    const save = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const id = sectionHere();
      try {
        if (id && scrollY > innerHeight * 1.5 && scrollY < max * 0.92) localStorage.setItem(KEY, JSON.stringify({ id, t: Date.now() }));
        else if (scrollY < innerHeight) localStorage.removeItem(KEY);
      } catch {}
    };
    const onHide = () => document.visibilityState === 'hidden' && save();
    addEventListener('pagehide', save);
    document.addEventListener('visibilitychange', onHide);

    // offer: only on a fresh arrival at the top of the page
    let timer = 0;
    try {
      const nav = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
      const saved = JSON.parse(localStorage.getItem(KEY) ?? 'null') as { id: string; t: number } | null;
      if (saved && NAMES[saved.id] && Date.now() - saved.t < WEEK && nav?.type === 'navigate' && !location.hash && scrollY < 200) {
        timer = window.setTimeout(() => scrollY < 200 && setAt(saved.id), 1800);
      }
    } catch {}
    return () => {
      clearTimeout(timer);
      removeEventListener('pagehide', save);
      document.removeEventListener('visibilitychange', onHide);
    };
  }, []);

  // ignored, it goes away on its own; scrolling down on one's own also answers it
  useEffect(() => {
    if (!at) return;
    const t = window.setTimeout(() => setAt(null), 12000);
    const onScroll = () => scrollY > innerHeight && setAt(null);
    addEventListener('scroll', onScroll, { passive: true });
    return () => {
      clearTimeout(t);
      removeEventListener('scroll', onScroll);
    };
  }, [at]);

  if (!at) return null;
  const go = () => {
    const el = document.getElementById(at);
    setAt(null);
    if (!el) return;
    const y = el.getBoundingClientRect().top + scrollY - 80;
    const handled = !window.dispatchEvent(new CustomEvent('hena:glide', { detail: y, cancelable: true }));
    if (!handled) window.scrollTo({ top: y, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };
  return (
    <div role="dialog" aria-label="Continuar a leitura" data-resume className="resume-pop win fixed bottom-20 left-1/2 z-[56] w-[min(calc(100vw-2rem),21rem)] -translate-x-1/2 text-acid-ink md:bottom-6">
      <div className="win-bar">
        <span>continuar_leitura.exe</span>
        <WinClose onClick={() => setAt(null)} label="Fechar: começar do início" className="ml-auto" />
      </div>
      <div className="m-1.5 flex items-center justify-between gap-3 border-2 border-[#7d7394] bg-paper px-3 py-2.5">
        <p className="text-sm leading-snug">
          Você parou em <strong>{NAMES[at]}</strong>.
        </p>
        <button type="button" onClick={go} className="toon-sm toon-press shrink-0 rounded-full bg-acid px-3.5 py-1.5 text-sm font-medium">
          Continuar ↓
        </button>
      </div>
    </div>
  );
}
