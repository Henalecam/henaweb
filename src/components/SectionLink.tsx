'use client';

import { useState } from 'react';
import { copyText } from '@/lib/clipboard';

/**
 * A "#" next to a section title that copies a link straight to that section (/servicos/x#entregas),
 * for sending a colleague exactly the part that matters. Shown on hover/focus with a pointer, always on touch.
 */
export default function SectionLink({ id, title }: { id: string; title: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const url = `${location.origin}${location.pathname}#${id}`;
    history.replaceState(history.state, '', `#${id}`);
    // even with no clipboard at all the address bar already carries the section link
    if (await copyText(url)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      data-print-hide
      className="toon-sm absolute top-1 right-0 inline-flex min-h-9 items-center gap-1.5 rounded-full bg-paper px-3 font-mono text-xs text-acid-ink transition-opacity [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:focus-visible:opacity-100"
    >
      <span aria-hidden>{copied ? '✓' : '#'}</span>
      <span>{copied ? 'link copiado' : 'link'}</span>
      <span className="sr-only"> da seção {title}</span>
    </button>
  );
}
