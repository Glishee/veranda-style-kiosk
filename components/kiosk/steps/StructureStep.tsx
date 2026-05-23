'use client'
import { useKiosk } from '@/context/KioskContext'
import { useT } from '@/hooks/useT'
import type { StructureRow } from '@/lib/types'

interface Props { structures: StructureRow[] }

export function StructureStep({ structures }: Props) {
  const { state, dispatch } = useKiosk()
  const t = useT()

  return (
    <div className="flex-1 overflow-y-auto p-5">
      <h2 className="text-base font-bold text-gray-900 mb-4">{t.step2.title}</h2>
      <div className="flex flex-col gap-3">
        {structures.map(s => {
          const tr = s.translations[state.lang]
          return (
            <button
              key={s.slug}
              onClick={() => dispatch({ type: 'SET_STRUCTURE', slug: s.slug })}
              className={`bg-white border-2 p-4 flex items-center gap-4 transition-all text-left ${
                state.structureSlug === s.slug ? 'border-gray-900' : 'border-transparent shadow-sm'
              }`}
            >
              <div className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                state.structureSlug === s.slug ? 'border-gray-900 bg-gray-900' : 'border-gray-300'
              }`}>
                {state.structureSlug === s.slug && <div className="w-2 h-2 bg-white rounded-full" />}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{tr?.label ?? s.slug}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{tr?.description}</p>
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
