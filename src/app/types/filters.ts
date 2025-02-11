export interface PriceRange {
    min: number;
    max: number;
}

export interface PropertyFilters {
    isNew?: boolean;
    minPrice?: number;
    maxPrice?: number;
    priceRange?: PriceRange;
    property_Location?: string;
    property_Bedroom?: string;
    property_Construction_status?: string;
    isLuxury?: boolean;
    page?: number;
    pageSize?: number;
    property_Type?: string;
}
