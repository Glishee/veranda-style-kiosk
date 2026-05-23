import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '@prisma/client'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

const COMMON_STRUCTURES = [
  {
    slug: 'wall-mounted',
    translations: {
      en: { label: 'Wall-mounted', description: 'Attached to building wall' },
      pl: { label: 'Wall-mounted', description: 'Attached to building wall' },
      de: { label: 'Wall-mounted', description: 'Attached to building wall' },
    },
  },
  {
    slug: 'freestanding',
    translations: {
      en: { label: 'Freestanding', description: '4 posts, no wall needed' },
      pl: { label: 'Freestanding', description: '4 posts, no wall needed' },
      de: { label: 'Freestanding', description: '4 posts, no wall needed' },
    },
  },
  {
    slug: 'corner',
    translations: {
      en: { label: 'Corner / L-shape', description: 'Two walls, corner installation' },
      pl: { label: 'Corner / L-shape', description: 'Two walls, corner installation' },
      de: { label: 'Corner / L-shape', description: 'Two walls, corner installation' },
    },
  },
]

const COMMON_ROOFS = [
  { slug: 'polycarbonate', coefficient: 1.0, translations: { en: { label: 'Polycarbonate', description: 'Lightweight, UV-protected, affordable' }, pl: { label: 'Polycarbonate', description: 'Lightweight, UV-protected, affordable' }, de: { label: 'Polycarbonate', description: 'Lightweight, UV-protected, affordable' } } },
  { slug: 'vsg-glass', coefficient: 1.35, translations: { en: { label: 'VSG Safety Glass 44.2', description: 'Premium transparent, laminated' }, pl: { label: 'VSG Safety Glass 44.2', description: 'Premium transparent, laminated' }, de: { label: 'VSG Safety Glass 44.2', description: 'Premium transparent, laminated' } } },
  { slug: 'lamels-manual', coefficient: 1.2, translations: { en: { label: 'Movable Lamels — Manual', description: 'Adjustable aluminium slats, hand-operated' }, pl: { label: 'Movable Lamels — Manual', description: 'Adjustable aluminium slats, hand-operated' }, de: { label: 'Movable Lamels — Manual', description: 'Adjustable aluminium slats, hand-operated' } } },
  { slug: 'lamels-auto', coefficient: 1.45, translations: { en: { label: 'Movable Lamels — Motorised', description: 'Electric, remote or app-controlled' }, pl: { label: 'Movable Lamels — Motorised', description: 'Electric, remote or app-controlled' }, de: { label: 'Movable Lamels — Motorised', description: 'Electric, remote or app-controlled' } } },
]

const COMMON_OPTIONS = [
  { slug: 'led-lighting', priceEur: 600, translations: { en: { label: 'LED Lighting' }, pl: { label: 'LED Lighting' }, de: { label: 'LED Lighting' } } },
  { slug: 'glass-walls', priceEur: 900, translations: { en: { label: 'Glass Side Walls' }, pl: { label: 'Glass Side Walls' }, de: { label: 'Glass Side Walls' } } },
  { slug: 'zip-blinds', priceEur: 750, translations: { en: { label: 'ZIP Screen Blinds' }, pl: { label: 'ZIP Screen Blinds' }, de: { label: 'ZIP Screen Blinds' } } },
  { slug: 'infrared-heat', priceEur: 500, translations: { en: { label: 'Infrared Heating' }, pl: { label: 'Infrared Heating' }, de: { label: 'Infrared Heating' } } },
]

