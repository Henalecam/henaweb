import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { ThemeProvider } from './providers/ThemeProvider';

// Dynamically import non-critical components
const Header = dynamic(() => import('./components/Header'), {
  ssr: true,
  loading: () => <div className="h-16 bg-gray-100 animate-pulse" />,
});

const Footer = dynamic(() => import('./components/Footer'), {
  ssr: true,
  loading: () => <div className="h-32 bg-gray-100 animate-pulse" />,
});

const BackToTop = dynamic(() => import('./components/back-to-top/BackToTop'), {
  ssr: false,
});

const Accessibility = dynamic(() => import('./components/accessibility/Accessibility'), {
  ssr: false,
});

const WhatsAppButton = dynamic(() => import('./components/WhatsAppButton'), {
  ssr: false,
});

const Analytics = dynamic(() => import('./components/analytics/Analytics'), {
  ssr: false,
});

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: 'HenaWeb - Desenvolvimento Web e Soluções Digitais',
  description: 'Transforme sua presença digital com soluções web modernas e inovadoras.',
  keywords: ['desenvolvimento web', 'sites', 'aplicações web', 'tecnologia', 'soluções digitais'],
  authors: [{ name: 'HenaWeb' }],
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180' },
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#4F46E6',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>
          <Header />
          {children}
          <Footer />
          <BackToTop />
          <Accessibility />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
