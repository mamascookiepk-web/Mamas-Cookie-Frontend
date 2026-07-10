import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  submitCateringRequest,
  getAdminCateringRequests,
  getAdminCateringRequest,
  updateCateringStatus,
} from '@/services/cateringService';

export const submitCatering = createAsyncThunk('catering/submitCatering', submitCateringRequest);

export const fetchAdminCateringRequests = createAsyncThunk(
  'catering/fetchAdminCateringRequests',
  getAdminCateringRequests
);

export const fetchAdminCateringById = createAsyncThunk(
  'catering/fetchAdminCateringById',
  getAdminCateringRequest
);

export const changeCateringStatus = createAsyncThunk(
  'catering/changeCateringStatus',
  ({ id, payload }) => updateCateringStatus(id, payload)
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

const cateringSlice = createSlice({
  name: 'catering',
  initialState,
  reducers: {
    clearCateringSubmitStatus: (state) => {
      state.submitStatus = 'idle';
      state.submitError = null;
    },
    clearAdminCurrentCateringRequest: (state) => {
      state.adminCurrentRequest = null;
      state.adminCurrentRequestStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitCatering.pending, (state) => {
        state.submitStatus = 'loading';
        state.submitError = null;
      })
      .addCase(submitCatering.fulfilled, (state) => {
        state.submitStatus = 'succeeded';
      })
      .addCase(submitCatering.rejected, (state, action) => {
        state.submitStatus = 'failed';
        state.submitError = action.error.message;
      })

      .addCase(fetchAdminCateringRequests.pending, (state) => {
        state.adminRequestsStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchAdminCateringRequests.fulfilled, (state, action) => {
        state.adminRequestsStatus = 'succeeded';
        state.adminRequests = toList(action.payload)
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      })
      .addCase(fetchAdminCateringRequests.rejected, (state, action) => {
        state.adminRequestsStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchAdminCateringById.pending, (state) => {
        state.adminCurrentRequestStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchAdminCateringById.fulfilled, (state, action) => {
        state.adminCurrentRequestStatus = 'succeeded';
        state.adminCurrentRequest = action.payload;
      })
      .addCase(fetchAdminCateringById.rejected, (state, action) => {
        state.adminCurrentRequestStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(changeCateringStatus.pending, (state) => {
        state.statusUpdateStatus = 'loading';
        state.statusUpdateError = null;
      })
      .addCase(changeCateringStatus.fulfilled, (state, action) => {
        state.statusUpdateStatus = 'succeeded';
        state.adminRequests = state.adminRequests.map((r) =>
          r.id === action.payload.id ? action.payload : r
        );
        if (state.adminCurrentRequest?.id === action.payload.id) {
          state.adminCurrentRequest = action.payload;
        }
      })
      .addCase(changeCateringStatus.rejected, (state, action) => {
        state.statusUpdateStatus = 'failed';
        state.statusUpdateError = action.error.message;
      });
  },
});

export const { clearCateringSubmitStatus, clearAdminCurrentCateringRequest } =
  cateringSlice.actions;
export default cateringSlice.reducer;
