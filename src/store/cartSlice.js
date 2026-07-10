import { createSlice } from '@reduxjs/toolkit';

const storedCart = localStorage.getItem('mc_cart');

const initialState = {
  items: storedCart ? JSON.parse(storedCart) : [],
  isOpen: false,
};

const persist = (items) => localStorage.setItem('mc_cart', JSON.stringify(items));

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { product, quantity = 1, instructions = '', variant = null } = action.payload;
      const variantId = variant?.id ?? null;
      const price = variant ? variant.price : product.price;
      const existing = state.items.find(
        (item) => item.productId === product.id && item.variantId === variantId
      );
      if (existing) {
        existing.quantity += quantity;
        if (instructions) existing.instructions = instructions;
      } else {
        state.items.push({
          productId: product.id,
          variantId,
          variantLabel: variant?.label ?? null,
          name: product.name,
          price,
          imageUrl: product.imageUrl,
          quantity,
          instructions,
        });
      }
      persist(state.items);
    },
    removeItem: (state, action) => {
      const { productId, variantId = null } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.productId === productId && item.variantId === variantId)
      );
      persist(state.items);
    },
    updateQuantity: (state, action) => {
      const { productId, variantId = null, quantity } = action.payload;
      const item = state.items.find(
        (i) => i.productId === productId && i.variantId === variantId
      );
      if (item) {
        item.quantity = Math.max(1, quantity);
      }
      persist(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      persist(state.items);
    },
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart, openCart, closeCart } =
  cartSlice.actions;
export default cartSlice.reducer;
