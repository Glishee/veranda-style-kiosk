// hooks/useIdleTimer.ts
import { useEffect, useRef } from 'react'

interface Options {
  timeoutMs: number
  onIdle: () => void
  enabled?: boolean
}

const EVENTS = ['mousemove', 'mousedown', 'touchstart', 'keydown', 'scroll']

export function useIdleTimer({ timeoutMs, onIdle, enabled = true }: Options) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!enabled) return

    function reset() {
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(onIdle, timeoutMs)
    }

    reset()
    EVENTS.forEach(e => window.addEventListener(e, reset, { passive: true }))

    return () => {
      if (timer.current) clearTimeout(timer.current)
      EVENTS.forEach(e => window.removeEventListener(e, reset))
    }
  }, [timeoutMs, onIdle, enabled])
}
