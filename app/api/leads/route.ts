import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  productSlug: z.string().min(1),
  structureSlug: z.string().min(1),
  roofSlug: z.string().min(1),
  selectedOptions: z.array(z.string()),
  widthMm: z.number().int().positive(),
  depthMm: z.number().int().positive(),
  heightMm: z.number().int().positive(),
  estimatedEur: z.number().int().nonnegative(),
  name: z.string().min(1, 'name is required'),
  phone: z.string().min(1, 'phone is required'),
  email: z.string().email().optional().or(z.literal('')),
  city: z.string().min(1, 'city is required'),
  postcode: z.string().min(1, 'postcode is required'),
  comment: z.string().optional(),
  lang: z.enum(['en', 'pl', 'de']),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = schema.safeParse(body)

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]
    const field = firstError.path.length > 0 ? String(firstError.path[0]) : ''
    const message = firstError.message.includes(field) || !field
      ? firstError.message
      : `${field}: ${firstError.message}`
    return NextResponse.json({ error: message }, { status: 400 })
  }

  const data = parsed.data

  const lead = await prisma.lead.create({
    data: {
      productSlug: data.productSlug,
      structure: data.structureSlug,
      roofMaterial: data.roofSlug,
      options: data.selectedOptions,
      widthMm: data.widthMm,
      depthMm: data.depthMm,
      heightMm: data.heightMm,
      estimatedEur: data.estimatedEur,
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      city: data.city,
      postcode: data.postcode,
      comment: data.comment || null,
      lang: data.lang,
    },
  })

  const emailBody = `
New lead from Veranda Style Kiosk

Product: ${data.productSlug}
Structure: ${data.structureSlug}
Roof: ${data.roofSlug}
Options: ${data.selectedOptions.join(', ') || 'none'}
Dimensions: ${data.widthMm} × ${data.depthMm} × ${data.heightMm} mm
Estimated price: €${data.estimatedEur.toLocaleString()}

Contact:
Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email || '—'}
City: ${data.city} ${data.postcode}
Comment: ${data.comment || '—'}

Language: ${data.lang}
Lead ID: ${lead.id}
`.trim()

  try {
    await resend.emails.send({
      from: 'Veranda Style Kiosk <onboarding@resend.dev>',
      to: process.env.NOTIFICATION_EMAIL!,
      subject: `New lead — ${data.productSlug} — ${data.name} — ${data.city}`,
      text: emailBody,
    })
  } catch {
    // Email delivery failure should not block lead submission
  }

  return NextResponse.json({ success: true, leadId: lead.id }, { status: 201 })
}
