import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { PrismaClient } from '@prisma/client'
import { calculatePrice } from '@/lib/price'

const prisma = new PrismaClient()

const schema = z.object({
  productSlug: z.string(),
  roofSlug: z.string(),
  selectedOptions: z.array(z.string()),
  widthMm: z.number().positive(),
  depthMm: z.number().positive(),
})

export async function POST(req: NextRequest) {
  const body = await req.json()
  const parsed = schema.safeParse(body)
  if (!parsed.success) return NextResponse.json({ error: 'Invalid input' }, { status: 400 })

  const { productSlug, roofSlug, selectedOptions, widthMm, depthMm } = parsed.data

  const product = await prisma.product.findUnique({
    where: { slug: productSlug },
    include: { roofMaterials: true, options: true },
  })
  if (!product) return NextResponse.json({ error: 'Product not found' }, { status: 404 })

  const roof = product.roofMaterials.find(r => r.slug === roofSlug)
  const roofCoefficient = roof?.coefficient ?? 1.0

  const optionPrices = product.options
    .filter(o => selectedOptions.includes(o.slug))
    .map(o => o.priceEur)

  const result = calculatePrice({
    baseRateEur: product.baseRateEur,
    roofCoefficient,
    optionPrices,
    widthMm,
    depthMm,
  })

  return NextResponse.json(result)
}
