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
  const tag = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let max = 1;
    let stops: { el: HTMLElement; at: number; name: string }[] = [];
    // while the page moves (desktop pointer), a small tag rides the bar's leading edge with the chapter being read
    // ("V · Arquivo de casos resolvidos"), then fades once scrolling stops
    const wayfind = matchMedia('(hover: hover) and (min-width: 768px)').matches;
    let quiet = 0;
    let shown = '';

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
        // the section's own kicker, "(V) Arquivo de casos resolvidos" → "V · Arquivo de casos resolvidos"
        const kicker = (s.querySelector('.label')?.textContent ?? '').trim();
        const name = kicker.replace(/^\(([IVXLC]+)\)\s*/, '$1 · ').replace(/^Alguns de nossos clientes$/, 'Clientes');
        stops.push({ el, at, name });
      }
    };
    const update = () => {
      raf = 0;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      for (const s of stops) s.el.toggleAttribute('data-on', p >= s.at);
      const t = tag.current;
      if (!t || !wayfind || !stops.length) return;
      // the section being read is the one that has reached the upper third of the screen, not the very top edge:
      // a section that already fills the view (its title 40px down) used to keep the previous section's name
      const ahead = max > 0 ? (window.innerHeight * 0.35) / max : 0;
      const here = [...stops].reverse().find((s) => p >= s.at - ahead);
      const name = here?.name ?? '';
      if (name !== shown) t.textContent = shown = name;
      // follow the bar's edge, kept on screen: right-aligned near the end, left-aligned near the start
      t.style.left = `${(p * 100).toFixed(2)}%`;
      t.style.translate = p > 0.85 ? '-100% 0' : p < 0.15 ? '0 0' : '-50% 0';
      t.toggleAttribute('data-show', !!name && moving);
    };
    let moving = false;
    let lastY = window.scrollY;
    const onScroll = () => {
      if (wayfind) {
        // only while reading downwards: going up brings the header back, and the tag would sit on its buttons
        moving = window.scrollY > lastY;
        lastY = window.scrollY;
        clearTimeout(quiet);
        quiet = window.setTimeout(() => {
          moving = false;
          tag.current?.removeAttribute('data-show');
        }, 900);
      }
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
      clearTimeout(quiet);
      ro.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <div aria-hidden data-print-hide className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]">
      <div ref={bar} data-progress-bar className="h-full origin-left bg-[linear-gradient(90deg,#f7931e,#f9e27d_50%,#3cc6b4)]" style={{ transform: 'scaleX(0)' }} />
      <div ref={marks} className="absolute inset-0" />
      <div
        ref={tag}
        data-progress-tag
        className="absolute top-[7px] rounded-full bg-acid-ink/90 px-2.5 py-0.5 font-mono text-[0.62rem] tracking-[0.12em] whitespace-nowrap text-paper uppercase opacity-0 shadow-[2px_2px_0_rgb(0_0_0/0.35)] transition-opacity duration-300 data-[show]:opacity-100"
      />
    </div>
  );
}
