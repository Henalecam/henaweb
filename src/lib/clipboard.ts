/**
 * Copies text, falling back to a hidden textarea + execCommand where the async Clipboard API is
 * missing or refused (older Safari, embedded webviews, a denied permission). Resolves true when one
 * of the two worked, so callers only show "copiado" when something really is on the clipboard.
 */
export async function copyText(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const t = Object.assign(document.createElement('textarea'), { value: text });
      t.setAttribute('readonly', '');
      t.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
      document.body.append(t);
      t.select();
      const ok = document.execCommand('copy');
      t.remove();
      return ok;
    } catch {
      return false;
    }
  }
}
