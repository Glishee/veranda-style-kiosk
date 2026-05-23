import { prisma } from '@/lib/prisma'
import { KioskClient } from './KioskClient'
import type { ProductRow } from '@/lib/types'

export const dynamic = 'force-dynamic'

export default async function KioskPage() {
  const products = await prisma.product.findMany({
    orderBy: { order: 'asc' },
    include: { structures: true, roofMaterials: true, options: true },
  })
  return <KioskClient products={products as unknown as ProductRow[]} />
}
