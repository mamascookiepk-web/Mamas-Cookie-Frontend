import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  submitGiftingRequest,
  getAdminGiftingRequests,
  getAdminGiftingRequest,
  updateGiftingStatus,
} from '@/services/giftingService';

export const submitGifting = createAsyncThunk('gifting/submitGifting', submitGiftingRequest);

export const fetchAdminGiftingRequests = createAsyncThunk(
  'gifting/fetchAdminGiftingRequests',
  getAdminGiftingRequests
);

export const fetchAdminGiftingById = createAsyncThunk(
  'gifting/fetchAdminGiftingById',
  getAdminGiftingRequest
);

export const changeGiftingStatus = createAsyncThunk(
  'gifting/changeGiftingStatus',
  ({ id, payload }) => updateGiftingStatus(id, payload)
);

const initialState = {
  submitStatus: 'idle',
  submitError: null,

  adminRequests: [],
  adminRequestsStatus: 'idle',
  adminCurrentRequest: null,
  adminCurrentRequestStatus: 'idle',

  statusUpdateStatus: 'idle',
  statusUpdateError: null,

  error: null,
};

const toList = (payload) => (Array.isArray(payload) ? payload : (payload?.content ?? []));

const giftingSlice = createSlice({
  name: 'gifting',
  initialState,
  reducers: {
    clearSubmitStatus: (state) => {
      state.submitStatus = 'idle';
      state.submitError = null;
    },
    clearAdminCurrentRequest: (state) => {
      state.adminCurrentRequest = null;
      state.adminCurrentRequestStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitGifting.pending, (state) => {
        state.submitStatus = 'loading';
        state.submitError = null;
      })
      .addCase(submitGifting.fulfilled, (state) => {
        state.submitStatus = 'succeeded';
      })
      .addCase(submitGifting.rejected, (state, action) => {
        state.submitStatus = 'failed';
        state.submitError = action.error.message;
      })

      .addCase(fetchAdminGiftingRequests.pending, (state) => {
        state.adminRequestsStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchAdminGiftingRequests.fulfilled, (state, action) => {
        state.adminRequestsStatus = 'succeeded';
        state.adminRequests = toList(action.payload)
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      })
      .addCase(fetchAdminGiftingRequests.rejected, (state, action) => {
        state.adminRequestsStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchAdminGiftingById.pending, (state) => {
        state.adminCurrentRequestStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchAdminGiftingById.fulfilled, (state, action) => {
        state.adminCurrentRequestStatus = 'succeeded';
        state.adminCurrentRequest = action.payload;
      })
      .addCase(fetchAdminGiftingById.rejected, (state, action) => {
        state.adminCurrentRequestStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(changeGiftingStatus.pending, (state) => {
        state.statusUpdateStatus = 'loading';
        state.statusUpdateError = null;
      })
      .addCase(changeGiftingStatus.fulfilled, (state, action) => {
        state.statusUpdateStatus = 'succeeded';
        state.adminRequests = state.adminRequests.map((r) =>
          r.id === action.payload.id ? action.payload : r
        );
        if (state.adminCurrentRequest?.id === action.payload.id) {
          state.adminCurrentRequest = action.payload;
        }
      })
      .addCase(changeGiftingStatus.rejected, (state, action) => {
        state.statusUpdateStatus = 'failed';
        state.statusUpdateError = action.error.message;
      });
  },
});

export const { clearSubmitStatus, clearAdminCurrentRequest } = giftingSlice.actions;
export default giftingSlice.reducer;
