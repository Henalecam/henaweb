import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Geist, Geist_Mono, Instrument_Serif, Shrikhand } from 'next/font/google';
import './globals.css';
import { site } from '@/lib/content';
import { services } from '@/lib/services';
import SmoothScroll from '@/components/SmoothScroll';
import Preloader from '@/components/Preloader';
import Cursor from '@/components/Cursor';
import Nav from '@/components/Nav';
import ConversionTracking from '@/components/ConversionTracking';
import FloatingContact from '@/components/FloatingContact';
import TabHaunt from '@/components/TabHaunt';
import ThemeTint from '@/components/ThemeTint';
import ScrollProgress from '@/components/ScrollProgress';
import NavPending from '@/components/NavPending';
import CopyFallback from '@/components/CopyFallback';
import NetStatus from '@/components/NetStatus';
import BackToTop from '@/components/BackToTop';
import Elementar from '@/components/Elementar';
import Screensaver from '@/components/Screensaver';
import QuoteLink from '@/components/QuoteLink';
import AccordionKeys from '@/components/AccordionKeys';
import SwRegister from '@/components/SwRegister';
import DragFile from '@/components/DragFile';
import WinDrag from '@/components/WinDrag';
import TabProgress from '@/components/TabProgress';
import OffscreenPause from '@/components/OffscreenPause';
import ConsentBanner from '@/components/ConsentBanner';
import { analyticsLoader } from '@/lib/consent';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });
// only the italic is ever drawn (.serif), and never above the fold: no upright cut, and no preload, so
// pages that don't use it (cases, services) never download it and the home fetches it when it shows up
const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: 'italic',
  variable: '--font-instrument',
  display: 'swap',
  preload: false,
});

const groovy = Shrikhand({ subsets: ['latin'], weight: '400', variable: '--font-shrikhand', display: 'swap' });

const title = 'Desenvolvimento de sistemas para empresas e governos · HenaWeb';
const description =
  'Studio de engenharia de software em Curitiba: sistemas sob medida, ERPs, plataformas para o setor público, automação com IA e sites. Atendemos todo o Brasil.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: '%s · HenaWeb' },
  description,
  applicationName: 'HenaWeb',
  keywords: [
    'desenvolvimento de sistemas sob medida',
    'software house Curitiba',
    'empresa de desenvolvimento de software',
    'sistemas para o setor público',
    'govtech',
    'ERP sob medida',
    'desenvolvimento SaaS',
    'automação n8n',
    'agentes de IA para empresas',
    'criação de sites Curitiba',
  ],
  authors: [{ name: 'HenaWeb', url: site.url }],
  creator: 'HenaWeb',
  publisher: 'HenaWeb',
  category: 'technology',
  // the case archive's RSS feed, announced on every page so reader apps find it from anywhere
  alternates: { canonical: '/', types: { 'application/rss+xml': [{ url: '/casos/feed.xml', title: 'HenaWeb · Casos resolvidos' }] } },
  formatDetection: { telephone: false, email: false, address: false },
  openGraph: { type: 'website', locale: 'pt_BR', url: '/', siteName: 'HenaWeb', title, description },
  twitter: { card: 'summary_large_image', title, description },
  // Search Console ownership token (also published as a DNS TXT record); env can override it
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || 'UQtKZNGX3UPCb_C6_hjpfexd__pruLlZKyFfCUBgnWg' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  icons: { icon: [{ url: '/favicon.ico', sizes: '32x32' }, { url: '/icon.png', type: 'image/png', sizes: '48x48' }, { url: '/icon-192.png', type: 'image/png', sizes: '192x192' }], apple: '/apple-icon.png' },
  // iOS before 16.4 ignores the manifest and named the home-screen icon after the long <title> ("Desenvolvimento de sis…")
  appleWebApp: { title: 'HenaWeb' },
};

export const viewport: Viewport = { themeColor: '#140c2e', colorScheme: 'dark' };

const PIXEL_ID = '1389558105453782';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
const tools = [PIXEL_ID && 'Meta', GA_ID && 'Google', CLARITY_ID && 'Microsoft Clarity'].filter((x): x is string => !!x);

