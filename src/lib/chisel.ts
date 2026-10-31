/**
 * Marble chips for the hero's "esculpidos": moving the mouse across the word chips little flakes off it,
 * as if the pointer were the chisel. Each flake is a fixed-position span animated with the Web Animations
 * API and removed when it lands, so nothing is clipped by the title's line masks and nothing piles up.
 * Mouse: moving across the word. Touch: a tap knocks a small burst off (chiselTap), so phones get the
 * sculpting too. Never with reduced motion; purely decorative (aria-hidden, no pointer events).
 */
import { buzz } from './haptic';

let last = 0;
let live = 0;
const MAX_LIVE = 24;
const COLORS = ['#f6f1e7', '#e9e1d2', '#fff8ec'];

export function chisel(e: React.PointerEvent<HTMLElement>) {
  if (e.pointerType !== 'mouse') return;
  const now = performance.now();
  if (now - last < 70 || live >= MAX_LIVE) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  last = now;
  spawn(e.clientX, e.clientY, 2);
}

/** A tap (finger or pen) on the word: one blow of the chisel, a burst of chips. */
export function chiselTap(e: React.PointerEvent<HTMLElement>) {
  if (e.pointerType === 'mouse') return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  spawn(e.clientX, e.clientY, Math.min(7, MAX_LIVE - live));
  // the blow is felt too: a two-tap knock, like the chisel hitting stone
  buzz([6, 30, 4]);
}

function spawn(x: number, y: number, n: number) {
  for (let i = 0; i < n; i++) {
    const chip = document.createElement('span');
    const size = 4 + Math.random() * 5;
    chip.setAttribute('aria-hidden', 'true');
    Object.assign(chip.style, {
      position: 'fixed',
      left: `${x - size / 2}px`,
      top: `${y - size / 2}px`,
      width: `${size}px`,
      height: `${size * (0.6 + Math.random() * 0.5)}px`,
      background: COLORS[(Math.random() * COLORS.length) | 0],
      border: '1.5px solid #140a26',
      borderRadius: '1px',
      pointerEvents: 'none',
      zIndex: '60',
    });
    document.body.appendChild(chip);
    live++;

    // a little arc: out to one side and up, then down past where it started
    const dx = (Math.random() - 0.5) * 120;
    const up = 30 + Math.random() * 40;
    const spin = (Math.random() - 0.5) * 540;
    const anim = chip.animate(
      [
        { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${dx * 0.55}px, ${-up}px) rotate(${spin * 0.5}deg)`, opacity: 1, offset: 0.35 },
        { transform: `translate(${dx}px, ${up * 1.6}px) rotate(${spin}deg)`, opacity: 0 },
      ],
      { duration: 650 + Math.random() * 250, easing: 'cubic-bezier(0.25, 0.6, 0.5, 1)' },
    );
    const done = () => {
      chip.remove();
      live--;
    };
    anim.onfinish = done;
    anim.oncancel = done;
  }
}
