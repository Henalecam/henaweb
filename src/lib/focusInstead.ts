/**
 * Before a small window or note removes itself with the keyboard inside it (a close button, an auto-dismiss), move
 * focus somewhere that stays: otherwise it drops onto <body> and the next Tab starts over from the top of the page.
 * Goes to `to` (made focusable just for the visit when it isn't), else to the start of the content. A no-op when
 * the focus is elsewhere, so a mouse user's place is never touched.
 */
export function focusInstead(box: Element | null | undefined, to?: HTMLElement | null) {
  if (!box?.contains(document.activeElement)) return;
  const el = to ?? document.getElementById('conteudo');
  if (!el) return;
  if (!el.matches('a[href], button, input, select, textarea, [tabindex]')) {
    el.setAttribute('tabindex', '-1');
    el.addEventListener('blur', () => el.removeAttribute('tabindex'), { once: true });
  }
  el.focus({ preventScroll: true });
}
