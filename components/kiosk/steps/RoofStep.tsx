'use client'
import { useKiosk } from '@/context/KioskContext'
import type { RoofMaterialRow, Lang } from '@/lib/types'

interface Props { roofMaterials: RoofMaterialRow[] }

export function RoofStep({ roofMaterials }: Props) {
  const { state, dispatch } = useKiosk()

  return (
    <div className="flex-1 overflow-y-auto p-5">
      <h2 className="text-base font-bold text-gray-900 mb-4">Choose roof material</h2>
      <div className="flex flex-col gap-3">
        {roofMaterials.map(r => {
          const t = r.translations[state.lang]
          return (
            <button
              key={r.slug}
              onClick={() => dispatch({ type: 'SET_ROOF', slug: r.slug })}
              className={`bg-white border-2 p-4 flex items-center gap-4 transition-all text-left ${
                state.roofSlug === r.slug ? 'border-gray-900' : 'border-transparent shadow-sm'
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                state.roofSlug === r.slug ? 'border-gray-900 bg-gray-900' : 'border-gray-300'
              }`}>
                {state.roofSlug === r.slug && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{t?.label ?? r.slug}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{t?.description}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
