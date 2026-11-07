'use client';

import { useState } from 'react';
import { copyText } from '@/lib/clipboard';

/**
 * "Pass it on": copies the game's short link (henaweb.com/fortrex, a redirect in next.config) so it
 * can go straight into a chat or a story, shorter and on-brand next to the subdomain.
 */
export default function CopyShortLink({ path, name }: { path: string; name: string }) {
  const [copied, setCopied] = useState(false);
  const url = `https://henaweb.com${path}`;
  return (
    <button
      type="button"
      data-print-hide
      onClick={async () => {
        if (!(await copyText(url))) return;
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="label mt-3 inline-flex min-h-8 items-center gap-1.5 !text-ink/70 transition-colors hover:!text-ink focus-visible:!text-ink"
    >
      <span aria-hidden>{copied ? '✓' : '⧉'}</span>
      <span aria-live="polite">{copied ? 'Link copiado' : `Copiar henaweb.com${path}`}</span>
      <span className="sr-only"> (link curto de {name})</span>
    </button>
  );
}
