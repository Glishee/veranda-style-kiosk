'use client'

interface LeftPanelProps {
  imageUrl: string | null
  label: string
  sublabel?: string
}

export default function LeftPanel({ imageUrl, label, sublabel }: LeftPanelProps) {
  return (
    <div className="relative w-[58%] flex-shrink-0 flex flex-col justify-end overflow-hidden bg-[#080c12]">
      {imageUrl ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
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
      {/* Dark gradient overlay on bottom half */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/85 to-transparent" />
      {/* Text content */}
      <div className="relative z-10 p-6">
        <p className="text-[8px] tracking-[3px] uppercase text-white/40 mb-1">
          {sublabel ?? 'Veranda Style'}
        </p>
        <h2 className="text-xl font-extrabold tracking-wide text-white leading-tight">
          {label}
        </h2>
        <p className="text-[10px] text-white/35 tracking-wide mt-1">
          Premium Outdoor Structures · Poland
        </p>
      </div>
    </div>
  )
}
