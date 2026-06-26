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

  function handleBack() {
    resetTimer()
    dispatch({ type: 'PREV_STEP' })
  }

  return (
    <div className="flex flex-col h-full">
      <p className="text-[11px] tracking-[4px] uppercase text-gray-400 mb-5">
        {t.step2.label}
      </p>

      <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
        {products.map((product) => (
          <button
            key={product.slug}
            onClick={() => handleSelect(product.slug)}
            className="flex items-center justify-between w-full bg-white border-[1.5px] border-[#e5e0d8] px-5 py-5 text-left text-[15px] font-extrabold tracking-[2px] uppercase text-[#1f2937] transition-all duration-150 hover:border-[#999] hover:bg-[#f5f2ef] active:scale-[0.98] active:bg-[#111] active:text-white active:border-[#111] min-h-[68px]"
          >
            <span>{product.translations[state.lang]?.name ?? product.slug}</span>
            <span className="opacity-40 text-[16px]">›</span>
          </button>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-[#e5e0d8]">
        <button
          onClick={handleBack}
          className="w-full border-[1.5px] border-[#d1cdc8] text-[#6b7280] py-4 text-[12px] font-extrabold tracking-[3px] uppercase min-h-[58px] transition-all duration-150 hover:border-[#999] hover:text-[#444] active:scale-[0.98] active:opacity-70"
        >
          ← {t.step2.back}
        </button>
      </div>
    </div>
  )
}