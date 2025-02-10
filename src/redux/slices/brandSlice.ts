import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface BrandSectionState {
  data: any;
  loading: boolean;
  error: string | null;
}

// Define initial state
const initialState: BrandSectionState = {
  data: null,
  loading: false,
  error: null,
};

// Async Thunk for fetching data from Strapi
export const fetchBrandSectionSlice = createAsyncThunk(
  "brandSection/fetchBrandSectionSlice",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://147.93.106.161:1337/api/brands?populate=brand_logo&populate[1]=brand_relations.property_Images&populate[2]=brand_relations.propertyFeature");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch data");
    }
  }
);

// Create the slice
const brandSectionSlice = createSlice({
  name: "brandSection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrandSectionSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrandSectionSlice.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBrandSectionSlice.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default brandSectionSlice.reducer;
