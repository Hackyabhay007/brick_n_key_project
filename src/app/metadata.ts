import { Metadata } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Brick N Key - Real Estate Solutions',
    template: '%s | Brick N Key'
  },
  description: 'Find your dream property with Brick N Key. We offer a wide range of residential and commercial properties.',
  keywords: ['real estate', 'property', 'homes', 'apartments', 'real estate agency'],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/images/Nav_logo.png', type: 'image/png' },
    ],
  },
  openGraph: {
    title: 'Brick N Key - Real Estate Solutions',
    description: 'Find your dream property with Brick N Key.',
    images: ['/images/Nav_logo.png'],
    type: 'website',
    siteName: 'Brick N Key',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brick N Key - Real Estate Solutions',
    description: 'Find your dream property with Brick N Key.',
    images: ['/images/Nav_logo.png'],
  },
}
