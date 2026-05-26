'use client'
import Image from 'next/image'
import { useKiosk } from '@/context/KioskContext'
import { useT } from '@/hooks/useT'
import type { Lang } from '@/lib/types'

const LANGS: Lang[] = ['pl', 'en', 'de']

export function SplashScreen() {
  const { state, dispatch } = useKiosk()
  const t = useT()

  return (
    <div
      className="fixed inset-0 z-20 bg-[#080c12] flex flex-col items-center justify-center cursor-pointer"
      onClick={() => dispatch({ type: 'START' })}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d1520] to-[#050505]" />

      {/* Language switcher */}
      <div
        className="absolute top-4 right-4 flex gap-2 z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {LANGS.map((lang) => (
          <button
            key={lang}
            onClick={() => dispatch({ type: 'SET_LANG', lang })}
            className={`text-[10px] tracking-[2px] uppercase px-3 py-2 border transition-all min-h-[44px] min-w-[44px] ${
              state.lang === lang
                ? 'border-white/50 text-white'
                : 'border-white/10 text-white/30'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Logo + tap prompt */}
      <div className="relative z-10 flex flex-col items-center text-center px-8">
        <div className="mb-10">
          <Image
            src="/logo.png"
            alt="Veranda Styl"
            width={280}
            height={148}
            priority
            className="w-48 md:w-64 h-auto object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>

        <p className="text-[10px] tracking-[5px] text-white/30 uppercase mb-8">
          {t.splash.tap}
        </p>
        <p className="text-[11px] tracking-[3px] text-white/20 uppercase animate-pulse">
          ▸ &nbsp; {t.splash.tap} &nbsp; ◂
        </p>
      </div>
    </div>
  )
}
