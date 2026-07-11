import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  submitTestimonial,
  getTestimonials,
  getAdminTestimonials,
  getAdminTestimonial,
  updateTestimonialStatus,
} from '@/services/testimonialService';

export const submitGiftingTestimonial = createAsyncThunk(
  'testimonials/submitGiftingTestimonial',
  submitTestimonial
);

export const fetchTestimonials = createAsyncThunk(
  'testimonials/fetchTestimonials',
  getTestimonials
);

export const fetchAdminTestimonials = createAsyncThunk(
  'testimonials/fetchAdminTestimonials',
  getAdminTestimonials
);

export const fetchAdminTestimonialById = createAsyncThunk(
  'testimonials/fetchAdminTestimonialById',
  getAdminTestimonial
);

export const changeTestimonialStatus = createAsyncThunk(
  'testimonials/changeTestimonialStatus',
  ({ id, payload }) => updateTestimonialStatus(id, payload)
);

const initialState = {
  items: [],
  status: 'idle',
  error: null,

  submitStatus: 'idle',
  submitError: null,

  adminItems: [],
  adminStatus: 'idle',
  adminCurrent: null,
  adminCurrentStatus: 'idle',

  statusUpdateStatus: 'idle',
  statusUpdateError: null,
};

const toList = (payload) => (Array.isArray(payload) ? payload : (payload?.content ?? []));

const testimonialsSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {
    clearSubmitStatus: (state) => {
      state.submitStatus = 'idle';
      state.submitError = null;
    },
    clearAdminCurrentTestimonial: (state) => {
      state.adminCurrent = null;
      state.adminCurrentStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonials.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchTestimonials.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = toList(action.payload);
      })
      .addCase(fetchTestimonials.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(submitGiftingTestimonial.pending, (state) => {
        state.submitStatus = 'loading';
        state.submitError = null;
      })
      .addCase(submitGiftingTestimonial.fulfilled, (state) => {
        state.submitStatus = 'succeeded';
      })
      .addCase(submitGiftingTestimonial.rejected, (state, action) => {
        state.submitStatus = 'failed';
        state.submitError = action.error.message;
      })

      .addCase(fetchAdminTestimonials.pending, (state) => {
        state.adminStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchAdminTestimonials.fulfilled, (state, action) => {
        state.adminStatus = 'succeeded';
        state.adminItems = toList(action.payload)
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      })
      .addCase(fetchAdminTestimonials.rejected, (state, action) => {
        state.adminStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchAdminTestimonialById.pending, (state) => {
        state.adminCurrentStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchAdminTestimonialById.fulfilled, (state, action) => {
        state.adminCurrentStatus = 'succeeded';
        state.adminCurrent = action.payload;
      })
      .addCase(fetchAdminTestimonialById.rejected, (state, action) => {
        state.adminCurrentStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(changeTestimonialStatus.pending, (state) => {
        state.statusUpdateStatus = 'loading';
        state.statusUpdateError = null;
      })
      .addCase(changeTestimonialStatus.fulfilled, (state, action) => {
        state.statusUpdateStatus = 'succeeded';
        state.adminItems = state.adminItems.map((t) =>
          t.id === action.payload.id ? action.payload : t
        );
        if (state.adminCurrent?.id === action.payload.id) {
          state.adminCurrent = action.payload;
        }
      })
      .addCase(changeTestimonialStatus.rejected, (state, action) => {
        state.statusUpdateStatus = 'failed';
        state.statusUpdateError = action.error.message;
      });
  },
});

export const { clearSubmitStatus, clearAdminCurrentTestimonial } = testimonialsSlice.actions;
export default testimonialsSlice.reducer;
