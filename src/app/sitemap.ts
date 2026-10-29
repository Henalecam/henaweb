import type { MetadataRoute } from 'next';
import { execFileSync } from 'node:child_process';
import { services } from '@/lib/services';
import { projects, site } from '@/lib/content';

/**
 * Date of the last commit that touched any of these paths, read at build time. A sitemap that says
 * every page changed "now" on every deploy teaches crawlers to ignore lastmod; a real date lets them
 * recrawl only what moved. Shallow clones that don't reach a path's last commit leave it undefined,
 * and the entry simply goes without lastmod.
 */
function lastCommit(...paths: string[]): Date | undefined {
  try {
    const iso = execFileSync('git', ['log', '-1', '--format=%cI', '--', ...paths], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim();
    return iso ? new Date(iso) : undefined;
  } catch {
    return undefined;
  }
}

const SHARED = ['src/app/layout.tsx', 'src/app/globals.css'];

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: lastCommit('src/app/page.tsx', 'src/components', 'src/lib/content.ts', ...SHARED), changeFrequency: 'monthly', priority: 1 },
    ...services.map((s) => ({
      url: `${site.url}/servicos/${s.slug}`,
      lastModified: lastCommit('src/app/servicos', 'src/lib/services.ts', ...SHARED),
      changeFrequency: 'monthly' as const,
      priority: s.slug === 'sistemas-sob-medida' || s.slug === 'sistemas-publicos' ? 0.9 : 0.8,
    })),
    { url: `${site.url}/passatempo`, lastModified: lastCommit('src/app/passatempo', 'src/lib/pastimes.ts', ...SHARED), changeFrequency: 'monthly', priority: 0.4 },
    { url: `${site.url}/casos`, lastModified: lastCommit('src/app/casos/page.tsx', 'src/lib/content.ts', 'public/cases', ...SHARED), changeFrequency: 'monthly', priority: 0.8 },
    ...projects.map((p) => ({
      url: `${site.url}/casos/${p.slug}`,
      lastModified: lastCommit('src/app/casos/[slug]', 'src/lib/content.ts', `public/cases/${p.slug}.jpg`, `public/cases/${p.slug}-m.jpg`, ...SHARED),
      changeFrequency: 'yearly' as const,
      priority: 0.6,
      // the real screenshot, so the case can show up in image search
      ...(p.shot && { images: [`${site.url}${p.shot.desktop}`] }),
    })),
  ];
}
