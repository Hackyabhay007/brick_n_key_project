import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { StrapiResponse, BaseAttributes, StrapiImage } from "../../types/strapi";

interface PeopleTrustAttributes extends BaseAttributes {
  title: string;
  description: string;
  image: {
    data: StrapiImage;
  };
}

type PeopleTrustResponse = StrapiResponse<Array<{
  id: number;
  attributes: PeopleTrustAttributes;
}>>;

interface PeopleTrustState {
  data: PeopleTrustResponse | null;
  loading: boolean;
  error: string | null;
}

// Define initial state
const initialState: PeopleTrustState = {
  data: null,
  loading: false,
  error: null,
};

// Async Thunk for fetching data from Strapi
export const fetchPeopleTrustUs_Slice = createAsyncThunk<
  PeopleTrustResponse,
  void,
  { rejectValue: string }
>("peopleTrustUs/fetchPeopleTrustUs_Slice", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<PeopleTrustResponse>(
      "http://147.93.106.161:1337/api/people-trust-uses?populate=*"
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
const peopleTrustUs_Slice = createSlice({
  name: "peopleTrustUs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeopleTrustUs_Slice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPeopleTrustUs_Slice.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPeopleTrustUs_Slice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An error occurred";
      });
  },
});

export default peopleTrustUs_Slice.reducer;
