'use client'
import { createContext, useContext, useReducer, ReactNode } from 'react'
import type { ConfiguratorState, ConfiguratorAction, Lang, ContactData } from '@/lib/types'

const INITIAL_CONTACT: ContactData = { name: '', phone: '', email: '', city: '', postcode: '', comment: '' }

export const INITIAL_STATE: ConfiguratorState = {
  step: 0,
  lang: 'en',
  productSlug: null,
  structureSlug: null,
  roofSlug: null,
  selectedOptions: [],
  widthMm: null,
  depthMm: null,
  heightMm: null,
  estimatedEur: null,
  contact: INITIAL_CONTACT,
}

function reducer(state: ConfiguratorState, action: ConfiguratorAction): ConfiguratorState {
  switch (action.type) {
    case 'SET_LANG':
      return state.step === 0
        ? { ...state, lang: action.lang }
        : { ...INITIAL_STATE, lang: action.lang, step: 1 }
    case 'START':
      return { ...state, step: 1 }
    case 'SET_PRODUCT':
      return { ...state, productSlug: action.slug, structureSlug: null, roofSlug: null, selectedOptions: [] }
    case 'SET_STRUCTURE':
      return { ...state, structureSlug: action.slug }
    case 'SET_ROOF':
      return { ...state, roofSlug: action.slug }
    case 'TOGGLE_OPTION': {
      const has = state.selectedOptions.includes(action.slug)
      return {
        ...state,
        selectedOptions: has
          ? state.selectedOptions.filter(s => s !== action.slug)
          : [...state.selectedOptions, action.slug],
      }
    }
    case 'SET_DIMENSION':
      return { ...state, [action.field]: action.value }
    case 'SET_ESTIMATED':
      return { ...state, estimatedEur: action.price }
    case 'SET_CONTACT':
      return { ...state, contact: { ...state.contact, [action.field]: action.value } }
    case 'NEXT_STEP':
      return { ...state, step: Math.min(state.step + 1, 8) }
    case 'PREV_STEP':
      return { ...state, step: Math.max(state.step - 1, 1) }
    case 'RESET':
      return INITIAL_STATE
    default:
      return state
  }
}

interface KioskContextValue {
  state: ConfiguratorState
  dispatch: React.Dispatch<ConfiguratorAction>
}

const KioskContext = createContext<KioskContextValue | null>(null)

export function KioskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE)
  return <KioskContext.Provider value={{ state, dispatch }}>{children}</KioskContext.Provider>
}

export function useKiosk() {
  const ctx = useContext(KioskContext)
  if (!ctx) throw new Error('useKiosk must be used within KioskProvider')
  return ctx
}
