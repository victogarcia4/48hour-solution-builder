import type { Metadata } from 'next'
import { Space_Grotesk, Inter } from 'next/font/google'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: '48-Hour Solution Builder | Your Finished Solution in Less Than 48 Hours',
  description: 'Disruptive web design studio. Affordable websites, ecommerce stores, and custom web apps built from a guided funnel and delivered in less than 48 hours.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}

