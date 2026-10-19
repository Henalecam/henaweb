'use client';

import { useEffect, useState } from 'react';
import { CONSENT_OPEN, readConsent, saveConsent, type Consent } from '@/lib/consent';

/**
 * Small, non-blocking cookie notice. Nothing is measured until the visitor accepts;
 * the footer can reopen it to change the choice.
 */
export default function ConsentBanner({ tools }: { tools: string[] }) {
  const [open, setOpen] = useState(false);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // only once the visitor scrolls past the hero, so it never covers the first impression
    const onScroll = () => {
      if (window.scrollY < window.innerHeight * 0.6) return;
      window.removeEventListener('scroll', onScroll);
      setOpen(true);
    };
    if (!readConsent()) {
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_OPEN, reopen);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener(CONSENT_OPEN, reopen);
    };
  }, []);

  // mount first, then slide in on the next frame
  useEffect(() => {
    if (!open) return;
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  if (!open) return null;

  const choose = (c: Consent) => {
    saveConsent(c);
    setShown(false);
    setTimeout(() => setOpen(false), 300);
  };

  return (
    <section
      aria-label="Cookies e medição"
      // phones: above the floating WhatsApp button
      className={`win fixed inset-x-4 z-[70] text-acid-ink transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none bottom-[calc(max(1rem,env(safe-area-inset-bottom))_+_3.75rem)] md:right-auto md:bottom-6 md:left-6 md:w-[24rem] ${
        shown ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      } [html[data-menu=open]_&]:hidden`}
    >
      <div className="win-bar">
        <span>COOKIES.TXT</span>
      </div>
      <div className="m-1.5 border-2 border-[#7d7394] bg-paper p-3.5">
        <p className="text-[0.85rem] leading-snug">
          Usamos cookies de medição ({listPt(tools)}) para saber quais páginas ajudam quem nos procura. Nada é medido sem o seu
          ok.
        </p>
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => choose('granted')}
            className="toon-sm toon-press flex-1 rounded-full bg-acid px-4 py-1.5 text-sm font-medium"
          >
            Aceitar
          </button>
          <button
            type="button"
            onClick={() => choose('denied')}
            className="toon-sm toon-press flex-1 rounded-full bg-white px-4 py-1.5 text-sm font-medium"
          >
            Recusar
          </button>
        </div>
      </div>
    </section>
  );
}

const listPt = (xs: string[]) => (xs.length > 1 ? `${xs.slice(0, -1).join(', ')} e ${xs[xs.length - 1]}` : xs[0]);
