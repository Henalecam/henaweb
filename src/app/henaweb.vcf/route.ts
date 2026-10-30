import { site } from '@/lib/site';

/**
 * /henaweb.vcf: the studio as a contact card. On a phone it opens "add contact" with the WhatsApp
 * number, e-mail and site filled in, so a prospect who'll write later doesn't have to copy three
 * things by hand. Built from the same contact data as the footer; static at build.
 */
export const dynamic = 'force-static';

// vCard text values escape \ , ; and newlines (RFC 6350 §3.4)
const esc = (v: string) => v.replace(/[\\,;]/g, (c) => `\\${c}`).replace(/\n/g, '\\n');

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
