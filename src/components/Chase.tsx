'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import type { ChaseScene } from '@/lib/chaseScene';
import { saveData } from '@/lib/saveData';


/** One tile of roadside scenery; two copies side by side loop seamlessly. */
function Trees() {
  return (
    <svg viewBox="0 0 1200 220" preserveAspectRatio="none" className="h-full w-[1200px] shrink-0" aria-hidden>
      <g fill="#0d0720">
        {[80, 330, 610, 900, 1110].map((x, i) => (
          <g key={x} transform={`translate(${x} ${i % 2 ? 30 : 0})`}>
            <path d="M-8,220 L-6,90 C-30,70 -48,62 -64,40 C-44,52 -28,58 -8,70 L-6,30 C-20,10 -18,0 -10,-10 C-6,6 2,18 2,30 L4,70 C20,52 40,44 58,24 C48,48 28,64 6,86 L8,220 Z" />
          </g>
        ))}
        {[200, 470, 760, 1010].map((x) => (
          <path key={x} d={`M${x - 40},220 C${x - 30},170 ${x - 10},150 ${x},150 C${x + 10},150 ${x + 30},170 ${x + 40},220 Z`} />
        ))}
      </g>
    </svg>
  );
}

export default function Chase() {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  // easter egg: clicking the moon walks it through its phases (full → gibbous → crescent → new-ish → full)
  const [phase, setPhase] = useState(0);
  // no 3D van (data saver, no WebGL): its "VRUUUM!" would be shouting from an empty road
  const [noVan, setNoVan] = useState(false);

  // the 3D chase loads only when the footer gets close
  useEffect(() => {
    const el = canvas.current;
    if (!el) return;
    if (saveData()) {
      setNoVan(true);
      return;
    }
    let scene: ChaseScene | null = null;
    let cancelled = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || scene) return;
        io.disconnect();
        import('@/lib/chaseScene').then(({ createChaseScene }) => {
          if (cancelled) return;
          try {
            scene = createChaseScene(el, { reducedMotion: prefersReducedMotion() });
          } catch {
            // no WebGL: the night backdrop stays
            setNoVan(true);
          }
        });
      },
      { rootMargin: '500px 0px' },
    );
    io.observe(el);
    return () => {
      cancelled = true;
      io.disconnect();
      scene?.dispose();
    };
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // the loops only run while the chase is on screen: the footer sits on every page, and these
      // used to tick every frame (a style recalc per frame) from the first paint, footer far below
      const loops = [
        gsap.fromTo('[data-layer="trees"]', { xPercent: 0 }, { xPercent: -50, duration: 22, ease: 'none', repeat: -1, paused: true }),
        gsap.to('[data-window]', { opacity: 0.25, duration: 0.08, repeat: -1, yoyo: true, repeatDelay: 2.4, ease: 'none', paused: true }),
        gsap.fromTo('[data-vruum]', { scale: 0.9, rotate: 4 }, { scale: 1.06, rotate: 8, duration: 0.5, repeat: -1, yoyo: true, ease: 'sine.inOut', paused: true }),
      ];
      const io = new IntersectionObserver(([e]) => loops.forEach((t) => (e.isIntersecting ? t.play() : t.pause())));
      if (root.current) io.observe(root.current);
      return () => io.disconnect();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative h-[clamp(340px,42vw,520px)] overflow-hidden" aria-hidden>
      {/* night sky with a big moon */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#140c2e_0%,#2b1a58_60%,#3a2a6e_100%)]" />
      {/* above the 3D canvas so it can be clicked; pointer-only and decorative (the whole scene is aria-hidden) */}
      <div
        data-moon={phase}
        onClick={() => {
          const next = (phase + 1) % 4;
          setPhase(next);
          // the new moon puts the lights out (flashlight mode, TabHaunt); the full moon brings them back
          if (next === 3) window.dispatchEvent(new CustomEvent('hena:lanterna', { detail: true }));
          if (next === 0) window.dispatchEvent(new CustomEvent('hena:lanterna', { detail: false }));
        }}
        className="absolute top-[7%] right-[10%] z-[5] aspect-square w-[clamp(80px,12vw,170px)] cursor-pointer rounded-full bg-[#f9e27d] transition-shadow duration-700"
        style={{ boxShadow: `0 0 80px rgb(249 226 125 / ${[0.5, 0.36, 0.22, 0.08][phase]})` }}
      >
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute top-[24%] left-[22%] h-[18%] w-[18%] rounded-full bg-[#e9c95a]" />
          <span className="absolute top-[52%] left-[54%] h-[24%] w-[24%] rounded-full bg-[#e9c95a]" />
          {/* the earth's shadow slides across from the left */}
          <span
            className="absolute inset-0 rounded-full bg-[#160d33] transition-transform duration-700 ease-[var(--ease-out-expo)]"
            style={{ transform: `translateX(${[-105, -62, -30, -8][phase]}%)` }}
          />
        </span>
      </div>

      {/* haunted mansion on the hill */}
      <svg viewBox="0 0 400 220" className="absolute top-[14%] left-[5%] w-[clamp(160px,24vw,330px)]" aria-hidden>
        <path d="M0,220 C60,170 140,150 200,150 C270,150 340,180 400,220 Z" fill="#1a1036" />
        <g fill="#0d0720">
          <rect x="110" y="70" width="170" height="90" />
          <path d="M100,72 L195,18 L290,72 Z" />
          <rect x="140" y="30" width="26" height="50" />
          <path d="M134,32 L153,6 L172,32 Z" />
          <rect x="250" y="46" width="30" height="40" />
          <path d="M244,48 L265,22 L286,48 Z" />
        </g>
        <rect data-window x="186" y="92" width="18" height="24" fill="#f9e27d" />
        <rect x="140" y="96" width="14" height="18" fill="#f7931e" opacity="0.8" />
        <rect x="236" y="96" width="14" height="18" fill="#2b1a58" />
      </svg>

      {/* distant trees */}
      <div data-layer="trees" className="absolute top-[18%] left-0 flex h-[32%] w-max opacity-80">
        <Trees />
        <Trees />
      </div>

      {/* the 3D chase */}
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />

      {!noVan && <span
        data-vruum
        className="toon-sm font-groovy pointer-events-none absolute top-[16%] right-[18%] z-10 rounded-full bg-lemon px-4 py-1 text-base text-acid-ink md:top-[20%] md:right-[22%] md:text-2xl"
      >
        VRUUUM!
      </span>}
    </div>
  );
}
