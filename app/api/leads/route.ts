import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const LeadSchema = z.object({
  categorySlug: z.string().min(1),
  productSlug: z.string().min(1),
  name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().email().optional(),
  city: z.string().min(1),
  postcode: z.string().min(1),
  comment: z.string().optional(),
  photoUrl: z.string().url().optional(),
  lang: z.enum(['pl', 'en', 'de']).default('pl'),
})

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const parsed = LeadSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const {
    categorySlug,
    productSlug,
    name,
    phone,
    email,
    city,
    postcode,
    comment,
    photoUrl,
    lang,
  } = parsed.data

  // ====== ВРЕМЕННО ОТКЛЮЧАЕМ PRISMA ======
  console.log('[leads] Prisma skipped for diagnostics')
  // ======================================

  const resendApiKey = process.env.RESEND_API_KEY
  const notificationEmail =
    process.env.NOTIFICATION_EMAIL ?? 'oferty@syncterra.pl'

  if (!resendApiKey) {
    console.error('[leads] RESEND_API_KEY is missing')

    return NextResponse.json(
      {
        ok: false,
        error: 'RESEND_API_KEY is missing',
      },
      { status: 500 }
    )
  }

  const resend = new Resend(resendApiKey)

  const emailResult = await resend.emails.send({
    from: 'Veranda Style <onboarding@resend.dev>',
    to: notificationEmail,
    subject: `Zapytanie — ${productSlug} — ${name} — ${city}`,
    html: `
      <h2>Nowe zapytanie z konfiguratora</h2>

      <p><strong>Kategoria:</strong> ${categorySlug}</p>
      <p><strong>Produkt:</strong> ${productSlug}</p>
      <p><strong>Imię i nazwisko:</strong> ${name}</p>
      <p><strong>Telefon:</strong> ${phone}</p>
      ${email ? `<p><strong>Email:</strong> ${email}</p>` : ''}
      <p><strong>Miasto:</strong> ${city}</p>
      <p><strong>Kod pocztowy:</strong> ${postcode}</p>
      ${comment ? `<p><strong>Konfiguracja / cena:</strong> ${comment}</p>` : ''}
      ${photoUrl
        ? `<p><strong>Zdjęcie miejsca montażu:</strong><br/><a href="${photoUrl}" target="_blank">${photoUrl}</a></p>`
        : ''
      }
      <p><strong>Język:</strong> ${lang}</p>
    `,
  })

  console.log('[leads] Resend result:', emailResult)

  if (emailResult.error) {
    console.error('[leads] Resend error:', emailResult.error)

    return NextResponse.json(
      {
        ok: false,
        resendError: emailResult.error,
      },
      { status: 500 }
    )
  }

  console.log('[leads] Email sent:', emailResult.data?.id)

  return NextResponse.json({ ok: true }, { status: 201 })
}