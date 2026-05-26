'use client'
import { useKiosk } from '@/context/KioskContext'
import { useT } from '@/hooks/useT'

export default function SuccessScreen() {
  const { dispatch, resetTimer } = useKiosk()
  const t = useT()

  function handleReset() {
    resetTimer()
    dispatch({ type: 'RESET' })
  }

  return (
    <div className="absolute inset-0 bg-[#111] flex flex-col items-center justify-center z-20 text-white px-8">
      <div className="text-center">
        <div className="text-4xl font-extrabold tracking-[3px] uppercase mb-4">
          {t.success.title}
        </div>
        <p className="text-sm text-white/60 tracking-wide mb-12">
          {t.success.subtitle}
        </p>
        <button
          onClick={handleReset}
          className="border-[1.5px] border-white/30 text-white/70 px-8 py-3 text-[9px] font-bold tracking-[3px] uppercase hover:border-white hover:text-white transition-all min-h-[48px]"
        >
          {t.success.reset}
        </button>
      </div>
    </div>
  )
}
