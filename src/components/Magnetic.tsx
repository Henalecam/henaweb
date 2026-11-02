'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

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
    // a small damped spring per axis (x, y, tilt), stepped on rAF only while something is moving. It stands in for
    // GSAP's quickTo with elastic.out(1, 0.4) over 0.6 s: the same overshoot and settle, without the library
    const K = 180; // stiffness
    const C = 12; // damping (ζ ≈ 0.45: one visible overshoot, settled in ~0.7 s)
    const pos = [0, 0, 0];
    const vel = [0, 0, 0];
    const goal = [0, 0, 0];
    let raf = 0;
    let last = 0;
    const paint = () => {
      el.style.transform = `translate(${pos[0].toFixed(2)}px, ${pos[1].toFixed(2)}px) rotate(${pos[2].toFixed(2)}deg)`;
    };
    const step = (now: number) => {
      const dt = Math.min(0.032, (now - last) / 1000);
      last = now;
      let moving = false;
      for (let i = 0; i < 3; i++) {
        vel[i] += (K * (goal[i] - pos[i]) - C * vel[i]) * dt;
        pos[i] += vel[i] * dt;
        if (Math.abs(goal[i] - pos[i]) > 0.01 || Math.abs(vel[i]) > 0.01) moving = true;
        else {
          pos[i] = goal[i];
          vel[i] = 0;
        }
      }
      paint();
      raf = moving ? requestAnimationFrame(step) : 0;
    };
    const aim = (x: number, y: number, r: number) => {
      goal[0] = x;
      goal[1] = y;
      goal[2] = r;
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(step);
      }
    };

    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      // measured where the button is now (as before): the pull eases off as it closes in on the pointer
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      // pulled sideways, the pill tilts toward the pull (at most 4°), like it hangs from the magnet
      aim(dx * strength, (e.clientY - cy) * strength, Math.max(-4, Math.min(4, (dx / (r.width / 2)) * 4)));
    };
    const leave = () => aim(0, 0, 0);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => {
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
      cancelAnimationFrame(raf);
      el.style.transform = '';
    };
  }, [strength]);

  return (
    <div ref={ref} className="inline-block will-change-transform">
      {children}
    </div>
  );
}
