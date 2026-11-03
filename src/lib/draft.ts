/**
 * The contact form's same-tab draft (sessionStorage "hena:draft", read by Contact): adds a block to its message,
 * once, after whatever the visitor already wrote. Used by the buttons that open the form with context: the
 * symptoms ticked on a service page, "Abrir um caso parecido" on a case page.
 */
export function addToDraft(block: string) {
  try {
    const d = JSON.parse(sessionStorage.getItem('hena:draft') ?? 'null') ?? { picked: [], timeline: '', fields: {} };
    const msg: string = d.fields?.message ?? '';
    d.fields = { ...d.fields, message: msg.includes(block) ? msg : [msg, block].filter(Boolean).join('\n\n') };
    sessionStorage.setItem('hena:draft', JSON.stringify(d));
  } catch {}
}
