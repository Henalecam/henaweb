import type { Metadata } from 'next';
import { site } from '@/lib/site';
import Footer from '@/components/Footer';

const description = 'O que o site da HenaWeb faz para ser usado por todo mundo, o que ainda pode falhar e como avisar a gente de uma barreira.';

export const metadata: Metadata = {
  title: 'Acessibilidade',
  description,
  alternates: { canonical: '/acessibilidade' },
  openGraph: { type: 'website', url: '/acessibilidade', title: 'Acessibilidade · HenaWeb', description, locale: 'pt_BR', siteName: 'HenaWeb' },
  // the large card like every other indexed page, so a shared link shows the page's own image (opengraph-image.tsx)
  twitter: { card: 'summary_large_image', title: 'Acessibilidade · HenaWeb', description },
};

// the same page-level structured data the other indexed pages carry: what this page is, tied to the site and studio
// the layout already describes, and the "henaweb.com › Acessibilidade" trail for search results
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': `${site.url}/acessibilidade#page`,
      name: 'Acessibilidade',
      url: `${site.url}/acessibilidade`,
      description,
      inLanguage: 'pt-BR',
      isPartOf: { '@id': `${site.url}/#website` },
      about: { '@id': `${site.url}/#organization` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: site.url },
        { '@type': 'ListItem', position: 2, name: 'Acessibilidade', item: `${site.url}/acessibilidade` },
      ],
    },
  ],
};

// each line is something this site really does (see the components named in the comments), not a promise
const FEATURES: [string, string][] = [
  ['Teclado do começo ao fim', 'Todo link, botão e campo é alcançável pelo Tab, com foco visível. "Pular para o conteúdo" é o primeiro item da página, e a tecla ? lista os atalhos.'],
  ['Menos movimento', 'Com "reduzir movimento" ligado no sistema, as animações de entrada, as faixas que correm sozinhas e os sons ficam parados ou desligados.'],
  ['Pausar o que se mexe', 'A tecla P pausa e retoma as faixas animadas da página inicial; um toque faz o mesmo no celular.'],
  ['Alto contraste', 'No modo de alto contraste do Windows o site usa as cores do sistema. Com "mais contraste" ou "menos transparência" ligados, sublinhados ficam sólidos e texturas somem.'],
  ['Alvos de toque', 'Botões e links isolados têm pelo menos 24 × 24 px de área de toque (WCAG 2.5.8), inclusive os botõezinhos das janelas.'],
  ['Leitores de tela', 'Imagens têm texto alternativo; desenhos e enfeites ficam ocultos para leitores de tela, e mensagens que mudam sozinhas são anunciadas.'],
  ['Formulário que ajuda', 'Rótulos sempre visíveis, erros explicados em português, sugestão para e-mail digitado errado e rascunho guardado na aba se você sair no meio.'],
  ['Telas pequenas e sem sinal', 'As páginas cabem em telas de 320 px sem rolagem lateral, e as páginas que você já leu abrem mesmo sem internet.'],
];

/**
 * /acessibilidade: an accessibility statement for a studio that builds public-sector systems to eMAG/WCAG. It
 * lists what the site actually does, says plainly what automated checks can't promise, and gives a way to report
 * a barrier. No claim of formal conformance: that needs a manual audit with assistive technology users.
 */
export default function Acessibilidade() {
  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    <main id="conteudo" tabIndex={-1} className="sky relative min-h-[100svh] overflow-x-clip text-ink">
      <div className="grid-floor !h-[22%] opacity-40" aria-hidden />
      <article className="gutter relative mx-auto max-w-3xl pt-36 pb-28">
        <p className="label !text-teal">Declaração de acessibilidade</p>
        <h1 className="mt-4 text-[clamp(2.4rem,6vw,4.5rem)] leading-[0.95] font-medium tracking-[-0.045em]">
          Um site para <span className="font-groovy text-[0.85em] tracking-normal text-acid">todo mundo.</span>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-ink/75">
          A gente desenvolve sistemas para órgãos públicos seguindo eMAG e WCAG. Seria estranho o próprio site ficar de fora. Isto é o que ele faz hoje:
        </p>

        <h2 className="sr-only">O que o site faz</h2>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2">
          {FEATURES.map(([title, body]) => (
            <li key={title} className="win">
              <div className="win-bar">
                <span aria-hidden>✓ ok</span>
              </div>
              <div className="m-1.5 h-[calc(100%-2.6rem)] border-2 border-[#7d7394] bg-paper p-4 text-acid-ink">
                <h3 className="font-medium">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-acid-ink/80">{body}</p>
              </div>
            </li>
          ))}
        </ul>

        <h2 className="mt-16 text-2xl font-medium tracking-tight">Como verificamos</h2>
        <p className="mt-3 leading-relaxed text-ink/75">
          Cada mudança é testada em celular (390 px) e computador (1440 px), com e sem &quot;reduzir movimento&quot;. Na última verificação automática com o
          axe-core, em 1º de novembro de 2026, as oito páginas principais e as janelas interativas não tiveram nenhuma violação encontrada.
        </p>

        <h2 className="mt-12 text-2xl font-medium tracking-tight">O que ainda pode falhar</h2>
        <p className="mt-3 leading-relaxed text-ink/75">
          Testes automáticos não pegam tudo, e este site ainda não passou por uma auditoria manual com pessoas que usam tecnologia assistiva, então não
          declaramos conformidade formal. Os jogos do Passa tempo são projetos à parte e podem não seguir estes mesmos cuidados.
        </p>

        <h2 className="mt-12 text-2xl font-medium tracking-tight">Encontrou uma barreira?</h2>
        <p className="mt-3 leading-relaxed text-ink/75">
          Conte o que aconteceu, em qual página e com qual navegador ou leitor de tela. A gente corrige e responde.
        </p>
        <p className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${site.email}?subject=${encodeURIComponent('Barreira de acessibilidade no site')}`}
            className="toon toon-press rounded-full bg-acid px-6 py-3 font-medium text-acid-ink"
          >
            Avisar por e-mail
          </a>
          <a href="/#contato" className="toon toon-press rounded-full bg-paper px-6 py-3 font-medium text-acid-ink">
            Ou pelo formulário →
          </a>
        </p>
      </article>
    </main>
    <Footer />
    </>
  );
}
