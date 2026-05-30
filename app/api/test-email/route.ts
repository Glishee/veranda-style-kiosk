import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function GET() {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.NOTIFICATION_EMAIL ?? 'oferty@syncterra.pl'

  if (!apiKey) {
    return NextResponse.json({ error: 'RESEND_API_KEY not set' }, { status: 500 })
  }

  const resend = new Resend(apiKey)
  const result = await resend.emails.send({
    from: 'Veranda Style Kiosk <onboarding@resend.dev>',
    to,
    subject: 'Test — Veranda Style Kiosk',
    html: '<p>Тестовое письмо. Если получили — всё работает.</p>',
  })

  return NextResponse.json({
    to,
    apiKeyPrefix: apiKey.slice(0, 8) + '...',
    data: result.data,
    error: result.error,
  })
}
