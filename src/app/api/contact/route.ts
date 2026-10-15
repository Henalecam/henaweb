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
    .slice(0, 5000)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const EMAIL_RE = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/;

export async function POST(request: Request) {
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
