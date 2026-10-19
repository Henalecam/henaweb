'use client';

import { useEffect, useState } from 'react';

/** "Copy link" for one FAQ answer, so a question can be sent straight to a partner or a client. */
export function FaqCopyLink({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const url = `${location.origin}${location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // no clipboard (insecure context, old browser): put the link in the address bar instead
      history.replaceState(null, '', `#${id}`);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      data-print-hide
      className="label mt-4 inline-flex min-h-8 items-center gap-1.5 rounded-full !text-current opacity-60 transition-opacity hover:opacity-100 focus-visible:opacity-100"
    >
      <span aria-hidden>{copied ? '✓' : '⧉'}</span>
      <span aria-live="polite">{copied ? 'Link copiado' : 'Copiar link da pergunta'}</span>
    </button>
  );
}

/** Opening a page at #pergunta-… opens that answer and brings it into view. */
export function FaqHashOpener() {
  useEffect(() => {
    const open = () => {
      const id = decodeURIComponent(location.hash.slice(1));
      if (!id.startsWith('pergunta-')) return;
      const el = document.getElementById(id);
      if (!(el instanceof HTMLDetailsElement)) return;
      el.open = true;
      // after layout settles (fonts, reveals), so the smooth scroller lands on the right spot
      requestAnimationFrame(() => el.scrollIntoView({ block: 'center' }));
    };
    open();
    window.addEventListener('hashchange', open);
    return () => window.removeEventListener('hashchange', open);
  }, []);
  return null;
}
