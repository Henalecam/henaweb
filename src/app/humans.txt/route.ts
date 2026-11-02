import { site } from '@/lib/content';

/**
 * /humans.txt (humanstxt.org): who is behind the site and what it is built with, for the curious who read source
 * instead of footers. Only facts the site already states (contact, city, its own stack from package.json, the
 * last commit date); static at build. The layout's <link rel="author"> points here.
 */
export const dynamic = 'force-static';

export function GET() {
  const updated = process.env.NEXT_PUBLIC_UPDATED
    ? new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'America/Sao_Paulo' }).format(new Date(process.env.NEXT_PUBLIC_UPDATED))
    : null;
  const lines = [
    '/* EQUIPE */',
    `Studio: ${site.name}`,
    `Contato: ${site.email}`,
    `WhatsApp: ${site.whatsappDisplay}`,
    `Onde: ${site.city}, Brasil`,
    ...site.social.map((s) => `${s.name}: ${s.href}`),
    '',
    '/* SITE */',
    ...(updated ? [`Última atualização: ${updated}`] : []),
    'Idioma: português (Brasil)',
    'Feito com: Next.js, React, TypeScript, Tailwind CSS, GSAP, Lenis, Three.js',
    'Hospedagem: Vercel',
    `Acessibilidade: ${site.url}/acessibilidade`,
    `Para assistentes de IA: ${site.url}/llms.txt`,
    `Casos em RSS: ${site.url}/casos/feed.xml`,
    '',
    '/* PISTA */',
    `Abra o console do navegador em ${site.url} e digite hena.ajuda()`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
