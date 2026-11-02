'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { gsap, ScrollTrigger, onReady, prefersReducedMotion } from '@/lib/gsap';
import type { DavidScene } from '@/lib/davidScene';
import { saveData } from '@/lib/saveData';

/** Seeded so the night sky is the same on the server and in every visit. Upper half of the stage only. */
const STARS = (() => {
  let seed = 11;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
  return Array.from({ length: 34 }, () => ({
    x: Math.round(rnd() * 980) / 10,
    y: Math.round(rnd() * 480) / 10,
    r: rnd() < 0.18 ? 3 : 2,
    d: Math.round(rnd() * 40) / 10,
    t: 2.5 + Math.round(rnd() * 30) / 10,
  }));
})();

// the stage's sky color at the top edge, from dusk (the site's base) to the deep night behind the stars
const dusk = gsap.utils.interpolate('#140c2e', '#07041a') as (t: number) => string;

/**
 * The vaporwave sunset stage: striped sun, neon floor and the halftone David,
 * pinned behind its children (hero → manifesto).
 */
export default function DavidStage({ children }: { children: ReactNode }) {
  const stage = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const sun = useRef<HTMLDivElement>(null);
  const night = useRef<HTMLDivElement>(null);
  const sky = useRef<HTMLDivElement>(null);

  // the sky is sticky behind the hero and the manifesto, and the first opaque sheet (the clients strip, then every
  // section after it) slides over it. The browser still counted it as on screen, so its sun, stars and the 3D bust
  // kept repainting under the sheets (~25-50 ms frames on a phone, all of it invisible). A 1 px marker at the top of
  // that sheet says when it covers the top of the screen; the sky is then marked data-offscreen, which pauses its CSS
  // loops (globals.css) and the 3D loop (davidScene). 40 px of grace for the sheet's rounded corners
  useEffect(() => {
    const el = sky.current;
    const sheet = document.querySelector<HTMLElement>('[data-sheet]');
    if (!el || !sheet) return;
    const marker = document.createElement('span');
    marker.setAttribute('aria-hidden', 'true');
    marker.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none';
    sheet.append(marker);
    const io = new IntersectionObserver(
      ([e]) => el.toggleAttribute('data-offscreen', !e.isIntersecting && e.boundingClientRect.top < 0),
      { rootMargin: '40px 0px 0px 0px' },
    );
    io.observe(marker);
    return () => {
      io.disconnect();
      marker.remove();
      el.removeAttribute('data-offscreen');
    };
  }, []);

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

    // ...and night falls behind it: the sky deepens and the stars come out (reduced motion keeps the dusk sky)
    const nightTween = prefersReducedMotion()
      ? null
      : gsap.fromTo(
          night.current,
          { opacity: 0 },
          {
            opacity: 1,
            ease: 'power1.in',
            scrollTrigger: { trigger: stage.current, start: 'top top', end: 'bottom bottom', scrub: true },
            // the phone's browser bar (theme-color, kept in step by ThemeTint) darkens with the sky
            onUpdate() {
              const o = Number(gsap.getProperty(night.current, 'opacity'));
              if (stage.current) stage.current.dataset.tint = dusk(Math.round(o * 20) / 20);
            },
          },
        );

    // the 3D scene waits for the page to finish loading so it never competes with first paint
    const whenIdle = (cb: () => void) => {
      const idle = () => ('requestIdleCallback' in window ? window.requestIdleCallback(cb, { timeout: 1500 }) : setTimeout(cb, 200));
      if (document.readyState === 'complete') idle();
      else window.addEventListener('load', idle, { once: true });
    };

    // the placard under the hero counts the render's dots; with no render it says why (0: no WebGL, -1: data saver,
    // -2: the 3D code couldn't download)
    if (saveData()) window.dispatchEvent(new CustomEvent('hena:dots', { detail: -1 }));
    else whenIdle(() => import('@/lib/davidScene').then(({ createDavidScene }) => {
      if (cancelled || !canvas.current) return;
      try {
        scene = createDavidScene(canvas.current, {
          reducedMotion: prefersReducedMotion(),
          onDots: (n) => window.dispatchEvent(new CustomEvent('hena:dots', { detail: n })),
        });
      } catch {
        window.dispatchEvent(new CustomEvent('hena:dots', { detail: 0 }));
        return; // no WebGL: the sunset still carries the stage
      }
      trigger = ScrollTrigger.create({
        trigger: stage.current,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => scene?.setProgress(self.progress),
      });
      offReady = onReady(() => scene?.reveal());
    }, () => !cancelled && window.dispatchEvent(new CustomEvent('hena:dots', { detail: -2 })))); // didn't download (offline)

    return () => {
      cancelled = true;
      offReady();
      sunTween?.scrollTrigger?.kill();
      sunTween?.kill();
      nightTween?.scrollTrigger?.kill();
      nightTween?.kill();
      trigger?.kill();
      scene?.dispose();
    };
  }, []);

  return (
    <div ref={stage} className="relative">
      <div ref={sky} className="sky sticky top-0 -mb-[100svh] h-[100svh] overflow-hidden" aria-hidden>
        {/* nightfall: a deeper sky and a field of stars, both behind the sun, fading in as it sets */}
        <div ref={night} data-nightfall className="absolute inset-0 opacity-0">
          <div className="absolute inset-0 bg-[linear-gradient(180deg,#07041a_0%,#140c2e_45%,transparent_80%)]" />
          {STARS.map((st, i) => (
            <span
              key={i}
              data-star
              className="absolute rounded-full bg-[#fff6d6]"
              style={{ left: `${st.x}%`, top: `${st.y}%`, width: st.r, height: st.r, animationDelay: `${st.d}s`, animationDuration: `${st.t}s` }}
            />
          ))}
        </div>
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
