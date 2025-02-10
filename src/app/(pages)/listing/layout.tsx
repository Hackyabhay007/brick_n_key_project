/* eslint-disable */

import type { Metadata } from 'next';
import { seoData } from '@/app/seoMetadata';

type SearchParams = {
  isLuxury?: string;
  property_Location?: string;
  [key: string]: string | string[] | undefined;
};

type GenerateMetadataProps = {
  params: Record<string, string | undefined>;
  searchParams: SearchParams;
};

export async function generateMetadata({
  params,
  searchParams,
}: GenerateMetadataProps): Promise<Metadata> {
  const isLuxury = searchParams?.isLuxury === 'true';
  const location = Array.isArray(searchParams?.property_Location)
    ? searchParams.property_Location[0]
    : searchParams?.property_Location || '';

  const locationString = location ? ` in ${location}` : '';
  const title = `${isLuxury ? 'Luxury Properties' : 'Property Listings'}${locationString} | Brick N Key`;
  
  return {
    ...seoData.default,
    title,
    description: isLuxury 
      ? `Discover our exclusive collection of luxury properties${locationString}. Premium real estate listings by Brick N Key.`
      : seoData.default.description,
    openGraph: {
      ...seoData.default.openGraph,
      title,
    },
  };
}

type LayoutProps = {
  children: React.ReactNode;
};

export default function ListingLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
