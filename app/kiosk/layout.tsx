'use client'
import { KioskProvider } from '@/context/KioskContext'

export default function KioskLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen overflow-x-hidden md:h-screen md:overflow-hidden select-none touch-pan-y md:touch-none bg-[#f9f7f4]">
      <KioskProvider>{children}</KioskProvider>
    </div>
  )
}
