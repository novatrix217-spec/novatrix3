import type { Metadata } from 'next'
import { DM_Sans, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { ViewTransitionRouter } from '@/components/layout/ViewTransitionRouter'
import { ExperienceLayer } from '@/components/experience/ExperienceLayer'
import { siteConfig } from '@/lib/content/site'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Agence IA & automatisation`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Agence IA & automatisation`,
    description: siteConfig.description,
    images: ['/brand/novatrix-mark.png'],
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="flex min-h-screen flex-col antialiased">
        <ExperienceLayer />
        <ViewTransitionRouter />
        <Header />
        <main id="main-content" tabIndex={-1} className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
