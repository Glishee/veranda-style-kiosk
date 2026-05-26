'use client'
import { useKiosk } from '@/context/KioskContext'
import { useT } from '@/hooks/useT'
import type { ContactData } from '@/lib/types'

export default function ContactStep() {
  const { state, dispatch, resetTimer } = useKiosk()
  const t = useT()
  const { contact } = state

  function handleChange(field: keyof ContactData, value: string) {
    resetTimer()
    dispatch({ type: 'SET_CONTACT', field, value })
  }

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-[8px] tracking-[3px] uppercase text-gray-400 mb-1">
        {t.step4.label}
      </p>

      {/* Name */}
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

      {/* Phone */}
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

      {/* City + Postcode side by side */}
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

      {/* Comment (optional) */}
      <div>
        <label className="block text-[7px] tracking-[2px] uppercase text-gray-400 mb-1 flex justify-between">
          <span>{t.step4.comment}</span>
          <span className="text-[#d1cdc8]">{t.step4.optional}</span>
        </label>
        <textarea
          value={contact.comment}
          onChange={(e) => handleChange('comment', e.target.value)}
          placeholder={t.step4.commentPlaceholder}
          rows={3}
          className="block w-full bg-white border-[1.5px] border-[#e5e0d8] px-2 py-2 text-[10px] text-[#111] placeholder-[#d1cdc8] resize-none focus:outline-none focus:border-[#111]"
        />
      </div>
    </div>
  )
}
