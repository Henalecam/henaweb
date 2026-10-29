import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import { pastimes } from '@/lib/pastimes';
import { site } from '@/lib/site';

const description = 'Passa tempo: jogos e experimentos que o Henrique, da HenaWeb, faz nas horas vagas. Fortrex, Arena e Forno, cada um no seu endereço.';

export const metadata: Metadata = {
  title: 'Passa tempo',
  description,
  alternates: { canonical: '/passatempo' },
  openGraph: { type: 'website', url: '/passatempo', title: 'Passa tempo · HenaWeb', description, locale: 'pt_BR', siteName: 'HenaWeb' },
  twitter: { card: 'summary_large_image', title: 'Passa tempo · HenaWeb', description },
};

export default function Passatempo() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Passa tempo',
    url: `${site.url}/passatempo`,
    description,
    inLanguage: 'pt-BR',
    hasPart: pastimes.map((p) => ({ '@type': p.action === 'Jogar' ? 'VideoGame' : 'WebSite', name: p.name, url: p.url })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main id="conteudo" tabIndex={-1} className="sky relative min-h-screen overflow-x-clip text-ink">
        <div className="grid-floor !h-[30%] opacity-50" aria-hidden />
        <div className="gutter relative mx-auto max-w-6xl pt-36 pb-28">
          <p className="label !text-teal">Fliperama da casa</p>
          <h1 className="mt-4 text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.9] font-medium tracking-[-0.05em]">
            Passa{' '}
            <span className="font-groovy text-[0.85em] tracking-normal text-acid [text-shadow:4px_4px_0_#140a26]">tempo.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/75">
            Jogos e experimentos que o Henrique faz nas horas vagas, fora dos projetos de clientes. Escolha uma máquina: cada uma abre em outra aba.
          </p>

          <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {pastimes.map((p, i) => (
              <li key={p.slug}>
                {/* an arcade cabinet in a Win95 window: the whole card is the link, named by the game */}
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${p.action} ${p.name} (abre em nova aba)`}
                  className="group block"
                >
                  <div className="win transition-transform duration-300 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5 group-hover:-rotate-[0.6deg] group-focus-visible:-translate-y-1.5">
                    <div className="win-bar">
                      <span aria-hidden className="mr-auto truncate">{p.slug}.exe</span>
                      <span aria-hidden className="flex shrink-0 gap-1">
                        <span className="win-btn">_</span>
                        <span className="win-btn">□</span>
                        <span className="win-btn">×</span>
                      </span>
                    </div>
                    <div
                      aria-hidden
                      className="relative m-1.5 aspect-[4/3] overflow-hidden border-2 border-[#7d7394]"
                      style={{ background: `linear-gradient(180deg, ${p.from} 0%, ${p.from} 45%, ${p.to} 100%)` }}
                    >
                      {/* attract screen: a sunset grid, the title in the marquee font and a blinking prompt */}
                      <div
                        className="arcade-floor absolute inset-x-0 bottom-0 h-[45%] opacity-60 [background:linear-gradient(transparent_0_calc(100%-2px),var(--g)_0)_0_0/100%_22px,linear-gradient(90deg,transparent_0_calc(100%-2px),var(--g)_0)_0_0/36px_100%] [transform:perspective(220px)_rotateX(55deg)] origin-bottom"
                        style={{ '--g': p.accent } as React.CSSProperties}
                      />
                      <div className="arcade-sun absolute top-[18%] left-1/2 h-24 w-24 -translate-x-1/2 rounded-full opacity-90 [background:repeating-linear-gradient(180deg,var(--s)_0_9px,transparent_9px_13px)]" style={{ '--s': p.accent } as React.CSSProperties} />
                      <p className="font-groovy absolute inset-x-0 top-[42%] text-center text-[clamp(2.4rem,5vw,3.4rem)] leading-none text-paper [text-shadow:4px_4px_0_#140a26] transition-transform duration-300 group-hover:scale-105">
                        {p.name}
                      </p>
                      <p className="absolute inset-x-0 bottom-4 text-center font-mono text-xs tracking-[0.3em] text-paper uppercase">
                        <span className="motion-safe:animate-[blink_1.2s_steps(1,end)_infinite]">▸ press start</span>
                      </p>
                      {/* CRT scanlines */}
                      <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgb(0_0_0/0.22)_0_1px,transparent_1px_3px)]" />
                      <span className="absolute top-2 left-2 font-mono text-[0.6rem] tracking-widest text-paper/80">P{i + 1} · 1 crédito</span>
                    </div>
                    {/* control deck: joystick, two buttons and a coin slot — pointing at the cabinet drops the coin in */}
                    <div aria-hidden className="arcade-deck mx-1.5 mb-1.5 flex h-10 items-center gap-3 border-2 border-[#7d7394] bg-[#2a2140] px-3" style={{ '--a': p.accent } as React.CSSProperties}>
                      <span className="arcade-stick relative h-6 w-4">
                        <span className="absolute bottom-0 left-1/2 h-1.5 w-4 -translate-x-1/2 rounded-full bg-black/60" />
                        <span className="absolute bottom-1 left-1/2 h-4 w-1 -translate-x-1/2 bg-[#c9c3d6]" />
                        <span className="absolute top-0 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[var(--a)] shadow-[inset_-1px_-1px_0_rgb(0_0_0/0.35)]" />
                      </span>
                      <span className="arcade-btn h-3.5 w-3.5 rounded-full bg-[var(--a)] shadow-[0_2px_0_rgb(0_0_0/0.55)]" />
                      <span className="arcade-btn h-3.5 w-3.5 rounded-full bg-paper/85 shadow-[0_2px_0_rgb(0_0_0/0.55)]" />
                      <span className="ml-auto flex items-center gap-2 font-mono text-[0.6rem] tracking-widest text-paper/70 uppercase">
                        <span className="arcade-credit">insert coin</span>
                        <span className="relative h-6 w-3 rounded-[2px] border border-black/60 bg-[#140a26]">
                          <span className="absolute top-0.5 bottom-0.5 left-[calc(50%-1px)] w-0.5 bg-black" />
                          {/* positioned with left/top only: the drop animates `translate`, which Tailwind's centring would share */}
                          <span className="arcade-coin absolute -top-5 left-[calc(50%-2px)] h-4 w-1 rounded-full bg-[#f9e27d]" />
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="mt-5 flex items-baseline justify-between gap-4">
                    <span>
                      <span className="block text-3xl font-medium tracking-[-0.03em] group-hover:text-acid group-focus-visible:text-acid">{p.name}</span>
                      <span className="mt-1 block font-mono text-sm text-ink/65">{p.url.replace('https://', '')}</span>
                    </span>
                    <span className="toon-sm toon-press shrink-0 rounded-full bg-acid px-5 py-2.5 font-medium text-acid-ink">
                      {p.action} <span aria-hidden>↗</span>
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>

          <p className="label mt-16 text-center">Feito por diversão · cada jogo vive no seu próprio endereço</p>
        </div>
      </main>
      <Footer />
    </>
  );
}
