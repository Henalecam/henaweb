'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { capabilities } from '@/lib/content';

/**
 * `caseCounts`: solved cases per service slug, counted on the server so the case data stays out of this bundle.
 * `caseSlugs`: case name → slug, so an example that names a solved case ("Diconta: ERP contábil…") links to it.
 */
export default function Capabilities({ caseCounts = {}, caseSlugs = {} }: { caseCounts?: Record<string, number>; caseSlugs?: Record<string, string> }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  // closed rows are made inert only once this has hydrated: in the server HTML they stay readable, so without
  // JavaScript (where nothing could open them) the <noscript> rule below simply shows every answer
  const [live, setLive] = useState(false);
  useEffect(() => setLive(true), []);

  /**
   * Toggle a row (clicking the open one closes it, as its ✕ promises). Opening a row below the open one
   * collapses the one above, which used to yank the clicked title 270–520 px up the screen; the scroll
   * follows the clicked button through the collapse so it stays where the reader tapped it.
   */
  const pick = (i: number, el: HTMLElement) => {
    const before = el.getBoundingClientRect().top;
    setActive((cur) => (cur === i ? -1 : i));
    const t0 = performance.now();
    const hold = () => {
      const drift = el.getBoundingClientRect().top - before;
      if (Math.abs(drift) > 0.5) window.scrollBy(0, drift);
      if (performance.now() - t0 < 900) requestAnimationFrame(hold);
    };
    requestAnimationFrame(hold);
  };

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
      data-sheet className="paper gutter relative z-10 -mt-8 rounded-t-[2rem] border-t-[3px] border-toon pt-[clamp(5rem,10vw,9rem)] pb-[clamp(5rem,10vw,9rem)] text-bg"
    >
      {/* without JavaScript the rows can't be toggled, so every answer is shown open */}
      <noscript>
        <style>{'[data-cap-panel]{grid-template-rows:1fr!important;opacity:1!important}'}</style>
      </noscript>
      <div className="mb-[clamp(3rem,7vw,6rem)] grid gap-8 md:grid-cols-12">
        <span className="label !text-bg/55 md:col-span-3">(II) Capacidades</span>
        <h2 className="text-[clamp(2.5rem,6.5vw,6.5rem)] leading-[0.92] font-medium tracking-[-0.05em] md:col-span-9">
          Do processo confuso ao <span className="font-groovy text-[0.85em] tracking-normal text-[#c2410c]">sistema</span> que ninguém quer largar.
        </h2>
      </div>

      <ul data-cap-list data-acc className="flex flex-col gap-4 md:gap-5">
        {capabilities.map((c, i) => {
          const isOpen = active === i;
          return (
            <li key={c.id} data-cap-row className="group/cap toon relative overflow-hidden rounded-2xl bg-paper">
              {/* the fill covers the whole open card, page link included, not just the toggle */}
              <span
                aria-hidden
                className={`pointer-events-none absolute inset-0 origin-bottom bg-[linear-gradient(100deg,#f7931e,#f4b942_55%,#f9e27d)] transition-transform duration-700 ease-[var(--ease-out-expo)] ${
                  isOpen
                    ? 'scale-y-100'
                    : // a closed row hints at what opening does: the colour rises a sliver from the bottom
                      'scale-y-0 group-hover/cap:scale-y-[0.07] group-has-[:focus-visible]/cap:scale-y-[0.07]'
                }`}
              />
              {/* the accordion pattern (WAI-ARIA APG): each toggle sits in a heading, so a screen reader's heading list
                  reaches the four capabilities directly (they were only buttons under the section's h2); the heading
                  is a plain block that keeps the row's wrapping (no balance) and adds nothing to the layout */}
              <h3 className="relative [text-wrap:inherit]">
              <button
                type="button"
                // opens on click/tap only: opening on hover made every row expand and collapse under a
                // resting pointer while the page scrolled past, shifting the whole list
                onClick={(e) => pick(i, e.currentTarget)}
                aria-expanded={isOpen}
                aria-controls={`cap-panel-${c.id}`}
                className="group relative grid w-full grid-cols-12 items-baseline gap-4 overflow-hidden px-3 py-6 text-left md:px-6 md:py-8"
              >
                <span className="font-groovy relative col-span-2 text-2xl text-[#c2410c] md:col-span-1 md:text-3xl">{c.id}</span>
                <span className="relative col-span-8 text-[clamp(2rem,5.5vw,5.25rem)] leading-[0.95] font-medium tracking-[-0.045em] md:col-span-7">
                  {c.title}
                </span>
                {/* closed (desktop, lg+): a peek at what's inside — the first three tags, stacked like an index card's
                    keywords; it steps aside when the row opens and the full set shows. Decorative: the button's name stays
                    the capability's title */}
                <span
                  aria-hidden
                  data-cap-peek
                  className={`relative hidden self-center justify-self-end text-right font-mono print:hidden text-[0.68rem] leading-[1.6] tracking-[0.14em] text-bg/70 uppercase transition-[opacity,translate] duration-500 lg:col-span-2 lg:block ${
                    isOpen ? 'pointer-events-none translate-x-3 opacity-0' : 'opacity-100 group-hover:text-bg/85 group-focus-visible:text-bg/85'
                  }`}
                >
                  {c.tags.slice(0, 3).map((t) => (
                    <span key={t} className="block truncate">
                      {t}
                    </span>
                  ))}
                </span>
                <span
                  className={`toon-sm relative col-span-2 flex h-10 w-10 items-center justify-center self-center justify-self-end rounded-full bg-acid text-2xl leading-none text-acid-ink transition-transform duration-500 md:col-span-4 lg:col-span-2 md:h-12 md:w-12 md:text-3xl ${
                    isOpen ? 'rotate-45' : 'group-hover:scale-110 group-focus-visible:scale-110 group-hover:rotate-90 group-focus-visible:rotate-90'
                  }`}
                  aria-hidden
                >
                  +
                </span>
              </button>
              </h3>
              {/* the answer sits next to the toggle, not inside it: inside a <button> it became part of the button's
                  name (335 characters read on every focus, closed rows included) and could not be browsed */}
              <div className="relative grid grid-cols-12 gap-4 px-3 md:px-6">
                <span
                  id={`cap-panel-${c.id}`}
                  data-cap-panel
                  inert={live && !isOpen}
                  className={`relative col-span-12 grid transition-[grid-template-rows,opacity] duration-700 ease-[var(--ease-out-expo)] md:col-span-11 md:col-start-2 ${
                    isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  {/* -mx/px: room for the tags' 3px focus ring, which the collapse's overflow-hidden cut off at the edge */}
                  <span className="-mx-1.5 overflow-hidden px-1.5">
                    <span className="grid gap-8 pt-4 pb-6 md:grid-cols-11 md:pt-2 md:pb-8">
                      <span className="flex flex-col gap-5 md:col-span-6">
                        <span className="text-lg leading-relaxed">{c.lead}</span>
                        <span className="flex flex-wrap gap-2">
                          {/* each tag is a lead: it opens the site search already looking for it (cases, services, answers) */}
                          {c.tags.map((t) => (
                            <button
                              key={t}
                              type="button"
                              onClick={() => window.dispatchEvent(new CustomEvent('hena:search', { detail: t }))}
                              aria-label={`Procurar “${t}” no site`}
                              className="rounded-full border-2 border-bg/70 bg-paper/60 px-3 py-1 font-mono text-xs uppercase transition-colors hover:bg-bg hover:text-paper focus-visible:bg-bg focus-visible:text-paper"
                            >
                              {t} <span aria-hidden className="opacity-60">🔎</span>
                            </button>
                          ))}
                        </span>
                      </span>
                      <span className="flex flex-col md:col-span-5">
                        <span className="label mb-2 !text-bg/60">Exemplos</span>
                        {c.examples.map((ex) => {
                          const slug = caseSlugs[ex.split(':')[0].trim()];
                          return (
                            <span key={ex} className="flex items-baseline gap-3 border-t border-bg/15 py-2.5 text-[0.95rem]">
                              <span className="serif text-bg/50">→</span>
                              {/* a real case in the archive: the example opens its file */}
                              {slug ? (
                                <a href={`/casos/${slug}`} className="-my-1.5 inline-block py-1.5 underline decoration-bg/30 decoration-1 underline-offset-4 hover:decoration-[#c2410c] hover:decoration-2">
                                  {ex}
                                </a>
                              ) : (
                                ex
                              )}
                            </span>
                          );
                        })}
                      </span>
                    </span>
                  </span>
                </span>
              </div>
              {/* the page link lives outside the toggle button (no nested interactive elements) */}
              <span data-cap-links className={`relative mx-3 mb-6 flex-wrap items-center gap-x-5 gap-y-3 md:mx-6 md:mb-8 ${isOpen ? 'flex' : 'hidden'}`}>
                <a
                  href={`/servicos/${c.slug}`}
                  className="toon-sm toon-press inline-flex w-fit items-center gap-2 rounded-full bg-acid-ink px-4 py-2 text-sm font-medium text-paper"
                >
                  Ver a página de {c.title} →
                </a>
                {(caseCounts[c.slug] ?? 0) > 0 && (
                  <a href={`/casos?servico=${c.slug}`} className="-my-0.5 py-0.5 text-sm font-medium underline decoration-2 underline-offset-4 hover:decoration-4">
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
