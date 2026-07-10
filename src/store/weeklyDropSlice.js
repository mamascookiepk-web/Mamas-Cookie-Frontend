import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getWeeklyDropImages,
  uploadWeeklyDropImage,
  deleteWeeklyDropImage,
} from '@/services/weeklyDropService';

export const fetchWeeklyDrop = createAsyncThunk('weeklyDrop/fetchWeeklyDrop', getWeeklyDropImages);

export const uploadWeeklyDrop = createAsyncThunk(
  'weeklyDrop/uploadWeeklyDrop',
  uploadWeeklyDropImage
);

export const removeWeeklyDrop = createAsyncThunk('weeklyDrop/removeWeeklyDrop', async (id) => {
  await deleteWeeklyDropImage(id);
  return id;
});

const initialState = {
  items: [],
  status: 'idle',
  uploadStatus: 'idle',
  removeStatus: 'idle',
  error: null,
};

const toList = (payload) => (Array.isArray(payload) ? payload : (payload?.content ?? []));

const sortBySortOrder = (items) => items.slice().sort((a, b) => a.sortOrder - b.sortOrder);

const weeklyDropSlice = createSlice({
  name: 'weeklyDrop',
  initialState,
  reducers: {
    clearWeeklyDropError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeeklyDrop.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWeeklyDrop.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = sortBySortOrder(toList(action.payload));
      })
      .addCase(fetchWeeklyDrop.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(uploadWeeklyDrop.pending, (state) => {
        state.uploadStatus = 'loading';
        state.error = null;
      })
      .addCase(uploadWeeklyDrop.fulfilled, (state, action) => {
        state.uploadStatus = 'succeeded';
        state.items = sortBySortOrder([...state.items, action.payload]);
      })
      .addCase(uploadWeeklyDrop.rejected, (state, action) => {
        state.uploadStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(removeWeeklyDrop.pending, (state) => {
        state.removeStatus = 'loading';
        state.error = null;
      })
      .addCase(removeWeeklyDrop.fulfilled, (state, action) => {
        state.removeStatus = 'succeeded';
        state.items = state.items.filter((img) => img.id !== action.payload);
      })
      .addCase(removeWeeklyDrop.rejected, (state, action) => {
        state.removeStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearWeeklyDropError } = weeklyDropSlice.actions;
export default weeklyDropSlice.reducer;
