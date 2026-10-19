/**
 * Slug + name of each case, in archive order, for client components on every page (footer, 404) that only
 * need links: importing `projects` from content.ts would ship all the case copy. content.ts warns in
 * development if these drift from the full entries.
 */
export const projectLinks = [
  { slug: 'diconta', name: 'Diconta' },
  { slug: 'scheduly', name: 'Scheduly' },
  { slug: 'ecobrain', name: 'EcoBrain' },
  { slug: 'dropcota', name: 'Dropcota' },
  { slug: 'next-card', name: 'NEXT Card' },
  { slug: 'contacerta', name: 'Contacerta' },
  { slug: 'camargo-legal', name: 'Camargo Legal' },
] as const;
