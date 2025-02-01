import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface PropertyFilters {
  property_Construction_status?: string;
  property_Bedroom?: string;
  property_price?: number;
  property_Type?: string;
}

interface PopularSectionSlice {
  data: any;
  loading: boolean;
  error: string | null;
  activeFilters: PropertyFilters;
}

const initialState: PopularSectionSlice = {
  data: null,
  loading: false,
  error: null,
  activeFilters: {}
};

const buildApiUrl = (filters: PropertyFilters): string => {
  const baseUrl = "http://localhost:1337/api/detail-pages?populate=*";
  
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
  
  if (filters.property_Type) {
    filterParams.push(`filters[property_Type][$eq]=${encodeURIComponent(filters.property_Type)}`);
  }
  
  return filterParams.length > 0 ? `${baseUrl}&${filterParams.join('&')}` : baseUrl;
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
      const url = buildApiUrl(state.propertyItems.activeFilters);
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || "Failed to fetch data");
      }
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
      console.log(action.payload)
      console.log(key, value);
      if (value === undefined || value === '') {
        delete state.activeFilters[key];
      } else {
        state.activeFilters[key] = value;
      }
    },
    clearFilters: (state) => {
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

export const { setFilter, clearFilters } = propertyItemsSlice.actions;
export default propertyItemsSlice.reducer;