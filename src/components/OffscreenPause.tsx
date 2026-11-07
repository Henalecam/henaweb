'use client';

import { useEffect } from 'react';

/**
 * Pauses the endless CSS loops (marquees, grid floors, sparkles, steam…) of whatever section is off
 * screen. The browser keeps ticking an infinite animation even where nobody can see it, so a visitor
 * reading the contact form was still paying for the ticker tapes at the top of the page.
 */
export default function OffscreenPause() {
  useEffect(() => {
    // the top-level blocks, plus loops that live inside one tall block (a case card's art on /casos sat in a list
    // three screens long, so its section never left the view while the draw kept calling numbers far below)
    const blocks = document.querySelectorAll<HTMLElement>('main > *, main > div > *, footer, [data-pause-offscreen]');
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.target.toggleAttribute('data-offscreen', !e.isIntersecting)),
      { rootMargin: '200px 0px' },
    );
    blocks.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);
  return null;
}
