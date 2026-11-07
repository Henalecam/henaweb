import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Footer from '@/components/Footer';
import ClosingCta from '@/components/ClosingCta';
import ShareCase from '@/components/ShareCase';
import Markdown from '@/components/blog/Markdown';
import { site } from '@/lib/site';
import { serviceBySlug } from '@/lib/services';
import { dateBR, postBySlug, visiblePosts } from '@/lib/blog';

export const dynamicParams = false;

export function generateStaticParams() {
  return visiblePosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<'/blog/[slug]'>): Promise<Metadata> {
  const { slug } = await params;
  const p = postBySlug(slug);
  if (!p) return {};
  const path = `/blog/${p.slug}`;
  const images = p.cover ? [{ url: p.cover, alt: p.coverAlt }] : undefined;
  return {
    title: p.title,
    description: p.description,
    authors: [{ name: p.author }],
    keywords: p.tags,
    // a draft only ever shows on previews: never indexed even if a preview URL leaks
    robots: p.draft ? { index: false, follow: false } : undefined,
    alternates: { canonical: path, types: { 'text/markdown': `${path}.md` } },
    openGraph: {
      type: 'article',
      url: path,
      title: `${p.title} · HenaWeb`,
      description: p.description,
      locale: 'pt_BR',
      siteName: 'HenaWeb',
      publishedTime: p.date,
      modifiedTime: p.updated ?? p.date,
      authors: [p.author],
      tags: p.tags,
      images,
    },
    twitter: { card: 'summary_large_image', title: `${p.title} · HenaWeb`, description: p.description, images: p.cover ? [p.cover] : undefined },
  };
}

