import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { StrapiResponse, StrapiImage } from "../../types/strapi";

interface NavLink {
  id: number;
  title: string;
  url: string;
}

interface HeaderContainer {
  LogoLink: {
    image: {
      data: StrapiImage;
    };
  };
  navLinks: {
    data: NavLink[];
  };
}

interface HeaderAttributes {
  header_container: HeaderContainer;
}

type HeaderResponse = StrapiResponse<{
  id: number;
  attributes: HeaderAttributes;
}>;

interface HeaderState {
  data: HeaderResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: HeaderState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchHeaderSection = createAsyncThunk<
  HeaderResponse,
  void,
  { rejectValue: string }
>("headerSection/fetchHeaderSection", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<HeaderResponse>(
      "http://147.93.106.161:1337/api/global?populate=header_container.LogoLink.image&populate[1]=header_container.navLinks"
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch data");
    }
    return rejectWithValue("An unexpected error occurred");
  }
});

const headerSectionSlice = createSlice({
  name: "headerSection",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHeaderSection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHeaderSection.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchHeaderSection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "An error occurred";
      });
  },
});

export default headerSectionSlice.reducer;
