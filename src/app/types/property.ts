export interface PropertyImage {
  url: string;
  id: number;
}

export interface PropertyFeature {
  item: string;
  id: number;
}

export interface Property {
  id: number;
  property_price: string;
  property_Location: string;
  property_Type: string;
  property_Description: string;
  property_Images: PropertyImage[];
  propertyFeature: PropertyFeature[];
  per_sqm_price?: string;
}

export interface PropertyFilters {
  isNew?: boolean;
  priceRange?: {
    min: number;
    max: number;
  };
  property_Location?: string;
  property_Bedroom?: string;
  property_Construction_status?: string;
  isLuxury?: boolean;
  page?: number;
  pageSize?: number;
}
