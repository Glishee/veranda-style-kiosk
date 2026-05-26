import { prisma } from '@/lib/prisma'
import type { CategoryRow } from '@/lib/types'
import KioskClient from './KioskClient'

export const dynamic = 'force-dynamic'

export default async function KioskPage() {
  const categories = (await prisma.category.findMany({
    orderBy: { order: 'asc' },
    include: { products: { orderBy: { order: 'asc' } } },
  })) as CategoryRow[]

  return <KioskClient categories={categories} />
}
