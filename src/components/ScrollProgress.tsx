'use client';

import { useEffect, useRef } from 'react';

/**
 * Thin orange-to-teal line at the very top that fills as the page is read. On long pages (the home's
 * eight chapters) it is notched where each section starts, like chapter marks on a video timeline:
 * a notch is a faint tick ahead of the reader and a dark cut once passed.
 */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  const marks = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let max = 1;
    let stops: { el: HTMLElement; at: number }[] = [];

    // section starts as fractions of the scroll range; measured on load and whenever the page height
    // changes (GSAP pin spacers, fonts, lazy images), never on scroll
    const measure = () => {
      max = document.documentElement.scrollHeight - window.innerHeight;
      const host = marks.current;
      if (!host) return;
      const sections = [...document.querySelectorAll<HTMLElement>('main section[id]')].filter(
        (s) => !s.parentElement?.closest('section[id]'),
      );
      host.replaceChildren();
      stops = [];
      if (sections.length < 4 || max <= 0) return;
      for (const s of sections) {
        const at = (s.getBoundingClientRect().top + window.scrollY) / max;
        if (at <= 0.02 || at >= 0.98) continue;
        const el = document.createElement('div');
        el.className = 'progress-mark';
        el.style.left = `${(at * 100).toFixed(2)}%`;
        host.appendChild(el);
        stops.push({ el, at });
      }
    };
    const update = () => {
      raf = 0;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      for (const s of stops) s.el.toggleAttribute('data-on', p >= s.at);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    measure();
    update();
    // the body grows after hydration (pins, reveals): re-measure then, at most once per frame
    let pending = 0;
    const ro = new ResizeObserver(() => {
      if (!pending) pending = requestAnimationFrame(() => ((pending = 0), onResize()));
    });
    ro.observe(document.body);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(raf);
      cancelAnimationFrame(pending);
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div aria-hidden data-print-hide className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div ref={bar} className="h-full origin-left bg-[linear-gradient(90deg,#f7931e,#f9e27d_50%,#3cc6b4)]" style={{ transform: 'scaleX(0)' }} />
      <div ref={marks} className="absolute inset-0" />
    </div>
  );
}
