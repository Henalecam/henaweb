'use client';

import { useRef } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';

// Dispatched on a fresh task so listeners don't run inside this component's GSAP context
// (GSAP scopes selector strings in callbacks to the context that created the timeline).
const markReady = () =>
  setTimeout(() => {
    document.documentElement.dataset.ready = 'true';
    window.dispatchEvent(new Event('hena:ready'));
  }, 0);

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      let seen = false;
      try {
        seen = sessionStorage.getItem('hena:seen') === '1';
        sessionStorage.setItem('hena:seen', '1');
      } catch {}

      if (seen || prefersReducedMotion()) {
        gsap.to(root.current, { autoAlpha: 0, duration: 0.35, onStart: markReady });
        return;
      }

      const counter = { v: 0 };
      gsap
        .timeline()
        .from('[data-pl-word]', { yPercent: 110, duration: 0.9, ease: 'expo.out', stagger: 0.06 })
        .to(
          counter,
          {
            v: 100,
            duration: 1.5,
            ease: 'power3.inOut',
            onUpdate: () => {
              if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, '0');
            },
          },
          0,
        )
        .to('[data-pl-bar]', { scaleX: 1, duration: 1.5, ease: 'power3.inOut' }, 0)
        .to('[data-pl-word]', { yPercent: -110, duration: 0.6, ease: 'expo.in', stagger: 0.03 }, '>-0.1')
        .add(markReady, '>-0.15')
        .to(root.current, { clipPath: 'inset(0% 0% 100% 0%)', duration: 0.9, ease: 'expo.inOut' }, '<')
        .set(root.current, { display: 'none' });
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      data-preloader
      aria-hidden
      className="sky fixed inset-0 z-[100] flex items-center justify-center overflow-hidden px-4"
      style={{ clipPath: 'inset(0% 0% 0% 0%)' }}
    >
      <div className="sun absolute top-[10%] left-1/2 w-[min(70vw,520px)] -translate-x-1/2" />
      <div className="grid-floor" />
      <div className="win relative w-[min(92vw,460px)]">
        <div className="win-bar">
          <span>HENAWEB.EXE</span>
          <span className="ml-auto flex gap-1">
            <span className="win-btn">_</span>
            <span className="win-btn">×</span>
          </span>
        </div>
        <div className="m-1.5 border-2 border-[#7d7394] bg-paper px-5 py-6 text-acid-ink">
          <div className="overflow-hidden text-[clamp(2rem,7vw,3.2rem)] leading-[1] font-medium tracking-[-0.04em]">
            <span data-pl-word className="inline-block">
              Esculpindo
            </span>{' '}
            <span data-pl-word className="font-groovy inline-block text-[0.85em] tracking-normal text-[#c2410c]">
              sistemas
            </span>
          </div>
          <p className="mt-3 font-mono text-[0.68rem] uppercase">Procurando fantasmas no código…</p>
          <div className="mt-4 flex items-center gap-3">
            <div className="h-6 flex-1 border-2 border-acid-ink bg-white p-0.5">
              <div
                data-pl-bar
                className="h-full origin-left scale-x-0 bg-[repeating-linear-gradient(90deg,#f7931e_0_14px,transparent_14px_18px)]"
              />
            </div>
            <span ref={count} className="font-mono text-sm tabular-nums">
              000
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
