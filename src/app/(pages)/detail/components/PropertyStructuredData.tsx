import { giveCorrectImage } from "@/app/data";

interface PropertyData {
  id: number;
  property_price: string;
  property_Location: string;
  property_Type: string;
  property_Description: string;
  property_Images: Array<{ url: string }>;
  propertyFeature: Array<{ item: string }>;
}

export default function PropertyStructuredData({ data }: { data: PropertyData }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "name": `${data.property_Type} in ${data.property_Location}`,
    "description": data.property_Description,
    "price": data.property_price,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": data.property_Location
    },
    "image": data.property_Images.map(img => giveCorrectImage(img.url)),
    "amenityFeature": data.propertyFeature.map(feature => ({
      "@type": "PropertyValue",
      "name": feature.item
    })),
    "url": `${process.env.NEXT_PUBLIC_SITE_URL}/detail?id=${data.id}`
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
