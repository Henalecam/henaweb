import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import BackToTop from './components/back-to-top/BackToTop';
import Accessibility from './components/accessibility/Accessibility';
import Analytics from './components/analytics/Analytics';
import { ThemeProvider } from './providers/ThemeProvider';
import WhatsAppButton from './components/WhatsAppButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'HenaWeb - Desenvolvimento Web e Soluções Digitais',
  description: 'Transforme sua presença digital com soluções web modernas e inovadoras.',
  keywords: ['desenvolvimento web', 'sites', 'aplicações web', 'tecnologia', 'soluções digitais'],
  authors: [{ name: 'HenaWeb' }],
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
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
      </head>
      <body className={inter.className}>
        <ThemeProvider>
          <Analytics />
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
