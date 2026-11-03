'use client';

import { useEffect, useState } from 'react';

const cls =
  'toon-sm sr-only z-[200] rounded-full bg-acid px-5 py-3 font-medium text-acid-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:px-5 focus:py-3';

/**
 * The second skip link: "Pular para o contato" goes to the home's contact form (/#contato), except on a page that
 * carries its own way to reach the studio, marked data-skip-contact (the "sem sinal" page: there the home may not
 * open at all, and a phone number and e-mail sit right on the page). The offline page can be served under any
 * address (the service worker's fallback), so it is found in the page, not by the URL.
 */
export default function SkipContact() {
  const [href, setHref] = useState('/#contato');
  useEffect(() => {
    const own = document.querySelector<HTMLElement>('[data-skip-contact][id]');
    if (own) setHref(`#${own.id}`);
  }, []);
  return (
    <a href={href} className={cls}>
      Pular para o contato
    </a>
  );
}
