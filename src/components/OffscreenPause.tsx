'use client';

import { useEffect } from 'react';

/**
 * Pauses the endless CSS loops (marquees, grid floors, sparkles, steam…) of whatever section is off
 * screen. The browser keeps ticking an infinite animation even where nobody can see it, so a visitor
 * reading the contact form was still paying for the ticker tapes at the top of the page.
 */
export default function OffscreenPause() {
  useEffect(() => {
    const blocks = document.querySelectorAll<HTMLElement>('main > *, main > div > *, footer');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.toggleAttribute('data-offscreen', !e.isIntersecting)),
      { rootMargin: '200px 0px' },
    );
    blocks.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);
  return null;
}
