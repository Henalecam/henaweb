// Catches the classic e-mail typos (gmail.con, hotmial.com, outlok.com, yahoo.com.bt…) so a lead
// isn't lost to a reply that bounces. Suggests, never auto-corrects.

const DOMAINS = [
  'gmail.com',
  'hotmail.com',
  'hotmail.com.br',
  'outlook.com',
  'outlook.com.br',
  'live.com',
  'yahoo.com',
  'yahoo.com.br',
  'icloud.com',
  'uol.com.br',
  'bol.com.br',
  'terra.com.br',
  'ig.com.br',
  // real providers that sit one letter away from the ones above
  'mail.com',
  'me.com',
  'msn.com',
  'aol.com',
  'proton.me',
  'protonmail.com',
];

// common slips in the ending, fixed before comparing against the list
const TLD_FIXES: [RegExp, string][] = [
  [/\.(con|cmo|ocm|copm|vom|xom|comm|om)$/, '.com'],
  [/\.com\.(bt|bf|vr|brr|b)$/, '.com.br'],
  [/\.combr$/, '.com.br'],
  [/\.c\.br$/, '.com.br'],
];

// edit distance where swapping two neighbouring letters (gmial) counts as one slip
function distance(a: string, b: string): number {
  const d: number[][] = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[a.length][b.length];
}

/** Returns a corrected address when the domain looks like a typo of a common provider, otherwise null. */
export function suggestEmail(raw: string): string | null {
  const email = raw.trim().toLowerCase();
  const at = email.lastIndexOf('@');
  if (at < 1 || at === email.length - 1) return null;
  const user = email.slice(0, at);
  const original = email.slice(at + 1);
  if (DOMAINS.includes(original)) return null;

  let domain = original;
  for (const [re, fix] of TLD_FIXES) domain = domain.replace(re, fix);
  if (DOMAINS.includes(domain)) return `${user}@${domain}`;
  // Brazilian providers typed without the .br (uol.com, terra.com)
  if (DOMAINS.includes(`${domain}.br`)) return `${user}@${domain}.br`;

  // only compare against providers with the same ending, so company domains are left alone
  let best: string | null = null;
  let bestD = Infinity;
  for (const d of DOMAINS) {
    const dist = distance(domain, d);
    if (dist < bestD) {
      bestD = dist;
      best = d;
    }
  }
  const limit = domain.length > 9 ? 2 : 1;
  if (best && bestD > 0 && bestD <= limit) return `${user}@${best}`;
  return domain !== original ? `${user}@${domain}` : null;
}
