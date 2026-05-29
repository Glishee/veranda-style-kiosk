'use client'
import { useEffect, useState } from 'react'
import { useKiosk } from '@/context/KioskContext'
import { useT } from '@/hooks/useT'
import type { ContactData, Lang } from '@/lib/types'
import { calculatePricePln, getPriceEur, getPricingTable } from '@/lib/pricing'

const LABELS: Record<Lang, {
  width: string
  depth: string
  price: string
  noPrice: string
  currency: string
  withoutAssembly: string
}> = {
  pl: {
    width: 'Szerokość konstrukcji',
    depth: 'Głębokość / wysięg',
    price: 'Cena orientacyjna',
    noPrice: 'Brak ceny dla tej konfiguracji',
    currency: 'PLN',
    withoutAssembly: 'Cena bez montażu',
  },
  en: {
    width: 'Construction width',
    depth: 'Depth / projection',
    price: 'Estimated price',
    noPrice: 'No price for this configuration',
    currency: 'PLN',
    withoutAssembly: 'Price without installation',
  },
  de: {
    width: 'Konstruktionsbreite',
    depth: 'Tiefe / Ausladung',
    price: 'Ungefährer Preis',
    noPrice: 'Kein Preis für diese Konfiguration',
    currency: 'PLN',
    withoutAssembly: 'Preis ohne Montage',
  },
}

