'use client'
import { useEffect, useState } from 'react'
import { useKiosk } from '@/context/KioskContext'
import type { PriceResponse } from '@/lib/types'

export function PriceStep() {
  const { state, dispatch } = useKiosk()
  const [data, setData] = useState<PriceResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (!state.productSlug || !state.widthMm || !state.depthMm) {
      setLoading(false)
      setError(true)
      return
    }
    setLoading(true)
    fetch('/api/price', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productSlug: state.productSlug,
        roofSlug: state.roofSlug ?? 'none',
        selectedOptions: state.selectedOptions,
        widthMm: state.widthMm,
        depthMm: state.depthMm,
      }),
    })
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((d: PriceResponse) => {
        setData(d)
        dispatch({ type: 'SET_ESTIMATED', price: d.estimated })
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="flex-1 flex items-center justify-center"><p className="text-gray-400 text-sm">Calculating...</p></div>
  if (error || !data) return <div className="flex-1 flex items-center justify-center"><p className="text-red-400 text-sm">Could not calculate price.</p></div>

  return (
    <div className="flex-1 overflow-y-auto p-5">
      <h2 className="text-base font-bold text-gray-900 mb-4">Your estimated price</h2>

      <div className="bg-gray-900 p-5 mb-4">
        <p className="text-[9px] tracking-[2px] text-gray-500 uppercase mb-2">Estimated total</p>
        <p className="text-4xl font-black text-white tracking-wide mb-1">
          € {data.estimated.toLocaleString()}
        </p>
        <p className="text-[11px] text-green-600 mb-4">
          Range: € {data.rangeLow.toLocaleString()} – € {data.rangeHigh.toLocaleString()}
        </p>
        <div className="border-t border-gray-800 pt-3 flex flex-col gap-1">
          {data.breakdown.map(row => (
            <div key={row.label} className="flex justify-between text-[10px]">
              <span className="text-gray-500">{row.label}</span>
              <span className="text-gray-400">€ {row.amount.toLocaleString()}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 border border-gray-200 p-3">
        <p className="text-[10px] text-gray-400 leading-relaxed">
          ⚠ Indicative price only. Final cost will be confirmed after reviewing photos, exact measurements and installation site.
        </p>
      </div>
    </div>
  )
}
