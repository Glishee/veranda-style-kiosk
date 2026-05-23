'use client'
import { useKiosk } from '@/context/KioskContext'
import { useT } from '@/hooks/useT'

export function SuccessScreen() {
  const { dispatch } = useKiosk()
  const t = useT()

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div className="text-5xl mb-5">✅</div>
      <h2 className="text-xl font-black text-gray-900 mb-3">{t.success.title}</h2>
      <p className="text-sm text-gray-500 leading-relaxed mb-8 max-w-xs">{t.success.body}</p>

      <div className="bg-gray-100 border border-gray-200 p-4 mb-6 text-center">
        <div className="w-24 h-24 bg-gray-200 mx-auto mb-2 flex items-center justify-center">
          <span className="text-[9px] text-gray-400 tracking-wider">QR SOON</span>
        </div>
        <p className="text-[9px] text-gray-400 tracking-wider uppercase">{t.success.phone}</p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-xs">
        <button
          disabled
          className="bg-green-700 text-white py-4 text-[11px] font-bold tracking-widest uppercase opacity-50 cursor-not-allowed"
        >
          {t.success.whatsapp}
        </button>
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          className="border border-gray-200 text-gray-400 py-3 text-[10px] tracking-widest uppercase"
        >
          {t.success.restart}
        </button>
      </div>
    </div>
  )
}
