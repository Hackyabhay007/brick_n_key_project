/* eslint-disable */


import { Metadata } from 'next';
import { seoData } from '@/app/seoMetadata';

type SearchParams = {
  [key: string]: string | string[] ;
};

type Props = {
  params: { [key: string]: string  };
  searchParams: SearchParams;
};

export async function generateMetadata(
  { searchParams }: Props,
): Promise<Metadata> {
  // Convert searchParams to boolean/string safely
  const isLuxury = searchParams?.isLuxury === 'true';
  const location = Array.isArray(searchParams?.property_Location)
    ? searchParams.property_Location[0]
    : searchParams?.property_Location || '';

  const locationString = location ? ` in ${location}` : '';
  const titlePrefix = isLuxury ? 'Luxury Properties' : 'Property Listings';
  
  return {
    ...seoData.default,
    title: `${titlePrefix}${locationString} | Brick N Key`,
    description: isLuxury 
      ? `Discover our exclusive collection of luxury properties${locationString}. Premium real estate listings by Brick N Key.`
      : seoData.default.description,
  };
}

export default function ListingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
