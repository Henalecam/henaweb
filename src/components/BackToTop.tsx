'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * "↑ topo" for the long pages (the home is ~20 screens). It only shows up when the visitor is far down AND
 * scrolling back up on purpose (the gesture of someone heading for the top), and hides again on the way
 * down or near the top, so it never sits on the page while reading. One tap glides up (the smooth
 * scroller's own glide; instant with reduced motion) and puts focus at the start of the content.
 */
export default function BackToTop() {
  const [show, setShow] = useState(false);
  const up = useRef(0);
  const last = useRef(0);

  useEffect(() => {
    last.current = scrollY;
    let raf = 0;
    const check = () => {
      raf = 0;
      const y = scrollY;
      const dy = y - last.current;
      last.current = y;
      up.current = dy < 0 ? up.current - dy : 0;
      if (y < innerHeight * 1.5 || dy > 4) setShow(false);
      else if (y > innerHeight * 3 && up.current > 160) setShow(true);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('scroll', onScroll);
    };
  }, []);

  const go = () => {
    setShow(false);
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    // SmoothScroll (Lenis) glides when it is running and cancels the event; otherwise the browser scrolls
    const handled = !window.dispatchEvent(new CustomEvent('hena:glide', { detail: 0, cancelable: true }));
    if (!handled) scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    document.querySelector<HTMLElement>('#conteudo, main')?.focus({ preventScroll: true });
  };

  return (
    <button
      type="button"
      onClick={go}
      data-print-hide
      data-back-top={show ? 'on' : 'off'}
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className="toon-sm toon-press fixed bottom-[max(1rem,env(safe-area-inset-bottom))] left-4 z-[55] flex h-11 items-center gap-1.5 rounded-full bg-paper px-4 font-mono text-xs text-acid-ink md:right-6 md:bottom-6 md:left-auto"
    >
      <span aria-hidden>↑</span> topo
      <span className="sr-only"> da página</span>
    </button>
  );
}
