'use client';

import { useEffect, useRef, useState } from 'react';
import { copyText } from '@/lib/clipboard';

/** "Copy link" for one FAQ answer, so a question can be sent straight to a partner or a client. */
export function FaqCopyLink({ id }: { id: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    const url = `${location.origin}${location.pathname}#${id}`;
    if (await copyText(url)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } else {
      // nothing could copy (very old browser): put the link in the address bar instead
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

/**
 * "Abrir todas / fechar todas" for a list of FAQ answers: someone comparing studios wants to skim
 * every answer at once instead of clicking eight times. Stays in sync when answers are opened one
 * by one (the `toggle` event doesn't bubble, so it's caught in the capture phase).
 */
export function FaqToggleAll() {
  const ref = useRef<HTMLButtonElement>(null);
  const [allOpen, setAllOpen] = useState(false);

  useEffect(() => {
    const list = ref.current?.closest('section');
    if (!list) return;
    const sync = () => {
      const items = [...list.querySelectorAll('details')];
      setAllOpen(items.length > 0 && items.every((d) => d.open));
    };
    list.addEventListener('toggle', sync, true);
    return () => list.removeEventListener('toggle', sync, true);
  }, []);

  const flip = () => {
    const list = ref.current?.closest('section');
    list?.querySelectorAll('details').forEach((d) => (d.open = !allOpen));
  };

  return (
    <button
      ref={ref}
      type="button"
      onClick={flip}
      aria-expanded={allOpen}
      data-print-hide
      className="label inline-flex min-h-8 items-center gap-1.5 rounded-full !text-current opacity-70 transition-opacity hover:opacity-100 focus-visible:opacity-100"
    >
      <span aria-hidden>{allOpen ? '⊟' : '⊞'}</span>
      {allOpen ? 'Fechar todas' : 'Abrir todas'}
    </button>
  );
}
