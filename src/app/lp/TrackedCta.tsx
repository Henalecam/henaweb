'use client';

import { useCallback } from 'react';

export default function TrackedCta({ href, children }: { href: string; children: React.ReactNode }) {
  const handleClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      // Tracking simples (pode ser conectado ao gtag/fbq se disponível)
      try {
        window.dispatchEvent(new CustomEvent('lp-cta-click', { detail: { href } }));
      } catch {}
      // Nada bloqueante, segue fluxo normal
    },
    [href]
  );

  return (
    <a href={href} onClick={handleClick} className="inline-flex items-center justify-center rounded-lg bg-white px-5 py-3 text-base font-semibold text-indigo-700 shadow-sm hover:bg-indigo-50">
      {children}
    </a>
  );
}