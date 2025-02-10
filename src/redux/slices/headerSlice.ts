import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface HeaderSectionSlice {
  data: any;
  loading: boolean;
  error: string | null;
}

// Define initial state
const initialState: HeaderSectionSlice = {
  data: null,
  loading: false,
  error: null,
};

// Async Thunk for fetching data from Strapi
export const fetchHeaderSection = createAsyncThunk(
  "headerSection/fetchHeaderSection",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://147.93.106.161:1337/api/global?populate=header_container.LogoLink.image&populate[1]=header_container.navLinks");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch data");
    }
  }
);

// Create the slice
const headerSectionSlice = createSlice({
  name: "headerSection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeaderSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeaderSection.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHeaderSection.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default headerSectionSlice.reducer;
