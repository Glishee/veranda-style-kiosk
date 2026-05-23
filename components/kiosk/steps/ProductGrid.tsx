'use client'
import { useKiosk } from '@/context/KioskContext'
import { useT } from '@/hooks/useT'
import type { ProductRow } from '@/lib/types'

const ICONS: Record<string, string> = {
  canopy: '🏗', 'winter-garden': '🏡', pergola: '🌿',
  sliding: '🪟', 'zip-screen': '🌅', carport: '🚗',
}

interface Props { products: ProductRow[] }

export function ProductGrid({ products }: Props) {
  const { state, dispatch } = useKiosk()
  const t = useT()

  return (
    <div className="flex-1 overflow-y-auto p-5">
      <h2 className="text-base font-bold text-gray-900 mb-4">{t.step1.title}</h2>
      <div className="grid grid-cols-2 gap-3">
        {products.map(p => {
          const tr = p.translations[state.lang]
          return (
            <button
              key={p.slug}
              onClick={() => dispatch({ type: 'SET_PRODUCT', slug: p.slug })}
              className={`bg-white border-2 p-4 text-center transition-all min-h-[90px] ${
                state.productSlug === p.slug ? 'border-gray-900' : 'border-transparent shadow-sm'
              }`}
            >
              <div className="text-2xl mb-2">{ICONS[p.slug] ?? '🏠'}</div>
              <p className="text-[10px] font-bold tracking-wide text-gray-800 uppercase leading-tight">
                {tr?.name ?? p.slug}
              </p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
