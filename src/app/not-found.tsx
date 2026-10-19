import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import LostClue from '@/components/LostClue';

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
        {/* a ghost detective sweeping the floor with a magnifier, looking for the lost page */}
        <svg
          viewBox="0 0 260 300"
          aria-hidden
          className="ghost-bob pointer-events-none absolute top-1/2 right-[6vw] hidden w-[clamp(14rem,22vw,20rem)] -translate-y-1/2 lg:block"
        >
          <ellipse cx="120" cy="288" rx="70" ry="8" fill="#140a26" opacity="0.35" />
          <path
            d="M40 250 V120 a80 80 0 0 1 160 0 V250 l-20 -18 l-20 22 l-20 -22 l-20 22 l-20 -22 l-20 22 l-20 -22 z"
            fill="#eef6d2"
            stroke="#140a26"
            strokeWidth="6"
            strokeLinejoin="round"
          />
          <path d="M58 124 a62 62 0 0 1 40 -58" fill="none" stroke="#fff" strokeWidth="8" strokeLinecap="round" opacity="0.8" />
          {/* eyes peeking down at the lens */}
          <ellipse cx="96" cy="118" rx="14" ry="18" fill="#fff" stroke="#140a26" strokeWidth="5" />
          <ellipse cx="146" cy="118" rx="14" ry="18" fill="#fff" stroke="#140a26" strokeWidth="5" />
          <circle cx="92" cy="126" r="7" fill="#140a26" />
          <circle cx="142" cy="126" r="7" fill="#140a26" />
          <path d="M80 94 q16 -10 30 0 M132 94 q16 -10 30 0" fill="none" stroke="#140a26" strokeWidth="5" strokeLinecap="round" />
          <path d="M108 160 q12 -8 24 0" fill="none" stroke="#140a26" strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="78" cy="148" rx="9" ry="5" fill="#f7931e" opacity="0.5" />
          <ellipse cx="164" cy="148" rx="9" ry="5" fill="#f7931e" opacity="0.5" />
          {/* arm and magnifier */}
          <path d="M60 190 q-30 10 -30 40" fill="none" stroke="#140a26" strokeWidth="6" strokeLinecap="round" />
          <line x1="34" y1="222" x2="12" y2="252" stroke="#140a26" strokeWidth="10" strokeLinecap="round" />
          <line x1="34" y1="222" x2="12" y2="252" stroke="#f7931e" strokeWidth="5" strokeLinecap="round" />
          <circle cx="50" cy="196" r="28" fill="#3cc6b4" fillOpacity="0.35" stroke="#140a26" strokeWidth="7" />
          <path d="M36 186 a16 16 0 0 1 14 -10" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
          {/* question mark floating above */}
          <text x="210" y="60" fontFamily="var(--font-shrikhand), serif" fontSize="56" fill="#f9e27d" stroke="#140a26" strokeWidth="3" paintOrder="stroke">
            ?
          </text>
        </svg>
        <div className="gutter relative mx-auto w-full max-w-5xl py-32">
          <div className="win max-w-xl">
            <div className="win-bar">
              <span>ERRO_404.exe</span>
              <span className="win-btn ml-auto" aria-hidden>
                ×
              </span>
            </div>
            <div className="m-1.5 border-2 border-[#7d7394] bg-paper p-6 font-mono text-sm text-acid-ink">
              <p>A página que você procura sumiu sem deixar pistas.</p>
              <p className="mt-2 opacity-60">Suspeito principal: um link antigo ou digitado errado.</p>
            </div>
          </div>

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
        </div>
      </main>
      <Footer />
    </>
  );
}