export default async function PostPage({ params }: PageProps<'/blog/[slug]'>) {
  const { slug } = await params;
  const p = postBySlug(slug);
  if (!p) notFound();
  const url = `${site.url}/blog/${p.slug}`;
  const service = p.service ? serviceBySlug(p.service) : undefined;
  const others = visiblePosts()
    .filter((o) => o.slug !== p.slug)
    // the same subject first (shared tags or service), then the newest
    .map((o) => ({ o, score: o.tags.filter((t) => p.tags.includes(t)).length + (o.service && o.service === p.service ? 1 : 0) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((x) => x.o);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        '@id': `${url}#post`,
        headline: p.title,
        description: p.description,
        abstract: p.answer,
        url,
        mainEntityOfPage: url,
        inLanguage: 'pt-BR',
        datePublished: p.date,
        dateModified: p.updated ?? p.date,
        wordCount: p.words,
        timeRequired: `PT${p.minutes}M`,
        keywords: p.tags.join(', '),
        image: p.cover ? `${site.url}${p.cover}` : `${site.url}/blog/${p.slug}/opengraph-image`,
        author: { '@type': 'Person', name: p.author, worksFor: { '@id': `${site.url}/#organization` } },
        publisher: { '@id': `${site.url}/#organization` },
        isPartOf: { '@id': `${site.url}/blog#blog` },
        about: service ? { '@type': 'Service', name: service.name, url: `${site.url}/servicos/${service.slug}` } : undefined,
        // the same piece published on the social profiles (the other content tool): one work, several addresses
        sameAs: [p.instagram, p.linkedin].filter(Boolean),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: site.url },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${site.url}/blog` },
          { '@type': 'ListItem', position: 3, name: p.title, item: url },
        ],
      },
      ...(p.faq.length
        ? [
            {
              '@type': 'FAQPage',
              '@id': `${url}#perguntas`,
              mainEntity: p.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main id="conteudo" tabIndex={-1} className="sky min-h-screen overflow-x-clip text-ink">
        <article className="gutter mx-auto max-w-6xl pt-36 pb-24">
          <nav aria-label="Trilha" className="label">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <a href="/" className="-my-1.5 inline-block py-1.5 hover:text-ink">
                  Início
                </a>
              </li>
              <li aria-hidden>·</li>
              <li>
                <a href="/blog" className="-my-1.5 inline-block py-1.5 hover:text-ink">
                  Blog
                </a>
              </li>
              <li aria-hidden>·</li>
              <li aria-current="page" className="max-w-[40ch] truncate text-ink">
                {p.title}
              </li>
            </ol>
          </nav>

          {p.draft && (
            <p role="note" className="mt-6 inline-block rounded-md bg-lemon px-3 py-1.5 font-mono text-xs font-bold text-acid-ink">
              RASCUNHO · visível só no preview, fora do site publicado e das buscas
            </p>
          )}

          <header className="mt-8 max-w-3xl">
            <p className="label !text-teal">
              <time dateTime={p.date}>{dateBR(p.date)}</time>
              {p.updated && p.updated !== p.date && (
                <>
                  {' '}
                  · revisado em <time dateTime={p.updated}>{dateBR(p.updated)}</time>
                </>
              )}{' '}
              · {p.minutes} min de leitura
            </p>
            <h1 className="mt-4 text-[clamp(2.2rem,5.5vw,4.5rem)] leading-[0.95] font-medium tracking-[-0.045em]">{p.title}</h1>
            <p className="mt-5 text-lg leading-relaxed text-ink/75">
              Por <span className="text-ink">{p.author}</span>, HenaWeb
            </p>
          </header>

          {/* the direct answer first: what a reader in a hurry (and an AI answer engine) takes away */}
          <aside aria-label="Resposta rápida" className="win mt-10 max-w-3xl">
            <div className="win-bar">
              <span>resposta_rapida.txt</span>
            </div>
            <p className="m-1.5 border-2 border-[#7d7394] bg-paper p-5 text-lg leading-relaxed text-acid-ink">{p.answer}</p>
          </aside>

          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            {p.toc.filter((h) => h.level === 2).length >= 3 && (
              <nav aria-label="Neste artigo" className="lg:sticky lg:top-28 lg:order-2 lg:col-span-4 lg:self-start" data-print-hide>
                <p className="label">Neste artigo</p>
                <ol className="mt-3 space-y-1.5 border-l-2 border-ink/15 pl-4 text-sm">
                  {p.toc
                    .filter((h) => h.level === 2)
                    .map((h) => (
                      <li key={h.id}>
                        <a href={`#${h.id}`} className="text-ink/75 hover:text-ink hover:underline">
                          {h.text}
                        </a>
                      </li>
                    ))}
                </ol>
              </nav>
            )}
            <div data-post-body className="post-body lg:order-1 lg:col-span-8">
              <Markdown blocks={p.blocks} />
            </div>
          </div>

          <footer className="mt-14 flex max-w-3xl flex-wrap items-center gap-x-6 gap-y-3 border-t border-ink/15 pt-6">
            {p.tags.length > 0 && (
              <ul aria-label="Assuntos" className="flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <li key={t} className="rounded-full border border-ink/25 px-2.5 py-0.5 font-mono text-[0.7rem] tracking-wide text-ink/75">
                    {t}
                  </li>
                ))}
              </ul>
            )}
            <ShareCase title={p.title} text={p.description} label="Enviar este artigo ↗" placement="post-share" />
            {(p.instagram || p.linkedin) && (
              <p className="label">
                Também em{' '}
                {[p.instagram && ['Instagram', p.instagram], p.linkedin && ['LinkedIn', p.linkedin]]
                  .filter((x): x is [string, string] => !!x)
                  .map(([name, href], i) => (
                    <span key={name}>
                      {i > 0 && ' · '}
                      <a href={href} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ink">
                        {name}
                        <span className="sr-only"> (abre em nova aba)</span>
                      </a>
                    </span>
                  ))}
              </p>
            )}
          </footer>

          {service && (
            <p className="mt-10 max-w-3xl text-lg leading-relaxed text-ink/80">
              Este assunto é parte do nosso trabalho em{' '}
              <a href={`/servicos/${service.slug}`} className="font-medium text-acid underline underline-offset-4 hover:text-ink">
                {service.name} →
              </a>
            </p>
          )}

          {others.length > 0 && (
            <section aria-labelledby="mais-artigos" className="mt-16" data-print-hide>
              <h2 id="mais-artigos" className="label">
                Continue lendo
              </h2>
              <ul className="mt-4 grid gap-4 md:grid-cols-3">
                {others.map((o) => (
                  <li key={o.slug}>
                    <a href={`/blog/${o.slug}`} className="toon-sm toon-press block h-full rounded-xl bg-paper p-4 text-acid-ink">
                      <span className="block font-medium">{o.title}</span>
                      <span className="mt-1 block font-mono text-xs text-acid-ink/70">{o.minutes} min de leitura</span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <ClosingCta
            title="Quer aplicar isso na"
            accent="sua operação?"
            text="Conte o que está travando o seu negócio. Respondemos com um primeiro diagnóstico e o caminho mais curto até o sistema certo."
            whatsappMessage={`Olá! Li o artigo "${p.title}" no blog da HenaWeb e quero conversar.`}
          />
        </article>
      </main>
      <Footer />
    </>
  );
}
