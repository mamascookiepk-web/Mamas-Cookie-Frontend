import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getPickupCenters,
  createPickupCenter,
  updatePickupCenter,
  deletePickupCenter,
} from '@/services/locationService';

export const fetchPickupCenters = createAsyncThunk(
  'pickupCenters/fetchPickupCenters',
  getPickupCenters
);

export const addPickupCenter = createAsyncThunk(
  'pickupCenters/addPickupCenter',
  createPickupCenter
);

export const editPickupCenter = createAsyncThunk(
  'pickupCenters/editPickupCenter',
  ({ id, payload }) => updatePickupCenter(id, payload)
);

export const removePickupCenter = createAsyncThunk(
  'pickupCenters/removePickupCenter',
  async (id) => {
    await deletePickupCenter(id);
    return id;
  }
);

const initialState = {
  items: [],
  status: 'idle',
  mutationStatus: 'idle',
  error: null,
};

const toList = (payload) => (Array.isArray(payload) ? payload : (payload?.content ?? []));

const pickupCentersSlice = createSlice({
  name: 'pickupCenters',
  initialState,
  reducers: {
    clearPickupCentersError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPickupCenters.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPickupCenters.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = toList(action.payload);
      })
      .addCase(fetchPickupCenters.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addPickupCenter.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(addPickupCenter.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addPickupCenter.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(editPickupCenter.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(editPickupCenter.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items = state.items.map((c) => (c.id === action.payload.id ? action.payload : c));
      })
      .addCase(editPickupCenter.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(removePickupCenter.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(removePickupCenter.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items = state.items.filter((c) => c.id !== action.payload);
      })
      .addCase(removePickupCenter.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearPickupCentersError } = pickupCentersSlice.actions;
export default pickupCentersSlice.reducer;
