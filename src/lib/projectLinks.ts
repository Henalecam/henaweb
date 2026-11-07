/**
 * Slug + name of each case, in archive order, for client components on every page (footer, 404) that only
 * need links: importing `projects` from content.ts would ship all the case copy. content.ts warns in
 * development if these drift from the full entries.
 */
// `top`: the pre-cropped top of the case's screenshot (no entry for Dropcota, drawn as a mock-up instead);
// `light`: that screenshot is a light UI (the others are dark), so the 404's pencil sketch doesn't invert it
export const projectLinks: readonly { slug: string; name: string; top?: string; light?: boolean }[] = [
  { slug: 'diconta', name: 'Diconta', top: '/cases/diconta-top.jpg' },
  { slug: 'scheduly', name: 'Scheduly', top: '/cases/scheduly-top.jpg' },
  { slug: 'ecobrain', name: 'EcoBrain', top: '/cases/ecobrain-top.jpg', light: true },
  { slug: 'dropcota', name: 'Dropcota' },
  { slug: 'next-card', name: 'NEXT Card', top: '/cases/fintech-top.jpg' },
  { slug: 'contacerta', name: 'Contacerta', top: '/cases/contacerta-top.jpg' },
  { slug: 'camargo-legal', name: 'Camargo Legal', top: '/cases/camargo-top.jpg' },
];
