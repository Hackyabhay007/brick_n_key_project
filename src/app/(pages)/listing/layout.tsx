import { Metadata } from 'next'
import { seoData } from '@/app/seoMetadata'

type Props = {
    params: { [key: string]: string | string[] | undefined }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const isLuxury = searchParams?.isLuxury ?? false;
    const location = searchParams?.property_Location ?? '';
    
    return {
        ...seoData.listing,
        title: `${isLuxury ? 'Luxury Properties' : 'Property Listings'} ${location ? `in ${String(location)}` : ''} | Brick N Key`,
        description: isLuxury 
            ? `Discover our exclusive collection of luxury properties${location ? ` in ${String(location)}` : ''}. Premium real estate listings by Brick N Key.`
            : seoData.listing.description,
    };
}

export default function ListingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children;
}
