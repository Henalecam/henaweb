/**
 * Copies text, falling back to a hidden textarea + execCommand where the async Clipboard API is
 * missing or refused (older Safari, embedded webviews, a denied permission). Resolves true when one
 * of the two worked, so callers only show "copiado" when something really is on the clipboard.
 */
export async function copyText(text: string, { quiet = false }: { quiet?: boolean } = {}): Promise<boolean> {
  const ok = await tryCopy(text);
  // when both routes fail, the site-wide CopyFallback window offers the text selected for a manual Ctrl+C,
  // so no "copy" button anywhere ends up doing nothing. Callers with their own failure UI pass quiet
  if (!ok && !quiet) window.dispatchEvent(new CustomEvent(COPY_FAILED, { detail: text }));
  return ok;
}

/** Fired with the text that couldn't be copied (detail: string). */
export const COPY_FAILED = 'hena:copy-failed';

async function tryCopy(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // selecting the hidden textarea steals focus: put it back afterwards, or a keyboard user who copied
    // something is dropped at the top of the page (and the fallback window couldn't return them either)
    const was = document.activeElement as HTMLElement | null;
    try {
      const t = Object.assign(document.createElement('textarea'), { value: text });
      t.setAttribute('readonly', '');
      t.style.cssText = 'position:fixed;top:0;left:0;opacity:0';
      document.body.append(t);
      t.select();
      const ok = document.execCommand('copy');
      t.remove();
      was?.focus({ preventScroll: true });
      return ok;
    } catch {
      was?.focus({ preventScroll: true });
      return false;
    }
  }
}
