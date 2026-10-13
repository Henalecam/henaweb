'use client';

import { useRef } from 'react';
import { gsap, useGSAP } from '@/lib/gsap';
import { clients } from '@/lib/content';

export default function Clients() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      gsap.from('[data-client]', {
        y: 40,
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
      className="sky relative z-[5] -mt-8 overflow-hidden rounded-t-[2rem] border-t-[3px] border-toon py-[clamp(5rem,9vw,8rem)]"
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

        <ul data-clients-grid className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {clients.map((c) => (
            <li key={c.name} data-client>
              {/* hover lives on the inner tile so it never fights the entrance tween */}
              <div
                title={c.name}
                className="toon flex aspect-[16/9] items-center justify-center rounded-2xl bg-white p-[12%] transition-transform duration-300 hover:-translate-y-1 hover:-rotate-1"
              >
                {c.logo ? (
                  // plain img: the logos are mostly SVG and already sized for the tile
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={c.logo}
                    alt={c.name}
                    loading="lazy"
                    decoding="async"
                    className="max-h-full max-w-full object-contain"
                    style={{ transform: c.scale ? `scale(${c.scale})` : undefined }}
                  />
                ) : (
                  <span className="text-[clamp(1.4rem,2.6vw,2.2rem)] font-semibold tracking-[-0.02em] text-[#1a2b5f]">{c.name}</span>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
