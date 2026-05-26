'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useKiosk } from '@/context/KioskContext'
import { useT } from '@/hooks/useT'
import type { CategoryRow, Lang } from '@/lib/types'

import LeftPanel from '@/components/kiosk/LeftPanel'
import { SplashScreen } from '@/components/kiosk/SplashScreen'
import SuccessScreen from '@/components/kiosk/SuccessScreen'
import CategoryStep from '@/components/kiosk/steps/CategoryStep'
import SubcategoryStep from '@/components/kiosk/steps/SubcategoryStep'
import ProductDetailStep from '@/components/kiosk/steps/ProductDetailStep'
import ContactStep from '@/components/kiosk/steps/ContactStep'

const MAX_GALLERY_IMAGES = 5
const LANGS: Lang[] = ['pl', 'en', 'de']

interface Props {
  categories: CategoryRow[]
}

export default function KioskClient({ categories }: Props) {
  const { state, dispatch, resetTimer } = useKiosk()
  const t = useT()
  const [submitting, setSubmitting] = useState(false)
  const [previewCategorySlug, setPreviewCategorySlug] = useState<string | null>(null)

  useEffect(() => {
    setPreviewCategorySlug(null)
  }, [state.step])

  const selectedCategory = categories.find((c) => c.slug === state.categorySlug) ?? null
  const selectedProduct = selectedCategory?.products.find((p) => p.slug === state.productSlug) ?? null
  const firstProductOfCategory = selectedCategory?.products[0] ?? null
  const previewCategory = state.step === 1
    ? (categories.find((c) => c.slug === previewCategorySlug) ?? null)
    : null

  // Gallery images for left panel
  let panelImageUrls: string[] = []
  if (state.step === 1 && previewCategory) {
    panelImageUrls = previewCategory.products.slice(0, MAX_GALLERY_IMAGES).map((p) => p.imageUrl)
  } else if (state.step >= 3 && selectedProduct) {
    panelImageUrls = [selectedProduct.imageUrl]
  } else if (state.step === 2 && firstProductOfCategory) {
    panelImageUrls = [firstProductOfCategory.imageUrl]
  }

  // Left panel label
  const panelLabel =
    state.step >= 3 && selectedProduct
      ? selectedProduct.translations[state.lang]?.name ?? selectedProduct.slug
    : state.step === 2 && selectedCategory
      ? selectedCategory.translations[state.lang]?.name ?? selectedCategory.slug
    : state.step === 1 && previewCategory
      ? previewCategory.translations[state.lang]?.name ?? previewCategory.slug
    : 'Veranda Styl'

  const panelSublabel =
    state.step >= 3 && selectedCategory
      ? selectedCategory.translations[state.lang]?.name
    : state.step === 2 && selectedCategory
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

  if (state.step === 0) return <SplashScreen />
  if (state.step === 5) return <SuccessScreen />

  const isContactStep = state.step === 4
  const isSubmitDisabled =
    submitting || !state.contact.name || !state.contact.phone ||
    !state.contact.city || !state.contact.postcode

  // Shared header elements
  const logoImg = (
    <Image
      src="/logo.png"
      alt="Veranda Styl"
      width={140}
      height={74}
      className="h-7 md:h-8 w-auto object-contain"
    />
  )
  const langSwitcher = (
    <div className="flex gap-1">
      {LANGS.map((lang) => (
        <button
          key={lang}
          onClick={() => { resetTimer(); dispatch({ type: 'SET_LANG', lang }) }}
          className={`text-[8px] md:text-[7px] tracking-[1px] border px-2 py-1 uppercase transition-all min-h-[36px] min-w-[36px] ${
            state.lang === lang
              ? 'bg-[#111] text-white border-[#111]'
              : 'text-[#999] border-[#ddd]'
          }`}
        >
          {lang}
        </button>
      ))}
    </div>
  )

  return (
    /* Outer shell: vertical stack on mobile, fixed full-screen on desktop */
    <div className="flex flex-col w-full min-h-screen md:fixed md:inset-0 bg-[#f9f7f4]">

      {/* ── Mobile-only header (above the image) ── */}
      <div className="md:hidden bg-white border-b border-[#e5e0d8] px-4 h-12 flex items-center justify-between flex-shrink-0">
        {logoImg}
        {langSwitcher}
      </div>

      {/* ── Main content area ── */}
      <div className="flex flex-col flex-1 md:flex-row md:h-full md:overflow-hidden">

        {/* Left panel — image gallery */}
        <LeftPanel
          imageUrls={panelImageUrls}
          label={panelLabel}
          sublabel={panelSublabel}
        />

        {/* Right panel */}
        <div className="flex flex-col flex-1 md:overflow-hidden">

          {/* Desktop-only header (inside right panel) */}
          <div className="hidden md:flex bg-white border-b border-[#e5e0d8] px-4 h-11 items-center justify-between flex-shrink-0">
            {logoImg}
            {langSwitcher}
          </div>

          {/* Step content — scrollable */}
          <div className="flex-1 overflow-y-auto p-4">
            {state.step === 1 && (
              <CategoryStep
                categories={categories}
                onPreview={setPreviewCategorySlug}
              />
            )}
            {state.step === 2 && selectedCategory && (
              <SubcategoryStep products={selectedCategory.products} />
            )}
            {state.step === 3 && selectedProduct && (
              <ProductDetailStep product={selectedProduct} />
            )}
            {state.step === 4 && <ContactStep />}
          </div>

          {/* Footer — submit button, step 4 only */}
          {isContactStep && (
            <div className="border-t border-[#e5e0d8] bg-white p-3 flex-shrink-0 sticky bottom-0">
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
    </div>
  )
}
