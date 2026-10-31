'use client';

import { useEffect, useState } from 'react';

/**
 * Site-wide connection notice. When the device drops offline (a tunnel, a weak 4G, the café Wi-Fi), a small
 * "sem sinal" chip hangs from the top: what's already open keeps working, but new pages and the 3D may not
 * load. When the connection returns it says so for a moment and leaves. Nothing shows while online, and the
 * form keeps its own detailed message about a send that failed offline.
 */
export default function NetStatus() {
  const [net, setNet] = useState<'ok' | 'off' | 'back'>('ok');

  useEffect(() => {
    let timer = 0;
    const off = () => {
      window.clearTimeout(timer);
      setNet('off');
    };
    const on = () => {
      setNet((n) => (n === 'off' ? 'back' : n));
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setNet('ok'), 3000);
    };
    if (!navigator.onLine) off();
    window.addEventListener('offline', off);
    window.addEventListener('online', on);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('offline', off);
      window.removeEventListener('online', on);
    };
  }, []);

  return (
    // the live region is always in the page (empty while online), so the change is announced when it happens
    <div role="status" className="pointer-events-none fixed inset-x-0 top-[4.5rem] z-[60] flex justify-center px-4" data-print-hide>
      {net !== 'ok' && (
        <p
          key={net}
          data-net={net}
          className={`toon-sm flex max-w-md items-center gap-2.5 rounded-2xl px-4 py-2 font-mono text-xs ${net === 'off' ? 'bg-paper text-acid-ink' : 'bg-[#3cc6b4] text-acid-ink'}`}
        >
          <span aria-hidden className="flex items-end gap-[2px]">
            {[4, 7, 10, 13].map((h, i) => (
              <span
                key={h}
                className={`w-[3px] rounded-[1px] ${net === 'off' && i > 0 ? 'bg-acid-ink/20' : 'bg-acid-ink'}`}
                style={{ height: h }}
              />
            ))}
          </span>
          {net === 'off' ? 'Sem sinal: o que já abriu continua aqui, páginas novas podem não carregar.' : 'Conexão de volta.'}
        </p>
      )}
    </div>
  );
}
