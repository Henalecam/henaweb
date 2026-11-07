'use client';

import { useEffect, useRef, useState } from 'react';
import { focusInstead } from '@/lib/focusInstead';

// the apps whose built-in browser opens a link from a bio or a post: Instagram, Facebook/Messenger, LinkedIn,
// TikTok. Inside them a .vcf download or an "install app" prompt often does nothing at all
const IN_APP = /Instagram|FBAN|FBAV|FB_IAB|LinkedInApp|musical_ly|BytedanceWebview/i;

/**
 * /links is the page the social profiles link to, so it is mostly opened inside an app's own browser. There the
 * "Salvar contato no celular" file and the install prompt tend to fail silently. Only there, a one-line note says
 * how to open the page in the phone's browser; it can be closed, and it never shows anywhere else.
 */
export default function InAppHint() {
  const [app, setApp] = useState<string | null>(null);
  const note = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const m = IN_APP.exec(navigator.userAgent);
    if (!m) return;
    const k = m[0].toLowerCase();
    setApp(k.startsWith('insta') ? 'Instagram' : k.startsWith('linkedin') ? 'LinkedIn' : k.startsWith('fb') ? 'Facebook' : 'TikTok');
  }, []);
  if (!app) return null;
  return (
    <p ref={note} role="note" className="mt-4 flex items-start gap-2 rounded-lg border-2 border-dashed border-acid-ink/30 bg-lemon/60 px-3 py-2 text-xs leading-relaxed text-acid-ink">
      <span aria-hidden>ⓘ</span>
      <span className="flex-1">
        Você está no navegador do {app}. Para salvar o contato ou instalar o atalho, toque nos três pontinhos do topo e escolha
        abrir no navegador do celular.
      </span>
      <button
        type="button"
        onClick={() => {
          focusInstead(note.current);
          setApp(null);
        }}
        aria-label="Fechar aviso"
        className="-m-1 min-h-6 min-w-6 font-bold"
      >
        ×
      </button>
    </p>
  );
}
