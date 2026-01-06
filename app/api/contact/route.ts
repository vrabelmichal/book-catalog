import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY;
const contactRecipient = process.env.CONTACT_RECIPIENT ?? process.env.SELLER_EMAIL;
const emailFrom = process.env.EMAIL_FROM ?? 'Book Catalog <onboarding@resend.dev>';

export async function POST(request: Request) {
  if (!resendApiKey) {
    return NextResponse.json({ error: 'Missing RESEND_API_KEY' }, { status: 500 });
  }

  if (!contactRecipient) {
    return NextResponse.json({ error: 'Missing CONTACT_RECIPIENT/SELLER_EMAIL' }, { status: 500 });
  }

  const resend = new Resend(resendApiKey);

  try {
    const body = await request.json();
    const name = String(body.name ?? '').trim();
    const email = String(body.email ?? '').trim();
    const message = String(body.message ?? '').trim();
    const captchaAnswer = Number(body.captchaAnswer);
    const captchaA = Number(body.captchaA);
    const captchaB = Number(body.captchaB);
    const bookId = String(body.bookId ?? '').trim();
    const bookTitle = String(body.bookTitle ?? '').trim() || 'Book';

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required.' }, { status: 400 });
    }

    if (!email.includes('@')) {
      return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 });
    }

    if (!Number.isFinite(captchaAnswer) || !Number.isFinite(captchaA) || !Number.isFinite(captchaB)) {
      return NextResponse.json({ error: 'Invalid captcha.' }, { status: 400 });
    }

    if (captchaAnswer !== captchaA + captchaB) {
      return NextResponse.json({ error: 'Captcha validation failed.' }, { status: 400 });
    }

    const subject = `Book inquiry: ${bookTitle}`;
    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Book: ${bookTitle} (${bookId})`,
      'Message:',
      message,
    ].join('\n');

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.5;">
        <h2 style="margin: 0 0 12px 0;">New book inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Book:</strong> ${bookTitle} (${bookId})</p>
        <p style="margin-top: 12px; white-space: pre-wrap;">${message}</p>
      </div>
    `;

    await resend.emails.send({
      from: emailFrom,
      to: contactRecipient,
      replyTo: email,
      subject,
      text,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to send contact email', error);
    return NextResponse.json({ error: 'Failed to send message.' }, { status: 500 });
  }
}
