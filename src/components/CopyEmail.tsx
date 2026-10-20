'use client';

import { useState } from 'react';
import { copyText } from '@/lib/clipboard';
import { site } from '@/lib/site';
import { track } from '@/lib/track';

/**
 * A "copy" twin for the mailto link: plenty of visitors (webmail users, office PCs) have no mail
 * app wired to mailto, so clicking the address does nothing for them. Copying always works.
 */
export default function CopyEmail({ className = '', placement }: { className?: string; placement: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const ok = await copyText(site.email);
    track({ name: 'email_click', placement: `${placement}-copy` });
    if (!ok) return;
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button type="button" onClick={copy} className={className} data-print-hide>
      <span aria-hidden>{copied ? '✓ ' : '⧉ '}</span>
      {copied ? 'copiado' : 'copiar'}
      <span className="sr-only"> e-mail</span>
      <span className="sr-only" aria-live="polite">
        {copied ? 'E-mail copiado' : ''}
      </span>
    </button>
  );
}
