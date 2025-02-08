import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { DetailProperty, PropertyResponse } from "@/types/property";

interface DetailPageState {
    data: PropertyResponse<DetailProperty> | null;
    loading: boolean;
    error: string | null;
}

const initialState: DetailPageState = {
    data: null,
    loading: false,
    error: null,
};

export const fetchDetailPage = createAsyncThunk<
    PropertyResponse<DetailProperty>,
    number,
    { rejectValue: string }
>("detailPage/fetchDetailPage", async (id, { rejectWithValue }) => {
    try {
        const response = await axios.get<PropertyResponse<DetailProperty>>(
            `${process.env.NEXT_PUBLIC_API_URL}/api/detail-pages?filters[id][$eq]=${id}&populate=*`
        );
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch data");
        }
        return rejectWithValue("An unexpected error occurred");
    }
});

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
      .addCase(fetchDetailPage.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchDetailPage.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.payload ?? "An error occurred";
      });
  },
});

export default detailPageSlice.reducer;