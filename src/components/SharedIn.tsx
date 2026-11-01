'use client';

import { useEffect } from 'react';

/** Puts what was shared into the contact draft (same-tab sessionStorage, as Contact keeps it) and opens the form. */
export default function SharedIn() {
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const clip = (s: string | null) => (s ?? '').trim().slice(0, 600);
    const title = clip(q.get('titulo'));
    const text = clip(q.get('texto'));
    // some apps put the link inside the text instead of the url field; don't repeat it
    const link = clip(q.get('link'));
    const parts = [title, text, link && !text.includes(link) ? link : ''].filter(Boolean);
    if (parts.length) {
      const line = `Vi isto e quero algo parecido:\n${parts.join('\n')}`;
      try {
        const d = JSON.parse(sessionStorage.getItem('hena:draft') ?? 'null') ?? { picked: [], timeline: '', fields: {} };
        const msg: string = d.fields?.message ?? '';
        d.fields = { ...d.fields, message: msg.includes(line) ? msg : [msg, line].filter(Boolean).join('\n\n') };
        sessionStorage.setItem('hena:draft', JSON.stringify(d));
      } catch {
        // no storage: the form still opens, empty
      }
    }
    location.replace('/#mensagem');
  }, []);
  return (
    <p role="status" className="font-mono text-sm text-ink/75">
      Abrindo um caso com o que você compartilhou…{' '}
      <a href="/#contato" className="underline underline-offset-4">
        ir agora
      </a>
    </p>
  );
}
