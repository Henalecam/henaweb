'use client';

import { useRef } from 'react';
import { gsap, SplitText, useGSAP } from '@/lib/gsap';
import { manifesto, facts } from '@/lib/content';

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const split = SplitText.create('[data-manifesto]', { type: 'words' });
      gsap.fromTo(
        split.words,
        { opacity: 0.12 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: 'none',
          scrollTrigger: { trigger: '[data-manifesto]', start: 'top 80%', end: 'bottom 45%', scrub: true },
        },
      );
      gsap.from('[data-fact]', {
        y: 40,
        autoAlpha: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.1,
        scrollTrigger: { trigger: '[data-facts]', start: 'top 85%' },
      });
      return () => split.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} className="gutter relative py-[clamp(6rem,16vw,14rem)]">
      <div className="grid min-h-[70svh] content-center gap-8 md:grid-cols-12">
        <div className="md:col-span-7 md:col-start-6">
          <span className="label">(I) Manifesto</span>
          <p
            data-manifesto
            className="mt-8 text-[clamp(1.75rem,3.6vw,3.75rem)] leading-[1.06] font-medium tracking-[-0.035em]"
          >
            {manifesto}
          </p>
          <p className="font-groovy mt-8 text-2xl text-acid [text-shadow:3px_3px_0_#120626]">“Vi o anjo no mármore e esculpi até libertá-lo.”</p>
          <span className="label mt-2 block">Frase atribuída a Michelangelo</span>
        </div>
      </div>

      <div data-facts className="mt-[clamp(4rem,10vw,9rem)] grid gap-5 md:grid-cols-3">
        {facts.map((f) => (
          <div key={f.l} data-fact className="toon flex items-end justify-between gap-6 rounded-2xl bg-paper p-6 text-acid-ink odd:-rotate-1 even:rotate-1 md:p-8">
            <span className="font-groovy text-[clamp(3.5rem,7vw,6rem)] leading-none text-[#c2410c]">{f.n}</span>
            <span className="label max-w-[16ch] text-right !text-acid-ink/70">{f.l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
