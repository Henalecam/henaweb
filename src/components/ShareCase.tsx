'use client';

import { useState } from 'react';
import { track } from '@/lib/track';

/**
 * "Send this case to someone": the native share sheet on phones (WhatsApp, e-mail…), copy-link
 * elsewhere. Cases are often forwarded to a partner or a procurement team before anyone writes in.
 */
export default function ShareCase({ title, text }: { title: string; text: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = location.href.split('#')[0];
    track({ name: 'cta_click', placement: 'case-share', label: title });
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (e) {
        // the visitor closed the sheet: nothing else to do
        if ((e as DOMException)?.name === 'AbortError') return;
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={share}
      className="toon toon-press rounded-full bg-paper px-6 py-4 font-medium text-acid-ink"
    >
      <span aria-live="polite">{copied ? '✓ Link copiado' : 'Enviar este caso ↗'}</span>
    </button>
  );
}
