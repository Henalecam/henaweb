import type { Metadata } from 'next';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Caso não encontrado',
  robots: { index: false, follow: true },
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
