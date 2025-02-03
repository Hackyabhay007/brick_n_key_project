import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface PeopleTrustUsState {
  data: any;
  loading: boolean;
  error: string | null;
}

// Define initial state
const initialState: PeopleTrustUsState = {
  data: null,
  loading: false,
  error: null,
};

// Async Thunk for fetching data from Strapi
export const fetchPeopleTrustUs_Slice = createAsyncThunk(
  "peopleTrustUs/fetchPeopleTrustUs_Slice",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:1337/api/people-trust-uses?populate=*");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch data");
    }
  }
);

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
      .addCase(fetchPeopleTrustUs_Slice.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPeopleTrustUs_Slice.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default peopleTrustUs_Slice.reducer;
