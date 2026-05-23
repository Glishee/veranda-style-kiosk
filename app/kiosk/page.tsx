import { PrismaClient } from '@prisma/client'
import { KioskClient } from './KioskClient'

const prisma = new PrismaClient()

export default async function KioskPage() {
  const products = await prisma.product.findMany({
    orderBy: { order: 'asc' },
    include: { structures: true, roofMaterials: true, options: true },
  })
  return <KioskClient products={products as any} />
}
