import type { Metadata } from 'next';
import { site } from '@/lib/site';
import Footer from '@/components/Footer';
import ShowShortcuts from '@/components/ShowShortcuts';
import YourSettings from '@/components/YourSettings';
import SectionLink from '@/components/SectionLink';

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
  ['Teclado do começo ao fim', 'Todo link, botão e campo é alcançável pelo Tab, com foco visível. “Pular para o conteúdo” e “Pular para o contato” são os primeiros itens da página, e a tecla ? lista os atalhos.'],
  ['Menos movimento', 'Com “reduzir movimento” ligado no sistema, as animações de entrada, as faixas que correm sozinhas, os sons e as vibrações ficam parados ou desligados.'],
  ['Pausar o que se mexe', 'A tecla P pausa e retoma as faixas animadas da página inicial; um toque faz o mesmo no celular.'],
  ['Alto contraste', 'No modo de alto contraste do Windows o site usa as cores do sistema. Com “mais contraste” ou “menos transparência” ligados, sublinhados ficam sólidos e texturas somem.'],
  ['Alvos de toque', 'Botões e links isolados têm pelo menos 24 × 24 px de área de toque (WCAG 2.5.8), inclusive os botõezinhos das janelas.'],
  ['Leitores de tela', 'Imagens têm texto alternativo; desenhos e enfeites ficam ocultos para leitores de tela, e mensagens que mudam sozinhas são anunciadas.'],
  ['Formulário que ajuda', 'Rótulos sempre visíveis, erros explicados em português, sugestão para e-mail digitado errado e rascunho guardado na aba se você sair no meio.'],
  ['Telas pequenas e sem sinal', 'As páginas cabem em telas de 320 px sem rolagem lateral, e as páginas que você já leu abrem mesmo sem internet. Com a economia de dados do navegador ligada, as cenas 3D nem são baixadas.'],
];

// the cards that answer a setting this browser can report through CSS: their title bar lights up when it is on
// (the "painel_de_controle.exe" below lists the same settings)
const PREF_OF: Record<string, string> = {
  'Menos movimento': 'motion',
  'Alto contraste': 'contrast',
  'Alvos de toque': 'touch',
};

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
      <article className="gutter relative mx-auto max-w-3xl pt-36 pb-28 print:pt-4 print:pb-0">
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
            <li key={title} className="win" data-pref={PREF_OF[title]}>
              <div className="win-bar">
                <span aria-hidden>✓ ok</span>
                {/* the card whose setting this browser has on says so in its title bar (globals.css [data-pref]) */}
                {PREF_OF[title] && (
                  <span aria-hidden data-pref-on className="ml-auto hidden rounded-sm bg-paper px-1.5 font-bold text-acid-ink">
                    ● em uso aqui
                  </span>
                )}
              </div>
              <div className="m-1.5 h-[calc(100%-2.6rem)] border-2 border-[#7d7394] bg-paper p-4 text-acid-ink">
                <h3 className="font-medium">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-acid-ink/80">{body}</p>
                {/* the "?" list, one click away for whoever reads this with a mouse or on a phone */}
                {title.startsWith('Teclado') && <ShowShortcuts />}
              </div>
            </li>
          ))}
        </ul>

        <YourSettings />

        {/* each part can be sent on its own ("o que ainda pode falhar"): the shared "# link" of the service pages */}
        <section className="group relative mt-14" aria-labelledby="como-verificamos">
          <h2 id="como-verificamos" className="scroll-mt-28 pr-24 text-2xl font-medium tracking-tight">Como verificamos</h2>
          <SectionLink id="como-verificamos" title="Como verificamos" />
          <p className="mt-3 leading-relaxed text-ink/75">
            Cada mudança é testada em celular (390 px) e computador (1440 px), com e sem “reduzir movimento”. Na última verificação automática com o
            axe-core, em 3 de novembro de 2026, as dez páginas principais (inclusive a de erro e a de sem conexão) e as janelas interativas não tiveram
            nenhuma violação encontrada. Na mesma rodada conferimos a versão impressa (PDF) das páginas, o modo de alto contraste do sistema e o tamanho
            dos alvos de toque.
          </p>
        </section>

        <section className="group relative mt-12" aria-labelledby="o-que-pode-falhar">
          <h2 id="o-que-pode-falhar" className="scroll-mt-28 pr-24 text-2xl font-medium tracking-tight">O que ainda pode falhar</h2>
          <SectionLink id="o-que-pode-falhar" title="O que ainda pode falhar" />
          <p className="mt-3 leading-relaxed text-ink/75">
            Testes automáticos não pegam tudo, e este site ainda não passou por uma auditoria manual com pessoas que usam tecnologia assistiva, então não
            declaramos conformidade formal. Os jogos do Passa tempo são projetos à parte e podem não seguir estes mesmos cuidados.
          </p>
        </section>

        <section className="group relative mt-12" aria-labelledby="barreira">
          <h2 id="barreira" className="scroll-mt-28 pr-24 text-2xl font-medium tracking-tight">Encontrou uma barreira?</h2>
          <SectionLink id="barreira" title="Encontrou uma barreira?" />
          <p className="mt-3 leading-relaxed text-ink/75">
            Conte o que aconteceu, em qual página e com qual navegador ou leitor de tela. A gente corrige e responde.
          </p>
          {/* on paper the two buttons can't be pressed; the printout's own footer line carries the e-mail and WhatsApp */}
          <p data-print-hide className="mt-6 flex flex-wrap gap-3">
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
        </section>
      </article>
    </main>
    <Footer />
    </>
  );
}
