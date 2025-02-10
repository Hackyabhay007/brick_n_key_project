import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { StrapiResponse, PropertyAttributes } from "../../types/strapi";

type PopularListingResponse = StrapiResponse<Array<{
  id: number;
  attributes: PropertyAttributes;
}>>;

interface PopularListingState {
  data: PopularListingResponse | null;
  loading: boolean;
  error: string | null;
}

// Define initial state
const initialState: PopularListingState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchPopular_Listing = createAsyncThunk<
  PopularListingResponse,
  { propertyType: string },
  { rejectValue: string }
>("popularListing/fetchPopular_Listing", async ({ propertyType }, { rejectWithValue }) => {
  try {
    const response = await axios.get<PopularListingResponse>(
      `http://147.93.106.161:1337/api/detail-pages?filters[property_Type][$eq]=${propertyType}&populate=*`
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.error?.message || "Failed to fetch data"
      );
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

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
      .addCase(fetchPopular_Listing.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPopular_Listing.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An error occurred";
      });
  },
});

export default popularListingSlice.reducer;