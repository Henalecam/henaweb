'use client';

import { useEffect, useState } from 'react';
import { copyText } from '@/lib/clipboard';
import { site } from '@/lib/site';

/**
 * Beside the footer's feed.xml: opening a feed in a browser only shows raw XML, while what a reader app wants is its
 * address. This copies the full URL, ready to paste into Feedly, Inoreader, NetNewsWire or a Slack /feed.
 */
export default function CopyFeed() {
  const [state, setState] = useState<'' | 'ok' | 'fail'>('');
  useEffect(() => {
    if (!state) return;
    const id = window.setTimeout(() => setState(''), state === 'ok' ? 2500 : 6000);
    return () => window.clearTimeout(id);
  }, [state]);
  const url = `${site.url}/casos/feed.xml`;
  return (
    <button
      type="button"
      onClick={async () => setState((await copyText(url, { quiet: true })) ? 'ok' : 'fail')}
      className="-my-2 ml-2 inline-flex min-h-6 items-center py-2 font-mono text-[0.7rem] text-ink/60 underline decoration-dotted underline-offset-2 hover:text-ink"
      data-print-hide
    >
      <span aria-hidden>{state === 'ok' ? '✓ ' : state === 'fail' ? '✕ ' : '⧉ '}</span>
      {state === 'ok' ? 'copiado' : state === 'fail' ? 'não deu' : 'copiar'}
      <span className="sr-only"> o endereço do feed</span>
      <span className="sr-only" aria-live="polite">
        {state === 'ok' ? 'Endereço do feed copiado: cole no seu leitor de RSS' : state === 'fail' ? `Não foi possível copiar. O endereço é ${url}` : ''}
      </span>
    </button>
  );
}
