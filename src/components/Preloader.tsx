'use client';

import { useLayoutEffect, useRef } from 'react';
import { prefersReducedMotion } from '@/lib/motion';

// Dispatched on a fresh task, so listeners run after this effect has finished, not inside it
const markReady = () =>
  setTimeout(() => {
    document.documentElement.dataset.ready = 'true';
    window.dispatchEvent(new Event('hena:ready'));
  }, 0);

/** The intro's status line, one step per quarter of the bar (decorative: the whole intro is aria-hidden). */
const STEPS = ['Procurando fantasmas no código…', 'Interrogando as planilhas…', 'Ligando os pontos…', 'Caso quase resolvido…'];

// GSAP's eases, as the curves WAAPI takes (and power3.inOut as a function, for the counter)
const EXPO_OUT = 'cubic-bezier(0.16, 1, 0.3, 1)';
const EXPO_IN = 'cubic-bezier(0.7, 0, 0.84, 0)';
const EXPO_IN_OUT = 'cubic-bezier(0.87, 0, 0.13, 1)';
const POWER3_IN_OUT = 'cubic-bezier(0.65, 0, 0.35, 1)';
const power3InOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const step = useRef<HTMLParagraphElement>(null);

  // the intro as a WAAPI timeline (it was a GSAP one; same beats): words rise in, the bar and counter fill over
  // 1.5 s, words leave, the page is marked ready and the curtain wipes up. Layout effect: the first frame painted
  // already has the words below their line. The CSS failsafe (globals.css, preloader-failsafe) still covers JS
  // that never runs
  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem('hena:seen') === '1';
      sessionStorage.setItem('hena:seen', '1');
    } catch {}

    // phones skip the intro so the headline paints right away (it is the page's LCP)
    if (window.matchMedia('(max-width: 767px)').matches) {
      el.style.display = 'none';
      markReady();
      return;
    }

    const anims: Animation[] = [];
    let raf = 0;
    let done = 0;

    if (seen || prefersReducedMotion()) {
      markReady();
      const a = el.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 350, fill: 'forwards' });
      a.onfinish = () => (el.style.visibility = 'hidden');
      anims.push(a);
      return () => anims.forEach((x) => x.cancel());
    }

    const words = [...el.querySelectorAll<HTMLElement>('[data-pl-word]')];
    words.forEach((w, i) =>
      anims.push(
        w.animate([{ transform: 'translateY(110%)' }, { transform: 'none' }], { duration: 900, delay: i * 60, easing: EXPO_OUT, fill: 'backwards' }),
      ),
    );
    const bar = el.querySelector<HTMLElement>('[data-pl-bar]');
    if (bar) anims.push(bar.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 1500, easing: POWER3_IN_OUT, fill: 'forwards' }));

    // the counter and the status line, on the same clock and curve as the bar
    const t0 = performance.now();
    const tick = (now: number) => {
      const v = power3InOut(Math.min(1, (now - t0) / 1500)) * 100;
      if (count.current) count.current.textContent = String(Math.round(v)).padStart(3, '0');
      // the status line moves the investigation along with the bar, like an installer's step messages
      const msg = STEPS[Math.min(STEPS.length - 1, Math.floor((v / 100) * STEPS.length))];
      if (step.current && step.current.textContent !== msg) step.current.textContent = msg;
      if (v < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    // words leave 0.1 s before the bar is full; ready and the curtain 0.15 s before the last word is out
    const out = 1400;
    words.forEach((w, i) =>
      anims.push(
        w.animate([{ transform: 'none' }, { transform: 'translateY(-110%)' }], { duration: 600, delay: out + i * 30, easing: EXPO_IN, fill: 'forwards' }),
      ),
    );
    const curtain = out + (words.length - 1) * 30 + 600 - 150;
    done = window.setTimeout(markReady, curtain);
    const wipe = el.animate([{ clipPath: 'inset(0% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 100% 0%)' }], {
      duration: 900,
      delay: curtain,
      easing: EXPO_IN_OUT,
      fill: 'forwards',
    });
    wipe.onfinish = () => (el.style.display = 'none');
    anims.push(wipe);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(done);
      anims.forEach((x) => x.cancel());
    };
  }, []);

  return (
    <div
      ref={root}
      data-preloader
      aria-hidden
      className="sky fixed inset-0 z-[100] max-md:hidden flex items-center justify-center overflow-hidden px-4"
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
          <p ref={step} data-pl-step className="mt-3 font-mono text-[0.68rem] uppercase">
            {STEPS[0]}
          </p>
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
