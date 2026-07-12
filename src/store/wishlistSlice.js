import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getWishlist, addToWishlist, removeFromWishlist } from '@/services/wishlistService';
import { logout } from '@/store/authSlice';

export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', getWishlist);
export const addWishlistItem = createAsyncThunk('wishlist/addWishlistItem', addToWishlist);
export const removeWishlistItem = createAsyncThunk('wishlist/removeWishlistItem', removeFromWishlist);

const initialState = {
  productIds: [],
  status: 'idle',
  error: null,
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWishlist.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.productIds = action.payload;
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addWishlistItem.fulfilled, (state, action) => {
        if (!state.productIds.includes(action.payload)) {
          state.productIds.push(action.payload);
        }
      })

      .addCase(removeWishlistItem.fulfilled, (state, action) => {
        state.productIds = state.productIds.filter((id) => id !== action.payload);
      })

      .addCase(logout, (state) => {
        state.productIds = [];
        state.status = 'idle';
        state.error = null;
      });
  },
});

export default wishlistSlice.reducer;
