'use client';

import { useRef } from 'react';
import { gsap, SplitText, useGSAP, prefersReducedMotion } from '@/lib/gsap';
import { govFlow, govPillars } from '@/lib/content';

const audit = [
  ['09:12', 'solicitação #2026/0142 registrada'],
  ['09:13', 'documentos validados automaticamente'],
  ['11:40', 'parecer técnico anexado · v2'],
  ['14:02', 'aprovação em alçada 2 · assinatura digital'],
  ['16:25', 'repasse de verba programado'],
  ['17:58', 'relatório de resultados publicado'],
];

export default function GovTech() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      // reduced motion: the title is simply there (CSS reduced-motion can't stop GSAP tweens)
      const split = prefersReducedMotion() ? null : SplitText.create('[data-gov-title]', { type: 'lines', mask: 'lines', linesClass: 'line-mask' });
      if (split) {
        gsap.from(split.lines, {
          yPercent: 105,
          duration: 1.2,
          ease: 'expo.out',
          stagger: 0.08,
          scrollTrigger: { trigger: '[data-gov-title]', start: 'top 80%' },
        });
      }

      // the markup ships the finished flow, so it reads the same without JS or with reduced motion;
      // only when motion is welcome do we rewind it and let the scroll play it back
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const steps = gsap.utils.toArray<HTMLElement>('[data-step]');
        const logs = gsap.utils.toArray<HTMLElement>('[data-log]');
        const tl = gsap.timeline({
          scrollTrigger: { trigger: '[data-panel]', start: 'top 70%', end: 'bottom 55%', scrub: 0.6 },
        });
        steps.forEach((s, i) => {
          // each segment fills from this dot to the next one
          const seg = s.querySelector('[data-seg]');
          if (seg) tl.fromTo(seg, { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: 0.8 }, i + 0.2);
          tl.fromTo(
            s.querySelector('[data-dot]'),
            { backgroundColor: '#1e1442', borderColor: 'rgb(253 243 225 / 0.3)' },
            { backgroundColor: '#a6d64b', borderColor: '#a6d64b', duration: 0.2 },
            i,
          )
            .fromTo(s, { opacity: 0.6 }, { opacity: 1, duration: 0.2 }, i)
            .fromTo(s.querySelector('[data-status]'), { opacity: 0 }, { opacity: 1, duration: 0.2 }, i)
            .fromTo(logs[i], { opacity: 0, x: 12 }, { opacity: 1, x: 0, duration: 0.3 }, i);
        });

        gsap.from('[data-pillar]', {
          y: 30,
          autoAlpha: 0,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.06,
          scrollTrigger: { trigger: '[data-pillars]', start: 'top 85%' },
        });
      });

      return () => {
        mm.revert();
        split?.revert();
      };
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="govtech"
      className="sky gutter relative z-20 -mt-8 overflow-hidden rounded-t-[2rem] border-t-[3px] border-toon py-[clamp(5rem,10vw,9rem)]"
    >
      <div className="grid-floor !h-[30%] opacity-60" aria-hidden />

      <div className="relative grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <span className="label">(IV) Setor público</span>
            <h2
              data-gov-title
              className="mt-8 text-[clamp(2.5rem,5.6vw,5.5rem)] leading-[0.92] font-medium tracking-[-0.05em]"
            >
              Sistemas públicos com <span className="font-groovy text-[0.85em] tracking-normal text-cyan [text-shadow:4px_4px_0_#120626]">padrão de produto.</span>
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-ink/70">
              Software público costuma ser lento, confuso e caro de manter. Levamos o rigor de produto para dentro
              do governo: fluxos claros para o servidor, transparência para o cidadão e rastreabilidade para o
              controle.
            </p>

            <div className="toon mt-10 rounded-2xl bg-bg-2/80 p-6 backdrop-blur-sm">
              <span className="label">Para quem construímos</span>
              <ul className="mt-4 flex flex-wrap gap-2">
                {['Secretarias', 'Autarquias', 'Universidades públicas', 'Fundações', 'Consórcios', 'Câmaras'].map((a) => (
                  <li key={a} className="toon-sm rounded-full bg-lemon px-3 py-1 text-sm text-acid-ink">
                    {a}
                  </li>
                ))}
              </ul>
              <p className="mt-5 leading-relaxed text-ink/65">
                Ao lado, um exemplo de fluxo: gestão de projetos e repasse de verbas, da solicitação à prestação de
                resultados, com cada passo auditável.
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          {/* Illustrative case-file panel, dressed as a Windows 95 window */}
          <div data-panel className="win">
            <div className="win-bar">
              <span className="truncate">PROCESSO_2026-0142.exe</span>
              <span className="ml-auto flex gap-1" aria-hidden>
                <span className="win-btn">_</span>
                <span className="win-btn">□</span>
                <span className="win-btn">×</span>
              </span>
            </div>
            <div className="m-1.5 border-2 border-[#7d7394] bg-acid-ink">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <span className="label">Gestão de projetos e verbas</span>
              <span className="rounded-full border border-mint/50 px-2.5 py-0.5 font-mono text-[0.65rem] text-mint uppercase">
                em andamento
              </span>
            </div>

            <div className="grid md:grid-cols-[1.1fr_1fr]">
              <ol className="p-6 md:p-8">
                {govFlow.map((step, i) => (
                  <li key={step} data-step className="relative flex items-center gap-5 py-3.5">
                    {/* rail segment anchored to this dot's center, reaching the next dot's center */}
                    {i < govFlow.length - 1 && (
                      <span aria-hidden className="absolute top-1/2 left-[6px] h-full w-[2px] bg-ink/15">
                        <span data-seg className="block h-full w-full origin-top bg-mint" />
                      </span>
                    )}
                    <span
                      data-dot
                      className="relative z-10 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-mint bg-mint"
                    />
                    <span className="flex-1 text-lg tracking-tight">{step}</span>
                    <span data-status className="font-mono text-[0.65rem] text-mint uppercase">
                      ✓ {String(i + 1).padStart(2, '0')}
                    </span>
                  </li>
                ))}
              </ol>
              <div className="border-t border-line p-6 md:border-t-0 md:border-l md:p-8">
                <span className="label">Trilha de auditoria</span>
                <ul className="mt-5 space-y-3 font-mono text-[0.72rem] leading-snug">
                  {audit.map(([time, entry]) => (
                    <li key={entry} data-log>
                      <span className="text-muted">{time} ·</span> <span className="text-ink/85">{entry}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            </div>
          </div>

          {/* phones: one card with six rows (about a screen shorter); from sm up, six cards in a grid */}
          <ul
            data-pillars
            className="mt-8 grid divide-y divide-acid-ink/15 rounded-xl border-[2.5px] border-toon bg-paper shadow-[4px_4px_0_var(--color-toon)] sm:grid-cols-2 sm:gap-4 sm:divide-y-0 sm:rounded-none sm:border-0 sm:bg-transparent sm:shadow-none"
          >
            {govPillars.map((p) => (
              <li
                key={p.k}
                data-pillar
                className="px-5 py-3.5 text-acid-ink sm:rounded-xl sm:border-[2.5px] sm:border-toon sm:bg-paper sm:p-5 sm:shadow-[4px_4px_0_var(--color-toon)]"
              >
                <span className="font-groovy text-base text-[#c2410c] sm:text-lg">{p.k}</span>
                <p className="mt-0.5 text-[0.95rem] leading-snug text-acid-ink/80 sm:mt-1 sm:text-base sm:leading-normal">{p.v}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
