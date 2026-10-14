import type { MetadataRoute } from 'next';
import { services } from '@/lib/services';
import { projects, site } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: site.url, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    ...services.map((s) => ({
      url: `${site.url}/servicos/${s.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: s.slug === 'sistemas-sob-medida' || s.slug === 'sistemas-publicos' ? 0.9 : 0.8,
    })),
    { url: `${site.url}/casos`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    ...projects.map((p) => ({ url: `${site.url}/casos/${p.slug}`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.6 })),
  ];
}
