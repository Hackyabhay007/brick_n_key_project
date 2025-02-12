import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface whyChooseUsState {
  data: any;
  loading: boolean;
  error: string | null;
}

// Define initial state
const initialState: whyChooseUsState = {
  data: null,
  loading: false,
  error: null,
};

// Async Thunk for fetching data from Strapi
export const fetch_whyChooseUsSection = createAsyncThunk(
  "whyChooseUsSection/fetch_whyChooseUsSection",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://strapi.bricknkey.com/api/why-choose-us-section");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch data");
    }
  }
);

// Create the slice
const whyChooseUsSectionSlice = createSlice({
  name: "whyChooseUsSection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch_whyChooseUsSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetch_whyChooseUsSection.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetch_whyChooseUsSection.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default whyChooseUsSectionSlice.reducer;
