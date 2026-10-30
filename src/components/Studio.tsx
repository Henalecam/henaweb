'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, ScrollTrigger, SplitText, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { principles } from '@/lib/content';

export default function Studio() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // touch screens never hover, so the halftone used to hide the founder's face for good:
      // there the photo develops into colour (and straightens, like a polaroid picked up) once it sits in the middle of the screen
      if (window.matchMedia('(hover: none)').matches) {
        ScrollTrigger.create({ trigger: '[data-portrait]', start: 'top 60%', end: 'bottom 25%', toggleClass: { targets: '[data-portrait-card]', className: 'is-developed' } });
      }
      // reduced motion: entrances are skipped, the content just sits in place (CSS can't stop GSAP tweens)
      if (prefersReducedMotion()) return;
      const split = SplitText.create('[data-studio-title]', { type: 'lines', mask: 'lines', linesClass: 'line-mask' });
      gsap.from(split.lines, {
        yPercent: 105,
        duration: 1.2,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '[data-studio-title]', start: 'top 80%' },
      });
      gsap.fromTo(
        '[data-portrait]',
        { clipPath: 'inset(100% 0% 0% 0%)' },
        {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: 1.4,
          ease: 'expo.inOut',
          scrollTrigger: { trigger: '[data-portrait]', start: 'top 80%' },
        },
      );
      gsap.from('[data-principle]', {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '[data-principles]', start: 'top 85%' },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="studio"
      className="sky gutter relative z-20 -mt-8 overflow-hidden rounded-t-[2rem] border-t-[3px] border-toon py-[clamp(5rem,10vw,9rem)]"
    >
      <div className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <span className="label">(VII) Studio</span>
          {/* shake it like a Polaroid picture: a click (or tap) wobbles the photo and develops it at once */}
          <figure
            data-portrait-card
            data-cursor="Chacoalhar"
            onClick={(e) => {
              const card = e.currentTarget;
              card.classList.add('is-developed');
              if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
              card.classList.remove('is-shaking');
              void card.offsetWidth; // restart the wobble on every click
              card.classList.add('is-shaking');
            }}
            onAnimationEnd={(e) => e.animationName === 'polaroid-shake' && e.currentTarget.classList.remove('is-shaking')}
            className="group toon relative mt-10 max-w-sm -rotate-2 cursor-pointer rounded-sm bg-paper p-3 pb-4 transition-transform duration-500 hover:rotate-0 [&.is-developed]:rotate-0"
          >
            {/* a strip of tape holds the polaroid in place, like a photo taped into a case file */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-3.5 left-1/2 z-10 h-7 w-28 -translate-x-1/2 rotate-[4deg] border-x border-dashed border-toon/25 bg-[repeating-linear-gradient(-45deg,rgb(249_226_125/0.88)_0_8px,rgb(255_228_92/0.88)_8px_16px)] shadow-[0_2px_0_rgb(18_8_42/0.18)]"
            />
            <div data-portrait className="relative aspect-[4/5] overflow-hidden bg-bg-2">
              <Image
                src="/team/henrique.png"
                alt="Henrique Alexandre de Camargo, fundador da HenaWeb"
                fill
                sizes="(max-width: 1024px) 80vw, 25vw"
                className="object-cover grayscale contrast-125 transition-[filter] duration-700 group-hover:grayscale-0 group-hover:contrast-100 group-[.is-developed]:grayscale-0 group-[.is-developed]:contrast-100"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,transparent_1.1px,rgb(18_8_42/0.85)_1.9px)] bg-[length:6px_6px] transition-opacity duration-700 group-hover:opacity-0 group-[.is-developed]:opacity-0" />
            </div>
            <figcaption className="mt-3 text-center text-acid-ink">
              <span className="font-groovy block text-lg text-[#c2410c]">Fundador · Cientista da computação</span>
              <span className="serif relative block text-xl">
                Henrique Alexandre de Camargo
                {/* a pen stroke signs under the name when the photo develops (hover, or mid-screen on touch) */}
                <svg aria-hidden viewBox="0 0 200 12" preserveAspectRatio="none" className="sig-line pointer-events-none absolute -bottom-2 left-[12%] h-3 w-[76%] overflow-visible">
                  <path d="M2,8 C30,2 52,11 80,6 S130,2 150,7 S186,9 198,4" pathLength="1" fill="none" stroke="#c2410c" strokeWidth="2.2" strokeLinecap="round" />
                </svg>
              </span>
            </figcaption>
          </figure>
        </div>

        <div className="lg:col-span-8">
          <h2
            data-studio-title
            className="text-[clamp(2.25rem,4.8vw,4.75rem)] leading-[0.95] font-medium tracking-[-0.045em]"
          >
            Um studio <span className="font-groovy text-[0.85em] tracking-normal text-acid [text-shadow:4px_4px_0_#120626]">liderado por engenharia</span>, não por apresentação de slides.
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-ink/70">
            Somos pequenos de propósito. Quem desenha a arquitetura é quem escreve o código. Isso encurta o caminho
            entre a decisão e a entrega e garante que o que foi combinado na reunião é o que vai para produção.
          </p>

          <ol data-principles className="mt-14 grid gap-5 sm:grid-cols-2">
            {principles.map((pr) => (
              <li key={pr.n} data-principle className="win flex flex-col">
                <div className="win-bar">
                  <span aria-hidden>regra_{pr.n.toLowerCase()}.txt</span>
                  <span className="win-btn ml-auto" aria-hidden>×</span>
                </div>
                {/* phones: numeral beside the title instead of on a line of its own (rules list ~24% shorter) */}
                <div className="m-1.5 flex-1 border-2 border-[#7d7394] bg-paper p-5 text-acid-ink sm:p-6">
                  <div className="flex items-baseline gap-4 sm:block">
                    <span className="font-groovy w-14 shrink-0 text-4xl leading-none text-[#c2410c] sm:w-auto sm:text-5xl">{pr.n}</span>
                    <h3 className="text-xl font-medium tracking-tight sm:mt-6 sm:text-2xl">{pr.title}</h3>
                  </div>
                  <p className="mt-3 leading-relaxed text-acid-ink/70">{pr.body}</p>
                </div>
                {/* a Notepad status bar: house rules open read-only (they are not up for editing) */}
                <div
                  aria-hidden
                  className="mx-1.5 mb-1.5 flex justify-between gap-3 border border-[#7d7394] bg-[#c9c3d8] px-2 py-0.5 font-mono text-[0.62rem] text-[#12082a] shadow-[inset_1px_1px_0_#fff]"
                >
                  <span>🔒 somente leitura</span>
                  <span className="tabular-nums">{pr.body.length} caracteres</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
