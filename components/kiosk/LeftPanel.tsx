'use client'

import { useState, useEffect } from 'react'

interface LeftPanelProps {
  imageUrls: string[]
  label: string
  sublabel?: string
}

const SLIDE_INTERVAL_MS = 3000

const IMAGE_BG_POSITIONS: Record<string, string> = {
  '/products/image1.png': 'center 35%',
  '/products/image2.png': 'center 38%',
  '/products/image4.png': 'center 42%',
  '/products/image5.png': 'center 38%',
  '/products/image6.png': 'center 38%',
  '/products/image7.png': 'center 40%',
  '/products/image8.png': 'center 38%',
  '/products/image9.png': 'center 38%',
}

export default function LeftPanel({ imageUrls, label, sublabel }: LeftPanelProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    setCurrentIndex(0)
  }, [imageUrls])

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
            className="absolute inset-0 bg-cover transition-opacity duration-700"
            style={{
              backgroundImage: `url(${url})`,
              backgroundPosition: IMAGE_BG_POSITIONS[url] ?? 'center',
              opacity: i === currentIndex ? 1 : 0,
            }}
          />
        ))
      ) : (
        <div className="absolute inset-0 overflow-hidden bg-gradient-to-br from-[#07101a] via-[#10284a] to-[#040404]">
          <div className="absolute inset-0 opacity-[0.07]">
            <div className="absolute top-[18%] left-[8%] w-[260px] h-px bg-white" />
            <div className="absolute top-[43%] left-[5%] w-[360px] h-px bg-white" />
            <div className="absolute top-[72%] left-[8%] w-[320px] h-px bg-white" />

            <div className="absolute left-[18%] top-[12%] h-[220px] w-px bg-white" />
            <div className="absolute left-[50%] top-[10%] h-[260px] w-px bg-white" />
            <div className="absolute left-[76%] top-[12%] h-[220px] w-px bg-white" />
          </div>

          <div className="absolute left-1/2 top-1/2 w-[360px] md:w-[500px] h-[360px] md:h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1d4d8d] opacity-[0.10] blur-3xl" />

          <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-5 md:px-8">
            <div className="w-full max-w-md">
              <p className="hidden md:block text-[11px] md:text-[12px] tracking-[5px] uppercase text-white/40 mb-3">
                Veranda Styl
              </p>

              <h2 className="text-2xl md:text-5xl font-light text-white tracking-[5px] md:tracking-[6px]">
                PREMIUM
              </h2>

              <h3 className="text-[12px] md:text-xl text-white/60 tracking-[4px] uppercase mt-2">
                Outdoor Structures
              </h3>

              <div className="w-full h-px bg-white/10 my-5 md:my-8" />

              <div className="grid grid-cols-3 gap-2 md:gap-4">
                <div>
                  <div className="text-xl md:text-4xl font-bold text-white">
                    25+
                  </div>
                  <div className="text-[7px] md:text-[10px] tracking-[2px] uppercase text-white/40 mt-1">
                    Years
                  </div>
                </div>

                <div>
                  <div className="text-xl md:text-4xl font-bold text-white">
                    5000+
                  </div>
                  <div className="text-[7px] md:text-[10px] tracking-[2px] uppercase text-white/40 mt-1">
                    Projects
                  </div>
                </div>

                <div>
                  <div className="text-xl md:text-4xl font-bold text-white">
                    EU
                  </div>
                  <div className="text-[7px] md:text-[10px] tracking-[2px] uppercase text-white/40 mt-1">
                    Quality
                  </div>
                </div>
              </div>

              <div className="hidden md:block w-full h-px bg-white/10 my-8" />

              <div className="hidden md:flex flex-wrap justify-center gap-2 text-[9px] md:text-[10px] uppercase tracking-[2px] text-white/50">
                <span>VS Solid</span>
                <span>•</span>
                <span>VS Bold</span>
                <span>•</span>
                <span>VS Cube</span>
                <span>•</span>
                <span>VS Prime</span>
                <span>•</span>
                <span>VS Dynamic</span>
                <span>•</span>
                <span>VS Advanced</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {hasImages && (
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/85 to-transparent" />
      )}

      {hasImages && (
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
                    backgroundColor:
                      i === currentIndex
                        ? 'rgba(255,255,255,0.95)'
                        : 'rgba(255,255,255,0.3)',
                    transform: i === currentIndex ? 'scale(1.2)' : 'scale(1)',
                  }}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}