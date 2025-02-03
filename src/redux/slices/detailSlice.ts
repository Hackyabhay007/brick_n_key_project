import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface DetailPageState {
  data: any;
  loading: boolean;
  error: string | null;
}

// Define initial state
const initialState: DetailPageState = {
  data: null,
  loading: false,
  error: null,
};

// Modified Async Thunk to accept ID parameter
export const fetchDetailPage = createAsyncThunk(
  "detailPage/fetchHeroSection",
  async (id: number, { rejectWithValue }) => {
    try {
      console.log('Fetching data for ID:', id);
      const response = await axios.get(
        `http://localhost:1337/api/detail-pages?filters[id][$eq]=${id}&populate=*`
      );
      console.log('API Response:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('API Error:', error);
      return rejectWithValue(error.response?.data || "Failed to fetch data");
    }
  }
);

// Create the slice
const detailPageSlice = createSlice({
  name: "detailPage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailPage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDetailPage.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchDetailPage.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default detailPageSlice.reducer;