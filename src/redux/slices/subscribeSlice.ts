import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { StrapiResponse, BaseAttributes } from '../../types/strapi';

export interface SubscribeState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

export interface SubscribePayload {
  email: string;
}

interface SubscribeAttributes extends BaseAttributes {
  email: string;
}

const initialState: SubscribeState = {
  loading: false,
  success: false,
  error: null
};

const API_URL = 'http://147.93.106.161:1337/api/subscribe-models';

export const subscribeToNewsletter = createAsyncThunk<
  StrapiResponse<{ id: number; attributes: SubscribeAttributes }>,
  SubscribePayload,
  { rejectValue: string }
>('subscribe/submitEmail', async (payload, { rejectWithValue }) => {
  try {
    const response = await axios.post(API_URL, { data: { email: payload.email } });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error?.details?.errors[0]?.message;
      return rejectWithValue(errorMessage || "Subscription failed");
    }
    return rejectWithValue("Subscription failed");
  }
});

const subscribeSlice = createSlice({
  name: 'subscribe',
  initialState,
  reducers: {
    resetSubscribeState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(subscribeToNewsletter.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(subscribeToNewsletter.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(subscribeToNewsletter.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload as string;
      });
  }
});

export const { resetSubscribeState } = subscribeSlice.actions;
export default subscribeSlice.reducer;