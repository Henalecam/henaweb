'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { nav, site, whatsappLink } from '@/lib/content';
import Clock from './Clock';
import Chase from './Chase';
import Social from './Social';

export default function Footer() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('[data-wordmark] span', {
        yPercent: 100,
        duration: 1.4,
        ease: 'expo.out',
        stagger: 0.04,
        scrollTrigger: { trigger: '[data-wordmark]', start: 'top 95%' },
      });
    },
    { scope: root },
  );

  return (
    <footer ref={root} className="sky gutter relative z-50 -mt-8 overflow-hidden rounded-t-[2rem] border-t-[3px] border-toon pt-20 pb-6">
      <div className="relative z-20 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="max-w-sm text-2xl leading-tight font-medium tracking-tight">
            Studio de engenharia de software para empresas e governos. <span className="font-groovy text-acid">Mistérios resolvidos sob medida.</span>
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block font-mono text-sm text-acid underline-offset-4 hover:underline"
          >
            {site.whatsappDisplay} ↗
          </a>
          <a href={`mailto:${site.email}`} className="mt-2 block w-fit font-mono text-sm text-ink/75 underline-offset-4 hover:text-ink hover:underline">
            {site.email}
          </a>
        </div>
        <nav className="flex flex-col gap-2 md:col-span-3 md:col-start-7" aria-label="Rodapé">
          <span className="label mb-2">Navegação</span>
          {[...nav, { label: 'Contato', href: '/#contato' }].map((n) => (
            <a key={n.href} href={n.href} className="w-fit text-ink/75 transition-colors hover:text-ink">
              {n.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-3 md:col-span-3">
          <span className="label">@henaweb</span>
          <Social />
        </div>
      </div>

      {/* the chase, full bleed */}
      <div className="relative -mx-[clamp(1rem,4vw,3.5rem)] mt-16 border-y-[3px] border-toon">
        <Chase />
      </div>

      <div className="relative">
        <div
          data-wordmark
          aria-hidden
          className="relative z-10 flex overflow-hidden pt-2 pb-4 font-groovy text-[clamp(3rem,16vw,19rem)] leading-[0.9] select-none"
        >
          {'HenaWeb'.split('').map((c, i) => (
            <span key={i} className="chrome inline-block pr-[0.02em]">
              {c}
            </span>
          ))}
        </div>
      </div>

      <div className="label relative z-10 mt-2 flex flex-wrap justify-between gap-4 border-t border-line pt-6">
        <span>© {new Date().getFullYear()} Henaweb Ltda</span>
        <span>
          {site.city} · <Clock />
        </span>
        {/* same-page anchor: on a case or service page "/#topo" sent the visitor to the home page */}
        <a href="#conteudo" className="hover:text-ink">
          Voltar ao topo ↑
        </a>
      </div>
    </footer>
  );
}
