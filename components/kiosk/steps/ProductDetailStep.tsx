'use client'

import type { ProductRow } from '@/lib/types'
import { useKiosk } from '@/context/KioskContext'
import { useT } from '@/hooks/useT'

interface Props {
  product: ProductRow
}

export default function ProductDetailStep({ product }: Props) {
  const { state, dispatch, resetTimer } = useKiosk()
  const t = useT()
  const translation = product.translations[state.lang]

  function handleAskPrice() {
    resetTimer()
    dispatch({ type: 'NEXT_STEP' })
  }

  function handleBack() {
    resetTimer()
    dispatch({ type: 'PREV_STEP' })
  }

  return (
    <div className="flex flex-col h-full">
      <p className="text-[12px] tracking-[4px] uppercase text-gray-400 mb-5">
        {t.step3.label}
      </p>

      <h3 className="text-3xl md:text-4xl font-extrabold tracking-wide text-[#111] uppercase mb-5 leading-tight">
        {translation?.name ?? product.slug}
      </h3>

      <p className="text-[17px] md:text-[19px] leading-9 text-[#4b5563] mb-8 flex-1 overflow-y-auto">
        {translation?.description ?? ''}
      </p>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleAskPrice}
          className="w-full bg-[#111] text-white py-5 text-[14px] font-extrabold tracking-[3px] uppercase min-h-[68px] transition-all duration-150 active:scale-[0.98] active:opacity-80"
        >
          {t.step3.askPrice} →
        </button>

        <button
          onClick={handleBack}
          className="w-full border-[2px] border-[#d1cdc8] text-[#6b7280] py-5 text-[13px] font-extrabold tracking-[3px] uppercase min-h-[68px] transition-all duration-150 hover:border-[#999] hover:text-[#444] active:scale-[0.98] active:opacity-70"
        >
          ← {t.step3.back}
        </button>
      </div>
    </div>
  )
}