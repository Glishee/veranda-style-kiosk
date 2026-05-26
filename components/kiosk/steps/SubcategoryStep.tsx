'use client'
import type { ProductRow } from '@/lib/types'
import { useKiosk } from '@/context/KioskContext'
import { useT } from '@/hooks/useT'

interface Props {
  products: ProductRow[]
}

export default function SubcategoryStep({ products }: Props) {
  const { state, dispatch, resetTimer } = useKiosk()
  const t = useT()

  function handleSelect(slug: string) {
    resetTimer()
    dispatch({ type: 'SET_PRODUCT', slug })
  }

  return (
    <div className="flex flex-col h-full">
      <p className="text-[8px] tracking-[3px] uppercase text-gray-400 mb-3">
        {t.step2.label}
      </p>
      <div className="flex flex-col gap-1.5 overflow-y-auto">
        {products.map((product) => (
          <button
            key={product.slug}
            onClick={() => handleSelect(product.slug)}
            className="flex items-center justify-between w-full bg-white border-[1.5px] border-[#e5e0d8] px-3.5 py-3 text-left text-[10px] font-bold tracking-[1.5px] uppercase text-[#1f2937] transition-all active:bg-[#111] active:text-white active:border-[#111] min-h-[48px]"
          >
            <span>{product.translations[state.lang]?.name ?? product.slug}</span>
            <span className="opacity-40 text-[10px]">›</span>
          </button>
        ))}
      </div>
    </div>
  )
}
