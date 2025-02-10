import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface PopularListingState {
  data: any;
  loading: boolean;
  error: string | null;
}

// Define the parameter type for the async thunk
interface FetchPopularListingParams {
  propertyType: string;
}

// Define initial state
const initialState: PopularListingState = {
  data: null,
  loading: false,
  error: null,
};

// Updated Async Thunk to accept propertyType parameter
export const fetchPopular_Listing = createAsyncThunk(
  "popularListing/fetchPopular_Listing",
  async ({ propertyType }: FetchPopularListingParams, { rejectWithValue }) => {
    console.log("This is the propertyType from the popular listing slice", propertyType);
    try {
      const response = await axios.get(
        `http://147.93.106.161:1337/api/detail-pages?filters[property_Type][$eq]=${propertyType}&populate=*`
      );
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch data");
    }
  }
);

// Create the slice
const popularListingSlice = createSlice({
  name: "popularListing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopular_Listing.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopular_Listing.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPopular_Listing.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default popularListingSlice.reducer;