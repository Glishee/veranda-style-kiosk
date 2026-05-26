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
      <p className="text-[8px] tracking-[3px] uppercase text-gray-400 mb-3">
        {t.step3.label}
      </p>
      <h3 className="text-sm font-extrabold tracking-wide text-[#111] uppercase mb-2.5">
        {translation?.name ?? product.slug}
      </h3>
      <p className="text-[10px] leading-[1.7] text-[#4b5563] mb-5 flex-1 overflow-y-auto">
        {translation?.description ?? ''}
      </p>
      <div className="flex flex-col gap-1.5">
        <button
          onClick={handleAskPrice}
          className="w-full bg-[#111] text-white py-3 text-[9px] font-extrabold tracking-[2px] uppercase min-h-[48px]"
        >
          {t.step3.askPrice} →
        </button>
        <button
          onClick={handleBack}
          className="w-full border-[1.5px] border-[#d1cdc8] text-[#6b7280] py-3 text-[9px] font-extrabold tracking-[2px] uppercase min-h-[48px]"
        >
          ← {t.step3.back}
        </button>
      </div>
    </div>
  )
}
