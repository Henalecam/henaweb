'use client';

import { useEffect, useRef, useState } from 'react';

const IDLE_MS = 120_000;
const KEY = 'hena:screensaver';

/**
 * The Win95 "Starfield" screensaver, once per visit: a desktop left untouched for two minutes (no mouse, key,
 * wheel or scroll) fades into stars flying out of the screen with the studio's name drifting in the middle.
 * Anything at all brings the page straight back. Never on touch screens, never with reduced motion, never over
 * an open dialog or a form being filled, and never more than once per session (sessionStorage). Decorative.
 */
export default function Screensaver() {
  const [on, setOn] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
    try {
      if (sessionStorage.getItem(KEY)) return;
    } catch {}
    let timer = 0;
    let fired = false;
    const arm = () => {
      if (fired) return;
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        const busy = document.hidden || document.querySelector('dialog[open]') || document.activeElement?.closest('input, textarea, select');
        if (busy) return arm();
        fired = true;
        try {
          sessionStorage.setItem(KEY, '1');
        } catch {}
        setOn(true);
      }, IDLE_MS);
    };
    const wake = () => {
      setOn(false);
      arm();
    };
    const events = ['pointermove', 'pointerdown', 'keydown', 'wheel', 'scroll', 'touchstart'] as const;
    events.forEach((ev) => window.addEventListener(ev, wake, { passive: true }));
    arm();
    return () => {
      window.clearTimeout(timer);
      events.forEach((ev) => window.removeEventListener(ev, wake));
    };
  }, []);

  useEffect(() => {
    if (!on) return;
    const c = canvas.current;
    const ctx = c?.getContext('2d');
    if (!c || !ctx) return;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const size = () => {
      c.width = innerWidth * dpr;
      c.height = innerHeight * dpr;
    };
    size();
    addEventListener('resize', size);
    // seeded stars in a unit cube, flying toward the viewer
    let seed = 42;
    const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
    const stars = Array.from({ length: 260 }, () => ({ x: rnd() * 2 - 1, y: rnd() * 2 - 1, z: rnd() }));
    let raf = 0;
    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const w = c.width;
      const h = c.height;
      ctx.fillStyle = '#05030d';
      ctx.fillRect(0, 0, w, h);
      for (const s of stars) {
        s.z -= dt * 0.28;
        if (s.z <= 0.02) {
          s.x = rnd() * 2 - 1;
          s.y = rnd() * 2 - 1;
          s.z = 1;
        }
        const k = 0.5 / s.z;
        const px = w / 2 + s.x * k * w * 0.5;
        const py = h / 2 + s.y * k * h * 0.5;
        if (px < 0 || px > w || py < 0 || py > h) continue;
        const r = (1 - s.z) * 2.6 * dpr;
        ctx.fillStyle = s.z < 0.3 ? '#fff6d6' : s.z < 0.6 ? '#f9e27d' : '#8b5cc7';
        ctx.fillRect(px, py, r, r);
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('resize', size);
    };
  }, [on]);

  if (!on) return null;
  return (
    <div aria-hidden data-screensaver data-print-hide className="fixed inset-0 z-[95] cursor-none">
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
      <p className="font-groovy absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[clamp(2rem,6vw,5rem)] text-acid [text-shadow:4px_4px_0_#120626]">
        HenaWeb
        <span className="mt-2 block font-mono text-xs tracking-[0.3em] text-ink/70 uppercase [text-shadow:none]">mexa o mouse para voltar ao caso</span>
      </p>
    </div>
  );
}
