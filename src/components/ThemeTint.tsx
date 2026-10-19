'use client';

import { useEffect } from 'react';

const BASE = '#140c2e';

const isTransparent = (c: string) => c === 'transparent' || /rgba\(.*,\s*0\)$/.test(c);

/** The color of the section under the top edge: its data-tint, else its first solid background up the tree. */
function tintAt(x: number) {
  const hit = document
    .elementsFromPoint(x, 4)
    .find((el) => !el.closest('header, [data-print-hide], dialog, #menu-mobile'));
  let el: Element | null = hit?.closest('section, footer, main > div') ?? null;
  while (el && el !== document.body) {
    const tint = (el as HTMLElement).dataset.tint;
    if (tint) return tint;
    const bg = getComputedStyle(el).backgroundColor;
    if (!isTransparent(bg)) return bg;
    el = el.parentElement;
  }
  return BASE;
}

/**
 * Phone browsers paint their toolbar with <meta name="theme-color">. Keeping it in step with the
 * section under the top edge makes the browser chrome part of the page: night sky, cream paper,
 * the orange contact block.
 */
export default function ThemeTint() {
  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!meta) return;
    let raf = 0;
    let current = meta.content;
    const update = () => {
      raf = 0;
      const next = tintAt(window.innerWidth / 2);
      if (next !== current) meta.content = current = next;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);
  return null;
}
