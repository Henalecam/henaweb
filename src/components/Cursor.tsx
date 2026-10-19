'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

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
    if (!enabled || !dot.current || !ring.current) return;
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.08, ease: 'power3' });
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.08, ease: 'power3' });
    const rx = gsap.quickTo(ring.current, 'x', { duration: 0.45, ease: 'power3' });
    const ry = gsap.quickTo(ring.current, 'y', { duration: 0.45, ease: 'power3' });

    gsap.set([dot.current, ring.current], { autoAlpha: 0 });
    let shown = false;
    const move = (e: PointerEvent) => {
      if (!shown) {
        shown = true;
        gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY });
        gsap.to([dot.current, ring.current], { autoAlpha: 1, duration: 0.3 });
      }
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
    };
    const over = (e: PointerEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>('[data-cursor], a, button, input, textarea, label');
      const text = el?.dataset.cursor ?? '';
      setLabel(text);
      gsap.to(ring.current, {
        scale: el ? (text ? 2 : 1.6) : 1,
        backgroundColor: text ? 'rgba(247,147,30,1)' : 'rgba(247,147,30,0)',
        // the labelled bubble floats up and to the right of the pointer, so it never hides
        // the text of the button being hovered
        xPercent: text ? 140 : 0,
        yPercent: text ? -140 : 0,
        duration: 0.4,
        ease: 'expo.out',
      });
      gsap.to(dot.current, { scale: el ? 0 : 1, duration: 0.3 });
    };

    window.addEventListener('pointermove', move);
    window.addEventListener('pointerover', over);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerover', over);
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
