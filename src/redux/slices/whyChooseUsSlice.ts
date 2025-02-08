import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseStrapiResponse, WhyChooseUsAttributes } from "../../types/api";

type WhyChooseUsResponse = BaseStrapiResponse<{
  id: number;
  attributes: WhyChooseUsAttributes;
}>;

interface WhyChooseUsState {
  data: WhyChooseUsResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: WhyChooseUsState = {
  data: null,
  loading: false,
  error: null,
};

export const fetch_whyChooseUsSection = createAsyncThunk<
  WhyChooseUsResponse,
  void,
  { rejectValue: string }
>("whyChooseUsSection/fetch_whyChooseUsSection", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<WhyChooseUsResponse>(
      "http://localhost:1337/api/why-choose-us-section"
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch data");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

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
      .addCase(fetch_whyChooseUsSection.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetch_whyChooseUsSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An error occurred";
      });
  },
});

export default whyChooseUsSectionSlice.reducer;
