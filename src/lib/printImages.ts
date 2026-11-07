/**
 * Pictures that load lazily (next/image's default) and were never scrolled to print as empty frames: the home's
 * case windows and the studio photo, for one. Switching them to eager on the way to paper fetches them; `ready`
 * also waits (briefly) for them, for the site's own "Salvar dossiê em PDF" button, which can hold the print dialog
 * until they are in.
 */
export function eagerImages(): HTMLImageElement[] {
  const lazy = [...document.images].filter((img) => img.loading === 'lazy' && !img.complete);
  lazy.forEach((img) => (img.loading = 'eager'));
  return lazy;
}

export function imagesReady(timeout = 2500): Promise<void> {
  const pending = eagerImages();
  if (!pending.length) return Promise.resolve();
  return Promise.race([
    Promise.all(pending.map((img) => img.decode().catch(() => {}))).then(() => {}),
    new Promise<void>((r) => setTimeout(r, timeout)),
  ]);
}
