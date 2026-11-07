'use client';

import { useEffect, useRef } from 'react';

const STEP = 64; // px of pointer travel between prints
const MAX = 16; // prints on the floor at once
const PRINT =
  '<svg viewBox="0 0 20 44" width="14" height="31" aria-hidden="true"><path d="M10 2c5 0 8 5 8 11 0 5-2 9-3 12H5C4 22 2 18 2 13 2 7 5 2 10 2Z"/><path d="M5 30h10c1 0 2 1 2 3v5c0 3-3 5-7 5s-7-2-7-5v-5c0-2 1-3 2-3Z"/></svg>';

/**
 * The 404 is a crime scene, so the visitor's pointer walks it: a trail of shoe prints follows the mouse, left and
 * right in turn, turned the way it's heading, each fading after a moment. Fine pointers only, and nothing with
 * reduced motion. Purely decorative (aria-hidden), under the content, never in the way of a click.
 */
export default function Footprints() {
  const layer = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = layer.current;
    if (!el || !matchMedia('(pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let last: { x: number; y: number } | null = null;
    let left = false;
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const box = el.getBoundingClientRect();
      const x = e.clientX - box.left;
      const y = e.clientY - box.top;
      if (!last) return void (last = { x, y });
      const dx = x - last.x;
      const dy = y - last.y;
      const dist = Math.hypot(dx, dy);
      if (dist < STEP) return;
      const a = Math.atan2(dy, dx);
      // each foot sits a little to its side of the walking line
      left = !left;
      const side = left ? -7 : 7;
      const px = x - Math.sin(a) * side;
      const py = y + Math.cos(a) * side;
      const print = document.createElement('span');
      print.className = 'footprint';
      print.innerHTML = PRINT;
      print.style.translate = `${px - 7}px ${py - 15}px`;
      print.style.rotate = `${a + Math.PI / 2}rad`;
      if (left) print.style.scale = '-1 1';
      print.addEventListener('animationend', () => print.remove(), { once: true });
      el.append(print);
      while (el.childElementCount > MAX) el.firstElementChild?.remove();
      last = { x, y };
    };
    const reset = () => (last = null);
    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', reset);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', reset);
    };
  }, []);
  return <div ref={layer} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden" />;
}
