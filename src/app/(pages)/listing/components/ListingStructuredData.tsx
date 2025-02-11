interface Property {
  id: number;
  property_price: string;
  property_Location: string;
  property_Type: string;
  property_Images: Array<{ url: string }>;
}

export default function ListingStructuredData({ properties }: { properties: Property[] }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": properties.map((property, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "RealEstateListing",
        "name": `${property.property_Type} in ${property.property_Location}`,
        "price": property.property_price,
        "address": {
          "@type": "PostalAddress",
          "addressLocality": property.property_Location
        },
        "url": `${process.env.NEXT_PUBLIC_SITE_URL}/detail?id=${property.id}`
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
