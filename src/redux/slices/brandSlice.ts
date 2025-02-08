import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface StrapiImage {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText?: string;
    };
  };
}

interface StrapiData<T> {
  id: number;
  attributes: T;
}

interface BrandAttributes {
  brand_logo: StrapiImage;
  brand_relations: {
    data: Array<StrapiData<{
      property_Images: StrapiImage[];
      propertyFeature: Array<StrapiData<{
        name: string;
        description?: string;
      }>>;
    }>>;
  };
}

interface StrapiResponse {
  data: Array<StrapiData<BrandAttributes>>;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      total: number;
    };
  };
}

interface BrandSectionState {
  data: StrapiResponse | null;
  loading: boolean;
  error: string | null;
}

// Define initial state
const initialState: BrandSectionState = {
  data: null,
  loading: false,
  error: null,
};

// Async Thunk for fetching data from Strapi
export const fetchBrandSectionSlice = createAsyncThunk(
  "brandSection/fetchBrandSectionSlice",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<StrapiResponse>(
        "http://localhost:1337/api/brands?populate=brand_logo&populate[1]=brand_relations.property_Images&populate[2]=brand_relations.propertyFeature"
      );
      return response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue(error.response?.data?.error?.message || "Failed to fetch data");
      }
      return rejectWithValue("An unexpected error occurred");
    }
  }
);

// Create the slice
const brandSectionSlice = createSlice({
  name: "brandSection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrandSectionSlice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBrandSectionSlice.fulfilled, (state, action: PayloadAction<StrapiResponse>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBrandSectionSlice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default brandSectionSlice.reducer;
