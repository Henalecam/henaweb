import DavidStage from '@/components/DavidStage';
import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Manifesto from '@/components/Manifesto';
import Capabilities from '@/components/Capabilities';
import Clients from '@/components/Clients';
import Mystery from '@/components/Mystery';
import GovTech from '@/components/GovTech';
import Work from '@/components/Work';
import Process from '@/components/Process';
import Studio from '@/components/Studio';
import Contact from '@/components/Contact';
import Faq from '@/components/Faq';
import Testimonials from '@/components/Testimonials';
import { capabilities, homeFaq, projects, site } from '@/lib/content';

const capabilitySlugs = capabilities.map((c) => c.slug);
import Footer from '@/components/Footer';

const ticker = [
  'Sistemas sob medida',
  'Plataformas públicas',
  'ERPs',
  'Agentes de IA',
  'Automação n8n',
  'Integrações',
  'Dashboards',
  'Produtos digitais',
];

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FAQPage',
      '@id': `${site.url}/#faq`,
      mainEntity: homeFaq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
    {
      '@type': 'ItemList',
      '@id': `${site.url}/#projetos`,
      name: 'Projetos da HenaWeb',
      itemListElement: projects.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: { '@type': 'CreativeWork', name: p.name, description: p.summary, url: p.href, creator: { '@id': `${site.url}/#organization` } },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main id="conteudo" tabIndex={-1} className="bg-bg">
        <DavidStage>
          <Hero />
          {/* two crossed tapes: the aesthetic one and the mystery one */}
          <div className="relative h-36 overflow-hidden md:h-44">
            <p className="sr-only">O que fazemos: {ticker.join(', ')}</p>
            <div className="toon absolute top-1/2 -left-[5%] w-[110%] -translate-y-1/2 rotate-[3deg] bg-acid py-3 text-acid-ink">
              <Marquee
                speed={50}
                items={ticker.map((t) => (
                  <span key={t} className="font-groovy text-xl md:text-2xl">
                    {t}
                  </span>
                ))}
                separator={<span className="mx-6 text-lg">✦</span>}
              />
            </div>
            <div className="tape absolute top-1/2 -left-[5%] w-[110%] -translate-y-1/2 -rotate-[3deg] py-2">
              <Marquee
                reverse
                speed={60}
                items={['caso aberto', 'pista nº 07', 'suspeito: planilha', 'ｓｉｓｔｅｍａｓ', 'mistério resolvido'].map((t) => (
                  <span key={t} className="font-mono text-sm font-bold tracking-[0.25em] uppercase">
                    {t}
                  </span>
                ))}
                separator={<span className="mx-6">▲</span>}
              />
            </div>
          </div>
          <Manifesto />
        </DavidStage>
        <Clients />
        <Capabilities
          caseCounts={Object.fromEntries(capabilitySlugs.map((slug) => [slug, projects.filter((p) => p.service === slug).length]))}
          caseSlugs={Object.fromEntries(projects.map((p) => [p.name, p.slug]))}
        />
        <Mystery />
        <GovTech />
        <Work />
        <Testimonials />
        <Process />
        <Studio />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
