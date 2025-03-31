import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { defaultMetadata } from './metadata';
import { ThemeProvider } from './providers/ThemeProvider';
import { Analytics } from './components/Analytics';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={inter.variable} suppressHydrationWarning>
        <ThemeProvider>
          <Analytics />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
