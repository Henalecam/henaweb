/**
 * The visitor turned on their browser's data saver (Chrome/Android "Lite mode", Save-Data). The 3D
 * scenes (hero bust, burger, footer chase) are the heaviest downloads on the site and purely
 * decorative, so they stay off; every scene already has a static backdrop for when WebGL is missing.
 */
export function saveData(): boolean {
  if (typeof navigator === 'undefined') return false;
  return (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData === true;
}
