import { useKiosk } from '@/context/KioskContext'
import de from '@/lib/i18n/de.json'
import en from '@/lib/i18n/en.json'
import pl from '@/lib/i18n/pl.json'

const MESSAGES = { en, pl, de }

export function useT() {
  const { state } = useKiosk()
  return MESSAGES[state.lang] ?? MESSAGES.en
}
