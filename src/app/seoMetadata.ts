import { Metadata } from 'next'

export const seoData = {
    default: {
        title: 'Brick N Key',
        description: 'Find your perfect property with Brick N Key',
        themeColor: '#ED371C',
        icons: {
            icon: [
                { url: '/images/favicon.ico', sizes: 'any' },
                { url: '/images/favicon.png', type: 'image/png' }
            ],
            apple: '/images/apple-touch-icon.png',
        },
        manifest: '/manifest.json',
        applicationName: 'Brick N Key',
        authors: [{ name: 'Brick N Key' }],
        viewport: 'width=device-width, initial-scale=1',
        robots: 'index, follow',
        verification: {
            google: 'your-verification-code',
        },
        alternates: {
            canonical: 'https://www.bricknkey.com',
        },
    },
    detail: {
        title: 'Property Details | Brick N Key',
        description: 'View detailed information about properties listed on Brick N Key',
        openGraph: {
            type: 'website',
            images: [{ url: '/images/default-property.jpg' }],
        }
    }
} satisfies Record<string, Metadata>
