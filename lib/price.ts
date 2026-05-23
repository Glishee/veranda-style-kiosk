export interface PriceInput {
  baseRateEur: number
  roofCoefficient: number
  optionPrices: number[]
  widthMm: number
  depthMm: number
}

export interface PriceResult {
  estimated: number
  rangeLow: number
  rangeHigh: number
  breakdown: { label: string; amount: number }[]
}

export function calculatePrice(input: PriceInput): PriceResult {
  const { baseRateEur, roofCoefficient, optionPrices, widthMm, depthMm } = input
  const areaSqm = (widthMm / 1000) * (depthMm / 1000)
  const basePrice = areaSqm * baseRateEur
  const materialAdj = basePrice * (roofCoefficient - 1.0)
  const optionsTotal = optionPrices.reduce((sum, p) => sum + p, 0)
  const raw = basePrice + materialAdj + optionsTotal
  const estimated = Math.round(raw / 100) * 100

  return {
    estimated,
    rangeLow: Math.round(estimated * 0.85 / 100) * 100,
    rangeHigh: Math.round(estimated * 1.25 / 100) * 100,
    breakdown: [
      { label: 'Base structure', amount: Math.round(basePrice) },
      { label: 'Material', amount: Math.round(materialAdj) },
      { label: 'Options', amount: Math.round(optionsTotal) },
    ],
  }
}
