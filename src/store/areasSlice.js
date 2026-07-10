import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAreas, createArea, updateArea, deleteArea } from '@/services/locationService';

export const fetchAreas = createAsyncThunk('areas/fetchAreas', getAreas);

export const addArea = createAsyncThunk('areas/addArea', createArea);

export const editArea = createAsyncThunk('areas/editArea', ({ id, payload }) =>
  updateArea(id, payload)
);

export const removeArea = createAsyncThunk('areas/removeArea', async (id) => {
  await deleteArea(id);
  return id;
});

const initialState = {
  items: [],
  status: 'idle',
  mutationStatus: 'idle',
  error: null,
};

const toList = (payload) => (Array.isArray(payload) ? payload : (payload?.content ?? []));

const areasSlice = createSlice({
  name: 'areas',
  initialState,
  reducers: {
    clearAreasError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAreas.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAreas.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = toList(action.payload);
      })
      .addCase(fetchAreas.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addArea.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(addArea.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addArea.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(editArea.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(editArea.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items = state.items.map((a) => (a.id === action.payload.id ? action.payload : a));
      })
      .addCase(editArea.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(removeArea.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(removeArea.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items = state.items.filter((a) => a.id !== action.payload);
      })
      .addCase(removeArea.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearAreasError } = areasSlice.actions;
export default areasSlice.reducer;
