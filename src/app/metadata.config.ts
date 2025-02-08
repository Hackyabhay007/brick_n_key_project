import { Metadata } from 'next';
import { seoData } from './seoMetadata';

export const metadata: Metadata = {
    ...seoData.default,
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
    },
    robots: {
        index: true,
        follow: true,
    },
};
