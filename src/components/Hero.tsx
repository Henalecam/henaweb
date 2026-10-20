'use client';

import { useRef } from 'react';
import { gsap, SplitText, useGSAP, onReady } from '@/lib/gsap';
import { site, whatsappLink } from '@/lib/site';
import Clock from './Clock';
import Magnetic from './Magnetic';
import Placard from './Placard';
import { chisel } from '@/lib/chisel';

export default function Hero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // desktop: the headline rises line by line after the intro; phones keep it painted from the first frame
      const reveal = window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)').matches;
      const split = reveal ? SplitText.create('[data-hero-title]', { type: 'lines', mask: 'lines', linesClass: 'line-mask', aria: 'none' }) : null;
      if (split) gsap.set(split.lines, { yPercent: 105 });
      gsap.set('[data-hero-fade]', { autoAlpha: 0, y: 24 });

      const off = onReady(() => {
        const tl = gsap.timeline({ delay: reveal ? 0.25 : 0 });
        if (split) tl.to(split.lines, { yPercent: 0, duration: 1.3, ease: 'expo.out', stagger: 0.09 });
        tl.to('[data-hero-fade]', { autoAlpha: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.08 }, split ? '-=0.9' : 0);
      });

      gsap.to('[data-hero-inner]', {
        yPercent: -14,
        opacity: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });

      // the "keep scrolling" cue is gone after the first ~160px of scroll (back when you return to the top)
      gsap.to('[data-hero-cue]', {
        autoAlpha: 0,
        ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: '+=160', scrub: true },
      });

      return () => {
        off();
        split?.revert();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} id="topo" className="relative h-[100svh] min-h-[640px] overflow-x-clip">
      <div data-hero-inner className="gutter relative flex h-full flex-col justify-end pt-28 pb-8">
        <div data-hero-fade className="mb-auto hidden items-start justify-between pt-6 md:flex">
          <span className="label">(Studio de engenharia de software)</span>
          {/* decorative echo of the h1 (fullwidth letters read as noise): hidden from screen readers; its first
              letters cross the sun, so a dark halo under the cyan glow keeps them from melting into the yellow */}
          <span
            aria-hidden
            className="font-mono text-sm tracking-[0.3em] text-cyan [text-shadow:0_0_2px_rgb(18_8_42/0.95),0_0_6px_rgb(18_8_42/0.9),0_0_12px_rgb(1_205_254/0.6)]"
          >
            ｓｉｓｔｅｍａｓ　ｅｓｃｕｌｐｉｄｏｓ
          </span>
        </div>

        {/* SplitText rewraps the title's lines, so the chisel listens on the h1 and checks the word under the mouse */}
        <h1
          data-hero-title
          onPointerMove={(e) => (e.target as HTMLElement).closest('[data-chisel]') && chisel(e)}
          className="max-w-[12ch] text-[clamp(3rem,9vw,10rem)] leading-[0.88] font-medium tracking-[-0.055em] [text-shadow:0_0_48px_rgb(18_8_42/0.9)] max-md:[text-shadow:0_2px_4px_rgb(18_8_42/0.95),0_0_22px_rgb(18_8_42/0.95),0_0_48px_rgb(18_8_42/0.9)]"
        >
          Sistemas <span data-chisel className="font-groovy pr-[0.06em] text-[0.82em] tracking-normal text-acid [text-shadow:5px_5px_0_#120626,0_0_40px_rgb(255_113_206/0.6)]">esculpidos</span> para empresas e governos.
        </h1>

        <div className="mt-10 grid gap-8 md:mt-12 md:grid-cols-12 md:items-end">
          <p data-hero-fade className="max-w-md text-base leading-relaxed text-ink/75 max-md:text-ink/85 max-md:[text-shadow:0_1px_3px_rgb(18_8_42/0.95),0_0_14px_rgb(18_8_42/0.9)] md:col-span-5 md:text-lg">
            Todo escultor tira do mármore o que sobra. Fazemos o mesmo com processos: removemos o excesso até
            restar só o sistema. Sob medida, público ou com IA.
          </p>
          <div data-hero-fade className="flex flex-wrap items-center gap-3 md:col-span-4 md:col-start-6">
            <Magnetic>
              <a
                href="#contato"
                data-cursor="Vamos"
                className="toon toon-press group inline-flex items-center gap-3 rounded-full bg-acid px-6 py-4 font-medium text-acid-ink"
              >
                Abrir um caso
                <span className="transition-transform duration-500 group-hover:translate-x-1 group-focus-visible:translate-x-1">→</span>
              </a>
            </Magnetic>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="toon toon-press rounded-full bg-cyan px-6 py-4 font-medium text-acid-ink"
            >
              WhatsApp
            </a>
          </div>
          <div data-hero-fade className="flex flex-col gap-3 md:col-span-3 md:items-end md:text-right">
            <Placard className="hidden md:block" />
            <span className="label">
              {site.city} · <Clock stack />
            </span>
          </div>
        </div>
        {/* desktop: a quiet cue under the buttons that the story continues below (phones already show the next
            section's edge); decorative, the bob is motion-safe only */}
        <div data-hero-fade className="pointer-events-none absolute inset-x-0 bottom-2 hidden justify-center md:flex" aria-hidden>
          <span data-hero-cue className="label flex items-center gap-2 !text-[0.65rem] !text-ink/70">
            role para investigar
            <span className="inline-block motion-safe:animate-[cue-bob_1.8s_ease-in-out_infinite]">↓</span>
          </span>
        </div>
      </div>
    </section>
  );
}
