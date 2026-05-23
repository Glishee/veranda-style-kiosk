import { calculatePrice } from '@/lib/price'

describe('calculatePrice', () => {
  it('calculates base price for polycarbonate (coefficient 1.0)', () => {
    const result = calculatePrice({
      baseRateEur: 380,
      roofCoefficient: 1.0,
      optionPrices: [],
      widthMm: 5000,
      depthMm: 4000,
    })
    // area = 5 × 4 = 20 m², base = 20 × 380 = 7600, rounded to 100 = 7600
    expect(result.estimated).toBe(7600)
    expect(result.rangeLow).toBe(Math.round(7600 * 0.85 / 100) * 100)
    expect(result.rangeHigh).toBe(Math.round(7600 * 1.25 / 100) * 100)
  })

  it('applies material coefficient for VSG glass (1.35)', () => {
    const result = calculatePrice({
      baseRateEur: 380,
      roofCoefficient: 1.35,
      optionPrices: [],
      widthMm: 5000,
      depthMm: 4000,
    })
    // base = 7600, material_adj = 7600 × 0.35 = 2660, total = 10260 → rounded = 10300
    expect(result.estimated).toBe(10300)
  })

  it('adds flat option prices on top', () => {
    const result = calculatePrice({
      baseRateEur: 380,
      roofCoefficient: 1.0,
      optionPrices: [600, 900],
      widthMm: 5000,
      depthMm: 4000,
    })
    // base = 7600 + 600 + 900 = 9100 → rounded = 9100
    expect(result.estimated).toBe(9100)
  })

  it('rounds to nearest 100', () => {
    const result = calculatePrice({
      baseRateEur: 380,
      roofCoefficient: 1.0,
      optionPrices: [50],
      widthMm: 1000,
      depthMm: 1000,
    })
    // base = 380 + 50 = 430 → rounded to 100 = 400
    expect(result.estimated % 100).toBe(0)
  })

  it('returns breakdown with 3 lines', () => {
    const result = calculatePrice({
      baseRateEur: 380,
      roofCoefficient: 1.35,
      optionPrices: [600],
      widthMm: 3000,
      depthMm: 3000,
    })
    expect(result.breakdown).toHaveLength(3)
    expect(result.breakdown[0].label).toBe('Base structure')
    expect(result.breakdown[1].label).toBe('Material')
    expect(result.breakdown[2].label).toBe('Options')
  })
})
