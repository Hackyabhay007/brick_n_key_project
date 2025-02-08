import { Metadata } from 'next';
import { seoData } from '@/app/seoMetadata';

export const metadata: Metadata = seoData.map;

export default function MapLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children;
}
