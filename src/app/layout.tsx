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

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });
const instrument = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['italic', 'normal'],
  variable: '--font-instrument',
  display: 'swap',
});

const groovy = Shrikhand({ subsets: ['latin'], weight: '400', variable: '--font-shrikhand', display: 'swap' });

const title = 'HenaWeb · Desenvolvimento de sistemas sob medida e para o setor público';
const description =
  'Studio de engenharia de software em Curitiba. Desenvolvemos sistemas sob medida, ERPs, plataformas para o setor público, automações com n8n e IA e sites que convertem. Atendemos todo o Brasil.';

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
  alternates: { canonical: '/' },
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
  icons: { icon: [{ url: '/favicon.ico' }, { url: '/icon.png', type: 'image/png' }], apple: '/apple-icon.png' },
};

export const viewport: Viewport = { themeColor: '#140c2e', colorScheme: 'dark' };

const PIXEL_ID = '1389558105453782';
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

const sameAs = site.social.map((x) => x.href);

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: 'HenaWeb',
      legalName: 'Henaweb Ltda',
      url: site.url,
      logo: `${site.url}/icon.png`,
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
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${geistMono.variable} ${instrument.variable} ${groovy.variable}`}>
      <body>
        <noscript>
          <style>{'[data-preloader]{display:none!important}'}</style>
        </noscript>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <a
          href="#conteudo"
          className="toon-sm sr-only z-[200] rounded-full bg-acid px-5 py-3 font-medium text-acid-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:px-5 focus:py-3"
        >
          Pular para o conteúdo
        </a>
        <Preloader />
        <SmoothScroll />
        <Cursor />
        <Nav />
        <ConversionTracking />
        <FloatingContact />
        {children}
        <div className="grain" aria-hidden />

        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`}
        </Script>
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        )}
        {CLARITY_ID && (
          <Script id="clarity" strategy="afterInteractive">
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${CLARITY_ID}");`}
          </Script>
        )}
      </body>
    </html>
  );
}
