export type Lang = 'en' | 'pl' | 'de'

export interface CategoryRow {
  id: string
  slug: string
  order: number
  translations: Record<Lang, { name: string }>
  products: ProductRow[]
}

export interface ProductRow {
  id: string
  slug: string
  order: number
  categoryId: string
  translations: Record<Lang, { name: string; description: string }>
  imageUrl: string
}

export interface ContactData {
  name: string
  phone: string
  city: string
  postcode: string
  comment: string
}

export interface ConfiguratorState {
  step: number
  lang: Lang
  categorySlug: string | null
  productSlug: string | null
  contact: ContactData
  captchaVerified: boolean
}

export type ConfiguratorAction =
  | { type: 'SET_LANG'; lang: Lang }
  | { type: 'START' }
  | { type: 'SET_CATEGORY'; slug: string }
  | { type: 'SET_PRODUCT'; slug: string }
  | { type: 'SET_CONTACT'; field: keyof ContactData; value: string }
  | { type: 'SET_CAPTCHA_VERIFIED'; value: boolean }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'RESET' }

export interface LeadRequest {
  categorySlug: string
  productSlug: string
  name: string
  phone: string
  city: string
  postcode: string
  comment?: string
  lang: Lang
}