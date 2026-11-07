import { dateBR, publishedPosts, showDrafts, visiblePosts } from '@/lib/blog';
import { site } from '@/lib/site';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return visiblePosts().map((p) => ({ slug: p.slug }));
}

/**
 * /blog/<slug>.md (rewritten here by next.config.ts): the post as plain Markdown, with its metadata on top. AI
 * assistants and answer engines read this far more reliably than the styled page; the page links to it with
 * <link rel="alternate" type="text/markdown">, and llms.txt lists it.
 */
export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = (showDrafts ? visiblePosts() : publishedPosts()).find((x) => x.slug === slug);
  if (!p) return new Response('Not found', { status: 404 });
  const url = `${site.url}/blog/${p.slug}`;
  const md = [
    `# ${p.title}`,
    '',
    `> ${p.answer}`,
    '',
    `- Autor: ${p.author}, ${site.name}`,
    `- Publicado: ${dateBR(p.date)}${p.updated && p.updated !== p.date ? ` · revisado em ${dateBR(p.updated)}` : ''}`,
    `- Endereço: ${url}`,
    ...(p.tags.length ? [`- Assuntos: ${p.tags.join(', ')}`] : []),
    '',
    // site-relative links and images become absolute, so the file makes sense on its own
    p.body.replace(/\]\(\/(?!\/)/g, `](${site.url}/`),
    '',
    '---',
    '',
    `${site.name}: studio de engenharia de software em ${site.city}. Contato: ${site.email} · ${site.url}/#contato`,
    '',
  ].join('\n');
  return new Response(md, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      ...(p.draft ? { 'X-Robots-Tag': 'noindex' } : {}),
      Link: `<${url}>; rel="canonical"`,
    },
  });
}
