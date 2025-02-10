import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { StrapiResponse, StrapiImage } from "../../types/strapi";

interface LuxuryListingAttributes {
  title: string;
  description: string;
  isLuxury: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  propertyDetails?: Record<string, unknown>;
  images?: {
    data: StrapiImage[];
  };
}

type LuxuryListingResponse = StrapiResponse<Array<{
  id: number;
  attributes: LuxuryListingAttributes;
}>>;

interface LuxuryListingState {
  data: LuxuryListingResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: LuxuryListingState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchLuxuryListingItem = createAsyncThunk<
  LuxuryListingResponse,
  void,
  { rejectValue: string }
>("luxuryListingItem/fetchLuxuryListingItem", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<LuxuryListingResponse>(
      "http://147.93.106.161:1337/api/detail-pages?filters[isLuxury][$eq]=true&populate=*"
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch data");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

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
      .addCase(fetchLuxuryListingItem.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchLuxuryListingItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An error occurred";
      });
  },
});

export default propertyItemsSlice.reducer;
