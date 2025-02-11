import { Metadata } from 'next'

interface PropertyFeature {
  item: string;
}

export async function generateMetadata({ searchParams }: { searchParams: { id: string } }): Promise<Metadata> {
  const id = searchParams.id;
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/properties/${id}`).then(res => res.json());
  const property = data.data[0];
  const features = property.propertyFeature as PropertyFeature[];

  return {
    title: `${property.property_Type} in ${property.property_Location} | Brick N Key`,
    description: property.property_Description.slice(0, 160),
    keywords: `${property.property_Type}, ${property.property_Location}, real estate, property, ${features.map(f => f.item).join(', ')}`,
    openGraph: {
      title: `${property.property_Type} in ${property.property_Location}`,
      description: property.property_Description.slice(0, 160),
      images: [property.property_Images[0].url],
    },
  };
}
