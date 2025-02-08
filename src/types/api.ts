export interface BaseStrapiResponse<T> {
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

export interface PeopleTrustUsAttributes extends BaseAttributes {
  title: string;
  description: string;
  image: {
    data: {
      id: number;
      attributes: {
        url: string;
        formats: Record<string, unknown>;
      };
    };
  };
}

export interface PopularAttributes extends BaseAttributes {
  title: string;
  description: string;
  property_features: string[];
}

export interface UnlockSectionAttributes extends BaseAttributes {
  title: string;
  description: string;
}

export interface WhyChooseUsAttributes extends BaseAttributes {
  title: string;
  description: string;
  features: string[];
}
