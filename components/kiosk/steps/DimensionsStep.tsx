'use client'
import { useState } from 'react'
import { useKiosk } from '@/context/KioskContext'
import { Numpad } from '@/components/kiosk/Numpad'

type DimField = 'widthMm' | 'depthMm' | 'heightMm'

const FIELDS: { field: DimField; label: string }[] = [
  { field: 'widthMm', label: 'Width' },
  { field: 'depthMm', label: 'Depth' },
  { field: 'heightMm', label: 'Height' },
]

export function DimensionsStep() {
  const { state, dispatch } = useKiosk()
  const [activeField, setActiveField] = useState<DimField | null>(null)

  return (
    <div className="flex-1 overflow-y-auto p-5">
      <h2 className="text-base font-bold text-gray-900 mb-4">Enter dimensions</h2>

      <div className="grid grid-cols-2 gap-3 mb-3">
        {FIELDS.map(({ field, label }) => (
          <button
            key={field}
            onClick={() => setActiveField(field)}
            className="bg-white border-2 border-gray-200 p-4 text-left hover:border-gray-400 transition-colors"
          >
            <p className="text-[9px] tracking-[2px] text-gray-400 uppercase mb-2">{label}</p>
            <p className="text-2xl font-bold text-gray-900 leading-none">
              {state[field]?.toLocaleString() ?? <span className="text-gray-300">—</span>}
            </p>
            <p className="text-[10px] text-gray-400 mt-1">mm</p>
          </button>
        ))}
        <div className="bg-gray-100 p-4 flex items-center justify-center">
          <p className="text-[10px] text-gray-400 text-center leading-tight">
            Tap a field<br />to enter value
          </p>
        </div>
      </div>

      <p className="text-[10px] text-gray-400 text-center">All values in millimetres (mm)</p>

      {activeField && (
        <Numpad
          label={FIELDS.find(f => f.field === activeField)!.label + ' (mm)'}
          initialValue={state[activeField]}
          onConfirm={value => {
            if (value > 0) {
              dispatch({ type: 'SET_DIMENSION', field: activeField, value })
              setActiveField(null)
            }
          }}
          onCancel={() => setActiveField(null)}
        />
      )}
    </div>
  )
}
