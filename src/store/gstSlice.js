import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getActiveGstRate,
  getGstRates,
  createGstRate,
  updateGstRate,
  deleteGstRate,
} from '@/services/gstService';

export const fetchActiveGstRate = createAsyncThunk('gst/fetchActive', getActiveGstRate);

export const fetchGstRates = createAsyncThunk('gst/fetchAll', getGstRates);

export const addGstRate = createAsyncThunk('gst/add', createGstRate);

export const editGstRate = createAsyncThunk('gst/edit', ({ id, payload }) =>
  updateGstRate(id, payload)
);

export const removeGstRate = createAsyncThunk('gst/remove', async (id) => {
  await deleteGstRate(id);
  return id;
});

const initialState = {
  active: null,
  activeStatus: 'idle',
  items: [],
  status: 'idle',
  mutationStatus: 'idle',
  error: null,
};

const gstSlice = createSlice({
  name: 'gst',
  initialState,
  reducers: {
    clearGstError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActiveGstRate.pending, (state) => {
        state.activeStatus = 'loading';
      })
      .addCase(fetchActiveGstRate.fulfilled, (state, action) => {
        state.activeStatus = 'succeeded';
        state.active = action.payload;
      })
      .addCase(fetchActiveGstRate.rejected, (state) => {
        state.activeStatus = 'failed';
      })

      .addCase(fetchGstRates.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchGstRates.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchGstRates.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addGstRate.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(addGstRate.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        if (action.payload.active) {
          state.items = state.items.map((r) => ({ ...r, active: false }));
        }
        state.items = [action.payload, ...state.items];
      })
      .addCase(addGstRate.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(editGstRate.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(editGstRate.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items = state.items.map((r) => {
          if (r.id === action.payload.id) return action.payload;
          return action.payload.active ? { ...r, active: false } : r;
        });
      })
      .addCase(editGstRate.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(removeGstRate.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(removeGstRate.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items = state.items.filter((r) => r.id !== action.payload);
      })
      .addCase(removeGstRate.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearGstError } = gstSlice.actions;
export default gstSlice.reducer;
