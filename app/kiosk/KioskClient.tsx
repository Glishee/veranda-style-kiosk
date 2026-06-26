'use client'

import { useMemo, useState, useEffect } from 'react'
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

const BACK_LABELS: Record<Lang, string> = {
  pl: 'Wstecz',
  en: 'Back',
  de: 'Zurück',
}

interface Props {
  categories: CategoryRow[]
}

function isValidName(value: string) {
  return /^[A-Za-zÀ-žĄĆĘŁŃÓŚŹŻąćęłńóśźż\s'-]{2,}$/.test(value.trim())
}

function isValidCity(value: string) {
  return /^[A-Za-zÀ-žĄĆĘŁŃÓŚŹŻąćęłńóśźż\s'-]{2,}$/.test(value.trim())
}

function isValidPhone(value: string) {
  return /^\+48\d{9}$/.test(value.trim())
}

function isValidPostcode(value: string) {
  return /^\d{2}-\d{3}$/.test(value.trim())
}

function isValidEmail(value?: string) {
  if (!value) return true
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

export default function KioskClient({ categories }: Props) {
  const { state, dispatch, resetTimer } = useKiosk()
  const t = useT()
  const [submitting, setSubmitting] = useState(false)
  const [previewCategorySlug, setPreviewCategorySlug] = useState<string | null>(null)

  useEffect(() => {
    setPreviewCategorySlug(null)
  }, [state.step])

  const displayCategories = useMemo(() => {
    const firstThree = categories.slice(0, 3)
    const fourthCategory = categories[3]

    if (!firstThree[2] || !fourthCategory) return firstThree

    return [
      firstThree[0],
      firstThree[1],
      {
        ...firstThree[2],
        products: [...firstThree[2].products, ...fourthCategory.products],
      },
    ]
  }, [categories])

  const selectedCategory =
    displayCategories.find((c) => c.slug === state.categorySlug) ?? null

  const selectedProduct =
    selectedCategory?.products.find((p) => p.slug === state.productSlug) ?? null

  const firstProductOfCategory = selectedCategory?.products[0] ?? null

  const previewCategory =
    state.step === 1
      ? displayCategories.find((c) => c.slug === previewCategorySlug) ?? null
      : null

  let panelImageUrls: string[] = []

  if (state.step === 1 && previewCategory) {
    panelImageUrls = previewCategory.products
      .slice(0, MAX_GALLERY_IMAGES)
      .map((p) => p.imageUrl)
  } else if (state.step === 2 && firstProductOfCategory) {
    panelImageUrls = [firstProductOfCategory.imageUrl]
  } else if (state.step >= 3 && selectedProduct) {
    panelImageUrls = [selectedProduct.imageUrl]
  }

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

  const contact = state.contact as typeof state.contact & { email?: string }

  const isContactValid =
    isValidName(contact.name) &&
    isValidPhone(contact.phone) &&
    isValidCity(contact.city) &&
    isValidPostcode(contact.postcode) &&
    isValidEmail(contact.email)

  function handleTopCategoryClick(slug: string) {
    resetTimer()
    dispatch({ type: 'SET_CATEGORY', slug })
  }

  function handleBack() {
    resetTimer()
    dispatch({ type: 'PREV_STEP' })
  }

  async function handleSubmit() {
    if (!state.categorySlug || !state.productSlug) return
    if (!state.captchaVerified) return
    if (!isContactValid) return

    const { name, phone, city, postcode, comment, email } = contact

    setSubmitting(true)
    resetTimer()

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categorySlug: state.categorySlug,
          productSlug: state.productSlug,
          name: name.trim(),
          phone: phone.trim(),
          city: city.trim(),
          postcode: postcode.trim(),
          email: email?.trim() || undefined,
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
  const showBackButton = state.step > 1 && state.step < 5

  const isSubmitDisabled =
    submitting ||
    !isContactValid ||
    !state.captchaVerified

  const logoImg = (
    <Image
      src="/logo.png"
      alt="Veranda Styl"
      width={140}
      height={74}
      className="object-contain"
      style={{ height: '42px', width: 'auto' }}
    />
  )

  const langSwitcher = (
    <div className="flex gap-1">
      {LANGS.map((lang) => (
        <button
          key={lang}
          onClick={() => {
            resetTimer()
            dispatch({ type: 'SET_LANG', lang })
          }}
          className={`text-[8px] tracking-[1px] border px-2 py-1 uppercase transition-all duration-150 active:scale-[0.95] min-h-[36px] min-w-[36px] ${state.lang === lang
            ? 'bg-[#111] text-white border-[#111]'
            : 'text-[#999] border-[#ddd] bg-white'
            }`}
        >
          {lang}
        </button>
      ))}
    </div>
  )

  return (
    <div className="flex flex-col w-full min-h-screen md:fixed md:inset-0 bg-[#f9f7f4]">
      <div className="md:hidden bg-white border-b border-[#e5e0d8] px-4 h-12 flex items-center justify-between flex-shrink-0">
        {logoImg}
        {langSwitcher}
      </div>

      <header className="hidden md:flex h-[86px] bg-white border-b border-[#d8d2c8] items-stretch flex-shrink-0">
        <div className="w-[150px] border-r border-[#d8d2c8] flex items-center justify-center">
          {logoImg}
        </div>

        <nav className="flex flex-1">
          {displayCategories.map((cat) => {
            const isActive = state.categorySlug === cat.slug

            return (
              <button
                key={cat.slug}
                onClick={() => handleTopCategoryClick(cat.slug)}
                className={`flex-1 border-r border-[#d8d2c8] px-4 text-center text-[10px] md:text-[12px] font-extrabold tracking-[2px] uppercase transition-all active:scale-[0.99] ${isActive
                  ? 'bg-[#111] text-white'
                  : 'bg-white text-[#111] hover:bg-[#f3f0eb]'
                  }`}
              >
                {cat.translations[state.lang]?.name ?? cat.slug}
              </button>
            )
          })}
        </nav>

        <div className="w-[150px] flex items-center justify-center px-3">
          {langSwitcher}
        </div>
      </header>

      <div className="flex flex-col flex-1 md:flex-row md:h-full md:overflow-hidden">
        <LeftPanel
          imageUrls={panelImageUrls}
          label={panelLabel}
          sublabel={panelSublabel}
        />

        <div className="flex flex-col flex-1 md:overflow-hidden bg-[#f9f7f4]">
          {showBackButton && (
            <div className="px-4 pt-4 bg-[#f9f7f4]">
              <button
                onClick={handleBack}
                className="inline-flex items-center gap-2 border border-[#ddd] bg-white px-4 py-3 text-[9px] font-extrabold tracking-[2px] uppercase text-[#111] transition-all duration-150 active:scale-[0.97]"
              >
                ← {BACK_LABELS[state.lang]}
              </button>
            </div>
          )}

          <div key={state.step} className="flex-1 overflow-y-auto p-4 animate-step-enter">
            {state.step === 1 && (
              <div className="md:hidden">
                <CategoryStep
                  categories={displayCategories}
                  onPreview={setPreviewCategorySlug}
                />
              </div>
            )}

            {state.step === 1 && (
              <div className="hidden md:flex h-full items-center justify-center text-center text-[10px] tracking-[3px] uppercase text-gray-400">
                Wybierz kategorię z górnego menu
              </div>
            )}

            {state.step === 2 && selectedCategory && (
              <SubcategoryStep products={selectedCategory.products} />
            )}

            {state.step === 3 && selectedProduct && (
              <ProductDetailStep product={selectedProduct} />
            )}

            {state.step === 4 && <ContactStep />}
          </div>

          {isContactStep && (
            <div className="border-t border-[#e5e0d8] bg-white p-3 flex-shrink-0 sticky bottom-0">
              <button
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
                className="w-full bg-[#111] text-white py-3 text-[9px] font-extrabold tracking-[2px] uppercase min-h-[48px] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-150 active:scale-[0.98] active:opacity-80"
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