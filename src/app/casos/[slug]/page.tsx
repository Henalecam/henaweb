import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { projects, site } from '@/lib/content';
import { serviceBySlug } from '@/lib/services';
import Footer from '@/components/Footer';
import MockUI from '@/components/MockUI';

export const dynamicParams = false;

const bySlug = (slug: string) => projects.find((p) => p.slug === slug);

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<'/casos/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) return {};
  const title = `${p.name}: ${p.kind}`;
  const description = `${p.challenge} ${p.built}`;
  const path = `/casos/${p.slug}`;
  const images = p.shot ? [p.shot.desktop] : ['/opengraph-image'];
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'article', url: path, title: `${title} · HenaWeb`, description, locale: 'pt_BR', siteName: 'HenaWeb', images },
    twitter: { card: 'summary_large_image', title: `${title} · HenaWeb`, description, images },
  };
}

export default async function CasePage({ params }: PageProps<'/casos/[slug]'>) {
  const { slug } = await params;
  const p = bySlug(slug);
  if (!p) notFound();
  const service = serviceBySlug(p.service);
  const url = `${site.url}/casos/${p.slug}`;
  const i = projects.indexOf(p);
  const next = projects[(i + 1) % projects.length];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${url}#case`,
        name: p.name,
        headline: `${p.name}: ${p.kind}`,
        description: p.summary,
        url,
        inLanguage: 'pt-BR',
        image: p.shot ? `${site.url}${p.shot.desktop}` : undefined,
        creator: { '@id': `${site.url}/#organization` },
        keywords: p.highlights.join(', '),
        sameAs: p.href,
        about: service ? { '@type': 'Service', name: service.name, url: `${site.url}/servicos/${service.slug}` } : undefined,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: site.url },
          { '@type': 'ListItem', position: 2, name: 'Casos', item: `${site.url}/casos` },
          { '@type': 'ListItem', position: 3, name: p.name, item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="sky min-h-screen text-ink">
        <article className="gutter mx-auto max-w-6xl pt-36 pb-24">
          <nav aria-label="Trilha" className="label">
            <ol className="flex flex-wrap gap-2">
              <li>
                <a href="/" className="hover:text-ink">Início</a>
              </li>
              <li aria-hidden>·</li>
              <li>
                <a href="/casos" className="hover:text-ink">Casos</a>
              </li>
              <li aria-hidden>·</li>
              <li aria-current="page" className="text-ink">{p.name}</li>
            </ol>
          </nav>

          <p className="label mt-8 !text-teal">Caso nº {String(i + 1).padStart(2, '0')} · {p.kind}</p>
          <h1 className="mt-4 text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.9] font-medium tracking-[-0.05em]">
            {p.name}
            <span className="font-groovy text-[0.7em] tracking-normal text-acid [text-shadow:4px_4px_0_#140a26]">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/75 md:text-xl">{p.summary}</p>

          {/* screenshot in a Win95 window, phone overlapping */}
          <div className="relative mt-14">
            <div className="win">
              <div className="win-bar">
                <span className="truncate">{new URL(p.href).hostname}</span>
                <span className="ml-auto flex shrink-0 gap-1" aria-hidden>
                  <span className="win-btn">_</span>
                  <span className="win-btn">□</span>
                  <span className="win-btn">×</span>
                </span>
              </div>
              <div className="relative m-1.5 aspect-[16/9.4] overflow-hidden border-2 border-[#7d7394] bg-acid-ink">
                {p.shot ? (
                  <Image src={p.shot.desktop} alt={`Tela de ${p.name}`} fill priority sizes="(max-width: 1200px) 92vw, 1100px" className="object-cover object-top" />
                ) : (
                  p.mock && <MockUI variant={p.mock.variant} hue={p.mock.hue} />
                )}
              </div>
            </div>
            {p.shot && (
              <div className="toon absolute -right-2 -bottom-8 aspect-[390/844] w-[24%] max-w-[220px] overflow-hidden rounded-[1.4rem] bg-black md:-right-6">
                <Image src={p.shot.mobile} alt={`${p.name} no celular`} fill sizes="220px" className="object-cover object-top" />
              </div>
            )}
          </div>

          <div className="mt-24 grid gap-5 md:grid-cols-2">
            <section className="toon rounded-2xl bg-paper p-7 text-acid-ink" aria-labelledby="misterio">
              <h2 id="misterio" className="font-groovy text-2xl text-[#c2410c]">O mistério</h2>
              <p className="mt-3 text-lg leading-relaxed text-acid-ink/80">{p.challenge}</p>
            </section>
            <section className="toon rounded-2xl bg-lemon p-7 text-acid-ink" aria-labelledby="resolvido">
              <h2 id="resolvido" className="font-groovy text-2xl text-[#1f6f63]">Caso resolvido</h2>
              <p className="mt-3 text-lg leading-relaxed text-acid-ink/85">{p.built}</p>
            </section>
          </div>

          <section className="mt-16" aria-labelledby="recursos">
            <h2 id="recursos" className="label">Principais recursos</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {p.highlights.map((h) => (
                <li key={h} className="toon-sm rounded-full bg-paper px-4 py-1.5 text-acid-ink">
                  {h}
                </li>
              ))}
            </ul>
          </section>

          <div className="mt-16 flex flex-wrap gap-3">
            <a href={p.href} target="_blank" rel="noopener noreferrer" className="toon toon-press rounded-full bg-acid px-6 py-4 font-medium text-acid-ink">
              Visitar {p.name} ↗
            </a>
            <a href="/#contato" className="toon toon-press rounded-full bg-cyan px-6 py-4 font-medium text-acid-ink">
              Abrir um caso parecido →
            </a>
          </div>

          <nav aria-label="Relacionados" className="mt-24 grid gap-4 border-t border-line pt-10 md:grid-cols-2">
            {service && (
              <a href={`/servicos/${service.slug}`} className="toon-sm toon-press rounded-2xl bg-bg-2/80 p-6">
                <span className="label">Serviço</span>
                <span className="mt-2 block text-2xl font-medium tracking-tight">{service.name} →</span>
              </a>
            )}
            <a href={`/casos/${next.slug}`} className="toon-sm toon-press rounded-2xl bg-bg-2/80 p-6">
              <span className="label">Próximo caso</span>
              <span className="mt-2 block text-2xl font-medium tracking-tight">{next.name} →</span>
            </a>
          </nav>
        </article>
      </main>
      <Footer />
    </>
  );
}
