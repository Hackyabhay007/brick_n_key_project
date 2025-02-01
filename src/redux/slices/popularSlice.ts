import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface PopularSectionSlice {
  data: any;
  loading: boolean;
  error: string | null;
}

// Define initial state
const initialState: PopularSectionSlice = {
  data: null,
  loading: false,
  error: null,
};

// Async Thunk for fetching data from Strapi
export const fetchPopularSection = createAsyncThunk(
  "popularSection/fetchPopularSection",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:1337/api/popular-residences?populate=*");
      // console.log(response)
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch data");
    }
  }
);

// Create the slice
const popularSectionSlice = createSlice({
  name: "popularSection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPopularSection.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPopularSection.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default popularSectionSlice.reducer;
