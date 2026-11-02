import { statSync } from 'node:fs';
import { join } from 'node:path';
import { projects, site } from '@/lib/content';

// built once with the site: the archive only changes on a deploy
export const dynamic = 'force-static';

// a feed reader shows a card's picture from the item's enclosure: the top of the case's screenshot, the same crop the
// archive and the footer use (RSS wants its byte length, read from the file at build)
const enclosure = (path: string | undefined) => {
  if (!path) return '';
  try {
    const { size } = statSync(join(process.cwd(), 'public', path));
    return `\n      <enclosure url="${site.url}${path}" length="${size}" type="image/jpeg" />`;
  } catch {
    return '';
  }
};

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * /casos/feed.xml: the case archive as an RSS feed, so a reader app (or a team's Slack feed) hears about each new
 * case. Items carry no dates, since the cases don't record one; the channel's build date is the site's last change.
 */
export function GET() {
  const updated = new Date(process.env.NEXT_PUBLIC_UPDATED ?? Date.now()).toUTCString();
  const items = projects
    .map((p) => {
      const url = `${site.url}/casos/${p.slug}`;
      return `    <item>
      <title>${esc(`${p.name}: ${p.kind}`)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <category>${esc(p.kind)}</category>
      <description>${esc(p.summary)}</description>${enclosure(p.shot?.desktop.replace(/\.jpg$/, '-top.jpg'))}
    </item>`;
    })
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>HenaWeb · Casos resolvidos</title>
    <link>${site.url}/casos</link>
    <atom:link href="${site.url}/casos/feed.xml" rel="self" type="application/rss+xml" />
    <description>Sistemas, plataformas e sites entregues pela HenaWeb, um caso por item.</description>
    <language>pt-BR</language>
    <lastBuildDate>${updated}</lastBuildDate>
    <image>
      <url>${site.url}/icon-192.png</url>
      <title>HenaWeb · Casos resolvidos</title>
      <link>${site.url}/casos</link>
    </image>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
