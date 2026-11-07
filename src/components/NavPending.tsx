'use client';

import { useEffect } from 'react';

/**
 * Feedback while the next page loads. Links between pages are plain <a> (full navigations, animated by view
 * transitions when the new page arrives), so on a slow connection a click used to do nothing visible for a
 * second or more. Now a striped bar runs along the top from the click until the page goes. Same-origin page
 * links only: not anchors on this page, new tabs, downloads or modified clicks. Cleared when the page comes back
 * from the back/forward cache or the navigation is abandoned.
 */
export default function NavPending() {
  useEffect(() => {
    const html = document.documentElement;
    let timer = 0;
    const clear = () => {
      window.clearTimeout(timer);
      delete html.dataset.navigating;
    };
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== '_self') || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      // same page (only the hash or nothing changes): Lenis scrolls, no load
      if (url.pathname === location.pathname && url.search === location.search) return;
      // a beat of grace: fast loads never show it
      window.clearTimeout(timer);
      timer = window.setTimeout(() => (html.dataset.navigating = ''), 120);
      // a stalled or cancelled navigation must not leave the bar running forever
      window.setTimeout(clear, 15000);
    };
    document.addEventListener('click', onClick);
    window.addEventListener('pageshow', clear);
    return () => {
      document.removeEventListener('click', onClick);
      window.removeEventListener('pageshow', clear);
      clear();
    };
  }, []);
  return <div aria-hidden data-nav-pending data-print-hide />;
}
