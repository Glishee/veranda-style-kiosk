import { reducer } from '@/context/KioskContext'
import type { ConfiguratorState } from '@/lib/types'

const INITIAL: ConfiguratorState = {
  step: 0,
  lang: 'pl',
  categorySlug: null,
  productSlug: null,
  contact: { name: '', phone: '', city: '', postcode: '', comment: '' },
}

describe('kioskReducer', () => {
  test('START → step 1', () => {
    const s = reducer(INITIAL, { type: 'START' })
    expect(s.step).toBe(1)
  })

  test('SET_CATEGORY → step 2, sets slug, clears productSlug', () => {
    const s = reducer({ ...INITIAL, step: 1 }, { type: 'SET_CATEGORY', slug: 'zadaszenia' })
    expect(s.step).toBe(2)
    expect(s.categorySlug).toBe('zadaszenia')
    expect(s.productSlug).toBeNull()
  })

  test('SET_PRODUCT → step 3, sets productSlug', () => {
    const s = reducer(
      { ...INITIAL, step: 2, categorySlug: 'zadaszenia' },
      { type: 'SET_PRODUCT', slug: 'vs-cube' }
    )
    expect(s.step).toBe(3)
    expect(s.productSlug).toBe('vs-cube')
  })

  test('NEXT_STEP caps at 5', () => {
    const s = reducer({ ...INITIAL, step: 5 }, { type: 'NEXT_STEP' })
    expect(s.step).toBe(5)
  })

  test('PREV_STEP from step 2 → step 1', () => {
    const s = reducer({ ...INITIAL, step: 2 }, { type: 'PREV_STEP' })
    expect(s.step).toBe(1)
  })

  test('PREV_STEP floors at 1', () => {
    const s = reducer({ ...INITIAL, step: 1 }, { type: 'PREV_STEP' })
    expect(s.step).toBe(1)
  })

  test('SET_LANG on splash keeps step 0', () => {
    const s = reducer(INITIAL, { type: 'SET_LANG', lang: 'en' })
    expect(s.lang).toBe('en')
    expect(s.step).toBe(0)
  })

  test('SET_LANG mid-flow resets to step 1', () => {
    const s = reducer({ ...INITIAL, step: 3, categorySlug: 'zadaszenia' }, { type: 'SET_LANG', lang: 'de' })
    expect(s.lang).toBe('de')
    expect(s.step).toBe(1)
    expect(s.categorySlug).toBeNull()
  })

  test('RESET → initial state', () => {
    const s = reducer({ ...INITIAL, step: 3, categorySlug: 'zadaszenia', productSlug: 'vs-cube' }, { type: 'RESET' })
    expect(s).toEqual(INITIAL)
  })

  test('SET_CONTACT updates field', () => {
    const s = reducer(INITIAL, { type: 'SET_CONTACT', field: 'name', value: 'Jan Kowalski' })
    expect(s.contact.name).toBe('Jan Kowalski')
  })
})
