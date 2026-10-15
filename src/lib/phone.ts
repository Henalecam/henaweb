/**
 * Formats a Brazilian phone as the visitor types: (41) 99999-9999, (41) 3333-3333, or
 * +55 (41) 99999-9999 when the country code is typed. Numbers that start with + and another
 * country code are left as typed, so foreign leads aren't mangled.
 */
export function formatPhoneBR(raw: string): string {
  const trimmed = raw.trimStart();
  if (trimmed.startsWith('+') && !trimmed.startsWith('+55')) return raw;
  let d = raw.replace(/\D/g, '');
  let prefix = '';
  if (trimmed.startsWith('+55') || (d.startsWith('55') && d.length > 11)) {
    prefix = '+55 ';
    d = d.slice(2);
  }
  d = d.slice(0, 11);
  if (!d) return prefix.trim();
  if (d.length <= 2) return `${prefix}(${d}`;
  const ddd = d.slice(0, 2);
  const rest = d.slice(2);
  // 9 digits after the area code is a mobile (9xxxx-xxxx); 8 is a landline (xxxx-xxxx)
  const split = rest.length > 8 ? 5 : 4;
  const body = rest.length > split ? `${rest.slice(0, split)}-${rest.slice(split)}` : rest;
  return `${prefix}(${ddd}) ${body}`;
}
