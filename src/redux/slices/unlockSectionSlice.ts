import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BaseStrapiResponse, UnlockSectionAttributes } from "../../types/api";

type UnlockSectionResponse = BaseStrapiResponse<{
  id: number;
  attributes: UnlockSectionAttributes;
}>;

interface UnlockSectionState {
  data: UnlockSectionResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: UnlockSectionState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchUnlockSection = createAsyncThunk<
  UnlockSectionResponse,
  void,
  { rejectValue: string }
>("unlockSection/fetchUnlockSection", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<UnlockSectionResponse>(
      "http://localhost:1337/api/unlock-section"
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch data");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

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
      .addCase(fetchUnlockSection.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchUnlockSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An error occurred";
      });
  },
});

export default unlockSectionSlice.reducer;
