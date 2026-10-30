'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger, onReady, prefersReducedMotion } from '@/lib/gsap';
import type { DavidScene } from '@/lib/davidScene';
import { saveData } from '@/lib/saveData';

/**
 * The vaporwave sunset stage: striped sun, neon floor and the halftone David,
 * pinned behind its children (hero → manifesto).
 */
export default function DavidStage({ children }: { children: ReactNode }) {
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const sun = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let scene: DavidScene | null = null;
    let trigger: ScrollTrigger | null = null;
    let offReady = () => {};
    let cancelled = false;

    // the sun sets as you scroll through the stage
    const sunTween = prefersReducedMotion()
      ? null
      : gsap.fromTo(
          sun.current,
          { yPercent: 0 },
          { yPercent: 55, ease: 'none', scrollTrigger: { trigger: stage.current, start: 'top top', end: 'bottom bottom', scrub: true } },
        );

    // the 3D scene waits for the page to finish loading so it never competes with first paint
    const whenIdle = (cb: () => void) => {
      const idle = () => ('requestIdleCallback' in window ? window.requestIdleCallback(cb, { timeout: 1500 }) : setTimeout(cb, 200));
      if (document.readyState === 'complete') idle();
      else window.addEventListener('load', idle, { once: true });
    };

    if (!saveData()) whenIdle(() => import('@/lib/davidScene').then(({ createDavidScene }) => {
      if (cancelled || !canvas.current) return;
      try {
        scene = createDavidScene(canvas.current, {
          reducedMotion: prefersReducedMotion(),
          onDots: (n) => window.dispatchEvent(new CustomEvent('hena:dots', { detail: n })),
        });
      } catch {
        return; // no WebGL: the sunset still carries the stage
      }
      trigger = ScrollTrigger.create({
        trigger: stage.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => scene?.setProgress(self.progress),
      });
      offReady = onReady(() => scene?.reveal());
    }));

    return () => {
      cancelled = true;
      offReady();
      sunTween?.scrollTrigger?.kill();
      sunTween?.kill();
      trigger?.kill();
      scene?.dispose();
    };
  }, []);

  return (
    <div ref={stage} className="relative">
      <div className="sky sticky top-0 -mb-[100svh] h-[100svh] overflow-hidden" aria-hidden>
        {/* sun sits behind the bust on desktop, centered on mobile */}
        <div
          ref={sun}
          className="sun absolute top-[16%] left-1/2 w-[min(78vw,420px)] -translate-x-1/2 md:top-[14%] md:left-[66%] md:w-[min(44vw,620px)]"
        />
        <div className="grid-floor" />
        <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-r from-bg/85 via-bg/25 to-transparent max-md:bg-gradient-to-t max-md:from-bg max-md:via-bg/50" />
        {/* scanlines */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(0deg,rgb(0_0_0/0.18)_0_1px,transparent_1px_3px)] mix-blend-multiply" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
