'use client'
import { useState } from 'react'
import { useKiosk } from '@/context/KioskContext'
import { useT } from '@/hooks/useT'
import type { CategoryRow } from '@/lib/types'

import LeftPanel from '@/components/kiosk/LeftPanel'
import { SplashScreen } from '@/components/kiosk/SplashScreen'
import SuccessScreen from '@/components/kiosk/SuccessScreen'
import CategoryStep from '@/components/kiosk/steps/CategoryStep'
import SubcategoryStep from '@/components/kiosk/steps/SubcategoryStep'
import ProductDetailStep from '@/components/kiosk/steps/ProductDetailStep'
import ContactStep from '@/components/kiosk/steps/ContactStep'

interface Props {
  categories: CategoryRow[]
}

export default function KioskClient({ categories }: Props) {
  const { state, dispatch, resetTimer } = useKiosk()
  const t = useT()
  const [submitting, setSubmitting] = useState(false)

  const selectedCategory = categories.find((c) => c.slug === state.categorySlug) ?? null
  const selectedProduct = selectedCategory?.products.find((p) => p.slug === state.productSlug) ?? null
  const firstProductOfCategory = selectedCategory?.products[0] ?? null

  // Left panel image and labels
  const panelImageUrl =
    state.step >= 3 ? (selectedProduct?.imageUrl ?? null)
    : state.step === 2 ? (firstProductOfCategory?.imageUrl ?? null)
    : null

  const panelLabel =
    state.step >= 3 && selectedProduct
      ? selectedProduct.translations[state.lang]?.name ?? selectedProduct.slug
    : state.step === 2 && selectedCategory
      ? selectedCategory.translations[state.lang]?.name ?? selectedCategory.slug
    : 'Veranda Style'

  const panelSublabel =
    state.step === 2 && selectedCategory
      ? selectedCategory.translations[state.lang]?.name
    : state.step >= 3 && selectedCategory
      ? selectedCategory.translations[state.lang]?.name
    : undefined

  async function handleSubmit() {
    if (!state.categorySlug || !state.productSlug) return
    const { name, phone, city, postcode, comment } = state.contact
    if (!name || !phone || !city || !postcode) return

    setSubmitting(true)
    resetTimer()
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categorySlug: state.categorySlug,
          productSlug: state.productSlug,
          name,
          phone,
          city,
          postcode,
          comment: comment || undefined,
          lang: state.lang,
        }),
      })
      if (res.ok) dispatch({ type: 'NEXT_STEP' })
    } finally {
      setSubmitting(false)
    }
  }

  // Splash screen covers full viewport
  if (state.step === 0) return <SplashScreen />

  // Success screen covers full viewport
  if (state.step === 5) return <SuccessScreen />

  const isContactStep = state.step === 4
  const isSubmitDisabled =
    submitting || !state.contact.name || !state.contact.phone || !state.contact.city || !state.contact.postcode

  return (
    <div className="fixed inset-0 flex bg-[#f9f7f4]">
      {/* LEFT PANEL */}
      <LeftPanel
        imageUrl={panelImageUrl}
        label={panelLabel}
        sublabel={panelSublabel}
      />

      {/* RIGHT PANEL */}
      <div className="flex flex-col flex-1 min-w-0">
        {/* Header */}
        <div className="bg-white border-b border-[#e5e0d8] px-4 h-11 flex items-center justify-between flex-shrink-0">
          <span className="text-[8px] font-black tracking-[3px] uppercase text-[#111]">
            Veranda Style
          </span>
          <div className="flex gap-1">
            {(['pl', 'en', 'de'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => { resetTimer(); dispatch({ type: 'SET_LANG', lang }) }}
                className={`text-[7px] tracking-[1px] border px-1.5 py-0.5 uppercase transition-all ${
                  state.lang === lang
                    ? 'bg-[#111] text-white border-[#111]'
                    : 'text-[#999] border-[#ddd]'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Step content */}
        <div className="flex-1 overflow-y-auto p-4">
          {state.step === 1 && <CategoryStep categories={categories} />}
          {state.step === 2 && selectedCategory && (
            <SubcategoryStep products={selectedCategory.products} />
          )}
          {state.step === 3 && selectedProduct && (
            <ProductDetailStep product={selectedProduct} />
          )}
          {state.step === 4 && <ContactStep />}
        </div>

        {/* Footer — only on step 4 */}
        {isContactStep && (
          <div className="border-t border-[#e5e0d8] bg-white p-3 flex-shrink-0">
            <button
              onClick={handleSubmit}
              disabled={isSubmitDisabled}
              className="w-full bg-[#111] text-white py-3 text-[9px] font-extrabold tracking-[2px] uppercase min-h-[48px] disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
            >
              {submitting ? '...' : `${t.step4.submit} →`}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
