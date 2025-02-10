import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface HeroSectionState {
  data: any;
  loading: boolean;
  error: string | null;
}

// Define initial state
const initialState: HeroSectionState = {
  data: null,
  loading: false,
  error: null,
};

// Async Thunk for fetching data from Strapi
export const fetchHeroSection = createAsyncThunk(
  "heroSection/fetchHeroSection",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://147.93.106.161:1337/api/hero-section-infos?populate=*");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch data");
    }
  }
);

// Create the slice
const heroSectionSlice = createSlice({
  name: "heroSection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeroSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeroSection.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHeroSection.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default heroSectionSlice.reducer;
