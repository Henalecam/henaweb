import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-primary-500 dark:bg-secondary-900">
      <Header />
      <main className="pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
} 