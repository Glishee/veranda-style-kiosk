'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useKiosk } from '@/context/KioskContext'
import { useT } from '@/hooks/useT'
import type { Lang } from '@/lib/types'

const LANGS: Lang[] = ['pl', 'en', 'de']

const PRIVACY_POLICY_URL =
  'https://firebasestorage.googleapis.com/v0/b/syncterra-58004.firebasestorage.app/o/OUR%20PDF%2FPolityka_Prywatnosci_SyncTerra%20(2).pdf?alt=media&token=4f65c7ea-a2e1-4297-b2a6-322baa94c27a'

const COOKIE_LABELS: Record<
  Lang,
  {
    title: string
    body: string
    accept: string
    privacy: string
    rights: string
  }
> = {
  pl: {
    title: 'Prywatność i pliki cookies',
    body: 'Korzystając z konfiguratora, akceptujesz użycie niezbędnych plików cookies oraz przetwarzanie danych formularza w celu przygotowania oferty.',
    accept: 'Akceptuję',
    privacy: 'Polityka prywatności',
    rights: 'Wszelkie prawa zastrzeżone.',
  },
  en: {
    title: 'Privacy and cookies',
    body: 'By using this configurator, you accept essential cookies and the processing of form data to prepare your offer.',
    accept: 'I accept',
    privacy: 'Privacy Policy',
    rights: 'All rights reserved.',
  },
  de: {
    title: 'Datenschutz und Cookies',
    body: 'Durch die Nutzung dieses Konfigurators akzeptieren Sie notwendige Cookies und die Verarbeitung der Formulardaten zur Angebotserstellung.',
    accept: 'Akzeptieren',
    privacy: 'Datenschutzerklärung',
    rights: 'Alle Rechte vorbehalten.',
  },
}

export function SplashScreen() {
  const { state, dispatch } = useKiosk()
  const t = useT()
  const [cookiesAccepted, setCookiesAccepted] = useState(false)

  const cookie = COOKIE_LABELS[state.lang]

  function handleStart() {
    if (!cookiesAccepted) return
    dispatch({ type: 'START' })
  }

  function handleAcceptCookies() {
    setCookiesAccepted(true)
  }

  return (
    <div
      className={`fixed inset-0 z-20 bg-[#080c12] flex flex-col items-center justify-center transition-all duration-300 ${cookiesAccepted ? 'cursor-pointer' : 'cursor-default'
        }`}
      onClick={handleStart}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#0d1520] to-[#050505]" />

      <div className="absolute inset-0 opacity-[0.08]">
        <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30" />
        <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />
      </div>

      <div
        className="absolute top-4 right-4 flex gap-2 z-20"
        onClick={(e) => e.stopPropagation()}
      >
        {LANGS.map((lang) => (
          <button
            key={lang}
            onClick={() => dispatch({ type: 'SET_LANG', lang })}
            className={`text-[10px] tracking-[2px] uppercase px-3 py-2 border transition-all min-h-[44px] min-w-[44px] ${state.lang === lang
              ? 'border-white/50 text-white'
              : 'border-white/10 text-white/30'
              }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-8">
        <div className="mb-8">
          <Image
            src="/logo.png"
            alt="Veranda Style"
            width={280}
            height={148}
            priority
            className="w-48 md:w-64 h-auto object-contain"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>

        <p className="text-[11px] md:text-[13px] tracking-[4px] uppercase text-white/70 mb-3">
          {t.splash.welcome}
        </p>

        <p className="text-[10px] md:text-[12px] tracking-[3px] text-white/40 mb-10">
          {t.splash.tagline}
        </p>

        {cookiesAccepted ? (
          <>
            <p className="text-[10px] tracking-[5px] text-white/30 uppercase mb-6">
              {t.splash.tap}
            </p>

            <p className="text-[11px] tracking-[3px] text-white/20 uppercase animate-pulse">
              ▸ &nbsp; {t.splash.tap} &nbsp; ◂
            </p>
          </>
        ) : (
          <div
            className="w-full max-w-[420px] border border-white/10 bg-white/[0.06] backdrop-blur-md p-4 md:p-5 text-left shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-white/15 bg-white/10 text-white">
                ◇
              </div>

              <div className="flex-1">
                <p className="text-[9px] tracking-[3px] uppercase text-white/70 mb-2">
                  {cookie.title}
                </p>

                <p className="text-[10px] md:text-[11px] leading-relaxed text-white/40">
                  {cookie.body}
                </p>

                <a
                  href={PRIVACY_POLICY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="mt-3 inline-block text-[10px] md:text-[11px] text-white/70 underline underline-offset-4 hover:text-white transition-colors"
                >
                  {cookie.privacy}
                </a>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAcceptCookies}
              className="mt-4 w-full min-h-[46px] bg-white text-[#111] text-[9px] font-extrabold tracking-[2px] uppercase transition-all duration-200 active:scale-[0.98]"
            >
              {cookie.accept} →
            </button>
          </div>
        )}
      </div>

      <footer
        className="absolute bottom-4 left-1/2 z-10 w-full max-w-[960px] -translate-x-1/2 px-6 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto border-t border-white/10 pt-4 text-[9px] md:text-[10px] leading-relaxed tracking-[1px] text-white/30">
          <p className="font-semibold text-white/45">
            SyncTerra Sp. z o.o. © 2026. {cookie.rights}
          </p>

          <p className="mt-1">
            SYNCTERRA SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ · NIP:
            5273156287 · REGON: 541183846 · KRS: 0001161896
          </p>

          <p className="mt-1">
            ul. Juliana Smulikowskiego 4A/21, 00-389 Warszawa, Polska
          </p>
        </div>
      </footer>
    </div>
  )
}