import { site } from '@/lib/site';

/**
 * /.well-known/security.txt (RFC 9116): where to report a vulnerability found on the site. A software
 * studio is expected to have one, and scanners look for it. Built at deploy time, so Expires (required,
 * at most a year ahead) always sits ~11 months after the latest deploy.
 */
export const dynamic = 'force-static';

export function GET() {
  const expires = new Date(Date.now() + 335 * 24 * 60 * 60 * 1000);
  expires.setUTCHours(0, 0, 0, 0);
  const body = [
    `Contact: mailto:${site.email}`,
    `Expires: ${expires.toISOString().replace('.000Z', 'Z')}`,
    'Preferred-Languages: pt, en',
    `Canonical: ${site.url}/.well-known/security.txt`,
    '',
  ].join('\n');
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=86400' },
  });
}
