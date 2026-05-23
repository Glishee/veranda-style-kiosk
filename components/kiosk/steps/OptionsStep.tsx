'use client'
import { useKiosk } from '@/context/KioskContext'
import type { OptionRow, Lang } from '@/lib/types'

interface Props { options: OptionRow[] }

export function OptionsStep({ options }: Props) {
  const { state, dispatch } = useKiosk()

  if (options.length === 0) return (
    <div className="flex-1 p-5 flex items-center justify-center">
      <p className="text-sm text-gray-400">No additional options for this product.</p>
    </div>
  )

  return (
    <div className="flex-1 overflow-y-auto p-5">
      <h2 className="text-base font-bold text-gray-900 mb-1">Add options</h2>
      <p className="text-[11px] text-gray-400 mb-4">optional — select any that apply</p>
      <div className="flex flex-col gap-3">
        {options.map(o => {
          const t = (o.translations as Record<Lang, { label: string }>)[state.lang]
          const selected = state.selectedOptions.includes(o.slug)
          return (
            <button
              key={o.slug}
              onClick={() => dispatch({ type: 'TOGGLE_OPTION', slug: o.slug })}
              className={`bg-white border-2 p-4 flex items-center gap-4 transition-all text-left ${
                selected ? 'border-gray-900' : 'border-transparent shadow-sm'
              }`}
            >
              <div className={`w-5 h-5 border-2 flex-shrink-0 flex items-center justify-center rounded-sm ${
                selected ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300'
              }`}>
                {selected && <span className="text-xs font-bold">✓</span>}
              </div>
              <p className="text-sm font-semibold text-gray-900 flex-1">{t?.label ?? o.slug}</p>
              <p className="text-sm font-bold text-gray-500">+€{o.priceEur.toLocaleString()}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
