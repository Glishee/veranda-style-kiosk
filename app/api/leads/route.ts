import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { prisma } from '@/lib/prisma'

const LeadSchema = z.object({
  categorySlug: z.string().min(1),
  productSlug: z.string().min(1),
  name: z.string().min(1),
  phone: z.string().min(1),
  city: z.string().min(1),
  postcode: z.string().min(1),
  comment: z.string().optional(),
  lang: z.enum(['pl', 'en', 'de']).default('pl'),
})

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null)
  const parsed = LeadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const { categorySlug, productSlug, name, phone, city, postcode, comment, lang } = parsed.data

  await prisma.lead.create({
    data: { categorySlug, productSlug, name, phone, city, postcode, comment, lang },
  })

  const resend = new Resend(process.env.RESEND_API_KEY)
  await resend.emails.send({
    from: 'kiosk@veranda-style.pl',
    to: process.env.NOTIFICATION_EMAIL ?? '',
    subject: `Zapytanie — ${productSlug} — ${name} — ${city}`,
    html: `
      <h2>Nowe zapytanie z kiosku</h2>
      <p><strong>Kategoria:</strong> ${categorySlug}</p>
      <p><strong>Produkt:</strong> ${productSlug}</p>
      <p><strong>Imię i nazwisko:</strong> ${name}</p>
      <p><strong>Telefon:</strong> ${phone}</p>
      <p><strong>Miasto:</strong> ${city}</p>
      <p><strong>Kod pocztowy:</strong> ${postcode}</p>
      ${comment ? `<p><strong>Komentarz:</strong> ${comment}</p>` : ''}
      <p><strong>Język:</strong> ${lang}</p>
    `,
  })

  return NextResponse.json({ ok: true }, { status: 201 })
}
