// __tests__/hooks/useIdleTimer.test.ts
import { renderHook, act } from '@testing-library/react'
import { useIdleTimer } from '@/hooks/useIdleTimer'

jest.useFakeTimers()

describe('useIdleTimer', () => {
  it('calls onIdle after the specified timeout', () => {
    const onIdle = jest.fn()
    renderHook(() => useIdleTimer({ timeoutMs: 90_000, onIdle }))
    act(() => { jest.advanceTimersByTime(90_000) })
    expect(onIdle).toHaveBeenCalledTimes(1)
  })

  it('resets the timer on user activity', () => {
    const onIdle = jest.fn()
    renderHook(() => useIdleTimer({ timeoutMs: 90_000, onIdle }))
    act(() => { jest.advanceTimersByTime(50_000) })
    act(() => { window.dispatchEvent(new MouseEvent('mousemove')) })
    act(() => { jest.advanceTimersByTime(50_000) })
    expect(onIdle).not.toHaveBeenCalled()
    act(() => { jest.advanceTimersByTime(40_000) })
    expect(onIdle).toHaveBeenCalledTimes(1)
  })

  it('does not call onIdle when disabled', () => {
    const onIdle = jest.fn()
    renderHook(() => useIdleTimer({ timeoutMs: 90_000, onIdle, enabled: false }))
    act(() => { jest.advanceTimersByTime(90_000) })
    expect(onIdle).not.toHaveBeenCalled()
  })
})
