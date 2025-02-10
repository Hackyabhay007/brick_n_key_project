import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface LuxuryListingSlice {
  data: any;
  loading: boolean;
  error: string | null;
}

// Define initial state
const initialState: LuxuryListingSlice = {
  data: null,
  loading: false,
  error: null,
};

// Async Thunk for fetching data from Strapi
export const fetchLuxuryListingItem = createAsyncThunk(
  "luxuryListingItem/fetchLuxuryListingItem",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://147.93.106.161:1337/api/detail-pages?filters[isLuxury][$eq]=true&populate=*");
    //   console.log(response)
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch data");
    }
  }
);

// Create the slice
const propertyItemsSlice = createSlice({
  name: "luxuryListingItem",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLuxuryListingItem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLuxuryListingItem.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLuxuryListingItem.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default propertyItemsSlice.reducer;
