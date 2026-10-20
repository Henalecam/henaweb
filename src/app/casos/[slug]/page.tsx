import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { projects, site } from '@/lib/content';
import { serviceBySlug } from '@/lib/services';
import Footer from '@/components/Footer';
import Stamp from '@/components/Stamp';
import ShareCase from '@/components/ShareCase';
import CaseKeys from '@/components/CaseKeys';
import { ArchiveReturn, MarkRead, UnreadHint } from '@/components/ReadMarks';
import FullShot, { MaximizeButton, ZoomArea } from '@/components/FullShot';
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
  // the one-line summary fits a search snippet (~155 chars); challenge + built ran past 180 and got cut
  const path = `/casos/${p.slug}`;
  return {
    title,
    description: p.summary,
    alternates: { canonical: path },
    openGraph: { type: 'article', url: path, title: `${title} · HenaWeb`, description: p.summary, locale: 'pt_BR', siteName: 'HenaWeb' },
    twitter: { card: 'summary_large_image', title: `${title} · HenaWeb`, description: p.summary },
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
  const prev = projects[(i - 1 + projects.length) % projects.length];

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
      <main id="conteudo" tabIndex={-1} className="sky min-h-screen text-ink">
        <article className="gutter mx-auto max-w-6xl pt-36 pb-24">
          <nav aria-label="Trilha" className="label">
            <ol className="flex flex-wrap gap-2">
              <li>
                <a href="/" className="hover:text-ink">Início</a>
              </li>
              <li aria-hidden>·</li>
              <li>
                <a href="/casos" data-archive-link className="hover:text-ink">Casos</a>
              </li>
              <li aria-hidden>·</li>
              <li aria-current="page" className="text-ink">{p.name}</li>
            </ol>
          </nav>

          <p className="label mt-8 !text-teal">
            Caso nº {String(i + 1).padStart(2, '0')}
            <span className="text-ink/60"> de {String(projects.length).padStart(2, '0')}</span> · {p.kind}
          </p>
          {/* the whole archive at a glance: one dot per case, this one lit; each dot jumps straight to its case */}
          <nav aria-label="Casos do arquivo" className="mt-3 -ml-1.5" data-print-hide>
            <ol className="flex">
              {projects.map((c, k) => (
                <li key={c.slug}>
                  <a
                    href={`/casos/${c.slug}`}
                    aria-current={c.slug === p.slug ? 'page' : undefined}
                    title={`Caso nº ${String(k + 1).padStart(2, '0')} · ${c.name}`}
                    className="group/dot grid h-6 w-6 place-items-center"
                  >
                    <span
                      aria-hidden
                      className={`block h-1.5 rounded-full transition-[width,background-color] duration-300 ${
                        c.slug === p.slug ? 'w-4 bg-acid' : 'w-1.5 bg-ink/55 group-hover/dot:bg-ink/90 group-focus-visible/dot:bg-ink/90'
                      }`}
                    />
                    <span className="sr-only">
                      Caso nº {String(k + 1).padStart(2, '0')}: {c.name}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <h1 className="mt-4 text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.9] font-medium tracking-[-0.05em]">
            {p.name}
            <span className="font-groovy text-[0.7em] tracking-normal text-acid [text-shadow:4px_4px_0_#140a26]">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/75 md:text-xl">{p.summary}</p>

          {/* screenshot in a Win95 window, phone overlapping */}
          <div className="relative mt-14">
            {/* arriving from /casos, the case card morphs into this window (see globals.css) */}
            <div className="win [view-transition-class:case-window]" style={{ viewTransitionName: `caso-${p.slug}` }}>
              <div className="win-bar">
                <span className="truncate">{new URL(p.href).hostname}</span>
                <span className="ml-auto flex shrink-0 gap-1">
                  <span className="win-btn" aria-hidden>_</span>
                  {p.shot ? <MaximizeButton /> : <span className="win-btn" aria-hidden>□</span>}
                  <span className="win-btn" aria-hidden>×</span>
                </span>
              </div>
              <div className="relative m-1.5 aspect-[16/9.4] overflow-hidden border-2 border-[#7d7394] bg-acid-ink">
                {p.shot ? (
                  <Image
                    // the window only shows the top of the page: a pre-cropped copy (public/cases/*-top.jpg)
                    // instead of the full-length screenshot that /casos scrolls on hover
                    src={p.shot.desktop.replace(/\.jpg$/, '-top.jpg')}
                    alt={`Tela de ${p.name}`}
                    fill
                    preload
                    fetchPriority="high" sizes="(max-width: 1200px) 92vw, 1100px" className="object-cover object-top" />
                ) : (
                  p.mock && <MockUI variant={p.mock.variant} hue={p.mock.hue} />
                )}
                {p.shot && <ZoomArea />}
              </div>
            </div>
            {p.shot && (
              <div className="toon absolute -right-2 -bottom-8 aspect-[390/844] w-[24%] max-w-[220px] overflow-hidden rounded-[1.4rem] bg-black md:-right-6">
                <Image src={p.shot.mobile} alt={`${p.name} no celular`} fill sizes="(max-width: 1000px) 22vw, 220px" className="object-cover object-top" />
              </div>
            )}
          </div>
          {p.shot && (
            <FullShot name={p.name} host={new URL(p.href).hostname} desktop={p.shot.desktop} mobile={p.shot.mobile} height={p.shot.height} />
          )}

          <div className="mt-16 grid gap-5 md:grid-cols-2">
            <section className="toon rounded-2xl bg-paper p-7 text-acid-ink" aria-labelledby="misterio">
              <h2 id="misterio" className="font-groovy text-2xl text-[#c2410c]">O mistério</h2>
              <p className="mt-3 text-lg leading-relaxed text-acid-ink/80">{p.challenge}</p>
            </section>
            <section className="toon relative rounded-2xl bg-lemon p-7 text-acid-ink" aria-labelledby="resolvido">
              <h2 id="resolvido" className="font-groovy text-2xl text-[#1f6f63]">Caso resolvido</h2>
              <p className="mt-3 text-lg leading-relaxed text-acid-ink/85">{p.built}</p>
              <Stamp className="-top-4 right-5 border-[#1f6f63] bg-lemon text-[#1f6f63]">Encerrado ✓</Stamp>
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

          <div className="mt-16 flex flex-wrap gap-3" data-print-hide>
            <a href={p.href} target="_blank" rel="noopener noreferrer" className="toon toon-press rounded-full bg-acid px-6 py-4 font-medium text-acid-ink">
              Visitar {p.name} ↗
            </a>
            <a href="/#contato" className="toon toon-press rounded-full bg-cyan px-6 py-4 font-medium text-acid-ink">
              Abrir um caso parecido →
            </a>
            <ShareCase title={`${p.name} · caso resolvido pela HenaWeb`} text={p.summary} />
          </div>

          <MarkRead slug={p.slug} />
          <ArchiveReturn />
          <CaseKeys prev={`/casos/${prev.slug}`} next={`/casos/${next.slug}`} />
          <nav aria-label="Relacionados" data-print-hide className="mt-24 grid gap-4 border-t border-line pt-10 md:grid-cols-3">
            <a href={`/casos/${prev.slug}`} rel="prev" aria-keyshortcuts="ArrowLeft" className="toon-sm toon-press group rounded-2xl bg-bg-2/80 p-6">
              <CasePeek p={prev} />
              <span className="label">Caso anterior</span>
              <span data-read-mark={prev.slug} hidden className="ml-2 align-middle font-mono text-xs text-acid">
                ✓ lido
              </span>
              <span className="mt-2 block text-2xl font-medium tracking-tight">← {prev.name}</span>
            </a>
            {service && (
              <a href={`/servicos/${service.slug}`} className="toon-sm toon-press rounded-2xl bg-bg-2/80 p-6">
                <span className="label">Serviço</span>
                <span className="mt-2 block text-2xl font-medium tracking-tight">{service.name} →</span>
              </a>
            )}
            <a href={`/casos/${next.slug}`} rel="next" aria-keyshortcuts="ArrowRight" className="toon-sm toon-press group rounded-2xl bg-bg-2/80 p-6 md:text-right">
              <CasePeek p={next} />
              <span className="label">Próximo caso</span>
              <span data-read-mark={next.slug} hidden className="ml-2 align-middle font-mono text-xs text-acid">
                ✓ lido
              </span>
              <span className="mt-2 block text-2xl font-medium tracking-tight">{next.name} →</span>
            </a>
          </nav>
          <UnreadHint cases={projects.map((c) => ({ slug: c.slug, name: c.name }))} current={p.slug} />
          <p className="label mt-5 hidden text-center lg:block" aria-hidden data-print-hide>
            Dica: use <kbd className="font-mono">←</kbd> <kbd className="font-mono">→</kbd> para folhear os casos
          </p>
          <p className="label mt-5 hidden text-center pointer-coarse:block lg:!hidden" aria-hidden data-print-hide>
            Dica: deslize para os lados para folhear os casos
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}

/** A glimpse of the neighbouring case's screen on the prev/next links (cases without a capture show none). */
function CasePeek({ p }: { p: (typeof projects)[number] }) {
  if (!p.shot) return null;
  return (
    <span className="mb-4 block aspect-[16/8] overflow-hidden rounded-lg border-2 border-[#7d7394] bg-acid-ink" aria-hidden>
      <Image
        src={p.shot.desktop.replace(/\.jpg$/, '-top.jpg')}
        alt=""
        width={720}
        height={360}
        sizes="(max-width: 768px) 88vw, 340px"
        className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04] group-focus-visible:scale-[1.04]"
      />
    </span>
  );
}
