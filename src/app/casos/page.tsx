import type { Metadata } from 'next';
import { RandomCase, ReadProgress, CasesEmpty } from '@/components/ReadMarks';
import { projectLinks } from '@/lib/projectLinks';
import Image from 'next/image';
import { projects, site } from '@/lib/content';
import Footer from '@/components/Footer';
import MockUI from '@/components/MockUI';
import ClosingCta from '@/components/ClosingCta';
import CaseFilter from '@/components/CaseFilter';
import { services } from '@/lib/services';

const description =
  'Casos resolvidos pela HenaWeb: ERPs, plataformas com IA, agendamento, produtos financeiros e sites. Veja o problema de cada cliente e o que construímos.';

// content.ts can't hold this check: its own `process` export shadows Node's
if (process.env.NODE_ENV !== 'production') {
  for (const p of projects) {
    if (projectLinks.find((l) => l.slug === p.slug)?.name !== p.name) console.warn(`projectLinks.ts is out of sync with content.ts for "${p.slug}"`);
  }
}

export const metadata: Metadata = {
  title: 'Casos e projetos de software sob medida',
  description,
  alternates: { canonical: '/casos' },
  openGraph: {
    type: 'website',
    url: '/casos',
    title: 'Casos e projetos de software sob medida · HenaWeb',
    description,
    locale: 'pt_BR',
    siteName: 'HenaWeb',
  },
  // without this, X/LinkedIn previews fell back to the home page's title and description; the image is casos/opengraph-image.tsx
  twitter: { card: 'summary_large_image', title: 'Casos e projetos de software sob medida · HenaWeb', description },
};

// Only the card of the case being opened (or the one being returned from) gets a
// view-transition-name, so it morphs into the case page window while the other cards leave with
// the page. pageswap/pagereveal only fire in browsers with cross-document view transitions.
const CASE_MORPH = `(()=>{
const card=(u)=>{try{const m=new URL(u).pathname.match(/^\\/casos\\/([\\w-]+)/);return m&&document.querySelector('[data-case-window="'+m[1]+'"]')}catch(e){return null}};
const name=(el,on)=>{if(el)el.style.viewTransitionName=on?'caso-'+el.dataset.caseWindow:''};
addEventListener('pageswap',(e)=>{if(!e.viewTransition)return;const el=card(e.activation&&e.activation.entry&&e.activation.entry.url);name(el,1);e.viewTransition.finished.finally(()=>name(el,0))});
addEventListener('pagereveal',(e)=>{if(!e.viewTransition||!window.navigation)return;const f=navigation.activation&&navigation.activation.from;const el=card(f&&f.url);name(el,1);e.viewTransition.finished.finally(()=>name(el,0))});
})();`;

