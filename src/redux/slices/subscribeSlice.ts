import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface SubscribeState {
  loading: boolean;
  success: boolean;
  error: string | null;
}

export interface SubscribePayload {
  email: string;
}

const initialState: SubscribeState = {
  loading: false,
  success: false,
  error: null
};

const API_URL = 'http://localhost:1337/api/subscribe-models';

export const subscribeToNewsletter = createAsyncThunk(
  'subscribe/submitEmail',
  async (payload: SubscribePayload, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, {
        data: {
          email: payload.email
        }
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || 'Subscription failed');
    }
  }
);



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