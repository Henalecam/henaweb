import { Metadata } from 'next';

export const defaultMetadata: Metadata = {
  title: {
    default: 'HenaWeb | Desenvolvimento Web Premium',
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
  metadataBase: new URL('https://henaweb.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://henaweb.com',
    siteName: 'HenaWeb',
    title: 'HenaWeb | Desenvolvimento Web Premium',
    description: 'Transforme sua presença digital com soluções web premium. Desenvolvimento de sites, automação inteligente e consultoria estratégica para impulsionar seu negócio.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'HenaWeb - Desenvolvimento Web Premium',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HenaWeb | Desenvolvimento Web Premium',
    description: 'Transforme sua presença digital com soluções web premium. Desenvolvimento de sites, automação inteligente e consultoria estratégica para impulsionar seu negócio.',
    images: ['/og-image.jpg'],
    creator: '@henaweb',
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