const sameAs = site.social.map((x) => x.href);

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: 'HenaWeb',
      legalName: site.legalName,
      ...(site.cnpj ? { taxID: site.cnpj } : {}),
      url: site.url,
      logo: `${site.url}/icon-512.png`,
      email: site.email,
      sameAs,
      founder: { '@type': 'Person', name: 'Henrique Alexandre de Camargo', jobTitle: 'Cientista da computação' },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'sales',
        email: site.email,
        telephone: '+55-41-99915-5948',
        areaServed: 'BR',
        availableLanguage: ['Portuguese', 'English'],
      },
    },
    {
      '@type': 'ProfessionalService',
      '@id': `${site.url}/#business`,
      name: 'HenaWeb',
      url: site.url,
      image: `${site.url}/opengraph-image`,
      description,
      email: site.email,
      telephone: '+55-41-99915-5948',
      parentOrganization: { '@id': `${site.url}/#organization` },
      address: { '@type': 'PostalAddress', addressLocality: 'Curitiba', addressRegion: 'PR', addressCountry: 'BR' },
      geo: { '@type': 'GeoCoordinates', latitude: -25.4284, longitude: -49.2733 },
      areaServed: { '@type': 'Country', name: 'Brasil' },
      knowsAbout: ['Desenvolvimento de software', 'Sistemas sob medida', 'GovTech', 'Automação de processos', 'Inteligência artificial', 'n8n', 'Next.js', 'React'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Serviços',
        itemListElement: services.map((x) => ({
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: x.name, description: x.seoDescription, url: `${site.url}/servicos/${x.slug}` },
        })),
      },
      sameAs,
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#website`,
      url: site.url,
      name: 'HenaWeb',
      inLanguage: 'pt-BR',
      publisher: { '@id': `${site.url}/#organization` },
      // the site search (/?pista=) the OpenSearch description already advertises to browsers
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${site.url}/?pista={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
  ],
};

const SEEN_SCRIPT = "try{sessionStorage.getItem('hena:seen')==='1'&&(document.documentElement.dataset.seen='')}catch(e){}";

// an image that fails (offline, a dropped connection) showed the browser's broken-picture icon over the dark frame
// of every screenshot window; it's marked so CSS swaps it for a quiet "imagem fora do ar" plate, and it is
// requested again once the connection comes back. error and load don't bubble, so this listens in the capture
// phase (on document for load: a load event never reaches window from an element)
const IMG_FAIL_SCRIPT = `(()=>{const mark=(i)=>{if(i.dataset.failed!==undefined)return;i.dataset.failed='';const p=i.parentElement;if(p&&getComputedStyle(p).position!=='static')p.dataset.imgFailed=''};addEventListener('error',(e)=>{const t=e.target;if(t instanceof HTMLImageElement)mark(t)},true);document.addEventListener('load',(e)=>{const t=e.target;if(t instanceof HTMLImageElement&&t.dataset.failed!==undefined){delete t.dataset.failed;t.parentElement&&delete t.parentElement.dataset.imgFailed}},true);addEventListener('online',()=>{document.querySelectorAll('img[data-failed]').forEach((i)=>{const s=i.srcset;if(s){i.srcset='';i.srcset=s}else{const u=i.src;i.src='';i.src=u}})})})();`;

const SPECULATION_RULES = JSON.stringify({
  prefetch: [
    {
      where: { and: [{ href_matches: '/*' }, { not: { href_matches: '/api/*' } }] },
      eagerness: 'moderate',
    },
  ],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // the inline script below flags repeat views on <html> before hydration, hence suppressHydrationWarning
    <html
      lang="pt-BR"
      className={`${geist.variable} ${geistMono.variable} ${instrument.variable} ${groovy.variable}`}
      suppressHydrationWarning
    >
      <body>
        <noscript>
          <style>{'[data-preloader]{display:none!important}'}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {/* lets the browser add the site search (Chrome "tab to search", Firefox search bar); React hoists it to <head> */}
        <link rel="search" type="application/opensearchdescription+xml" title="HenaWeb" href="/opensearch.xml" />
        {/* plain-Markdown map of the site for AI assistants (llmstxt.org) */}
        <link rel="alternate" type="text/markdown" title="HenaWeb para assistentes de IA" href="/llms.txt" />
        <a
          href="#conteudo"
          className="toon-sm sr-only z-[200] rounded-full bg-acid px-5 py-3 font-medium text-acid-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:px-5 focus:py-3"
        >
          Pular para o conteúdo
        </a>
        {/* repeat views in the same tab skip the intro: hide the overlay before the first paint instead
            of holding the page under it until hydration fades it out */}
        <script dangerouslySetInnerHTML={{ __html: SEEN_SCRIPT }} />
        <script dangerouslySetInnerHTML={{ __html: IMG_FAIL_SCRIPT }} />
        {/* hovering an internal link for ~200 ms fetches that page, so the click lands on a warm cache */}
        <script type="speculationrules" dangerouslySetInnerHTML={{ __html: SPECULATION_RULES }} />
        <Preloader />
        <SmoothScroll />
        <Cursor />
        <Nav />
        <ConversionTracking />
        <FloatingContact />
        <TabHaunt />
        <ThemeTint />
        <ScrollProgress />
        <NavPending />
        <CopyFallback />
        <NetStatus />
        <BackToTop />
        <Elementar />
        <Screensaver />
        <QuoteLink />
        <AccordionKeys />
        <SwRegister />
        <DragFile />
        <WinDrag />
        <TabProgress />
        <OffscreenPause />
        {children}
        <div className="grain" aria-hidden />

        {tools.length > 0 && (
          <>
            {/* LGPD: the tools load only after the visitor accepts (or accepted on an earlier visit) */}
            <Script id="analytics" strategy="afterInteractive">
              {analyticsLoader({ pixel: PIXEL_ID, ga: GA_ID, clarity: CLARITY_ID })}
            </Script>
            <ConsentBanner tools={tools} />
          </>
        )}
      </body>
    </html>
  );
}
