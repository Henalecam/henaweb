'use client';

import { useRef, useState } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { capabilities } from '@/lib/content';

/** `caseCounts`: solved cases per service slug, counted on the server so the case data stays out of this bundle. */
export default function Capabilities({ caseCounts = {} }: { caseCounts?: Record<string, number> }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      // reduced motion: entrances are skipped, the content just sits in place (CSS can't stop GSAP tweens)
      if (prefersReducedMotion()) return;
      gsap.from('[data-cap-row]', {
        y: 60,
        autoAlpha: 0,
        duration: 1.1,
        ease: 'expo.out',
        stagger: 0.08,
        scrollTrigger: { trigger: '[data-cap-list]', start: 'top 80%' },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="capacidades"
      className="paper gutter relative z-10 -mt-8 rounded-t-[2rem] border-t-[3px] border-toon pt-[clamp(5rem,10vw,9rem)] pb-[clamp(5rem,10vw,9rem)] text-bg"
    >
      <div className="mb-[clamp(3rem,7vw,6rem)] grid gap-8 md:grid-cols-12">
        <span className="label !text-bg/55 md:col-span-3">(II) Capacidades</span>
        <h2 className="text-[clamp(2.5rem,6.5vw,6.5rem)] leading-[0.92] font-medium tracking-[-0.05em] md:col-span-9">
          Do processo confuso ao <span className="font-groovy text-[0.85em] tracking-normal text-[#c2410c]">sistema</span> que ninguém quer largar.
        </h2>
      </div>

      <ul data-cap-list className="flex flex-col gap-4 md:gap-5">
        {capabilities.map((c, i) => {
          const isOpen = active === i;
          return (
            <li key={c.id} data-cap-row className="toon relative overflow-hidden rounded-2xl bg-paper">
              {/* the fill covers the whole open card, page link included, not just the toggle */}
              <span
                aria-hidden
                className={`pointer-events-none absolute inset-0 origin-bottom bg-[linear-gradient(100deg,#f7931e,#f4b942_55%,#f9e27d)] transition-transform duration-700 ease-[var(--ease-out-expo)] ${
                  isOpen ? 'scale-y-100' : 'scale-y-0'
                }`}
              />
              <button
                type="button"
                // opens on click/tap only: opening on hover made every row expand and collapse under a
                // resting pointer while the page scrolled past, shifting the whole list
                onClick={() => setActive(i)}
                aria-expanded={isOpen}
                className="group relative grid w-full grid-cols-12 items-baseline gap-4 overflow-hidden px-3 py-6 text-left md:px-6 md:py-8"
              >
                <span className="font-groovy relative col-span-2 text-2xl text-[#c2410c] md:col-span-1 md:text-3xl">{c.id}</span>
                <span className="relative col-span-8 text-[clamp(2rem,5.5vw,5.25rem)] leading-[0.95] font-medium tracking-[-0.045em] md:col-span-7">
                  {c.title}
                </span>
                <span
                  className={`toon-sm relative col-span-2 flex h-10 w-10 items-center justify-center self-center justify-self-end rounded-full bg-acid text-2xl leading-none text-acid-ink transition-transform duration-500 md:col-span-4 md:h-12 md:w-12 md:text-3xl ${
                    isOpen ? 'rotate-45' : 'group-hover:scale-110 group-focus-visible:scale-110 group-hover:rotate-90 group-focus-visible:rotate-90'
                  }`}
                  aria-hidden
                >
                  +
                </span>

                <span
                  className={`relative col-span-12 grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-out-expo)] md:col-span-11 md:col-start-2 ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <span className="overflow-hidden">
                    <span className="grid gap-8 pt-6 md:grid-cols-11">
                      <span className="flex flex-col gap-5 md:col-span-6">
                        <span className="text-lg leading-relaxed">{c.lead}</span>
                        <span className="flex flex-wrap gap-2">
                          {c.tags.map((t) => (
                            <span key={t} className="rounded-full border-2 border-bg/70 bg-paper/60 px-3 py-0.5 font-mono text-xs uppercase">
                              {t}
                            </span>
                          ))}
                        </span>
                      </span>
                      <span className="flex flex-col md:col-span-5">
                        <span className="label mb-2 !text-bg/60">Exemplos</span>
                        {c.examples.map((ex) => (
                          <span key={ex} className="flex items-baseline gap-3 border-t border-bg/15 py-2.5 text-[0.95rem]">
                            <span className="serif text-bg/50">→</span>
                            {ex}
                          </span>
                        ))}
                      </span>
                    </span>
                  </span>
                </span>
              </button>
              {/* the page link lives outside the toggle button (no nested interactive elements) */}
              <span className={`relative mx-3 mb-6 flex-wrap items-center gap-x-5 gap-y-3 md:mx-6 md:mb-8 ${isOpen ? 'flex' : 'hidden'}`}>
                <a
                  href={`/servicos/${c.slug}`}
                  className="toon-sm toon-press inline-flex w-fit items-center gap-2 rounded-full bg-acid-ink px-4 py-2 text-sm font-medium text-paper"
                >
                  Ver a página de {c.title} →
                </a>
                {(caseCounts[c.slug] ?? 0) > 0 && (
                  <a href={`/casos?servico=${c.slug}`} className="text-sm font-medium underline decoration-2 underline-offset-4 hover:decoration-4">
                    {caseCounts[c.slug] === 1 ? '1 caso resolvido' : `${caseCounts[c.slug]} casos resolvidos`} no arquivo →
                  </a>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
