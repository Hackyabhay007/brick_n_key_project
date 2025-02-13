import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { StrapiResponse, PropertyAttributes } from "../../types/strapi";

type PropertyResponse = StrapiResponse<Array<{
  id: number;
  attributes: PropertyAttributes;
}>>;

export type ApiResponse = PropertyResponse;

export interface PropertyFilters {
  property_Construction_status?: string;
  property_Bedroom?: string;
  property_price?: number;
  property_Type?: string;
  isLuxury?: boolean;
  property_Location?: string;
  page: number;
  pageSize: number;
  minPrice?: number;
  maxPrice?: number;
  brand_name?: string;
  brand_type?: string;  // Add this line
  brandFilter?: string[];
}

interface FilterPayload {
  key: keyof PropertyFilters;
  value: PropertyFilters[keyof PropertyFilters];
}

export interface PopularSectionSlice {
  data: PropertyResponse | null;
  newItems: PropertyResponse | null;
  loading: boolean;
  newItemsLoading: boolean;
  error: string | null;
  activeFilters: Partial<PropertyFilters>;
}

export interface RootState {
  propertyItems: PopularSectionSlice;
}

const initialState: PopularSectionSlice = {
  data: null,
  newItems: null,
  loading: false,
  newItemsLoading: false,
  error: null,
  activeFilters: {}
};

const buildApiUrl = (filters: PropertyFilters): string => {
  const baseUrl = "http://147.93.106.161:1337/api/detail-pages";
  const url = `${baseUrl}?populate=*&pagination[page]=${filters.page || 1}&pagination[pageSize]=${filters.pageSize || 5}`;
  
  const filterParams: string[] = [];
  
  // Handle multiple values for property_Construction_status
  if (filters.property_Construction_status) {
    const statuses = filters.property_Construction_status.split(',');
    if (statuses.length > 0) {
      const statusFilters = statuses.map(status => 
        `filters[property_Construction_status][$eq]=${encodeURIComponent(status)}`
      ).join('&');
      filterParams.push(statusFilters);
    }
  }
  
  // Handle multiple values for property_Bedroom
  if (filters.property_Bedroom) {
    const bedrooms = filters.property_Bedroom.split(',');
    if (bedrooms.length > 0) {
      const bedroomFilters = bedrooms.map(bedroom => 
        `filters[property_Bedroom][$eq]=${encodeURIComponent(bedroom)}`
      ).join('&');
      filterParams.push(bedroomFilters);
    }
  }
  
  // Handle multiple values for property_Type
  if (filters.property_Type) {
    const types = filters.property_Type.split(',');
    if (types.length > 0) {
      const typeFilters = types.map(type => 
        `filters[property_Type][$eq]=${encodeURIComponent(type)}`
      ).join('&');
      filterParams.push(typeFilters);
    }
  }

  // Handle multiple values for brand_name
  if (filters.brand_name) {
    const brands = filters.brand_name.split(',');
    if (brands.length > 0) {
      const brandFilters = brands.map(brand => 
        `filters[brand][brand_type][$eq]=${encodeURIComponent(brand)}`
      ).join('&');
      filterParams.push(brandFilters);
    }
  }

  // Handle brand_type filter
  if (filters.brand_type) {
    const brandTypes = filters.brand_type.split(',');
    if (brandTypes.length > 0) {
      const brandTypeFilters = brandTypes.map(type => 
        `filters[brand][brand_type][$eq]=${encodeURIComponent(type)}`
      ).join('&');
      filterParams.push(brandTypeFilters);
    }
  }

  // Updated brand filter handling
  if (filters.brandFilter && filters.brandFilter.length > 0) {
    const brandFilters = filters.brandFilter.map(brand => 
      `filters[brand][brand_name][$eq]=${encodeURIComponent(brand)}`
    ).join('&');
    filterParams.push(brandFilters);
  }

  // Handle price range
  if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
    filterParams.push(
      `filters[property_price][$gte]=${filters.minPrice}`,
      `filters[property_price][$lte]=${filters.maxPrice}`
    );
  }

  // Handle luxury filter
  if (filters.isLuxury) {
    filterParams.push(`filters[isLuxury][$eq]=${filters.isLuxury}`);
  }

  // Handle location search with multiple words
  if (filters.property_Location) {
    const locationWords = filters.property_Location.trim().split(/\s+/);
    const locationFilters = locationWords.map(word => 
      `filters[property_Location][$containsi]=${encodeURIComponent(word)}`
    );
    filterParams.push(...locationFilters);
  }

  return filterParams.length > 0 ? `${url}&${filterParams.join('&')}` : url;
};

