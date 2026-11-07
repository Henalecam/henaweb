'use client';

import { useEffect, useRef, useState } from 'react';

/** Dot + ring cursor. Elements with [data-cursor="label"] expand the ring and show the label. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  useEffect(() => {
    const d = dot.current;
    const r = ring.current;
    if (!enabled || !d || !r) return;
    // one rAF loop (only while something still moves) eases both shapes after the pointer; it replaces GSAP's
    // quickTo/to with the same feel: the dot all but glued to the pointer, the ring trailing it, the ring's size and
    // its "labelled bubble" offset easing out, and a press that springs back on release
    const still = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ptr = { x: 0, y: 0 };
    const dp = { x: 0, y: 0, s: 1, sTo: 1 };
    const rp = { x: 0, y: 0, off: 0, offTo: 0, s: 1, v: 0, sTo: 1, k: 260, c: 32 };
    let raf = 0;
    let last = 0;
    // exponential approach with a time constant tau (seconds): frame-rate independent
    const ease = (from: number, to: number, dt: number, tau: number) => to + (from - to) * Math.exp(-dt / tau);
    const paint = () => {
      const f = (n: number, k = 2) => n.toFixed(k); // no "7e-5" in the transform string
      d.style.transform = `translate(${f(dp.x)}px, ${f(dp.y)}px) scale(${f(dp.s, 3)})`;
      r.style.transform = `translate(${f(rp.x)}px, ${f(rp.y)}px) translate(${f(rp.off)}%, ${f(-rp.off)}%) scale(${f(rp.s, 3)})`;
    };
    const step = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      dp.x = ease(dp.x, ptr.x, dt, 0.03);
      dp.y = ease(dp.y, ptr.y, dt, 0.03);
      dp.s = ease(dp.s, dp.sTo, dt, 0.08);
      rp.x = ease(rp.x, ptr.x, dt, 0.13);
      rp.y = ease(rp.y, ptr.y, dt, 0.13);
      rp.off = ease(rp.off, rp.offTo, dt, 0.1);
      // the ring's size is a spring: critically damped for hover changes, bouncy after a press
      rp.v += (rp.k * (rp.sTo - rp.s) - rp.c * rp.v) * dt;
      rp.s += rp.v * dt;
      paint();
      const moving =
        Math.abs(dp.x - ptr.x) + Math.abs(dp.y - ptr.y) + Math.abs(rp.x - ptr.x) + Math.abs(rp.y - ptr.y) > 0.1 ||
        Math.abs(dp.s - dp.sTo) + Math.abs(rp.off - rp.offTo) > 0.002 ||
        Math.abs(rp.s - rp.sTo) + Math.abs(rp.v) > 0.002;
      raf = moving ? requestAnimationFrame(step) : 0;
    };
    const kick = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(step);
    };
    const snapScale = () => {
      if (!still) return;
      rp.s = rp.sTo;
      rp.v = 0;
    };

    for (const el of [d, r]) {
      el.style.opacity = '0';
      el.style.transition = 'opacity 0.3s, background-color 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    }
    let shown = false;
    // the ring's resting size for what's under the pointer; a press squeezes it from there
    let base = 1;
    const move = (e: PointerEvent) => {
      ptr.x = e.clientX;
      ptr.y = e.clientY;
      if (!shown) {
        shown = true;
        dp.x = rp.x = ptr.x;
        dp.y = rp.y = ptr.y;
        paint();
        d.style.opacity = r.style.opacity = '1';
      }
      kick();
    };
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor], a, button, input, textarea, label');
      const text = el?.dataset.cursor ?? '';
      setLabel(text);
      base = el ? (text ? 2 : 1.6) : 1;
      rp.k = 260;
      rp.c = 32; // ≈ critical: eases to size like expo.out, no wobble
      rp.sTo = base;
      // the labelled bubble floats up and to the right of the pointer, so it never hides the hovered text
      rp.offTo = text ? 140 : 0;
      r.style.backgroundColor = text ? 'rgba(247,147,30,1)' : 'rgba(247,147,30,0)';
      dp.sTo = el ? 0 : 1;
      snapScale();
      kick();
    };

    // a press squeezes the ring like a button going down, and lets it spring back on release
    // (reduced motion: the squeeze still shows, as a plain step with no spring)
    const down = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      rp.k = 900;
      rp.c = 60;
      rp.sTo = base * 0.78;
      snapScale();
      kick();
    };
    const up = () => {
      rp.k = 320;
      rp.c = 9; // underdamped: the elastic spring back
      rp.sTo = base;
      snapScale();
      kick();
    };
    // leaving the window used to strand the dot and ring at the edge it crossed; they fade out and come back
    // where the pointer re-enters
    const leave = (e: MouseEvent) => {
      if (e.relatedTarget) return;
      shown = false;
      d.style.opacity = r.style.opacity = '0';
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', over);
    window.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    document.documentElement.addEventListener('mouseleave', leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.documentElement.removeEventListener('mouseleave', leave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        data-print-hide
        className="pointer-events-none fixed top-0 left-0 z-[90] -mt-6 -ml-6 flex h-12 w-12 items-center justify-center rounded-full border border-acid/60"
      >
        <span className="font-mono text-[5px] font-medium tracking-widest text-acid-ink uppercase">{label}</span>
      </div>
      <div
        ref={dot}
        aria-hidden
        data-print-hide
        className="pointer-events-none fixed top-0 left-0 z-[91] -mt-[3px] -ml-[3px] h-1.5 w-1.5 rounded-full bg-acid"
      />
    </>
  );
}
