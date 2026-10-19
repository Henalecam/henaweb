import type { Metadata } from 'next';
import Image from 'next/image';
import { projects, site } from '@/lib/content';
import Footer from '@/components/Footer';
import MockUI from '@/components/MockUI';
import ClosingCta from '@/components/ClosingCta';

const description =
  'Casos resolvidos pela HenaWeb: ERPs, plataformas com IA, agendamento, produtos financeiros e sites. Veja o problema de cada cliente e o que construímos.';

export const metadata: Metadata = {
  title: 'Casos e projetos de software sob medida',
  description,
  alternates: { canonical: '/casos' },
  openGraph: { type: 'website', url: '/casos', title: 'Casos e projetos de software sob medida · HenaWeb', description, locale: 'pt_BR', siteName: 'HenaWeb', images: ['/opengraph-image'] },
};

export default function CasesIndex() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Casos e projetos',
    url: `${site.url}/casos`,
    description,
    hasPart: projects.map((p) => ({ '@type': 'CreativeWork', name: p.name, url: `${site.url}/casos/${p.slug}` })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main id="conteudo" tabIndex={-1} className="sky min-h-screen text-ink">
        <div className="gutter mx-auto max-w-6xl pt-36 pb-24">
          <p className="label !text-teal">Arquivo de casos</p>
          <h1 className="mt-4 text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.9] font-medium tracking-[-0.05em]">
            Casos{' '}
            <span className="font-groovy text-[0.85em] tracking-normal text-acid [text-shadow:4px_4px_0_#140a26]">resolvidos.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/75">{description}</p>

          <ul className="mt-16 grid gap-6 md:grid-cols-2">
            {projects.map((p, i) => (
              <li key={p.slug}>
                <a href={`/casos/${p.slug}`} className="group block">
                  <div className="win transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-1.5 group-hover:-rotate-[0.6deg] group-focus-visible:-translate-y-1.5">
                    <div className="win-bar">
                      <span className="truncate">caso_{String(i + 1).padStart(2, '0')}.exe</span>
                    </div>
                    <div className="relative m-1.5 aspect-[16/10] overflow-hidden border-2 border-[#7d7394] bg-acid-ink">
                      {p.shot ? (
                        <Image
                          src={p.shot.desktop}
                          alt={`Tela de ${p.name}`}
                          fill
                          // the first card is the page's LCP: fetched right away instead of lazily
                          preload={i === 0}
                          fetchPriority={i === 0 ? 'high' : undefined}
                          sizes="(max-width: 768px) 92vw, 540px"
                          className={`object-cover object-top ${
                            // long pages scroll by slowly on hover, like browsing the real site
                            p.shot.height > 1200
                              ? 'transition-[object-position] duration-[6000ms] ease-linear group-hover:object-bottom'
                              : 'transition-transform duration-700 group-hover:scale-[1.03]'
                          }`}
                        />
                      ) : (
                        p.mock && <MockUI variant={p.mock.variant} hue={p.mock.hue} />
                      )}
                    </div>
                  </div>
                  <h2 className="mt-5 text-3xl font-medium tracking-[-0.03em] group-hover:text-acid">{p.name} →</h2>
                  <p className="serif mt-1 text-lg text-ink/60">{p.kind}</p>
                  <p className="mt-2 leading-relaxed text-ink/70">{p.challenge}</p>
                </a>
              </li>
            ))}
          </ul>

          <ClosingCta
            title="Reconheceu o seu problema em algum"
            accent="desses casos?"
            text="Conte o que está travando a sua operação. Respondemos com um primeiro diagnóstico e o caminho mais curto até o sistema certo."
            whatsappMessage="Olá! Vi os casos da HenaWeb e quero conversar sobre um projeto."
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
