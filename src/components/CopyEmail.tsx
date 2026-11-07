'use client';

import { useEffect, useState } from 'react';
import { copyText } from '@/lib/clipboard';
import { site } from '@/lib/site';
import { track } from '@/lib/track';

/**
 * A "copy" twin for the mailto link: plenty of visitors (webmail users, office PCs) have no mail
 * app wired to mailto, so clicking the address does nothing for them. Copying always works.
 */
export default function CopyEmail({ className = '', placement }: { className?: string; placement: string }) {
  // 'ok': on the clipboard; 'fail': neither clipboard route worked (a locked-down webview), so say so and show
  // the address selected, ready for a manual copy, instead of a button that silently does nothing
  const [state, setState] = useState<'' | 'ok' | 'fail'>('');
  const [n, setN] = useState(0);

  const copy = async () => {
    const ok = await copyText(site.email, { quiet: true });
    track({ name: 'email_click', placement: `${placement}-copy` });
    setState(ok ? 'ok' : 'fail');
    setN((x) => x + 1);
  };
  useEffect(() => {
    if (!state) return;
    const id = window.setTimeout(() => setState(''), state === 'ok' ? 2000 : 6000);
    return () => window.clearTimeout(id);
  }, [state, n]);

  return (
    <span className="relative inline-flex" data-print-hide>
      <button type="button" onClick={copy} className={className}>
        {/* a no-break space: a plain one is trimmed at the end of a flex item, gluing the icon to the word ("⧉copiar") */}
        <span aria-hidden>{state === 'ok' ? '✓\u00a0' : state === 'fail' ? '✕\u00a0' : '⧉\u00a0'}</span>
        {state === 'ok' ? 'copiado' : state === 'fail' ? 'não deu' : 'copiar'}
        <span className="sr-only"> e-mail</span>
        <span className="sr-only" aria-live="polite">
          {state === 'ok' ? 'E-mail copiado' : state === 'fail' ? `Não foi possível copiar. O e-mail é ${site.email}` : ''}
        </span>
      </button>
      {/* a carbon copy of the address floats up off the button and fades, so "it's on your clipboard" is seen,
          not just read. Re-keyed per click so a second copy replays it. Decorative */}
      {state === 'ok' && (
        <span key={n} aria-hidden data-copy-ghost className="pointer-events-none absolute bottom-full left-1/2 font-mono text-xs whitespace-nowrap">
          {site.email}
        </span>
      )}
      {state === 'fail' && (
        <span
          data-copy-manual
          className="absolute bottom-full left-0 mb-2 rounded-md border-2 border-toon bg-paper px-2 py-1 font-mono text-xs whitespace-nowrap text-acid-ink shadow-[3px_3px_0_#12082a] select-all"
        >
          {site.email}
        </span>
      )}
    </span>
  );
}
