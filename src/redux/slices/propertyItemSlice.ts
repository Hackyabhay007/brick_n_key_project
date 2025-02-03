import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";




interface PropertyFilters {
  property_Construction_status?: string | undefined;
  property_Bedroom?: string | undefined;
  property_price?: number | undefined;
  property_Type?: string | undefined;
  isLuxury?: boolean | undefined;
  property_Location?: string | undefined; // Added location filter
  page?: number | undefined;
  pageSize?: number | undefined;
}

interface PopularSectionSlice {
  data: any;
  loading: boolean;
  error: string | null;
  activeFilters: { [key in keyof PropertyFilters]: string | number | undefined };
}

const initialState: PopularSectionSlice = {
  data: null,
  loading: false,
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
  
  if (filters.property_price) {
    filterParams.push(`filters[property_price][$gte]=${filters.property_price}`);
  }

  if (filters.isLuxury) {
    filterParams.push(`filters[isLuxury][$eq]=${filters.isLuxury}`);
  }
  
  if (filters.property_Type) {
    filterParams.push(`filters[property_Type][$eq]=${encodeURIComponent(filters.property_Type)}`);
  }

  // Add advanced location search with containsi operator
  if (filters.property_Location) {
    // Split search query into words for more flexible matching
    const locationWords = filters.property_Location.trim().split(/\s+/);
    
    // Create an OR condition for each word
    const locationFilters = locationWords.map(word => 
      `filters[property_Location][$containsi]=${encodeURIComponent(word)}`
    );
    
    // Add location filters to the params
    filterParams.push(...locationFilters);
  }

  if (filterParams.length > 0) {
    url += `&${filterParams.join('&')}`;
  }

  console.log('Generated URL:', url);
  return url;
};

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
      const url = buildApiUrl(state.propertyItems.activeFilters);
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
    setFilter: (state, action: PayloadAction<{ key: keyof PropertyFilters; value: string | number | undefined }>) => {
      const { key, value } = action.payload;
      console.log('Setting filter:', key, value);
      
      // Create a new activeFilters object
      const newFilters = { ...state.activeFilters };
      
      if (value === undefined || value === '') {
        delete newFilters[key];
      } else {
        newFilters[key] = value;
      }
      
      // Update the state with the new filters object
      state.activeFilters = newFilters;
      
      console.log('Updated filters:', state.activeFilters);
    },
    clearFilters: (state) => {
      console.log('Clearing all filters');
      state.activeFilters = {};
    }
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const selectActiveFilters = (state: { propertyItems: PopularSectionSlice }) => 
  state.propertyItems.activeFilters;

export const { setFilter, clearFilters } = propertyItemsSlice.actions;
export default propertyItemsSlice.reducer;