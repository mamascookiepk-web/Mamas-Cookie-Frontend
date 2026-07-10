import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getMonthlyDrop, uploadMonthlyDropImage } from '@/services/monthlyDropService';

export const fetchMonthlyDrop = createAsyncThunk('monthlyDrop/fetchMonthlyDrop', getMonthlyDrop);

export const uploadMonthlyDrop = createAsyncThunk(
  'monthlyDrop/uploadMonthlyDrop',
  uploadMonthlyDropImage
);

const initialState = {
  imageUrl: null,
  updatedAt: null,
  status: 'idle',
  uploadStatus: 'idle',
  error: null,
};

const monthlyDropSlice = createSlice({
  name: 'monthlyDrop',
  initialState,
  reducers: {
    clearMonthlyDropError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonthlyDrop.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMonthlyDrop.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.imageUrl = action.payload.imageUrl;
        state.updatedAt = action.payload.updatedAt;
      })
      .addCase(fetchMonthlyDrop.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(uploadMonthlyDrop.pending, (state) => {
        state.uploadStatus = 'loading';
        state.error = null;
      })
      .addCase(uploadMonthlyDrop.fulfilled, (state, action) => {
        state.uploadStatus = 'succeeded';
        state.imageUrl = action.payload.imageUrl;
        state.updatedAt = action.payload.updatedAt;
      })
      .addCase(uploadMonthlyDrop.rejected, (state, action) => {
        state.uploadStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearMonthlyDropError } = monthlyDropSlice.actions;
export default monthlyDropSlice.reducer;
