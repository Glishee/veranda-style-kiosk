export type Lang = 'en' | 'pl' | 'de'

export interface ProductTranslation {
  name: string
  description: string
}

export interface ProductRow {
  id: string
  slug: string
  order: number
  translations: Record<Lang, ProductTranslation>
  videoUrl: string | null
  imageUrl: string | null
  baseRateEur: number
  structures: StructureRow[]
  roofMaterials: RoofMaterialRow[]
  options: OptionRow[]
}

export interface StructureRow {
  id: string
  slug: string
  translations: Record<Lang, { label: string; description: string }>
}

export interface RoofMaterialRow {
  id: string
  slug: string
  coefficient: number
  translations: Record<Lang, { label: string; description: string }>
}

export interface OptionRow {
  id: string
  slug: string
  priceEur: number
  translations: Record<Lang, { label: string }>
}

export interface ConfiguratorState {
  step: number            // 1–7; 0 = splash
  lang: Lang
  productSlug: string | null
  structureSlug: string | null
  roofSlug: string | null
  selectedOptions: string[]   // option slugs
  widthMm: number | null
  depthMm: number | null
  heightMm: number | null
  estimatedEur: number | null
  contact: ContactData
}

export interface ContactData {
  name: string
  phone: string
  email: string
  city: string
  postcode: string
  comment: string
}

export type ConfiguratorAction =
  | { type: 'SET_LANG'; lang: Lang }
  | { type: 'START' }
  | { type: 'SET_PRODUCT'; slug: string }
  | { type: 'SET_STRUCTURE'; slug: string }
  | { type: 'SET_ROOF'; slug: string }
  | { type: 'TOGGLE_OPTION'; slug: string }
  | { type: 'SET_DIMENSION'; field: 'widthMm' | 'depthMm' | 'heightMm'; value: number }
  | { type: 'SET_ESTIMATED'; price: number }
  | { type: 'SET_CONTACT'; field: keyof ContactData; value: string }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'RESET' }

export interface PriceRequest {
  productSlug: string
  roofSlug: string
  selectedOptions: string[]
  widthMm: number
  depthMm: number
}

export interface PriceResponse {
  estimated: number
  rangeLow: number
  rangeHigh: number
  breakdown: { label: string; amount: number }[]
}

export interface LeadRequest {
  productSlug: string
  structureSlug: string
  roofSlug: string
  selectedOptions: string[]
  widthMm: number
  depthMm: number
  heightMm: number
  estimatedEur: number
  name: string
  phone: string
  email?: string
  city: string
  postcode: string
  comment?: string
  lang: Lang
}