function AnimatedPrice({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let frame = 0
    const frames = 28
    const start = displayValue
    const diff = value - start

    const id = window.setInterval(() => {
      frame += 1
      const progress = Math.min(frame / frames, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayValue(Math.round(start + diff * eased))

      if (progress >= 1) window.clearInterval(id)
    }, 18)

    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <>{displayValue.toLocaleString('pl-PL')}</>
}

export default function ContactStep() {
  const { state, dispatch, resetTimer } = useKiosk()
  const t = useT()
  const { contact } = state
  const labels = LABELS[state.lang]

  const pricingTable = getPricingTable(state.productSlug)

  const [selectedWidth, setSelectedWidth] = useState<number | null>(
    pricingTable?.widths[0] ?? null
  )
  const [selectedDepth, setSelectedDepth] = useState<number | null>(
    pricingTable?.depths[0] ?? null
  )

  const selectedPriceEur =
    pricingTable && selectedWidth && selectedDepth
      ? getPriceEur(pricingTable, selectedWidth, selectedDepth)
      : null

  const selectedPricePln =
    selectedPriceEur !== null && selectedPriceEur !== undefined
      ? calculatePricePln(selectedPriceEur)
      : null

  useEffect(() => {
    if (!pricingTable) return

    const width = pricingTable.widths[0] ?? null
    const depth = pricingTable.depths[0] ?? null

    setSelectedWidth(width)
    setSelectedDepth(depth)
  }, [pricingTable])

  useEffect(() => {
    if (!selectedWidth || !selectedDepth || !selectedPricePln) return

    dispatch({
      type: 'SET_CONTACT',
      field: 'comment',
      value: `Width: ${selectedWidth} cm; Depth: ${selectedDepth} cm; Estimated price: ${selectedPricePln} PLN; Price without installation`,
    })
  }, [selectedWidth, selectedDepth, selectedPricePln, dispatch])

  function handleChange(field: keyof ContactData, value: string) {
    resetTimer()
    dispatch({ type: 'SET_CONTACT', field, value })
  }

  function handleWidthSelect(width: number) {
    resetTimer()
    setSelectedWidth(width)
  }

  function handleDepthSelect(depth: number) {
    resetTimer()
    setSelectedDepth(depth)
  }

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-[8px] tracking-[3px] uppercase text-gray-400 mb-1">
        {t.step4.label}
      </p>

      <div>
        <label className="block text-[7px] tracking-[2px] uppercase text-gray-400 mb-1">
          {t.step4.name} <span className="text-red-500 text-[9px]">*</span>
        </label>
        <input
          type="text"
          value={contact.name}
          onChange={(e) => handleChange('name', e.target.value)}
          className="block w-full bg-white border-[1.5px] border-[#e5e0d8] h-8 px-2 text-[10px] text-[#111] focus:outline-none focus:border-[#111]"
        />
      </div>

      <div>
        <label className="block text-[7px] tracking-[2px] uppercase text-gray-400 mb-1">
          {t.step4.phone} <span className="text-red-500 text-[9px]">*</span>
        </label>
        <input
          type="tel"
          value={contact.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          className="block w-full bg-white border-[1.5px] border-[#e5e0d8] h-8 px-2 text-[10px] text-[#111] focus:outline-none focus:border-[#111]"
        />
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        <div>
          <label className="block text-[7px] tracking-[2px] uppercase text-gray-400 mb-1">
            {t.step4.city} <span className="text-red-500 text-[9px]">*</span>
          </label>
          <input
            type="text"
            value={contact.city}
            onChange={(e) => handleChange('city', e.target.value)}
            className="block w-full bg-white border-[1.5px] border-[#e5e0d8] h-8 px-2 text-[10px] text-[#111] focus:outline-none focus:border-[#111]"
          />
        </div>

        <div>
          <label className="block text-[7px] tracking-[2px] uppercase text-gray-400 mb-1">
            {t.step4.postcode} <span className="text-red-500 text-[9px]">*</span>
          </label>
          <input
            type="text"
            value={contact.postcode}
            onChange={(e) => handleChange('postcode', e.target.value)}
            className="block w-full bg-white border-[1.5px] border-[#e5e0d8] h-8 px-2 text-[10px] text-[#111] focus:outline-none focus:border-[#111]"
          />
        </div>
      </div>

      {pricingTable && (
        <div className="mt-2 flex flex-col gap-3">
          <div>
            <p className="block text-[7px] tracking-[2px] uppercase text-gray-400 mb-2">
              {labels.width}
            </p>

            <div className="grid grid-cols-3 gap-2">
              {pricingTable.widths.map((width) => {
                const active = selectedWidth === width

                return (
                  <button
                    key={width}
                    type="button"
                    onClick={() => handleWidthSelect(width)}
                    className={`border-[1.5px] px-2 py-3 text-center transition-all duration-150 active:scale-[0.97] ${active
                      ? 'bg-[#111] border-[#111] text-white'
                      : 'bg-white border-[#e5e0d8] text-[#111]'
                      }`}
                  >
                    <span className="block text-[9px] font-extrabold tracking-[1px]">
                      {width} cm
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <p className="block text-[7px] tracking-[2px] uppercase text-gray-400 mb-2">
              {labels.depth}
            </p>

            <div className="grid grid-cols-3 gap-2">
              {pricingTable.depths.map((depth) => {
                const active = selectedDepth === depth

                return (
                  <button
                    key={depth}
                    type="button"
                    onClick={() => handleDepthSelect(depth)}
                    className={`border-[1.5px] px-2 py-3 text-center transition-all duration-150 active:scale-[0.97] ${active
                      ? 'bg-[#111] border-[#111] text-white'
                      : 'bg-white border-[#e5e0d8] text-[#111]'
                      }`}
                  >
                    <span className="block text-[9px] font-extrabold tracking-[1px]">
                      {depth} cm
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="border border-[#e5e0d8] bg-white p-4">
            <p className="text-[7px] tracking-[2px] uppercase text-gray-400">
              {labels.price}
            </p>

            {selectedPricePln ? (
              <>
                <p className="mt-1 text-xl font-extrabold tracking-wide text-[#111]">
                  ≈ <AnimatedPrice value={selectedPricePln} /> {labels.currency}
                </p>
                <p className="mt-1 text-[8px] tracking-[1.5px] uppercase text-gray-400">
                  {labels.withoutAssembly}
                </p>
              </>
            ) : (
              <p className="mt-1 text-[10px] text-gray-400">
                {labels.noPrice}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}