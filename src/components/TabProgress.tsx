'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ID = 'hena-progress-icon';

/** The tab icon as a reading dial: an orange arc that closes as the page is read, around the site's "H". */
const dial = (p: number) => {
  const a = Math.min(0.999, p) * 2 * Math.PI;
  const x = 16 + 11 * Math.sin(a);
  const y = 16 - 11 * Math.cos(a);
  const arc = `M16 5A11 11 0 ${a > Math.PI ? 1 : 0} 1 ${x.toFixed(2)} ${y.toFixed(2)}`;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="8" fill="#140c2e"/><circle cx="16" cy="16" r="11" fill="none" stroke="#fdf3e1" stroke-opacity=".18" stroke-width="4"/><path d="${arc}" fill="none" stroke="#f7931e" stroke-width="4" stroke-linecap="round"/><text x="16" y="21" text-anchor="middle" font-family="Georgia,serif" font-weight="700" font-size="14" fill="#f7931e">H</text></svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};

/**
 * On long pages (case files, service pages, the home), the browser tab shows how far the visitor has read: the
 * favicon becomes a small dial that fills in orange as they scroll, so a tab left behind among twenty others
 * says "halfway through this one". At the very top the usual icon is back. The "away" icon (TabHaunt) is added
 * after this one, so it still wins while the tab is in the background.
 */
export default function TabProgress() {
  const path = usePathname();
  useEffect(() => {
    let raf = 0;
    let shown = -1;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - innerHeight;
      // short pages have nothing to measure
      const p = max > innerHeight * 2 ? scrollY / max : 0;
      // twenty steps are plenty for a 16px icon, and keep the <link> from being rewritten on every frame
      const step = Math.round(p * 20) / 20;
      if (step === shown) return;
      shown = step;
      let link = document.getElementById(ID) as HTMLLinkElement | null;
      if (step < 0.05) return link?.remove();
      if (!link) {
        link = Object.assign(document.createElement('link'), { id: ID, rel: 'icon', type: 'image/svg+xml' });
        // before the away icon, if one is up, so that one keeps the last word
        const away = document.getElementById('hena-away-icon');
        if (away) document.head.insertBefore(link, away);
        else document.head.appendChild(link);
      }
      link.href = dial(step);
    };
    const onScroll = () => (raf ||= requestAnimationFrame(update));
    update();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener('scroll', onScroll);
      removeEventListener('resize', onScroll);
      document.getElementById(ID)?.remove();
    };
  }, [path]);
  return null;
}