export default function CasesIndex() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${site.url}/casos#page`,
        name: 'Casos e projetos',
        url: `${site.url}/casos`,
        description,
        inLanguage: 'pt-BR',
        hasPart: projects.map((p) => ({ '@type': 'CreativeWork', name: p.name, url: `${site.url}/casos/${p.slug}` })),
      },
      // same trail the case pages already publish, so search shows "henaweb.com › Casos"
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: site.url },
          { '@type': 'ListItem', position: 2, name: 'Casos', item: `${site.url}/casos` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script dangerouslySetInnerHTML={{ __html: CASE_MORPH }} />
      <main id="conteudo" tabIndex={-1} className="sky min-h-screen text-ink">
        <div data-case-zone className="gutter mx-auto max-w-6xl pt-36 pb-24">
          <p className="label !text-teal">Arquivo de casos</p>
          <h1 className="mt-4 text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.9] font-medium tracking-[-0.05em]">
            Casos{' '}
            <span className="font-groovy text-[0.85em] tracking-normal text-acid [text-shadow:4px_4px_0_#140a26]">resolvidos.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/75">{description}</p>

          <CaseFilter
            total={projects.length}
            options={services
              .map((s) => ({ slug: s.slug, name: s.name, count: projects.filter((p) => p.service === s.slug).length }))
              .filter((o) => o.count > 0)}
            empty={services.filter((s) => !projects.some((p) => p.service === s.slug)).map((s) => ({ slug: s.slug, name: s.name }))}
          />
          <ReadProgress slugs={projects.map((p) => p.slug)} />
          <RandomCase />
          <ul data-case-list className="mt-10 grid gap-6 md:grid-cols-2">
            {projects.map((p, i) => (
              <li key={p.slug} data-case-service={p.service} data-case-slug={p.slug}>
                {/* the link is named by the case and its kind and described by the problem: the whole card used to be
                    its name (screenshot alt + title + kind + problem, 107–151 characters on every Tab) */}
                <a
                  href={`/casos/${p.slug}`}
                  aria-labelledby={`caso-${p.slug} tipo-${p.slug}`}
                  aria-describedby={`problema-${p.slug}`}
                  className="group block"
                >
                  {/* the clicked card borrows the case page window's view-transition-name (CASE_MORPH) */}
                  <div
                    data-case-window={p.slug}
                    className="win transition-transform duration-500 ease-[var(--ease-out-expo)] [view-transition-class:case-window] group-hover:-translate-y-1.5 group-hover:-rotate-[0.6deg] group-focus-visible:-rotate-[0.6deg] group-focus-visible:-translate-y-1.5"
                  >
                    <div className="win-bar">
                      <span aria-hidden className="mr-auto truncate">caso_{String(i + 1).padStart(2, '0')}.exe</span>
                      <span id={`lido-${p.slug}`} data-read-mark={p.slug} hidden className="shrink-0 rounded-sm bg-acid-ink/85 px-1.5 text-[0.65rem] text-acid">
                        ✓ investigado
                      </span>
                      {/* the same Win95 window controls as the case page's window this card turns into (decorative) */}
                      <span aria-hidden className="flex shrink-0 gap-1">
                        <span className="win-btn">_</span>
                        <span className="win-btn">□</span>
                        <span className="win-btn">×</span>
                      </span>
                    </div>
                    <div className="relative m-1.5 aspect-[16/10] overflow-hidden border-2 border-[#7d7394] bg-acid-ink">
                      {p.shot ? (
                        <Image
                          src={p.shot.desktop}
                          // decorative inside the link: the title names the case
                          alt=""
                          fill
                          // the first card is the page's LCP: fetched right away instead of lazily
                          preload={i === 0}
                          fetchPriority={i === 0 ? 'high' : undefined}
                          sizes="(max-width: 767px) 92vw, 540px"
                          className={`object-cover object-top ${
                            // long pages scroll by slowly on hover, like browsing the real site
                            p.shot.height > 1200
                              ? 'transition-[object-position] duration-[6000ms] ease-linear motion-safe:group-hover:object-bottom motion-safe:group-focus-visible:object-bottom'
                              : 'transition-transform duration-700 group-hover:scale-[1.03] group-focus-visible:scale-[1.03]'
                          }`}
                        />
                      ) : (
                        p.mock && <MockUI variant={p.mock.variant} hue={p.mock.hue} />
                      )}
                      {/* pointing at a case (or tabbing to it) thumps the archive's verdict onto its screen */}
                      <span
                        aria-hidden
                        className="case-stamp pointer-events-none absolute right-4 bottom-4 z-10 rounded-md border-4 border-[#1f6f63] bg-lemon/90 px-3 py-1 font-mono text-xs font-bold tracking-[0.2em] text-[#1f6f63] uppercase select-none"
                      >
                        Resolvido ✓
                      </span>
                    </div>
                  </div>
                  <h2 id={`caso-${p.slug}`} className="mt-5 text-3xl font-medium tracking-[-0.03em] group-hover:text-acid group-focus-visible:text-acid">
                    {p.name} <span aria-hidden>→</span>
                  </h2>
                  <p id={`tipo-${p.slug}`} className="serif mt-1 text-lg text-ink/60">
                    {p.kind}
                  </p>
                  <p id={`problema-${p.slug}`} className="mt-2 leading-relaxed text-ink/70">
                    {p.challenge}
                  </p>
                </a>
                {/* what got built, at a glance: outside the link so its accessible name stays the case name */}
                <ul aria-label={`Recursos de ${p.name}`} className="mt-4 flex flex-wrap gap-1.5">
                  {p.highlights.map((h) => (
                    <li key={h} className="rounded-full border border-ink/25 px-2.5 py-0.5 font-mono text-[0.7rem] tracking-wide text-ink/75">
                      {h}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <CasesEmpty />

          <ClosingCta
            title="Reconheceu o seu problema em algum"
            accent="desses casos?"
            text="Conte o que está travando a sua operação. Respondemos com um primeiro diagnóstico e o caminho mais curto até o sistema certo."
            whatsappMessage="Olá! Vi os casos da HenaWeb e quero conversar sobre um projeto."
          />
        </div>
      </main>
      <Footer />
    </>
  );
}