async function main() {
  await prisma.lead.deleteMany()
  await prisma.option.deleteMany()
  await prisma.roofMaterial.deleteMany()
  await prisma.structure.deleteMany()
  await prisma.product.deleteMany()

  const products = [
    {
      slug: 'canopy', order: 1, baseRateEur: 380,
      translations: { en: { name: 'Terrace Canopy', description: 'Aluminium structure with your choice of roof' }, pl: { name: 'Terrace Canopy', description: 'Aluminium structure with your choice of roof' }, de: { name: 'Terrace Canopy', description: 'Aluminium structure with your choice of roof' } },
      roofs: COMMON_ROOFS, structures: COMMON_STRUCTURES, options: COMMON_OPTIONS,
    },
    {
      slug: 'winter-garden', order: 2, baseRateEur: 650,
      translations: { en: { name: 'Winter Garden', description: 'Insulated glass structure, year-round use' }, pl: { name: 'Winter Garden', description: 'Insulated glass structure, year-round use' }, de: { name: 'Winter Garden', description: 'Insulated glass structure, year-round use' } },
      roofs: [COMMON_ROOFS[1]], structures: COMMON_STRUCTURES, options: COMMON_OPTIONS,
    },
    {
      slug: 'pergola', order: 3, baseRateEur: 520,
      translations: { en: { name: 'Bioclimatic Pergola', description: 'Movable lamels for climate control' }, pl: { name: 'Bioclimatic Pergola', description: 'Movable lamels for climate control' }, de: { name: 'Bioclimatic Pergola', description: 'Movable lamels for climate control' } },
      roofs: [COMMON_ROOFS[2], COMMON_ROOFS[3]], structures: COMMON_STRUCTURES, options: COMMON_OPTIONS,
    },
    {
      slug: 'sliding', order: 4, baseRateEur: 480,
      translations: { en: { name: 'Sliding Glass System', description: 'Frameless or framed sliding panels' }, pl: { name: 'Sliding Glass System', description: 'Frameless or framed sliding panels' }, de: { name: 'Sliding Glass System', description: 'Frameless or framed sliding panels' } },
      roofs: [],
      structures: [
        { slug: 'frameless', translations: { en: { label: 'Frameless System', description: 'Clean glass-to-glass look' }, pl: { label: 'Frameless System', description: 'Clean glass-to-glass look' }, de: { label: 'Frameless System', description: 'Clean glass-to-glass look' } } },
        { slug: 'framed', translations: { en: { label: 'Framed System', description: 'Aluminium frame, robust' }, pl: { label: 'Framed System', description: 'Aluminium frame, robust' }, de: { label: 'Framed System', description: 'Aluminium frame, robust' } } },
      ],
      options: [COMMON_OPTIONS[0], COMMON_OPTIONS[2]],
    },
    {
      slug: 'zip-screen', order: 5, baseRateEur: 180,
      translations: { en: { name: 'ZIP Screen', description: 'Exterior zip blind system' }, pl: { name: 'ZIP Screen', description: 'Exterior zip blind system' }, de: { name: 'ZIP Screen', description: 'Exterior zip blind system' } },
      roofs: [], structures: COMMON_STRUCTURES.slice(0, 2), options: [],
    },
    {
      slug: 'carport', order: 6, baseRateEur: 290,
      translations: { en: { name: 'Carport', description: 'Steel canopy for vehicles' }, pl: { name: 'Carport', description: 'Steel canopy for vehicles' }, de: { name: 'Carport', description: 'Steel canopy for vehicles' } },
      roofs: [
        { slug: 'trapezoidal', coefficient: 0.9, translations: { en: { label: 'Trapezoidal Sheet', description: 'Steel profiled sheet, most affordable' }, pl: { label: 'Trapezoidal Sheet', description: 'Steel profiled sheet, most affordable' }, de: { label: 'Trapezoidal Sheet', description: 'Steel profiled sheet, most affordable' } } },
        COMMON_ROOFS[0],
        { slug: 'solar-panels', coefficient: 1.8, translations: { en: { label: 'Solar Panels', description: 'Generate electricity while parking' }, pl: { label: 'Solar Panels', description: 'Generate electricity while parking' }, de: { label: 'Solar Panels', description: 'Generate electricity while parking' } } },
      ],
      structures: COMMON_STRUCTURES.slice(0, 2),
      options: [],
    },
  ]

  for (const p of products) {
    await prisma.product.create({
      data: {
        slug: p.slug,
        order: p.order,
        baseRateEur: p.baseRateEur,
        translations: p.translations as any,
        structures: { create: p.structures },
        roofMaterials: { create: p.roofs },
        options: { create: p.options },
      },
    })
  }

  console.log(`Seeded ${products.length} products`)
}

main().catch(console.error).finally(() => prisma.$disconnect())
