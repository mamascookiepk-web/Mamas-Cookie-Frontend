import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/services/categoryService';

export const fetchCategories = createAsyncThunk('categories/fetchCategories', getCategories);

export const addCategory = createAsyncThunk('categories/addCategory', createCategory);

export const editCategory = createAsyncThunk('categories/editCategory', ({ id, payload }) =>
  updateCategory(id, payload)
);

export const removeCategory = createAsyncThunk('categories/removeCategory', async (id) => {
  await deleteCategory(id);
  return id;
});

const initialState = {
  items: [],
  status: 'idle',
  mutationStatus: 'idle',
  error: null,
};

const toList = (payload) => (Array.isArray(payload) ? payload : (payload?.content ?? []));

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    clearCategoriesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = toList(action.payload);
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addCategory.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(addCategory.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addCategory.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(editCategory.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items = state.items.map((c) => (c.id === action.payload.id ? action.payload : c));
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(removeCategory.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(removeCategory.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items = state.items.filter((c) => c.id !== action.payload);
      })
      .addCase(removeCategory.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { clearCategoriesError } = categoriesSlice.actions;
export default categoriesSlice.reducer;
