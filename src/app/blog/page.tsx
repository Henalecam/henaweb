import type { Metadata } from 'next';
import Footer from '@/components/Footer';
import ClosingCta from '@/components/ClosingCta';
import { site } from '@/lib/site';
import { dateBR, publishedPosts, visiblePosts } from '@/lib/blog';

const description =
  'Artigos da HenaWeb sobre sistemas sob medida, automação com IA, setor público e produtos digitais: decisões técnicas explicadas sem jargão.';

export function generateMetadata(): Metadata {
  return {
    title: 'Blog: engenharia de software sem jargão',
    description,
    // an empty blog is a thin page: kept out of the index until the first post is published
    robots: publishedPosts().length ? undefined : { index: false, follow: true },
    alternates: { canonical: '/blog', types: { 'application/rss+xml': [{ url: '/blog/feed.xml', title: 'HenaWeb · Blog' }] } },
    openGraph: { type: 'website', url: '/blog', title: 'Blog · HenaWeb', description, locale: 'pt_BR', siteName: 'HenaWeb' },
    twitter: { card: 'summary_large_image', title: 'Blog · HenaWeb', description },
  };
}

export default function BlogIndex() {
  const posts = visiblePosts();
  const tags = [...new Set(posts.flatMap((p) => p.tags))].sort((a, b) => a.localeCompare(b, 'pt-BR'));
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Blog',
        '@id': `${site.url}/blog#blog`,
        name: 'Blog da HenaWeb',
        url: `${site.url}/blog`,
        description,
        inLanguage: 'pt-BR',
        publisher: { '@id': `${site.url}/#organization` },
        blogPost: publishedPosts().map((p) => ({
          '@type': 'BlogPosting',
          headline: p.title,
          url: `${site.url}/blog/${p.slug}`,
          datePublished: p.date,
          dateModified: p.updated ?? p.date,
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: site.url },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: `${site.url}/blog` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main id="conteudo" tabIndex={-1} className="sky min-h-screen text-ink">
        <div className="gutter mx-auto max-w-6xl pt-36 pb-24">
          <nav aria-label="Trilha" className="label">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <a href="/" className="-my-1.5 inline-block py-1.5 hover:text-ink">
                  Início
                </a>
              </li>
              <li aria-hidden>·</li>
              <li aria-current="page" className="text-ink">
                Blog
              </li>
            </ol>
          </nav>
          <p className="label mt-8 !text-teal">Diário de bordo</p>
          <h1 className="mt-4 text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.9] font-medium tracking-[-0.05em]">
            Blog <span className="font-groovy text-[0.85em] tracking-normal text-acid [text-shadow:4px_4px_0_#140a26]">sem jargão.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/75">{description}</p>
          {tags.length > 0 && (
            <ul aria-label="Assuntos" className="mt-6 flex flex-wrap gap-1.5">
              {tags.map((t) => (
                <li key={t} className="rounded-full border border-ink/25 px-2.5 py-0.5 font-mono text-[0.7rem] tracking-wide text-ink/75">
                  {t}
                </li>
              ))}
            </ul>
          )}

          {posts.length === 0 ? (
            <div className="win mt-14 max-w-xl">
              <div className="win-bar">
                <span>blog/ (vazio)</span>
              </div>
              <p className="m-1.5 border-2 border-[#7d7394] bg-paper p-5 text-acid-ink">
                Os primeiros artigos estão sendo escritos. Enquanto isso, veja os{' '}
                <a href="/casos" className="font-medium underline underline-offset-4">
                  casos resolvidos
                </a>
                .
              </p>
            </div>
          ) : (
            <ol className="mt-14 grid gap-6 md:grid-cols-2">
              {posts.map((p) => (
                <li key={p.slug} className="win group relative flex min-w-0 flex-col">
                  <div className="win-bar">
                    <span className="min-w-0 truncate">{p.slug}.md</span>
                    {p.draft && <span className="ml-auto rounded-sm bg-lemon px-1.5 font-bold text-acid-ink">RASCUNHO</span>}
                  </div>
                  <article className="m-1.5 flex flex-1 flex-col border-2 border-[#7d7394] bg-paper p-5 text-acid-ink">
                    <p className="font-mono text-xs text-acid-ink/70">
                      <time dateTime={p.date}>{dateBR(p.date)}</time> · {p.minutes} min de leitura
                    </p>
                    <h2 className="mt-2 text-2xl leading-tight font-medium tracking-tight">
                      <a href={`/blog/${p.slug}`} className="underline-offset-4 after:absolute after:inset-0 group-hover:underline">
                        {p.title}
                      </a>
                    </h2>
                    <p className="mt-3 leading-relaxed text-acid-ink/80">{p.description}</p>
                    {p.tags.length > 0 && (
                      <p className="mt-auto pt-4 font-mono text-[0.7rem] text-acid-ink/70">{p.tags.map((t) => `#${t.replace(/\s+/g, '-')}`).join(' ')}</p>
                    )}
                  </article>
                </li>
              ))}
            </ol>
          )}

          <p className="mt-8 font-mono text-sm text-ink/70">
            Leia por RSS:{' '}
            <a href="/blog/feed.xml" className="underline decoration-dotted underline-offset-4 hover:text-ink">
              blog/feed.xml
            </a>
          </p>

          <ClosingCta
            title="Quer aplicar isso na"
            accent="sua operação?"
            text="Conte o que está travando o seu negócio. Respondemos com um primeiro diagnóstico e o caminho mais curto até o sistema certo."
            whatsappMessage="Olá! Li o blog da HenaWeb e quero conversar sobre um projeto."
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