// New thunk for fetching properties by price range
export const fetchPropertiesByPriceRange = createAsyncThunk<
  ApiResponse,
  { minPrice: number; maxPrice: number },
  { state: RootState, rejectValue: string }
>(
  "propertyItems/fetchPropertiesByPriceRange",
  async ({ minPrice, maxPrice }, { dispatch, rejectWithValue }) => {
    try {
      // Set both price filters
      dispatch(setPriceRange({ minPrice, maxPrice }));
      
      // Fetch the filtered results
      const response = await axios.get(
        `http://147.93.106.161:1337/api/detail-pages?populate=*&filters[property_price][$gte]=${minPrice}&filters[property_price][$lte]=${maxPrice}&pagination[start]=0&pagination[limit]=10`
      );
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch properties by price range");
      }
      return rejectWithValue("Failed to fetch properties by price range");
    }
  }
);

// New function to fetch newly added items
export const fetchNewPropertyItems = createAsyncThunk<
  ApiResponse,
  void,
  { state: RootState, rejectValue: string }
>(
  "propertyItems/fetchNewPropertyItems",
  async (_, { rejectWithValue }) => {
    try {
      // Use sorting by createdAt in descending order to get the newest items
      const url = `http://147.93.106.161:1337/api/detail-pages?populate=*&pagination[start]=0&pagination[limit]=5&sort[0]=createdAt:desc`;
      
      const response = await axios.get(url);
      // console.log('New Items API Response:', response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // console.error('New Items API Error:', error.response?.data);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch new items");
      }
      console.error('Unknown Error:', error);
      return rejectWithValue("Failed to fetch new items");
    }
  }
);

export const fetchPropertyItems = createAsyncThunk<
  ApiResponse,
  void,
  { state: RootState, rejectValue: string }
>(
  "propertyItems/fetchPropertyItems",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      // console.log('Current filters:', state.propertyItems.activeFilters);
      const url = buildApiUrl({
        page: 1,
        pageSize: 5,
        ...state?.propertyItems?.activeFilters
      });
      const response = await axios.get(url);
      // console.log('API Response:', response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('API Error:', error.response?.data);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch data");
      }
      console.error('Unknown Error:', error);
      return rejectWithValue("Failed to fetch data");
    }
  }
);

const propertyItemsSlice = createSlice({
  name: "propertyItems",
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<FilterPayload>) => {
      const { key, value } = action.payload;
      
      if (value === undefined || value === '') {
        // Instead of destructuring with an unused variable, use Object.fromEntries
        state.activeFilters = Object.fromEntries(
          Object.entries(state.activeFilters).filter(([k]) => k !== key)
        );
      } else {
        state.activeFilters = {
          ...state.activeFilters,
          [key]: value
        };
      }
    },
    // New action for setting price range
    setPriceRange: (state, action: PayloadAction<{ minPrice: number; maxPrice: number }>) => {
      const { minPrice, maxPrice } = action.payload;
      state.activeFilters = {
        ...state.activeFilters,
        minPrice,
        maxPrice
      };
    },
    clearFilters: (state) => {
      // console.log('Clearing all filters');
      state.activeFilters = {};
    },
    setBrandFilter: (state, action: PayloadAction<string>) => {
      const brands = action.payload
        ? action.payload.split(',,').map(brand => brand.trim()).filter(Boolean)
        : [];
      
      state.activeFilters = {
        ...state.activeFilters,
        brandFilter: brands,
        page: 1 // Reset to first page when filter changes
      };
    },
  },
  extraReducers: (builder) => {
    builder
      // Existing cases remain the same
      .addCase(fetchPropertyItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertyItems.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPropertyItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'An error occurred';
      })
      .addCase(fetchNewPropertyItems.pending, (state) => {
        state.newItemsLoading = true;
      })
      .addCase(fetchNewPropertyItems.fulfilled, (state, action) => {
        state.newItemsLoading = false;
        state.newItems = action.payload;
      })
      .addCase(fetchNewPropertyItems.rejected, (state, action) => {
        state.newItemsLoading = false;
        state.error = action.payload || 'Failed to fetch new items';
      })
      // New cases for price range filtering
      .addCase(fetchPropertiesByPriceRange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPropertiesByPriceRange.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPropertiesByPriceRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch properties by price range';
      });
  },
});

export const selectActiveFilters = (state: RootState) => 
  state.propertyItems.activeFilters;

export const { setFilter, clearFilters, setPriceRange, setBrandFilter } = propertyItemsSlice.actions;
export default propertyItemsSlice.reducer;