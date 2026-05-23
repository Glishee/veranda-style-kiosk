'use client'
import { useKiosk } from '@/context/KioskContext'
import { useT } from '@/hooks/useT'
import type { ContactData } from '@/lib/types'

export function ContactStep() {
  const { state, dispatch } = useKiosk()
  const t = useT()

  const FIELDS: { field: keyof ContactData; label: string; required: boolean; keyboard: 'text' | 'tel' | 'email' }[] = [
    { field: 'name', label: t.step7.name, required: true, keyboard: 'text' },
    { field: 'phone', label: t.step7.phone, required: true, keyboard: 'tel' },
    { field: 'email', label: t.step7.email, required: false, keyboard: 'email' },
    { field: 'city', label: t.step7.city, required: true, keyboard: 'text' },
    { field: 'postcode', label: t.step7.postcode, required: true, keyboard: 'text' },
    { field: 'comment', label: t.step7.comment, required: false, keyboard: 'text' },
  ]

  return (
    <div className="flex-1 overflow-y-auto p-5">
      <h2 className="text-base font-bold text-gray-900 mb-4">{t.step7.title}</h2>
      <div className="flex flex-col gap-3">
        {FIELDS.map(({ field, label, required, keyboard }) => (
          <div key={field} className="bg-white border border-gray-200 p-3">
            <label className="block text-[9px] tracking-[1.5px] text-gray-400 uppercase mb-1">
              {label} {!required && <span className="text-gray-300 normal-case tracking-normal">{t.step7.optional}</span>}
            </label>
            <input
              type={keyboard}
              value={state.contact[field]}
              onChange={e => dispatch({ type: 'SET_CONTACT', field, value: e.target.value })}
              className="w-full text-sm text-gray-900 outline-none bg-transparent placeholder:text-gray-300"
              placeholder={required ? '' : '—'}
              autoComplete="off"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
