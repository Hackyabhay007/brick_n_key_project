import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface PropertyFilters {
  property_Construction_status?: string | undefined;
  property_Bedroom?: string | undefined;
  property_price?: number | undefined;
  property_Type?: string | undefined;
  isLuxury?: boolean | undefined;
  property_Location?: string | undefined;
  page?: number | undefined;
  pageSize?: number | undefined;
  minPrice?: number | undefined;
  maxPrice?: number | undefined;
}

interface PopularSectionSlice {
  data: any;
  newItems: any;
  loading: boolean;
  newItemsLoading: boolean;
  error: string | null;
  activeFilters: { [key in keyof PropertyFilters]: string | number | undefined };
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
  const baseUrl = "http://localhost:1337/api/detail-pages";
  const page = filters.page || 1;
  const pageSize = filters.pageSize || 5;
  const start = (page - 1) * pageSize;
  
  let url = `${baseUrl}?populate=*&pagination[start]=${start}&pagination[limit]=${pageSize}`;
  
  const filterParams = [];
  
  if (filters.property_Construction_status) {
    filterParams.push(`filters[property_Construction_status][$eq]=${encodeURIComponent(filters.property_Construction_status)}`);
  }
  
  if (filters.property_Bedroom) {
    filterParams.push(`filters[property_Bedroom][$eq]=${encodeURIComponent(filters.property_Bedroom)}`);
  }
  
  // Updated price filtering logic
  if (filters.minPrice !== undefined && filters.maxPrice !== undefined) {
    filterParams.push(
      `filters[property_price][$gte]=${filters.minPrice}`,
      `filters[property_price][$lte]=${filters.maxPrice}`
    );
  } else if (filters.property_price) {
    filterParams.push(`filters[property_price][$gte]=${filters.property_price}`);
  }

  if (filters.isLuxury) {
    filterParams.push(`filters[isLuxury][$eq]=${filters.isLuxury}`);
  }
  
  if (filters.property_Type) {
    filterParams.push(`filters[property_Type][$eq]=${encodeURIComponent(filters.property_Type)}`);
  }

  if (filters.property_Location) {
    const locationWords = filters.property_Location.trim().split(/\s+/);
    
    const locationFilters = locationWords.map(word => 
      `filters[property_Location][$containsi]=${encodeURIComponent(word)}`
    );
    
    filterParams.push(...locationFilters);
  }

  if (filterParams.length > 0) {
    url += `&${filterParams.join('&')}`;
  }

  console.log('Generated URL:', url);
  return url;
};

// New thunk for fetching properties by price range
export const fetchPropertiesByPriceRange = createAsyncThunk<
  any,
  { minPrice: number; maxPrice: number },
  { state: { propertyItems: PopularSectionSlice }, rejectValue: string }
>(
  "propertyItems/fetchPropertiesByPriceRange",
  async ({ minPrice, maxPrice }, { dispatch, rejectWithValue }) => {
    try {
      // Set both price filters
      dispatch(setPriceRange({ minPrice, maxPrice }));
      
      // Fetch the filtered results
      const response = await axios.get(
        `http://localhost:1337/api/detail-pages?populate=*&filters[property_price][$gte]=${minPrice}&filters[property_price][$lte]=${maxPrice}&pagination[start]=0&pagination[limit]=10`
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
  any,
  void,
  { state: { propertyItems: PopularSectionSlice }, rejectValue: string }
>(
  "propertyItems/fetchNewPropertyItems",
  async (_, { rejectWithValue }) => {
    try {
      // Use sorting by createdAt in descending order to get the newest items
      const url = `http://localhost:1337/api/detail-pages?populate=*&pagination[start]=0&pagination[limit]=5&sort[0]=createdAt:desc`;
      
      const response = await axios.get(url);
      console.log('New Items API Response:', response.data);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('New Items API Error:', error.response?.data);
        return rejectWithValue(error.response?.data?.message || "Failed to fetch new items");
      }
      console.error('Unknown Error:', error);
      return rejectWithValue("Failed to fetch new items");
    }
  }
);

export const fetchPropertyItems = createAsyncThunk<
  any,
  void,
  { state: { propertyItems: PopularSectionSlice }, rejectValue: string }
>(
  "propertyItems/fetchPropertyItems",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState();
      console.log('Current filters:', state.propertyItems.activeFilters);
      const url = buildApiUrl(state?.propertyItems?.activeFilters);
      const response = await axios.get(url);
      console.log('API Response:', response.data);
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
    setFilter: (state, action: PayloadAction<{ key: keyof PropertyFilters; value: string | boolean | number | undefined }>) => {
      const { key, value } = action.payload;
      console.log('Setting filter:', key, value);
      
      const newFilters = { ...state.activeFilters };
      
      if (value === undefined || value === '') {
        delete newFilters[key];
      } else {
        newFilters[key] = value;
      }
      
      state.activeFilters = newFilters;
      
      console.log('Updated filters:', state.activeFilters);
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
      console.log('Clearing all filters');
      state.activeFilters = {};
    }
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

export const selectActiveFilters = (state: { propertyItems: PopularSectionSlice }) => 
  state.propertyItems.activeFilters;

export const { setFilter, clearFilters, setPriceRange } = propertyItemsSlice.actions;
export default propertyItemsSlice.reducer;