import type { Metadata } from 'next';
import SharedIn from '@/components/SharedIn';

export const metadata: Metadata = {
  title: 'Abrindo um caso',
  robots: { index: false, follow: false },
  alternates: { canonical: null },
  openGraph: { url: null },
};

/**
 * The landing of the installed app's share target (manifest.ts): something shared from another app (a link, a
 * screenshot's caption, a note) arrives here and is put into the contact form's message, so "I want something
 * like this" is one share away. The page itself only shows a one-line "abrindo…" while it hands over.
 */
export default function Compartilhado() {
  return (
    <main id="conteudo" tabIndex={-1} className="sky grid min-h-[100svh] place-items-center text-ink">
      <SharedIn />
    </main>
  );
}
