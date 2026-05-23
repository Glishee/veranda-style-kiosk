'use client'
import { useState } from 'react'

interface Props {
  initialValue?: number | null
  onConfirm: (value: number) => void
  onCancel: () => void
  label: string
}

export function Numpad({ initialValue, onConfirm, onCancel, label }: Props) {
  const [raw, setRaw] = useState(initialValue?.toString() ?? '')

  function press(char: string) {
    setRaw(prev => {
      if (char === '⌫') return prev.slice(0, -1)
      if (prev.length >= 6) return prev
      return prev + char
    })
  }

  const keys = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '⌫', '0', 'OK']

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-end justify-center pb-8">
      <div className="bg-white w-72 rounded-sm overflow-hidden shadow-2xl">
        <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
          <p className="text-[9px] tracking-[2px] text-gray-400 uppercase mb-1">{label}</p>
          <p className="text-3xl font-bold text-gray-900 min-h-[40px]">
            {raw || <span className="text-gray-300">0</span>}
            <span className="text-gray-300 text-xl"> mm</span>
          </p>
        </div>
        <div className="grid grid-cols-3">
          {keys.map(key => (
            <button
              key={key}
              onClick={() => key === 'OK' ? (raw && onConfirm(parseInt(raw, 10))) : press(key)}
              className={`h-14 text-lg font-semibold border-b border-r border-gray-100 transition-colors ${
                key === 'OK'
                  ? `bg-gray-900 text-white${!raw ? ' opacity-50' : ''}`
                  : key === '⌫'
                  ? 'bg-gray-50 text-gray-500'
                  : 'bg-white text-gray-800 active:bg-gray-100'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
        <button
          onClick={onCancel}
          className="w-full py-3 text-[10px] tracking-[2px] text-gray-400 uppercase border-t border-gray-100"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
