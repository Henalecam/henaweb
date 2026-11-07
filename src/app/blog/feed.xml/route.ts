import { publishedPosts } from '@/lib/blog';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const rfc822 = (iso: string) => new Date(`${iso}T12:00:00Z`).toUTCString();

/** /blog/feed.xml: published posts as RSS 2.0, newest first, each with its short answer as the summary. */
export function GET() {
  const posts = publishedPosts();
  const items = posts
    .map((p) => {
      const url = `${site.url}/blog/${p.slug}`;
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(p.date)}</pubDate>
      <dc:creator>${esc(p.author)}</dc:creator>
${p.tags.map((t) => `      <category>${esc(t)}</category>`).join('\n')}
      <description>${esc(`${p.description} ${p.answer}`)}</description>
    </item>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>HenaWeb · Blog</title>
    <link>${site.url}/blog</link>
    <atom:link href="${site.url}/blog/feed.xml" rel="self" type="application/rss+xml" />
    <description>Artigos da HenaWeb sobre sistemas sob medida, automação com IA, setor público e produtos digitais.</description>
    <language>pt-BR</language>
    <lastBuildDate>${posts[0] ? rfc822(posts[0].updated ?? posts[0].date) : new Date(process.env.NEXT_PUBLIC_UPDATED ?? Date.now()).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
