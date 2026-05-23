'use client'
import { useKiosk } from '@/context/KioskContext'

const PRODUCT_SVGS: Record<string, React.ReactNode> = {
  canopy: (
    <svg viewBox="0 0 400 260" fill="none" className="w-3/4 opacity-90">
      <rect x="0" y="220" width="400" height="3" fill="#1a2535"/>
      <rect x="40" y="95" width="8" height="128" fill="#243040" rx="1"/>
      <rect x="352" y="95" width="8" height="128" fill="#243040" rx="1"/>
      <polygon points="10,95 200,30 390,95" fill="#1e3550" opacity="0.95"/>
      <line x1="10" y1="95" x2="390" y2="95" stroke="#3a6080" strokeWidth="2"/>
      <rect x="10" y="93" width="380" height="7" fill="#2a4a65" rx="1"/>
      <rect x="50" y="100" width="140" height="118" fill="#1a3050" opacity="0.4"/>
      <rect x="210" y="100" width="140" height="118" fill="#1a3050" opacity="0.4"/>
      <rect x="10" y="100" width="380" height="2" fill="#4a9abf" opacity="0.6"/>
    </svg>
  ),
  'winter-garden': (
    <svg viewBox="0 0 400 260" fill="none" className="w-3/4 opacity-90">
      <rect x="60" y="60" width="280" height="160" fill="#1a2a3a" opacity="0.8"/>
      <polygon points="60,60 200,10 340,60" fill="#1e3550"/>
      <rect x="60" y="60" width="280" height="5" fill="#2a4a65"/>
      <rect x="60" y="60" width="3" height="160" fill="#243040"/>
      <rect x="337" y="60" width="3" height="160" fill="#243040"/>
      <rect x="60" y="217" width="280" height="3" fill="#1a2535"/>
      <rect x="100" y="100" width="60" height="120" fill="#2a4a60" opacity="0.5"/>
      <rect x="240" y="100" width="60" height="120" fill="#2a4a60" opacity="0.5"/>
      <rect x="160" y="60" width="80" height="160" fill="#2a4060" opacity="0.3"/>
    </svg>
  ),
  pergola: (
    <svg viewBox="0 0 400 260" fill="none" className="w-3/4 opacity-90">
      <rect x="40" y="95" width="8" height="125" fill="#243040" rx="1"/>
      <rect x="352" y="95" width="8" height="125" fill="#243040" rx="1"/>
      <rect x="10" y="88" width="380" height="8" fill="#2a4a65" rx="1"/>
      {[0,1,2,3,4,5,6].map(i => (
        <rect key={i} x={20 + i*55} y={88} width="12" height="30" fill="#1e3550" rx="1"/>
      ))}
      <rect x="0" y="220" width="400" height="3" fill="#1a2535"/>
    </svg>
  ),
  sliding: (
    <svg viewBox="0 0 400 260" fill="none" className="w-3/4 opacity-90">
      <rect x="30" y="40" width="340" height="180" fill="#0a1520" opacity="0.7"/>
      <rect x="30" y="40" width="3" height="180" fill="#2a4060"/>
      <rect x="367" y="40" width="3" height="180" fill="#2a4060"/>
      <rect x="30" y="40" width="340" height="3" fill="#2a4060"/>
      <rect x="30" y="217" width="340" height="3" fill="#2a4060"/>
      <rect x="115" y="40" width="3" height="180" fill="#2a4060" opacity="0.6"/>
      <rect x="200" y="40" width="3" height="180" fill="#2a4060" opacity="0.6"/>
      <rect x="285" y="40" width="3" height="180" fill="#2a4060" opacity="0.6"/>
      <rect x="60" y="120" width="80" height="4" fill="#4a7090" opacity="0.8"/>
    </svg>
  ),
  'zip-screen': (
    <svg viewBox="0 0 400 260" fill="none" className="w-3/4 opacity-90">
      <rect x="80" y="20" width="240" height="10" fill="#2a4060" rx="2"/>
      <rect x="80" y="30" width="10" height="200" fill="#243040"/>
      <rect x="310" y="30" width="10" height="200" fill="#243040"/>
      {[0,1,2,3,4,5,6,7,8,9].map(i => (
        <rect key={i} x={90} y={30 + i*18} width={220} height={15} fill="#1e3550" opacity={0.6 + i*0.02} rx="1"/>
      ))}
    </svg>
  ),
  carport: (
    <svg viewBox="0 0 400 260" fill="none" className="w-3/4 opacity-90">
      <rect x="0" y="220" width="400" height="3" fill="#1a2535"/>
      <rect x="40" y="90" width="10" height="133" fill="#243040" rx="1"/>
      <rect x="350" y="90" width="10" height="133" fill="#243040" rx="1"/>
      <rect x="10" y="82" width="380" height="12" fill="#2a4a65" rx="1"/>
      <polygon points="0,82 200,30 400,82" fill="#1a2e45" opacity="0.9"/>
      <rect x="80" y="155" width="240" height="50" fill="#0d1520" opacity="0.5" rx="2"/>
      <rect x="100" y="163" width="60" height="30" fill="#1a2535" rx="1"/>
      <rect x="240" y="163" width="60" height="30" fill="#1a2535" rx="1"/>
    </svg>
  ),
}

const DEFAULT_SVG = PRODUCT_SVGS['canopy']

export function LeftPanel() {
  const { state } = useKiosk()
  const slug = state.productSlug ?? 'canopy'
  const svg = PRODUCT_SVGS[slug] ?? DEFAULT_SVG

  return (
    <div className="relative w-[58%] h-full bg-[#080c12] flex flex-col justify-end overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a2535] via-[#0d1520] to-[#050505]" />
      <div className="absolute inset-0 flex items-center justify-center">
        {svg}
      </div>
      <div className="relative z-10 p-8 bg-gradient-to-t from-black/90 to-transparent">
        <p className="text-xs tracking-[3px] text-white/40 uppercase mb-1">Configuring</p>
        <h2 className="text-2xl font-bold text-white tracking-wide transition-all duration-300">
          {state.productSlug ? 'Selected Product' : 'Veranda Style'}
        </h2>
        <p className="text-sm text-white/30 mt-1">Premium Outdoor Structures</p>
      </div>
    </div>
  )
}
