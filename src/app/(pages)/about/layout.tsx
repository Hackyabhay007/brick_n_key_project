import { Metadata } from 'next';
import { seoData } from '@/app/seoMetadata';

export const metadata: Metadata = seoData.about;

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>;
}
