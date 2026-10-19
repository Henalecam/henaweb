'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * A rubber stamp that thumps onto its card the first time the card is mostly on screen
 * (the `stamp-in` keyframes in globals.css; reduced motion just shows it). Decorative only.
 */
export default function Stamp({ children, className = '' }: { children: ReactNode; className?: string }) {
  const el = useRef<HTMLSpanElement>(null);
  const [hit, setHit] = useState(false);

  useEffect(() => {
    const node = el.current;
    if (!node || !('IntersectionObserver' in window)) return setHit(true);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setHit(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -25% 0px' },
    );
    io.observe(node);
    return () => io.disconnect();
  }, []);

  return (
    <span
      ref={el}
      aria-hidden
      className={`pointer-events-none absolute rounded-md border-4 px-3 py-1 font-mono text-xs font-bold tracking-[0.2em] uppercase select-none md:text-sm ${
        hit ? 'stamp-in' : 'opacity-0'
      } ${className}`}
    >
      {children}
    </span>
  );
}
