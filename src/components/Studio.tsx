'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { principles } from '@/lib/content';

export default function Studio() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
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
          <figure className="group toon mt-8 max-w-sm -rotate-2 rounded-sm bg-paper p-3 pb-4 transition-transform duration-500 hover:rotate-0">
            <div data-portrait className="relative aspect-[4/5] overflow-hidden bg-bg-2">
              <Image
                src="/team/henrique.png"
                alt="Henrique Alexandre de Camargo, fundador da HenaWeb"
                fill
                sizes="(max-width: 1024px) 80vw, 25vw"
                className="object-cover grayscale contrast-125 transition-[filter] duration-700 group-hover:grayscale-0 group-hover:contrast-100"
              />
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle,transparent_1.1px,rgb(18_8_42/0.85)_1.9px)] bg-[length:6px_6px] transition-opacity duration-700 group-hover:opacity-0" />
            </div>
            <figcaption className="mt-3 text-center text-acid-ink">
              <span className="font-groovy block text-lg text-[#c2410c]">Fundador</span>
              <span className="serif block text-xl">Henrique Alexandre de Camargo</span>
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
                  <span>regra_{pr.n.toLowerCase()}.txt</span>
                  <span className="win-btn ml-auto" aria-hidden>×</span>
                </div>
                <div className="m-1.5 flex-1 border-2 border-[#7d7394] bg-paper p-6 text-acid-ink">
                <span className="font-groovy text-5xl leading-none text-[#c2410c]">{pr.n}</span>
                <h3 className="mt-6 text-2xl font-medium tracking-tight">{pr.title}</h3>
                <p className="mt-3 leading-relaxed text-acid-ink/70">{pr.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
