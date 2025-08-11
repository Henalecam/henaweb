import type { Metadata } from 'next';

export const metadata: Metadata = {
  robots: {
    index: true,
    follow: true,
  },
};

export default function LandingLayout({ children }: { children: React.ReactNode }) {
  // Layout minimalista sem Header/Footer para foco total na conversão
  return (
    <div className="min-h-screen bg-white dark:bg-secondary-900">
      {children}
    </div>
  );
}