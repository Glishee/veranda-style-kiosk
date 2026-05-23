import { useEffect, useRef } from 'react'

interface Options {
  timeoutMs: number
  onIdle: () => void
  enabled?: boolean
}

const EVENTS = ['mousemove', 'mousedown', 'touchstart', 'keydown', 'scroll']
const LISTENER_OPTIONS: AddEventListenerOptions = { passive: true }

export function useIdleTimer({ timeoutMs, onIdle, enabled = true }: Options) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const onIdleRef = useRef(onIdle)
  onIdleRef.current = onIdle

  useEffect(() => {
    if (!enabled) return

    function reset() {
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => onIdleRef.current(), timeoutMs)
    }

    reset()
    EVENTS.forEach(e => window.addEventListener(e, reset, LISTENER_OPTIONS))

    return () => {
      if (timer.current) clearTimeout(timer.current)
      EVENTS.forEach(e => window.removeEventListener(e, reset, LISTENER_OPTIONS))
    }
  }, [timeoutMs, enabled])
}
