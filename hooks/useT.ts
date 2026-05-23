import { useKiosk } from '@/context/KioskContext'
import en from '@/lib/i18n/en.json'
import pl from '@/lib/i18n/pl.json'

const MESSAGES = { en, pl, de: en } // DE falls back to EN for now

export function useT() {
  const { state } = useKiosk()
  return MESSAGES[state.lang] ?? MESSAGES.en
}
