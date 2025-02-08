// Base response and common interfaces
export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface BaseAttributes {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface BaseStrapiAttributes extends BaseAttributes {
  title: string;
  description: string;
}

// Images
export interface StrapiImage {
  id: number;
  attributes: {
    url: string;
    formats: Record<string, unknown>;
  };
}

// Property-specific types
export interface PropertyAttributes extends BaseStrapiAttributes {
  property_Type: string;
  property_price: number;
  property_Location: string;
  property_Construction_status: string;
  property_Bedroom: string;
  isLuxury: boolean;
  images?: {
    data: StrapiImage[];
  };
}

// Base state interface for slices
export interface BaseState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// Section-specific attributes
export interface PeopleTrustAttributes extends BaseStrapiAttributes {
  image: {
    data: StrapiImage;
  };
}

export interface PopularAttributes extends BaseStrapiAttributes {
  property_features: string[];
}

export interface WhyChooseUsAttributes extends BaseStrapiAttributes {
  features: string[];
}
