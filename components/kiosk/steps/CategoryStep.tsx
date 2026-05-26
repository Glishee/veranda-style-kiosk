'use client'
import { useState } from 'react'
import type { CategoryRow } from '@/lib/types'
import { useKiosk } from '@/context/KioskContext'
import { useT } from '@/hooks/useT'

interface Props {
  categories: CategoryRow[]
  onPreview: (slug: string | null) => void
}

export default function CategoryStep({ categories, onPreview }: Props) {
  const { state, dispatch, resetTimer } = useKiosk()
  const t = useT()
  const [previewSlug, setPreviewSlug] = useState<string | null>(null)

  function handleSelect(slug: string) {
    resetTimer()
    setPreviewSlug(slug)
    onPreview(slug)
  }

  function handleNext() {
    if (!previewSlug) return
    resetTimer()
    dispatch({ type: 'SET_CATEGORY', slug: previewSlug })
  }

  return (
    <div className="flex flex-col h-full">
      <p className="text-[8px] tracking-[3px] uppercase text-gray-400 mb-3">
        {t.step1.label}
      </p>
      <div className="flex flex-col gap-1.5 flex-1">
        {categories.map((cat) => {
          const isSelected = previewSlug === cat.slug
          return (
            <button
              key={cat.slug}
              onClick={() => handleSelect(cat.slug)}
              className={`flex items-center justify-between w-full border-[1.5px] px-3.5 py-3 text-left text-[10px] font-bold tracking-[1.5px] uppercase transition-all min-h-[48px] ${
                isSelected
                  ? 'bg-[#111] text-white border-[#111]'
                  : 'bg-white text-[#1f2937] border-[#e5e0d8]'
              }`}
            >
              <span>{cat.translations[state.lang]?.name ?? cat.slug}</span>
              <span className="opacity-40 text-[10px]">›</span>
            </button>
          )
        })}
      </div>

      {previewSlug && (
        <div className="mt-3 pt-3 border-t border-[#e5e0d8]">
          <button
            onClick={handleNext}
            className="w-full bg-[#111] text-white py-3 text-[9px] font-extrabold tracking-[2px] uppercase min-h-[48px]"
          >
            {t.step1.next} →
          </button>
        </div>
      )}
    </div>
  )
}
