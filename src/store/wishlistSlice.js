import { createSlice } from '@reduxjs/toolkit';

const storedWishlist = localStorage.getItem('mc_wishlist');

const initialState = {
  productIds: storedWishlist ? JSON.parse(storedWishlist) : [],
};

const persist = (ids) => localStorage.setItem('mc_wishlist', JSON.stringify(ids));

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action) => {
      const productId = action.payload;
      if (state.productIds.includes(productId)) {
        state.productIds = state.productIds.filter((id) => id !== productId);
      } else {
        state.productIds.push(productId);
      }
      persist(state.productIds);
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
