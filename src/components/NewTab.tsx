/**
 * Read after the name of a link that opens in another tab (WhatsApp, social profiles): sighted visitors
 * see the browser switch tabs, screen-reader users were not told. Visually hidden; one wording site-wide.
 */
export default function NewTab() {
  return <span className="sr-only"> (abre em nova aba)</span>;
}
