'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap, prefersReducedMotion } from '@/lib/gsap';

/**
 * The main "Abrir um caso" buttons lean toward the pointer like a magnet holds them, and tilt a little the
 * way they're pulled, springing back when it leaves. Real pointers only; with reduced motion the button
 * stays still (it used to follow the pointer regardless).
 */
export default function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia('(hover: hover)').matches || prefersReducedMotion()) return;
    const spring = { duration: 0.6, ease: 'elastic.out(1, 0.4)' };
    const xTo = gsap.quickTo(el, 'x', spring);
    const yTo = gsap.quickTo(el, 'y', spring);
    const rTo = gsap.quickTo(el, 'rotation', spring);

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      xTo(dx * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
      // pulled sideways, the pill tilts toward the pull (at most 4°), like it hangs from the magnet
      rTo(Math.max(-4, Math.min(4, (dx / (r.width / 2)) * 4)));
    };
    const leave = () => {
      xTo(0);
      yTo(0);
      rTo(0);
    };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      gsap.set(el, { clearProps: 'transform' });
    };
  }, [strength]);

  return (
    <div ref={ref} className="inline-block will-change-transform">
      {children}
    </div>
  );
}
