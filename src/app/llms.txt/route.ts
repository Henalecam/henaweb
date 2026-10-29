import { homeFaq, projects, site } from '@/lib/content';
import { services } from '@/lib/services';
import { pastimes } from '@/lib/pastimes';

/**
 * /llms.txt: a plain Markdown map of the site for AI assistants and answer engines (llmstxt.org).
 * Built from the same data as the pages, so it never drifts from what the site says; static at build.
 */
export const dynamic = 'force-static';

export function GET() {
  const lines = [
    `# ${site.name}`,
    '',
    `> Studio de engenharia de software em ${site.city}: sistemas sob medida, plataformas públicas, automação com IA e produtos digitais para empresas e governos.`,
    '',
    `Contato: ${site.email} · WhatsApp ${site.whatsappDisplay} · ${site.url}/#contato`,
    '',
    '## Serviços',
    '',
    ...services.map((s) => `- [${s.name}](${site.url}/servicos/${s.slug}): ${s.seoDescription}`),
    '',
    '## Casos resolvidos',
    '',
    ...projects.map((p) => `- [${p.name}](${site.url}/casos/${p.slug}) (${p.kind}): ${p.summary}`),
    `- [Arquivo completo de casos](${site.url}/casos)`,
    '',
    // side projects, kept apart from client work so an assistant never presents them as delivered cases
    '## Passa tempo (projetos pessoais, fora dos casos de clientes)',
    '',
    `Página: ${site.url}/passatempo`,
    '',
    ...pastimes.map((p) => `- [${p.name}](${p.url})${p.action === 'Jogar' ? ' (jogo)' : ''}`),
    '',
    '## Perguntas frequentes',
    '',
    ...homeFaq.flatMap((f) => [`### ${f.q}`, '', f.a, '']),
    // each service page answers its own questions (gov.br login, n8n, SEO…): an assistant asked about one
    // service gets the specific answer, with the page to cite
    ...services.flatMap((s) => [
      `## Perguntas sobre ${s.name}`,
      '',
      `Página: ${site.url}/servicos/${s.slug}`,
      '',
      ...s.faq.flatMap((f) => [`### ${f.q}`, '', f.a, '']),
    ]),
  ];
  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8', 'Cache-Control': 'public, max-age=3600' },
  });
}
