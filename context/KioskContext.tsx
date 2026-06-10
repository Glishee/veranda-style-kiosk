'use client'

import { createContext, useContext, useReducer, useCallback, useRef, useEffect, type ReactNode } from 'react'
import type { ConfiguratorState, ConfiguratorAction } from '@/lib/types'

const INITIAL_CONTACT = { name: '', phone: '', city: '', postcode: '', comment: '' }

const INITIAL_STATE: ConfiguratorState = {
  step: 0,
  lang: 'pl',
  categorySlug: null,
  productSlug: null,
  contact: INITIAL_CONTACT,
  captchaVerified: false,
}

export function reducer(state: ConfiguratorState, action: ConfiguratorAction): ConfiguratorState {
  switch (action.type) {
    case 'START':
      return { ...state, step: 1 }

    case 'SET_LANG':
      if (state.step === 0) return { ...state, lang: action.lang }
      return { ...INITIAL_STATE, lang: action.lang, step: 1 }

    case 'SET_CATEGORY':
      return {
        ...state,
        step: 2,
        categorySlug: action.slug,
        productSlug: null,
        captchaVerified: false,
      }

    case 'SET_PRODUCT':
      return {
        ...state,
        step: 3,
        productSlug: action.slug,
        captchaVerified: false,
      }

    case 'NEXT_STEP':
      return { ...state, step: Math.min(state.step + 1, 5) }

    case 'PREV_STEP':
      return {
        ...state,
        step: Math.max(state.step - 1, 1),
        captchaVerified: false,
      }

    case 'SET_CONTACT':
      return { ...state, contact: { ...state.contact, [action.field]: action.value } }

    case 'SET_CAPTCHA_VERIFIED':
      return { ...state, captchaVerified: action.value }

    case 'RESET':
      return INITIAL_STATE

    default:
      return state
  }
}

interface KioskContextValue {
  state: ConfiguratorState
  dispatch: React.Dispatch<ConfiguratorAction>
  resetTimer: () => void
}

const KioskContext = createContext<KioskContextValue | null>(null)

const IDLE_TIMEOUT_MS = 90_000

export function KioskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      dispatch({ type: 'RESET' })
    }, IDLE_TIMEOUT_MS)
  }, [])

  useEffect(() => {
    resetTimer()
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [resetTimer])

  return (
    <KioskContext.Provider value={{ state, dispatch, resetTimer }}>
      {children}
    </KioskContext.Provider>
  )
}

export function useKiosk() {
  const ctx = useContext(KioskContext)
  if (!ctx) throw new Error('useKiosk must be used within KioskProvider')
  return ctx
}