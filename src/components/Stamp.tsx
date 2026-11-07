'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { buzz } from '@/lib/haptic';

/**
 * A rubber stamp that thumps onto its card the first time the card is mostly on screen
 * (the `stamp-in` keyframes in globals.css; reduced motion just shows it). Decorative only.
 * Pressing it stamps it again (with a knock on phones that vibrate): a rubber stamp invites a second thump.
 */
export default function Stamp({ children, className = '' }: { children: ReactNode; className?: string }) {
  const el = useRef<HTMLSpanElement>(null);
  const [hit, setHit] = useState(false);
  // bumps on each press: the key below remounts the span, so the thump animation replays from the start
  const [thumps, setThumps] = useState(0);

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
      key={thumps}
      ref={el}
      aria-hidden
      data-stamp
      onPointerDown={() => {
        if (!hit) return;
        setThumps((n) => n + 1);
        buzz([10, 40, 6]);
      }}
      className={`stamp-print absolute cursor-default rounded-md border-4 px-3 py-1 font-mono text-xs font-bold tracking-[0.2em] uppercase select-none md:text-sm ${
        hit ? 'stamp-in' : 'opacity-0'
      } ${className}`}
    >
      {children}
    </span>
  );
}
