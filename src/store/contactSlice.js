import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { submitContactMessage } from '@/services/contactService';

export const submitContact = createAsyncThunk('contact/submitContact', submitContactMessage);

const initialState = {
  submitStatus: 'idle',
  submitError: null,
};

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    clearSubmitStatus: (state) => {
      state.submitStatus = 'idle';
      state.submitError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContact.pending, (state) => {
        state.submitStatus = 'loading';
        state.submitError = null;
      })
      .addCase(submitContact.fulfilled, (state) => {
        state.submitStatus = 'succeeded';
      })
      .addCase(submitContact.rejected, (state, action) => {
        state.submitStatus = 'failed';
        state.submitError = action.error.message;
      });
  },
});

export const { clearSubmitStatus } = contactSlice.actions;
export default contactSlice.reducer;
