import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UnlockSectionState {
  data: any;
  loading: boolean;
  error: string | null;
}

// Define initial state
const initialState: UnlockSectionState = {
  data: null,
  loading: false,
  error: null,
};

// Async Thunk for fetching data from Strapi
export const fetchUnlockSection = createAsyncThunk(
  "unlockSection/fetchUnlockSection",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("https://strapi.bricknkey.com/api/unlock-section");
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch data");
    }
  }
); 

// Create the slice
const unlockSectionSlice = createSlice({
  name: "unlockSection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUnlockSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUnlockSection.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUnlockSection.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default unlockSectionSlice.reducer;
