'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';

/**
 * Case page, "Caso resolvido": the solution arrives redacted, like a classified file, and the black bars lift word by
 * word when the card comes into view. Only text that is still below the fold gets the bars (nothing the reader is
 * already looking at goes dark); without scripts, with reduced motion and on paper the text is plain. The words
 * stay in the DOM the whole time, so screen readers and find-in-page read them as usual.
 */
export default function Declassify({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [state, setState] = useState<'plain' | 'redacted' | 'open'>('plain');

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (el.getBoundingClientRect().top < innerHeight * 0.9) return;
    setState('redacted');
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        setState('open');
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const words = text.split(' ');
  return (
    <p ref={ref} className={className} data-declassify={state === 'plain' ? undefined : state}>
      {state === 'plain'
        ? text
        : words.map((w, i) => (
            <span key={i}>
              <span className="redact" style={{ '--i': i } as CSSProperties}>
                {w}
              </span>
              {i < words.length - 1 ? ' ' : ''}
            </span>
          ))}
    </p>
  );
}
