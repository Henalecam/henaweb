'use client';

import { useEffect } from 'react';
import { track } from '@/lib/track';

/** Where on the page a click happened, from the nearest section id (or the header/footer). */
function placementOf(el: Element) {
  if (el.closest('header')) return 'header';
  if (el.closest('footer')) return 'footer';
  return el.closest('section[id]')?.id ?? (location.pathname === '/' ? 'home' : location.pathname);
}

/** One delegated listener records contact clicks across the whole site. */
export default function ConversionTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as Element | null)?.closest?.('a[href]');
      if (!a) return;
      const href = a.getAttribute('href') ?? '';
      const placement = placementOf(a);
      if (/api\.whatsapp\.com|wa\.me/.test(href)) track({ name: 'whatsapp_click', placement });
      else if (href.startsWith('mailto:')) track({ name: 'email_click', placement });
      else if (href.endsWith('#contato')) track({ name: 'cta_click', placement, label: (a.textContent ?? '').trim().slice(0, 60) });
    };
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
