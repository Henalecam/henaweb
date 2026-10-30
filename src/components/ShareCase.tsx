'use client';

import { useState } from 'react';
import { copyText } from '@/lib/clipboard';
import { track } from '@/lib/track';

/**
 * "Send this case (or service page) to someone": the native share sheet on phones (WhatsApp, e-mail…), copy-link
 * elsewhere. Cases are often forwarded to a partner or a procurement team before anyone writes in.
 */
export default function ShareCase({
  title,
  text,
  label = 'Enviar este caso ↗',
  placement = 'case-share',
}: {
  title: string;
  text: string;
  label?: string;
  placement?: string;
}) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    // the page itself, without whatever brought this visitor here (?utm_…, ?fbclid=…, a filter): the person
    // receiving it gets a clean address, and the campaign that reached the sender isn't credited twice
    const url = location.origin + location.pathname;
    track({ name: 'cta_click', placement, label: title });
    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch (e) {
        // the visitor closed the sheet: nothing else to do
        if ((e as DOMException)?.name === 'AbortError') return;
      }
    }
    if (await copyText(url)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      className="toon toon-press rounded-full bg-paper px-6 py-4 font-medium text-acid-ink"
    >
      <span aria-live="polite">{copied ? '✓ Link copiado' : label}</span>
    </button>
  );
}
