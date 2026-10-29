import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import GhostWitness from '@/components/GhostWitness';
import LostClue from '@/components/LostClue';
import LostSuspect from '@/components/LostSuspect';
import LostWindow from '@/components/LostWindow';

export const metadata: Metadata = {
  title: 'Caso não encontrado',
  robots: { index: false, follow: true },
  // the root layout points canonical and og:url at the home page; a 404 must not claim to be it
  alternates: { canonical: null },
  openGraph: { url: null },
};

const links = [
  { label: 'Página inicial', href: '/' },
  { label: 'Casos resolvidos', href: '/casos' },
  { label: 'Sistemas sob medida', href: '/servicos/sistemas-sob-medida' },
  { label: 'Abrir um caso', href: '/#contato' },
];

export default function NotFound() {
  return (
    <>
      <main id="conteudo" tabIndex={-1} className="sky relative flex min-h-[100svh] items-center overflow-hidden text-ink">
        <div className="grid-floor !h-[32%] opacity-60" aria-hidden />
        {/* the missing page is a crime scene: the same tape that cordons off the home's mystery board */}
        <div
          aria-hidden
          className="tape absolute top-24 -left-10 w-[130%] -rotate-[2deg] py-1.5 font-mono text-xs font-bold tracking-[0.25em] whitespace-nowrap uppercase"
        >
          {'Página desaparecida · arquivo 404 · não ultrapasse · '.repeat(10)}
        </div>
        {/* a ghost detective sweeping the floor with a magnifier, looking for the lost page */}
        <GhostWitness />
        <div className="gutter relative mx-auto w-full max-w-5xl py-32">
          <LostWindow>
            <p>A página que você procura sumiu sem deixar pistas.</p>
            <LostSuspect />
          </LostWindow>

          <p className="label mt-12 !text-teal">404 · Arquivo de casos</p>
          <h1 className="mt-4 text-[clamp(3rem,9vw,8rem)] leading-[0.9] font-medium tracking-[-0.05em]">
            Caso{' '}
            <span className="font-groovy text-[0.85em] tracking-normal text-acid [text-shadow:5px_5px_0_#140a26]">não encontrado.</span>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink/75">
            Vasculhamos o museu inteiro e esta página não está aqui. Mas algumas pistas levam a lugares que existem:
          </p>
          <LostClue />
          <ul className="mt-8 flex flex-wrap gap-3">
            {links.map((l, i) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className={`toon-sm toon-press inline-block rounded-full px-5 py-2.5 font-medium text-acid-ink ${i === 0 ? 'bg-acid' : 'bg-paper'}`}
                >
                  {l.label} →
                </a>
              </li>
            ))}
          </ul>
          {/* a lost visitor is a bored visitor: the side projects make a fair consolation prize */}
          <p className="mt-6 text-ink/75">
            Já que se perdeu, que tal uma partida?{' '}
            <a href="/passatempo" className="font-medium text-acid underline decoration-2 underline-offset-4 hover:text-ink">
              <span aria-hidden>🕹</span> Passa tempo →
            </a>
          </p>
          {/* on phones the witness sits under the clues (tap anywhere to startle it) */}
          <GhostWitness className="pointer-events-none mx-auto mt-24 block w-40 lg:hidden" />
        </div>
      </main>
      <Footer />
    </>
  );
}
