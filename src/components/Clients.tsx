'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { clients } from '@/lib/content';
import Marquee from './Marquee';

const groups = [
  { key: 'public' as const, label: 'Setor público' },
  { key: 'private' as const, label: 'Empresas' },
];

export default function Clients() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('[data-client]', {
        y: 40,
        rotate: (i: number) => (i % 2 ? 4 : -4),
        autoAlpha: 0,
        duration: 0.8,
        ease: 'back.out(1.7)',
        stagger: 0.06,
        scrollTrigger: { trigger: '[data-clients-grid]', start: 'top 85%', once: true },
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="clientes"
      aria-labelledby="clientes-titulo"
      className="sky relative z-[5] -mt-8 overflow-hidden rounded-t-[2rem] border-t-[3px] border-toon pt-[clamp(5rem,9vw,8rem)]"
    >
      <div className="gutter">
        <div className="grid gap-6 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <span className="label !text-teal">Quem confia</span>
            <h2 id="clientes-titulo" className="mt-5 text-[clamp(2.6rem,5.6vw,6rem)] leading-[0.9] font-medium tracking-[-0.05em]">
              Nossos{' '}
              <span className="font-groovy text-[0.85em] tracking-normal text-acid [text-shadow:4px_4px_0_#140a26]">clientes.</span>
            </h2>
          </div>
          <p className="max-w-md text-lg leading-relaxed text-ink/70 md:col-span-5">
            Do governo ao varejo: órgãos públicos e empresas que já resolveram casos com a gente.
          </p>
        </div>

        <div data-clients-grid className="mt-14 flex flex-col gap-10">
          {groups.map((g) => (
            <div key={g.key}>
              <span className="label">{g.label}</span>
              <ul className={`mt-4 grid gap-4 sm:grid-cols-2 ${g.key === 'public' ? 'lg:grid-cols-3' : 'lg:grid-cols-5'}`}>
                {clients
                  .filter((c) => c.group === g.key)
                  .map((c, i) => (
                    <li key={c.name} data-client>
                      {/* hover lives on the inner card so it never fights the entrance tween */}
                      <div
                        className={`toon group relative flex h-full min-h-[8.5rem] flex-col justify-between overflow-hidden rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1 hover:-rotate-1 ${
                          g.key === 'public' ? 'bg-paper text-acid-ink' : i % 2 ? 'bg-lemon text-acid-ink' : 'bg-cyan text-acid-ink'
                        }`}
                      >
                        <span className="font-mono text-[0.62rem] font-bold tracking-widest uppercase opacity-60">{c.sector}</span>
                        <span className="mt-4 text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.02] font-semibold tracking-[-0.03em]">{c.name}</span>
                        <span
                          aria-hidden
                          className="font-groovy absolute -right-2 -bottom-6 text-[5.5rem] leading-none opacity-[0.08] transition-opacity group-hover:opacity-20"
                        >
                          ✦
                        </span>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-[clamp(4rem,8vw,6rem)] border-y-[3px] border-toon bg-acid py-4 text-acid-ink">
        <Marquee
          speed={40}
          items={clients.map((c) => (
            <span key={c.name} className="font-groovy text-2xl md:text-3xl">
              {c.name}
            </span>
          ))}
          separator={<span className="mx-6 text-lg">✦</span>}
        />
      </div>
      <div className="h-16" />
    </section>
  );
}
