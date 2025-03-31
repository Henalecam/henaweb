import { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  icons: {
    icon: '/hac.png',
  },
  title: {
    default: 'HenaWeb',
    template: '%s | HenaWeb'
  },
  description: 'Transforme sua presença digital com soluções web premium. Desenvolvimento de sites, automação inteligente e consultoria estratégica para impulsionar seu negócio.',
  keywords: ['desenvolvimento web', 'sites institucionais', 'e-commerce', 'automação', 'consultoria digital', 'web design', 'programação', 'tecnologia'],
  authors: [{ name: 'HenaWeb' }],
  creator: 'HenaWeb',
  publisher: 'HenaWeb',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://hacamargo.shop'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://hacamargo.shop',
    siteName: 'HenaWeb',
    title: 'HenaWeb | Desenvolvimento Web Premium',
    description: 'Transforme sua presença digital com soluções web premium. Desenvolvimento de sites, automação inteligente e consultoria estratégica para impulsionar seu negócio.',
    images: [
      {
        url: '/hac.png',
        width: 1200,
        height: 630,
        alt: 'HenaWeb - Desenvolvimento Web Premium',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
}; 