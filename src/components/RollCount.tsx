'use client';

import { useEffect, useRef } from 'react';

/**
 * A two-digit count that rolls up from 00 to its value the first time it comes into view, one click per number like
 * an archive's numbering stamp (the home's "07 casos resolvidos"). The server HTML already holds the real number,
 * so no-JS, reduced motion and paper show it as is.
 */
export default function RollCount({ n }: { n: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const pad = (v: number) => String(v).padStart(2, '0');

  useEffect(() => {
    const el = ref.current;
    if (!el || n < 2 || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // already on screen when the page opened (a reload mid-page): leave the number alone
    if (el.getBoundingClientRect().top < innerHeight) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        let v = 0;
        el.textContent = pad(0);
        const step = () => {
          v++;
          el.textContent = pad(v);
          el.animate([{ translate: '0 -0.12em', opacity: 0.55 }, { translate: '0 0', opacity: 1 }], { duration: 120, easing: 'ease-out' });
          if (v < n) timer = window.setTimeout(step, 70 + v * 12);
          else el.animate([{ scale: 1.08 }, { scale: 1 }], { duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)' });
        };
        timer = window.setTimeout(step, 250);
      },
      { threshold: 0.8 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(timer);
      el.textContent = pad(n);
    };
  }, [n]);

  return (
    // one span, not a hidden copy for screen readers: a second "07" ended up in copied text and the heading's text;
    // the roll lasts about a second and always ends on the real number
    <span ref={ref} className="inline-block tabular-nums">
      {pad(n)}
    </span>
  );
}
