'use client'
import { useState, useEffect } from 'react'

interface LeftPanelProps {
  imageUrls: string[]
  label: string
  sublabel?: string
}

const SLIDE_INTERVAL_MS = 3000

export default function LeftPanel({ imageUrls, label, sublabel }: LeftPanelProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => { setCurrentIndex(0) }, [imageUrls])

  useEffect(() => {
    if (imageUrls.length <= 1) return
    const id = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % imageUrls.length)
    }, SLIDE_INTERVAL_MS)
    return () => clearInterval(id)
  }, [imageUrls.length])

  const hasImages = imageUrls.length > 0

  return (
    <div className="relative w-full h-56 md:h-full md:w-[58%] md:flex-shrink-0 flex flex-col justify-end overflow-hidden bg-[#080c12]">

      {hasImages ? (
        imageUrls.map((url, i) => (
          <div
            key={url}
            className="absolute inset-0 bg-cover bg-top md:bg-center transition-opacity duration-700"
            style={{
              backgroundImage: `url(${url})`,
              opacity: i === currentIndex ? 1 : 0,
            }}
          />
        ))
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a2a] via-[#1a3050] to-[#0d1a28]">
          <div className="absolute inset-0 flex items-center justify-center opacity-15">
            <svg viewBox="0 0 200 140" width="280" fill="none">
              <polygon points="5,65 100,20 195,65" fill="#4a9abf" opacity="0.6" />
              <rect x="15" y="65" width="6" height="65" fill="#4a9abf" opacity="0.5" />
              <rect x="179" y="65" width="6" height="65" fill="#4a9abf" opacity="0.5" />
              <rect x="5" y="62" width="190" height="6" fill="#4a9abf" opacity="0.4" />
            </svg>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/85 to-transparent" />

      <div className="relative z-10 p-4 md:p-6">
        {sublabel && (
          <p className="hidden md:block text-[8px] tracking-[3px] uppercase text-white/40 mb-1">
            {sublabel}
          </p>
        )}
        <h2 className="text-sm md:text-xl font-extrabold tracking-wide text-white leading-tight">
          {label}
        </h2>
        <p className="hidden md:block text-[10px] text-white/35 tracking-wide mt-1">
          Premium Outdoor Structures · Poland
        </p>

        {imageUrls.length > 1 && (
          <div className="flex items-center gap-1.5 mt-2 md:mt-3">
            {imageUrls.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-500"
                style={{
                  width: '7px',
                  height: '7px',
                  backgroundColor: i === currentIndex
                    ? 'rgba(255,255,255,0.95)'
                    : 'rgba(255,255,255,0.3)',
                  transform: i === currentIndex ? 'scale(1.2)' : 'scale(1)',
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
