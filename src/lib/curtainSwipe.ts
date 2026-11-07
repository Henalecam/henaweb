import type { TouchEvent } from 'react';

/**
 * Phone menu: the curtain dropped from the top, so a finger can push it back up. While the finger travels upward the
 * curtain's lower edge follows it (clip-path, the same property its open/close wipe animates); let go past ~90 px, or
 * with a quick flick, and it closes; short of that it springs back. Only when the curtain has nothing left to scroll
 * in that direction (it scrolls on short screens), and never for a plain tap on a link.
 */
export function curtainSwipe(close: () => void) {
  let startY = 0;
  let startT = 0;
  let dy = 0;
  let armed = false;

  return {
    onTouchStart(e: TouchEvent<HTMLElement>) {
      const el = e.currentTarget;
      startY = e.touches[0].clientY;
      startT = performance.now();
      dy = 0;
      // already at the end of its own scroll (or nothing to scroll): an upward drag can only mean "put it away"
      armed = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
    },
    onTouchMove(e: TouchEvent<HTMLElement>) {
      if (!armed) return;
      dy = Math.max(0, startY - e.touches[0].clientY);
      const el = e.currentTarget;
      if (dy < 8) return;
      el.style.transition = 'none';
      el.style.clipPath = `inset(0 0 ${dy}px 0)`;
    },
    onTouchEnd(e: TouchEvent<HTMLElement>) {
      const el = e.currentTarget;
      if (!armed || dy < 8) return;
      const fast = dy / Math.max(1, performance.now() - startT) > 0.6; // px per ms
      // hand the edge back to the class's transition: it glides from where the finger left it
      el.style.transition = '';
      el.style.clipPath = '';
      if (dy > 90 || fast) close();
      dy = 0;
    },
  };
}
