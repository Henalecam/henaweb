/**
 * Motion helpers with no animation library behind them, so components that only need these (and WAAPI or CSS
 * for the movement itself) don't pull GSAP into every route. lib/gsap re-exports both for the GSAP scenes.
 */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Runs `cb` once the preloader has finished (or immediately if it already did). */
export function onReady(cb: () => void) {
  if (document.documentElement.dataset.ready === 'true') {
    cb();
    return () => {};
  }
  window.addEventListener('hena:ready', cb, { once: true });
  return () => window.removeEventListener('hena:ready', cb);
}
