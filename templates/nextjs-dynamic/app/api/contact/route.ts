import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = String(formData.get('name') || '').trim();
  const email = String(formData.get('email') || '').trim();
  const message = String(formData.get('message') || '').trim();

  if (!name || !email || !message) {
    return NextResponse.json({ ok: false, error: 'Missing required fields' }, { status: 400 });
  }

  const webhookUrl = process.env.FORM_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json({ ok: true, pending: true, message: 'Form validated but FORM_WEBHOOK_URL is not configured yet.' });
  }

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name, email, message, source: 'website-contact-form' })
  });

  if (!response.ok) {
    return NextResponse.json({ ok: false, error: 'Form destination failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
