'use client';

import { useEffect, useState } from 'react';

/**
 * The offline page's way back: a "redial" button like a dial-up modem's, plus a little signal meter that
 * searches while there's no connection. When the browser reports the line is back, it says so and reloads the
 * page the visitor was trying to open by itself, so nobody has to keep pressing F5.
 */
export default function Redial() {
  const [state, setState] = useState<'searching' | 'back' | 'trying'>('searching');
  useEffect(() => {
    const back = () => {
      setState('back');
      window.setTimeout(() => location.reload(), 900);
    };
    addEventListener('online', back);
    return () => removeEventListener('online', back);
  }, []);
  const redial = () => {
    setState('trying');
    // a real request, not just navigator.onLine (which says "online" on a Wi-Fi with no internet behind it)
    fetch(`/manifest.webmanifest?ping=${Date.now()}`, { cache: 'no-store' })
      .then((r) => (r.ok ? location.reload() : setState('searching')))
      .catch(() => window.setTimeout(() => setState('searching'), 700));
  };
  return (
    <div className="mt-6 flex flex-wrap items-center gap-4">
      <button type="button" onClick={redial} disabled={state !== 'searching'} className="toon-sm toon-press rounded-full bg-acid px-5 py-2.5 font-medium text-acid-ink disabled:opacity-70">
        {state === 'trying' ? 'Discando…' : state === 'back' ? 'Conectado!' : 'Tentar de novo ☎'}
      </button>
      <span role="status" className="flex items-center gap-2 font-mono text-xs text-acid-ink/75">
        <span aria-hidden data-signal={state} className="signal flex items-end gap-0.5">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} style={{ height: `${(i + 1) * 4}px`, animationDelay: `${i * 0.18}s` }} />
          ))}
        </span>
        {state === 'back' ? 'O sinal voltou. Abrindo a página…' : state === 'trying' ? 'Procurando sinal…' : 'Sem sinal. Voltamos sozinhos quando ele aparecer.'}
      </span>
    </div>
  );
}
