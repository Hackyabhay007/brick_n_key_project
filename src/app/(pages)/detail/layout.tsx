import { Metadata } from 'next'
import { seoData } from '@/app/seoMetadata'
import { getPropertyData } from '@/app/lib/getPropertyData'

type Props = {
    params: { [key: string]: string | string[] | undefined }
    searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
    const id = searchParams?.id ?? '';
    
    if (!id) {
        return seoData.detail;
    }

    try {
        const propertyData = await getPropertyData(String(id));
        
        return {
            ...seoData.detail,
            title: `${propertyData?.title || 'Property Details'} | Brick N Key`,
            description: propertyData?.description || seoData.detail.description,
            openGraph: {
                images: [propertyData?.property_Images?.[0]?.url || seoData.detail.ogImage],
            }
        };
    } catch (error) {
        return seoData.detail;
    }
}

export default function DetailLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return children;
}
