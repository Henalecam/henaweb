/**
 * A tiny tactile tick on phones that support it (Android Chrome; iOS ignores navigator.vibrate). Only ever
 * called from the visitor's own tap (or, in the /offline game, the crash their run ends in), kept to a few milliseconds, and skipped with reduced motion, which we
 * read as "keep the sensory effects down".
 */
export function buzz(pattern: number | number[] = 8) {
  if (typeof navigator === 'undefined' || !('vibrate' in navigator)) return;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  try {
    navigator.vibrate(pattern);
  } catch {
    // some embedded browsers throw instead of ignoring it
  }
}
