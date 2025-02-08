import { Metadata } from 'next';
import { seoData } from '@/app/seoMetadata';

export const metadata: Metadata = seoData.contact;

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children;
}
