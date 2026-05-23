import { KioskProvider } from '@/context/KioskContext'

export default function KioskLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen overflow-hidden flex bg-black select-none touch-none">
      <KioskProvider>{children}</KioskProvider>
    </div>
  )
}
