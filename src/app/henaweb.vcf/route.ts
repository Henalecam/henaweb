import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { site } from '@/lib/site';

/**
 * /henaweb.vcf: the studio as a contact card. On a phone it opens "add contact" with the WhatsApp
 * number, e-mail and site filled in, so a prospect who'll write later doesn't have to copy three
 * things by hand. Built from the same contact data as the footer; static at build.
 */
export const dynamic = 'force-static';

// vCard text values escape \ , ; and newlines (RFC 6350 §3.4)
const esc = (v: string) => v.replace(/[\\,;]/g, (c) => `\\${c}`).replace(/\n/g, '\\n');

/**
 * The app icon as the contact's photo, so the saved contact shows the HenaWeb "H" instead of grey
 * initials. Inlined as base64 (vCard 3.0) and folded to 75-octet lines (RFC 6350 §3.2); read at build,
 * since the route is static. Missing file: the card simply goes without a photo.
 */
function photo(): string[] {
  try {
    const b64 = readFileSync(join(process.cwd(), 'public', 'icon-192.png')).toString('base64');
    const line = `PHOTO;ENCODING=b;TYPE=PNG:${b64}`;
    const out = [line.slice(0, 75)];
    for (let i = 75; i < line.length; i += 74) out.push(` ${line.slice(i, i + 74)}`);
    return out;
  } catch {
    return [];
  }
}

export function GET() {
  const [city, region] = site.city.split(',').map((s) => s.trim());
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${esc(site.name)};;;;`,
    `FN:${esc(site.name)}`,
    `ORG:${esc(site.name)}`,
    `TITLE:${esc('Studio de engenharia de software')}`,
    `TEL;TYPE=CELL,VOICE:+${site.whatsapp}`,
    `EMAIL;TYPE=INTERNET,WORK:${site.email}`,
    `URL:${site.url}`,
    `ADR;TYPE=WORK:;;;${esc(city)};${esc(region ?? '')};;Brasil`,
    ...site.social.map((s) => `X-SOCIALPROFILE;TYPE=${s.name.toLowerCase()}:${s.href}`),
    ...photo(),
    `NOTE:${esc(`WhatsApp ${site.whatsappDisplay} · ${site.url}`)}`,
    'END:VCARD',
  ];
  return new Response(lines.join('\r\n') + '\r\n', {
    headers: {
      'Content-Type': 'text/vcard; charset=utf-8',
      'Content-Disposition': 'attachment; filename="henaweb.vcf"',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
