import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Providers } from '@/providers'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { ReactNode, Suspense } from 'react'
import { Toaster } from '@/components/ui/toaster'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'GMFB E-Directory APP',
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
    <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-50`}>
    <NuqsAdapter>
      <Providers>
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Providers>
      <Toaster  />
    </NuqsAdapter>
    </body>
    </html>
  )
}
