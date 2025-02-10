import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseStrapiResponse, PopularAttributes } from "../../types/api";

type PopularResponse = BaseStrapiResponse<Array<{
  id: number;
  attributes: PopularAttributes;
}>>;

interface PopularSectionState {
  data: PopularResponse | null;
  loading: boolean;
  error: string | null;
}

// Define initial state
const initialState: PopularSectionState = {
  data: null,
  loading: false,
  error: null,
};

// Async Thunk for fetching data from Strapi
export const fetchPopularSection = createAsyncThunk<
  PopularResponse,
  void,
  { rejectValue: string }
>("popularSection/fetchPopularSection", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<PopularResponse>(
      "http://147.93.106.161:1337/api/popular-residences?populate=*"
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch data");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

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
      .addCase(fetchPopularSection.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPopularSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An error occurred";
      });
  },
});

export default popularSectionSlice.reducer;
