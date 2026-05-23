import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Veranda Style',
  description: 'Premium Outdoor Structures',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-black">{children}</body>
    </html>
  )
}
