/**
 * Slug + name of each service page, for client components (footer, contact form, 404) that only
 * need links: importing `services` would ship every page's copy, FAQ and examples to the browser.
 * `services.ts` warns in development if these drift from the full entries.
 */
export const serviceLinks = [
  { slug: 'sistemas-sob-medida', name: 'Sistemas sob medida' },
  { slug: 'sistemas-publicos', name: 'Sistemas públicos' },
  { slug: 'automacao-e-ia', name: 'Automação & IA' },
  { slug: 'sites-e-produtos', name: 'Sites & produtos' },
] as const;
