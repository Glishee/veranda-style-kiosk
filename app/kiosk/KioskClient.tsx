'use client'
import { useKiosk } from '@/context/KioskContext'
import { useIdleTimer } from '@/hooks/useIdleTimer'
import { useCallback, useState } from 'react'
import { SplashScreen } from '@/components/kiosk/SplashScreen'
import LeftPanel from '@/components/kiosk/LeftPanel'
import { StepProgress } from '@/components/kiosk/StepProgress'
import { ProductGrid } from '@/components/kiosk/steps/ProductGrid'
import { StructureStep } from '@/components/kiosk/steps/StructureStep'
import { RoofStep } from '@/components/kiosk/steps/RoofStep'
import { OptionsStep } from '@/components/kiosk/steps/OptionsStep'
import { DimensionsStep } from '@/components/kiosk/steps/DimensionsStep'
import { PriceStep } from '@/components/kiosk/steps/PriceStep'
import ContactStep from '@/components/kiosk/steps/ContactStep'
import { SuccessScreen } from '@/components/kiosk/SuccessScreen'
import { useT } from '@/hooks/useT'
import type { ProductRow } from '@/lib/types'

interface Props { products: ProductRow[] }

export function KioskClient({ products }: Props) {
  const { state, dispatch } = useKiosk()
  const t = useT()
  const [submitError, setSubmitError] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleIdle = useCallback(() => dispatch({ type: 'RESET' }), [dispatch])
  useIdleTimer({ timeoutMs: 90_000, onIdle: handleIdle, enabled: state.step > 0 })

  const currentProduct = products.find(p => p.slug === state.productSlug)

  function canAdvance() {
    if (state.step === 1) return !!state.productSlug
    if (state.step === 2) return !!state.structureSlug
    if (state.step === 3) return !!state.roofSlug || (currentProduct?.roofMaterials.length === 0)
    if (state.step === 5) return !!(state.widthMm && state.depthMm && state.heightMm)
    return true
  }

  async function handleNext() {
    if (state.step === 7) {
      const { name, phone, city, postcode } = state.contact
      if (!name || !phone || !city || !postcode) return
      if (isSubmitting) return
      setIsSubmitting(true)
      setSubmitError(false)
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productSlug: state.productSlug,
          structureSlug: state.structureSlug,
          roofSlug: state.roofSlug ?? 'none',
          selectedOptions: state.selectedOptions,
          widthMm: state.widthMm,
          depthMm: state.depthMm,
          heightMm: state.heightMm,
          estimatedEur: state.estimatedEur ?? 0,
          ...state.contact,
          lang: state.lang,
        }),
      })
      setIsSubmitting(false)
      if (!res.ok) {
        setSubmitError(true)
        return
      }
    }
    dispatch({ type: 'NEXT_STEP' })
  }

  const stepContent: Record<number, React.ReactNode> = {
    1: <ProductGrid products={products} />,
    2: <StructureStep structures={currentProduct?.structures ?? []} />,
    3: <RoofStep roofMaterials={currentProduct?.roofMaterials ?? []} />,
    4: <OptionsStep options={currentProduct?.options ?? []} />,
    5: <DimensionsStep />,
    6: <PriceStep />,
    7: <ContactStep />,
    8: <SuccessScreen />,
  }

  return (
    <div className="relative w-full h-full flex">
      {state.step === 0 && <SplashScreen />}

      <LeftPanel
        imageUrl={currentProduct?.imageUrl ?? null}
        label={currentProduct?.translations[state.lang]?.name ?? 'Veranda Style'}
      />

      <div className="w-[42%] h-full bg-[#f4f2ef] flex flex-col">
        <div className="bg-white border-b border-gray-200 px-5 h-[52px] flex items-center justify-between flex-shrink-0">
          <span className="text-xs font-black tracking-[3px] text-gray-900 uppercase">Veranda Style</span>
          <div className="flex gap-1">
            {(['en', 'pl', 'de'] as const).map(lang => (
              <button
                key={lang}
                onClick={() => dispatch({ type: 'SET_LANG', lang })}
                className={`text-[9px] tracking-[1px] px-2 py-1 border min-h-[30px] min-w-[36px] transition-all ${
                  state.lang === lang ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-400'
                }`}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {state.step >= 1 && state.step <= 7 && (
          <StepProgress currentStep={state.step} label={t.stepLabels[state.step] ?? ''} />
        )}

        <div className="flex-1 overflow-hidden flex flex-col">
          {stepContent[state.step] ?? null}
        </div>

        {state.step >= 1 && state.step <= 7 && (
          <div className="bg-white border-t border-gray-200 px-5 py-3 flex flex-col gap-2 flex-shrink-0">
            {submitError && (
              <p className="text-red-500 text-[10px] text-center mb-2">
                {t.general.submitError}
              </p>
            )}
            <div className="flex gap-2">
              {state.step > 1 && (
                <button
                  onClick={() => dispatch({ type: 'PREV_STEP' })}
                  className="border border-gray-200 text-gray-500 px-5 h-11 text-[10px] tracking-widest uppercase"
                >
                  {t.steps.back}
                </button>
              )}
              <button
                onClick={handleNext}
                disabled={!canAdvance() || isSubmitting}
                className={`flex-1 h-11 text-[11px] font-bold tracking-widest uppercase transition-all ${
                  canAdvance()
                    ? state.step === 7 ? 'bg-green-800 text-white' : 'bg-gray-900 text-white'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                }`}
              >
                {state.step === 7 ? t.steps.sendQuote : t.steps.continue}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
