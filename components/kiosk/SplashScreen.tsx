'use client'
import { useKiosk } from '@/context/KioskContext'
import { useT } from '@/hooks/useT'
import type { Lang } from '@/lib/types'

const LANGS: Lang[] = ['en', 'pl', 'de']

export function SplashScreen() {
  const { state, dispatch } = useKiosk()
  const t = useT()

  return (
    <div
      className="absolute inset-0 z-20 bg-[#080c12] flex flex-col items-center justify-center cursor-pointer"
      onClick={() => dispatch({ type: 'START' })}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d1520] to-[#050505]" />

      <div className="absolute top-5 right-5 flex gap-2 z-10" onClick={e => e.stopPropagation()}>
        {LANGS.map(lang => (
          <button
            key={lang}
            onClick={() => dispatch({ type: 'SET_LANG', lang })}
            className={`text-[10px] tracking-[2px] uppercase px-3 py-1.5 border transition-all min-h-[44px] min-w-[44px] ${
              state.lang === lang
                ? 'border-white/50 text-white'
                : 'border-white/10 text-white/30'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <div className="w-20 h-20 bg-white flex items-center justify-center mb-6">
          <span className="text-[10px] font-black tracking-widest text-black">LOGO</span>
        </div>
        <h1 className="text-3xl font-black tracking-[6px] text-white uppercase mb-2">
          Veranda Style
        </h1>
        <p className="text-[10px] tracking-[4px] text-white/30 uppercase mb-12">
          {t.splash.tagline}
        </p>
        <p className="text-[11px] tracking-[3px] text-white/20 uppercase animate-pulse">
          ▸ &nbsp; {t.splash.tap} &nbsp; ◂
        </p>
      </div>
    </div>
  )
}
