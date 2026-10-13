import type { MetadataRoute } from 'next';
import { services } from '@/lib/services';
import { site } from '@/lib/content';

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
  ];
}
