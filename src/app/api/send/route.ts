import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, whatsapp, message } = await request.json();

    const data = await resend.emails.send({
      from: 'HenaWeb <onboarding@resend.dev>',
      to: ['henriquealexandredec@gmail.com'],
      subject: 'Nova mensagem de contato - HenaWeb',
      html: `
        <h2>Nova mensagem de contato</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>WhatsApp:</strong> ${whatsapp}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Erro ao enviar email' }, { status: 500 });
  }
} 