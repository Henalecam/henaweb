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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, whatsapp, subject, timeline, org, message, company } = body ?? {};

    // Honeypot: bots fill the hidden field. Pretend success.
    if (company) return NextResponse.json({ ok: true });

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Name, email, subject and message are required' }, { status: 400 });
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
    ]
      .filter(([, v]) => v)
      .map(([k, v]) => `<p><strong>${k}:</strong> ${escape(v)}</p>`)
      .join('');

    const { data, error } = await resend.emails.send({
      from: 'HenaWeb <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO || site.email],
      replyTo: String(email),
      subject: `[${escape(subject)}] Novo briefing de ${escape(name)}`,
      html: `<h2>Novo briefing pelo site</h2>${rows}<p><strong>Mensagem:</strong></p><p>${escape(message).replace(/\n/g, '<br>')}</p>`,
    });

    if (error) return NextResponse.json({ error }, { status: 400 });
    return NextResponse.json({ data });
  } catch {
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
