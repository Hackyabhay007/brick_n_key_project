import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define types for the contact form data
interface ContactFormData {
  first_name: string;
  last_name: string;
  phone: number;
  I_want_to: string;
  Notes: string;
  listing_Id?: number | undefined; // Optional parameter
}

interface ContactSectionState {
  data: any;
  loading: boolean;
  error: string | null;
  successMessage: string | null;
}

// Define initial state
const initialState: ContactSectionState = {
  data: null,
  loading: false,
  error: null,
  successMessage: null,
};

// Async Thunk for submitting contact form data to Strapi
export const submitContactForm = createAsyncThunk(
  "contactSection/submitContactForm",
  async (formData: ContactFormData, { rejectWithValue }) => {
    console.log("This is the Form data at the contact section slice", formData);
    try {
      const response = await axios.post("http://localhost:1337/api/contacts", {
        data: formData
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.error?.details?.errors[0].message || "Failed to submit contact form"
      );
    }
  }
);

// Create the slice
const contactSectionSlice = createSlice({
  name: "contactSection",
  initialState,
  reducers: {
    // Reset the form state
    resetFormState: (state) => {
      state.error = null;
      state.successMessage = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(submitContactForm.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
        state.successMessage = "Thank you for contacting us. We will get back to you soon!";
      })
      .addCase(submitContactForm.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
        state.successMessage = null;
      });
  },
});

export const { resetFormState } = contactSectionSlice.actions;
export default contactSectionSlice.reducer;