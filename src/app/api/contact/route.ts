import { Resend } from 'resend';
import { NextResponse } from 'next/server';
import { site } from '@/lib/content';

let resendClient: Resend | null = null;

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!resendClient) resendClient = new Resend(apiKey);
  return resendClient;
}

const escape = (v: unknown) =>
  String(v ?? '')
    .slice(0, 8000)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

// Best-effort flood guard: a few briefings per address per window, kept in this instance's memory.
// It won't stop a distributed attack, but a looping script stops filling the inbox (and the Resend quota).
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string, now = Date.now()) {
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (now - v[v.length - 1] >= WINDOW_MS) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

const clientIp = (request: Request) =>
  request.headers.get('x-forwarded-for')?.split(',')[0].trim() || request.headers.get('x-real-ip') || 'unknown';

export async function POST(request: Request) {
  if (rateLimited(clientIp(request))) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429, headers: { 'Retry-After': '600' } });
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  try {
    const { name, email, whatsapp, subject, timeline, org, message, company, origin } = body ?? {};

    // Honeypot: bots fill the hidden field. Pretend success.
    if (company) return NextResponse.json({ ok: true });

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Name, email, subject and message are required' }, { status: 400 });
    }

    if (String(name).length > 200 || String(subject).length > 200 || String(message).length > 8000) {
      return NextResponse.json({ error: 'Field too long' }, { status: 400 });
    }

    const replyTo = String(email).trim().slice(0, 254);
    if (!EMAIL_RE.test(replyTo)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    const resend = getResendClient();
    if (!resend) {
      return NextResponse.json({ error: 'Email service not configured' }, { status: 503 });
    }

    const rows = [
      ['Nome', name],
      ['E-mail', email],
      ['WhatsApp', whatsapp],
      ['Empresa / órgão', org],
      ['Tipo', subject],
      ['Prazo', timeline],
      ['Origem', origin],
    ]
      .filter(([, v]) => v)
      .map(([k, v]) => `<p><strong>${k}:</strong> ${escape(v)}</p>`)
      .join('');

    const { data, error } = await resend.emails.send({
      // mail.henaweb.com is the domain verified in Resend; CONTACT_FROM can override it
      from: process.env.CONTACT_FROM || 'HenaWeb <site@mail.henaweb.com>',
      to: [process.env.CONTACT_TO || site.email],
      replyTo,
      subject: `[${escape(subject)}] Novo briefing de ${escape(name)}`,
      html: `<h2>Novo briefing pelo site</h2>${rows}<p><strong>Mensagem:</strong></p><p>${escape(message).replace(/\n/g, '<br>')}</p>`,
    });

    if (error) {
      console.error('[contact] resend error', error);
      return NextResponse.json({ error: 'Email delivery failed' }, { status: 502 });
    }
    return NextResponse.json({ ok: true, id: data?.id });
  } catch (err) {
    console.error('[contact] unexpected error', err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
