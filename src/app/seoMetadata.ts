/* eslint-disable */
import type { Metadata } from 'next';

const defaultSeo: Metadata = {
    title: 'Brick N Key',
    description: 'Find your perfect property with Brick N Key',
    themeColor: '#ED371C',
    icons: {
        icon: [
            { url: '/images/favicon.ico' },
            { url: '/images/favicon.png', type: 'image/png' }
        ],
        apple: '/images/apple-touch-icon.png',
    },
    applicationName: 'Brick N Key',
    authors: [{ name: 'Brick N Key' }],
    robots: 'index, follow',
    viewport: 'width=device-width, initial-scale=1',
    verification: {
        google: 'your-verification-code',
    },
    alternates: {
        canonical: 'https://www.bricknkey.com',
    },
};

export const seoData = {
    default: defaultSeo,
    detail: {
        ...defaultSeo,
        title: 'Property Details | Brick N Key',
        description: 'View detailed information about properties listed on Brick N Key',
        openGraph: {
            type: 'website',
            images: [{ url: '/images/default-property.jpg' }],
        }
    },
    contact: {
        ...defaultSeo,
        title: 'Contact Us | Brick N Key',
        description: 'Contact Brick N Key for any queries or support',
    },
    listing: {
        ...defaultSeo,
        title: 'Property Listings | Brick N Key',
        description: 'Explore our curated collection of properties',
    }
} as const;

export type SeoDataType = typeof seoData;
