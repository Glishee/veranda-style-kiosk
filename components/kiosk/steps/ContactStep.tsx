'use client'

import { useEffect, useMemo, useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { useKiosk } from '@/context/KioskContext'
import { useT } from '@/hooks/useT'
import type { ContactData, Lang } from '@/lib/types'
import { calculatePricePln, getPriceEur, getPricingTable } from '@/lib/pricing'
import { storage } from '@/lib/firebase'

const PHOTO_REQUIRED = process.env.NEXT_PUBLIC_LEAD_PHOTO_REQUIRED === 'true'

const LABELS: Record<
  Lang,
  {
    width: string
    depth: string
    price: string
    noPrice: string
    currency: string
    withoutAssembly: string
    captchaTitle: string
    captchaIdle: string
    captchaDone: string
    email: string
    photo: string
    photoHint: string
    photoUploading: string
    photoUploaded: string
    errors: {
      name: string
      phone: string
      city: string
      postcode: string
      email: string
      photo: string
      captchaBlocked: string
    }
  }
> = {
  pl: {
    width: 'Szerokość konstrukcji',
    depth: 'Głębokość / wysięg',
    price: 'Cena orientacyjna',
    noPrice: 'Brak ceny dla tej konfiguracji',
    currency: 'PLN',
    withoutAssembly: 'Cena bez montażu',
    captchaTitle: 'Potwierdzenie',
    captchaIdle: 'Kliknij, aby potwierdzić',
    captchaDone: 'Potwierdzono',
    email: 'Email',
    photo: 'Zdjęcie miejsca montażu',
    photoHint: 'Dodaj zdjęcie tarasu / miejsca montażu.',
    photoUploading: 'Wysyłanie zdjęcia...',
    photoUploaded: 'Zdjęcie dodane',
    errors: {
      name: 'Wpisz imię i nazwisko bez cyfr.',
      phone: 'Wpisz 9 cyfr numeru telefonu po +48.',
      city: 'Wpisz miasto bez cyfr.',
      postcode: 'Kod pocztowy musi mieć format 00-000.',
      email: 'Wpisz poprawny adres email.',
      photo: 'Zdjęcie jest wymagane.',
      captchaBlocked: 'Uzupełnij poprawnie dane, aby potwierdzić.',
    },
  },
  en: {
    width: 'Construction width',
    depth: 'Depth / projection',
    price: 'Estimated price',
    noPrice: 'No price for this configuration',
    currency: 'PLN',
    withoutAssembly: 'Price without installation',
    captchaTitle: 'Verification',
    captchaIdle: 'Click to verify',
    captchaDone: 'Verified',
    email: 'Email',
    photo: 'Installation place photo',
    photoHint: 'Add a photo of the terrace / installation place.',
    photoUploading: 'Uploading photo...',
    photoUploaded: 'Photo added',
    errors: {
      name: 'Enter name without numbers.',
      phone: 'Enter 9 phone digits after +48.',
      city: 'Enter city without numbers.',
      postcode: 'Postcode must use format 00-000.',
      email: 'Enter a valid email address.',
      photo: 'Photo is required.',
      captchaBlocked: 'Complete the form correctly to verify.',
    },
  },
  de: {
    width: 'Konstruktionsbreite',
    depth: 'Tiefe / Ausladung',
    price: 'Ungefährer Preis',
    noPrice: 'Kein Preis für diese Konfiguration',
    currency: 'PLN',
    withoutAssembly: 'Preis ohne Montage',
    captchaTitle: 'Bestätigung',
    captchaIdle: 'Zum Bestätigen klicken',
    captchaDone: 'Bestätigt',
    email: 'E-Mail',
    photo: 'Foto des Montageortes',
    photoHint: 'Fügen Sie ein Foto der Terrasse / des Montageortes hinzu.',
    photoUploading: 'Foto wird hochgeladen...',
    photoUploaded: 'Foto hinzugefügt',
    errors: {
      name: 'Geben Sie den Namen ohne Zahlen ein.',
      phone: 'Geben Sie 9 Telefonnummer-Ziffern nach +48 ein.',
      city: 'Geben Sie die Stadt ohne Zahlen ein.',
      postcode: 'Die Postleitzahl muss das Format 00-000 haben.',
      email: 'Geben Sie eine gültige E-Mail-Adresse ein.',
      photo: 'Foto ist erforderlich.',
      captchaBlocked: 'Füllen Sie das Formular korrekt aus, um zu bestätigen.',
    },
  },
}

function isValidName(value: string) {
  return /^[A-Za-zÀ-žĄĆĘŁŃÓŚŹŻąćęłńóśźż\s'-]{2,}$/.test(value.trim())
}

function isValidCity(value: string) {
  return /^[A-Za-zÀ-žĄĆĘŁŃÓŚŹŻąćęłńóśźż\s'-]{2,}$/.test(value.trim())
}

function isValidPhone(value: string) {
  return /^\+48\d{9}$/.test(value.trim())
}

function isValidPostcode(value: string) {
  return /^\d{2}-\d{3}$/.test(value.trim())
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

function AnimatedPrice({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    let frame = 0
    const frames = 28
    const start = displayValue
    const diff = value - start

    const id = window.setInterval(() => {
      frame += 1
      const progress = Math.min(frame / frames, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setDisplayValue(Math.round(start + diff * eased))

      if (progress >= 1) window.clearInterval(id)
    }, 18)

    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <>{displayValue.toLocaleString('pl-PL')}</>
}

function SlideCaptcha({
  verified,
  label,
  doneLabel,
  disabled,
  disabledText,
  onVerify,
}: {
  verified: boolean
  label: string
  doneLabel: string
  disabled: boolean
  disabledText: string
  onVerify: () => void
}) {
  function handleClick() {
    if (verified || disabled) return
    onVerify()
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={verified}
        className={`relative w-full overflow-hidden border border-[#e5e0d8] min-h-[54px] transition-all duration-300 ${verified
          ? 'bg-[#111] text-white'
          : disabled
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-[#111] active:scale-[0.99]'
          }`}
      >
        <div
          className="absolute inset-y-0 left-0 bg-[#111] transition-all duration-500"
          style={{ width: verified ? '100%' : '0%' }}
        />

        <div className="relative z-10 flex items-center justify-between px-3">
          <span
            className={`flex h-9 w-9 items-center justify-center border text-[14px] font-extrabold transition-all duration-300 ${verified
              ? 'border-white/25 bg-white text-[#111]'
              : 'border-[#e5e0d8] bg-[#f9f7f4] text-[#111]'
              }`}
          >
            {verified ? '✓' : '→'}
          </span>

          <span
            className={`text-[9px] font-extrabold tracking-[2px] uppercase transition-all duration-300 ${verified ? 'text-white' : disabled ? 'text-gray-400' : 'text-[#111]'
              }`}
          >
            {verified ? doneLabel : label}
          </span>

          <span className={`text-[13px] transition-all duration-300 ${verified ? 'text-white/60' : 'text-gray-300'}`}>
            {verified ? '✓' : '›'}
          </span>
        </div>
      </button>

      {disabled && !verified && (
        <p className="mt-1 text-[8px] leading-relaxed text-red-500">
          {disabledText}
        </p>
      )}
    </>
  )
}

export default function ContactStep() {
  const { state, dispatch, resetTimer } = useKiosk()
  const t = useT()
  const { contact } = state
  const labels = LABELS[state.lang]

  const extendedContact = contact as ContactData & {
    email?: string
    photoUrl?: string
  }

  const emailValue = extendedContact.email ?? ''
  const photoUrl = extendedContact.photoUrl ?? ''

  const [photoName, setPhotoName] = useState('')
  const [photoUploading, setPhotoUploading] = useState(false)
  const [photoError, setPhotoError] = useState('')
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const pricingTable = useMemo(() => {
    return getPricingTable(state.productSlug)
  }, [state.productSlug])

  const [selectedWidth, setSelectedWidth] = useState<number | null>(null)
  const [selectedDepth, setSelectedDepth] = useState<number | null>(null)

  useEffect(() => {
    if (!pricingTable) {
      setSelectedWidth(null)
      setSelectedDepth(null)
      return
    }

    setSelectedWidth(pricingTable.widths[0] ?? null)
    setSelectedDepth(pricingTable.depths[0] ?? null)
  }, [state.productSlug, pricingTable])

  const selectedPriceEur =
    pricingTable && selectedWidth !== null && selectedDepth !== null
      ? getPriceEur(pricingTable, selectedWidth, selectedDepth)
      : null

  const selectedPricePln =
    selectedPriceEur !== null && selectedPriceEur !== undefined
      ? calculatePricePln(selectedPriceEur, state.productSlug)
      : null

  useEffect(() => {
    if (!selectedWidth || !selectedDepth || !selectedPricePln) return

    const photoText = photoUrl ? `; Photo URL: ${photoUrl}` : ''

    dispatch({
      type: 'SET_CONTACT',
      field: 'comment',
      value: `Width: ${selectedWidth} cm; Depth: ${selectedDepth} cm; Estimated price: ${selectedPricePln} PLN; Price without installation${photoText}`,
    })
  }, [selectedWidth, selectedDepth, selectedPricePln, photoUrl, dispatch])

  const phoneDigits = contact.phone.replace('+48', '').replace(/\D/g, '').slice(0, 9)

  const formValid =
    isValidName(contact.name) &&
    isValidPhone(contact.phone) &&
    isValidCity(contact.city) &&
    isValidPostcode(contact.postcode) &&
    isValidEmail(emailValue) &&
    (!PHOTO_REQUIRED || !!photoUrl) &&
    !photoUploading

  function markTouched(field: string) {
    setTouched((prev) => ({ ...prev, [field]: true }))
  }

  function setContactField(field: keyof ContactData, value: string) {
    dispatch({ type: 'SET_CONTACT', field, value })
  }

  function handleChange(field: keyof ContactData, value: string) {
    resetTimer()
    dispatch({ type: 'SET_CAPTCHA_VERIFIED', value: false })
    setContactField(field, value)
  }

  function handleNameChange(value: string) {
    handleChange('name', value.replace(/[0-9]/g, ''))
  }

  function handleCityChange(value: string) {
    handleChange('city', value.replace(/[0-9]/g, ''))
  }

  function handlePhoneChange(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 9)
    handleChange('phone', digits ? `+48${digits}` : '')
  }

  function handlePostcodeChange(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 5)
    const formatted = digits.length > 2 ? `${digits.slice(0, 2)}-${digits.slice(2)}` : digits
    handleChange('postcode', formatted)
  }

  function handleEmailChange(value: string) {
    resetTimer()
    dispatch({ type: 'SET_CAPTCHA_VERIFIED', value: false })
    dispatch({
      type: 'SET_CONTACT',
      field: 'email' as keyof ContactData,
      value,
    })
  }

  async function handlePhotoChange(file?: File) {
    resetTimer()
    dispatch({ type: 'SET_CAPTCHA_VERIFIED', value: false })
    markTouched('photo')
    setPhotoError('')

    if (!file) {
      setPhotoName('')
      dispatch({
        type: 'SET_CONTACT',
        field: 'photoUrl' as keyof ContactData,
        value: '',
      })
      return
    }

    if (!file.type.startsWith('image/')) {
      setPhotoName('')
      setPhotoError(labels.errors.photo)
      dispatch({
        type: 'SET_CONTACT',
        field: 'photoUrl' as keyof ContactData,
        value: '',
      })
      return
    }

    try {
      setPhotoUploading(true)
      setPhotoName(file.name)

      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_')
      const filePath = `lead-photos/${Date.now()}-${safeName}`
      const fileRef = ref(storage, filePath)

      await uploadBytes(fileRef, file)
      const url = await getDownloadURL(fileRef)

      dispatch({
        type: 'SET_CONTACT',
        field: 'photoUrl' as keyof ContactData,
        value: url,
      })
    } catch (error) {
      console.error('[photo upload] Firebase upload error:', error)
      setPhotoError(labels.errors.photo)
      setPhotoName('')
      dispatch({
        type: 'SET_CONTACT',
        field: 'photoUrl' as keyof ContactData,
        value: '',
      })
    } finally {
      setPhotoUploading(false)
    }
  }

  function handleWidthSelect(width: number) {
    resetTimer()
    setSelectedWidth(width)
    dispatch({ type: 'SET_CAPTCHA_VERIFIED', value: false })
  }

  function handleDepthSelect(depth: number) {
    resetTimer()
    setSelectedDepth(depth)
    dispatch({ type: 'SET_CAPTCHA_VERIFIED', value: false })
  }

  function handleCaptchaVerify() {
    resetTimer()
    if (!formValid) return
    dispatch({ type: 'SET_CAPTCHA_VERIFIED', value: true })
  }

  return (
    <div className="flex flex-col gap-2.5">
      <p className="text-[8px] tracking-[3px] uppercase text-gray-400 mb-1">
        {t.step4.label}
      </p>

      <div>
        <label className="block text-[7px] tracking-[2px] uppercase text-gray-400 mb-1">
          {t.step4.name} <span className="text-red-500 text-[9px]">*</span>
        </label>
        <input
          type="text"
          value={contact.name}
          onBlur={() => markTouched('name')}
          onChange={(e) => handleNameChange(e.target.value)}
          className={`block w-full bg-white border-[1.5px] h-8 px-2 text-[10px] text-[#111] focus:outline-none focus:border-[#111] ${touched.name && !isValidName(contact.name) ? 'border-red-400' : 'border-[#e5e0d8]'
            }`}
        />
        {touched.name && !isValidName(contact.name) && (
          <p className="mt-1 text-[8px] text-red-500">{labels.errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-[7px] tracking-[2px] uppercase text-gray-400 mb-1">
          {t.step4.phone} <span className="text-red-500 text-[9px]">*</span>
        </label>

        <div className="flex">
          <div className="flex h-8 items-center border-[1.5px] border-r-0 border-[#e5e0d8] bg-gray-100 px-3 text-[10px] font-bold text-[#111]">
            +48
          </div>
          <input
            type="tel"
            inputMode="numeric"
            value={phoneDigits}
            maxLength={9}
            onBlur={() => markTouched('phone')}
            onChange={(e) => handlePhoneChange(e.target.value)}
            className={`block w-full bg-white border-[1.5px] h-8 px-2 text-[10px] text-[#111] focus:outline-none focus:border-[#111] ${touched.phone && !isValidPhone(contact.phone) ? 'border-red-400' : 'border-[#e5e0d8]'
              }`}
          />
        </div>

        {touched.phone && !isValidPhone(contact.phone) && (
          <p className="mt-1 text-[8px] text-red-500">{labels.errors.phone}</p>
        )}
      </div>

      <div>
        <label className="block text-[7px] tracking-[2px] uppercase text-gray-400 mb-1">
          {labels.email} <span className="text-red-500 text-[9px]">*</span>
        </label>
        <input
          type="email"
          value={emailValue}
          onBlur={() => markTouched('email')}
          onChange={(e) => handleEmailChange(e.target.value)}
          className={`block w-full bg-white border-[1.5px] h-8 px-2 text-[10px] text-[#111] focus:outline-none focus:border-[#111] ${touched.email && !isValidEmail(emailValue) ? 'border-red-400' : 'border-[#e5e0d8]'
            }`}
        />
        {touched.email && !isValidEmail(emailValue) && (
          <p className="mt-1 text-[8px] text-red-500">{labels.errors.email}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        <div>
          <label className="block text-[7px] tracking-[2px] uppercase text-gray-400 mb-1">
            {t.step4.city} <span className="text-red-500 text-[9px]">*</span>
          </label>
          <input
            type="text"
            value={contact.city}
            onBlur={() => markTouched('city')}
            onChange={(e) => handleCityChange(e.target.value)}
            className={`block w-full bg-white border-[1.5px] h-8 px-2 text-[10px] text-[#111] focus:outline-none focus:border-[#111] ${touched.city && !isValidCity(contact.city) ? 'border-red-400' : 'border-[#e5e0d8]'
              }`}
          />
          {touched.city && !isValidCity(contact.city) && (
            <p className="mt-1 text-[8px] text-red-500">{labels.errors.city}</p>
          )}
        </div>

        <div>
          <label className="block text-[7px] tracking-[2px] uppercase text-gray-400 mb-1">
            {t.step4.postcode} <span className="text-red-500 text-[9px]">*</span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={contact.postcode}
            onBlur={() => markTouched('postcode')}
            onChange={(e) => handlePostcodeChange(e.target.value)}
            className={`block w-full bg-white border-[1.5px] h-8 px-2 text-[10px] text-[#111] focus:outline-none focus:border-[#111] ${touched.postcode && !isValidPostcode(contact.postcode) ? 'border-red-400' : 'border-[#e5e0d8]'
              }`}
          />
          {touched.postcode && !isValidPostcode(contact.postcode) && (
            <p className="mt-1 text-[8px] text-red-500">{labels.errors.postcode}</p>
          )}
        </div>
      </div>

      {PHOTO_REQUIRED && (
        <div>
          <label className="block text-[7px] tracking-[2px] uppercase text-gray-400 mb-1">
            {labels.photo} <span className="text-red-500 text-[9px]">*</span>
          </label>

          <label
            className={`flex min-h-[42px] cursor-pointer items-center justify-between border-[1.5px] bg-white px-3 text-[9px] font-bold tracking-[1px] uppercase transition-all active:scale-[0.98] ${(touched.photo && !photoUrl) || photoError
              ? 'border-red-400 text-red-500'
              : photoUrl
                ? 'border-[#111] text-[#111]'
                : 'border-[#e5e0d8] text-[#111]'
              }`}
          >
            <span className="truncate">
              {photoUploading
                ? labels.photoUploading
                : photoUrl
                  ? `${labels.photoUploaded}: ${photoName}`
                  : photoName || labels.photoHint}
            </span>

            <span className="ml-3 text-[14px]">
              {photoUploading ? '...' : photoUrl ? '✓' : '+'}
            </span>

            <input
              type="file"
              accept="image/*"
              className="hidden"
              disabled={photoUploading}
              onChange={(e) => handlePhotoChange(e.target.files?.[0])}
            />
          </label>

          {((touched.photo && !photoUrl) || photoError) && (
            <p className="mt-1 text-[8px] text-red-500">
              {photoError || labels.errors.photo}
            </p>
          )}
        </div>
      )}

      {pricingTable && (
        <div className="mt-2 flex flex-col gap-3">
          <div>
            <p className="block text-[7px] tracking-[2px] uppercase text-gray-400 mb-2">
              {labels.width}
            </p>

            <div className="grid grid-cols-3 gap-2">
              {pricingTable.widths.map((width) => {
                const active = selectedWidth === width

                return (
                  <button
                    key={width}
                    type="button"
                    onClick={() => handleWidthSelect(width)}
                    className={`border-[1.5px] px-2 py-3 text-center transition-all duration-150 active:scale-[0.97] ${active
                      ? 'bg-[#111] border-[#111] text-white'
                      : 'bg-white border-[#e5e0d8] text-[#111]'
                      }`}
                  >
                    <span className="block text-[9px] font-extrabold tracking-[1px]">
                      {width} cm
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <p className="block text-[7px] tracking-[2px] uppercase text-gray-400 mb-2">
              {labels.depth}
            </p>

            <div className="grid grid-cols-3 gap-2">
              {pricingTable.depths.map((depth) => {
                const active = selectedDepth === depth

                return (
                  <button
                    key={depth}
                    type="button"
                    onClick={() => handleDepthSelect(depth)}
                    className={`border-[1.5px] px-2 py-3 text-center transition-all duration-150 active:scale-[0.97] ${active
                      ? 'bg-[#111] border-[#111] text-white'
                      : 'bg-white border-[#e5e0d8] text-[#111]'
                      }`}
                  >
                    <span className="block text-[9px] font-extrabold tracking-[1px]">
                      {depth} cm
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="border border-[#e5e0d8] bg-white p-4">
            <p className="text-[7px] tracking-[2px] uppercase text-gray-400">
              {labels.price}
            </p>

            {selectedPricePln ? (
              <>
                <p className="mt-1 text-xl font-extrabold tracking-wide text-[#111]">
                  ≈ <AnimatedPrice value={selectedPricePln} /> {labels.currency}
                </p>
                <p className="mt-1 text-[8px] tracking-[1.5px] uppercase text-gray-400">
                  {labels.withoutAssembly}
                </p>
              </>
            ) : (
              <p className="mt-1 text-[10px] text-gray-400">
                {labels.noPrice}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="mt-2">
        <p className="text-[7px] tracking-[2px] uppercase text-gray-400 mb-2">
          {labels.captchaTitle}
        </p>

        <SlideCaptcha
          verified={state.captchaVerified}
          label={labels.captchaIdle}
          doneLabel={labels.captchaDone}
          disabled={!formValid}
          disabledText={labels.errors.captchaBlocked}
          onVerify={handleCaptchaVerify}
        />
      </div>
    </div>
  )
}