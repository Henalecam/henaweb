'use client';

import { useEffect } from 'react';

/**
 * The "Nesta página" chips of a long page double as a reading map: a section that has been on screen
 * marks its chip as seen (data-seen), so on the way back up the visitor sees what's left to read.
 * In memory only, for this visit.
 */
export default function TocSeen({ nav }: { nav: string }) {
  useEffect(() => {
    const links = [...document.querySelectorAll<HTMLAnchorElement>(`nav[aria-label="${nav}"] a[href^="#"]`)];
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          links.find((a) => a.hash === `#${e.target.id}`)?.setAttribute('data-seen', '');
          io.unobserve(e.target);
        }
      },
      // a section counts once its heading has climbed into the top 60% of the screen
      { rootMargin: '0px 0px -40% 0px' },
    );
    links.forEach((a) => {
      const target = document.getElementById(a.hash.slice(1));
      if (target) io.observe(target);
    });
    return () => io.disconnect();
  }, [nav]);
  return null;
}
