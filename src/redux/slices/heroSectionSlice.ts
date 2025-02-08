import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { StrapiResponse } from "../../types/strapi";

interface HeroSectionAttributes {
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

type HeroSectionResponse = StrapiResponse<Array<{
  id: number;
  attributes: HeroSectionAttributes;
}>>;

interface HeroSectionState {
  data: HeroSectionResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: HeroSectionState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchHeroSection = createAsyncThunk<
  HeroSectionResponse,
  void,
  { rejectValue: string }
>("heroSection/fetchHeroSection", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<HeroSectionResponse>(
      "http://localhost:1337/api/hero-section-infos?populate=*"
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch data");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

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
      .addCase(fetchHeroSection.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHeroSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An error occurred";
      });
  },
});

export default heroSectionSlice.reducer;
