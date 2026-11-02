'use client';

import { useEffect, useState } from 'react';

const GENERIC = 'Suspeito principal: um link antigo ou digitado errado.';

/**
 * The 404 window names the missing address and, like a detective, the most likely culprit:
 * one of our own links (same-origin referrer), a link on another site, or a typo / old bookmark.
 * The server HTML keeps the generic line; this only sharpens it in the browser.
 */
export default function LostSuspect() {
  const [path, setPath] = useState<string | null>(null);
  const [suspect, setSuspect] = useState(GENERIC);

  useEffect(() => {
    let p = location.pathname;
    try {
      p = decodeURIComponent(p);
    } catch {
      // malformed escapes: show it as typed
    }
    setPath(p.length > 60 ? `${p.slice(0, 57)}…` : p);

    if (!document.referrer) {
      setSuspect('Suspeito principal: endereço digitado à mão ou um favorito antigo.');
      return;
    }
    try {
      const from = new URL(document.referrer);
      if (from.origin === location.origin) {
        setSuspect(`Suspeito principal: um link nosso, na página ${from.pathname}. Culpa nossa.`);
      } else {
        setSuspect(`Suspeito principal: um link antigo em ${from.hostname.replace(/^www\./, '')}.`);
      }
    } catch {
      // unreadable referrer: keep the generic line
    }
  }, []);

  return (
    <>
      {path && (
        <p className="mt-2">
          <span className="opacity-70">Endereço procurado:</span>{' '}
          <code className="mt-1 block w-fit max-w-full rounded-sm bg-acid-ink/10 px-1 [overflow-wrap:anywhere]">{path}</code>
        </p>
      )}
      <p className="mt-2 text-acid-ink/75">{suspect}</p>
    </>
  );
}
