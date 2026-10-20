'use client';

import { useRef } from 'react';
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { manifesto, facts } from '@/lib/content';

export default function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // reduced motion: entrances are skipped, the content just sits in place (CSS can't stop GSAP tweens)
      if (prefersReducedMotion()) return;
      const split = SplitText.create('[data-manifesto]', { type: 'words', aria: 'none' });
      // tween the colour, not opacity: opacity also faded each word's dark halo, leaving the
      // unread words almost invisible where they cross the striped sun
      const ink = getComputedStyle(split.words[0] ?? document.body).color;
      const dim = ink.replace(/^rgba?\(([^,)]+),\s*([^,)]+),\s*([^,)]+).*$/, 'rgba($1, $2, $3, 0.38)');
      gsap.fromTo(
        split.words,
        { color: dim },
        {
          color: ink,
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
            // the text scrolls over the hero sun; the dark halo keeps it legible over its stripes, as in the headline
            className="mt-8 text-[clamp(1.75rem,3.6vw,3.75rem)] leading-[1.06] font-medium tracking-[-0.035em] [text-shadow:0_0_2px_rgb(18_8_42/0.9),0_2px_10px_rgb(18_8_42/0.85),0_0_36px_rgb(18_8_42/0.9)]"
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
            {/* the promise behind each number, readable at a glance (was 11px mono caps at 70%) */}
            <span className="max-w-[18ch] text-right text-base leading-snug font-medium text-acid-ink/80 md:text-lg">{f.l}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
