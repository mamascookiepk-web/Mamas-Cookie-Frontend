import { createSlice } from '@reduxjs/toolkit';

const stored = localStorage.getItem('mc_local_order');

const initialState = stored
  ? JSON.parse(stored)
  : { orderType: null, area: null, address: null, pickupCenter: null };

const persist = (state) => localStorage.setItem('mc_local_order', JSON.stringify(state));

const localOrderSlice = createSlice({
  name: 'localOrder',
  initialState,
  reducers: {
    // Chosen at the /local gate - just the delivery area, no address yet.
    setDeliveryArea: (state, action) => {
      state.orderType = 'DELIVERY';
      state.area = action.payload;
      state.pickupCenter = null;
      state.address = null;
      persist(state);
    },
    setPickup: (state, action) => {
      state.orderType = 'PICKUP';
      state.pickupCenter = action.payload;
      state.area = null;
      state.address = null;
      persist(state);
    },
    // Resolved later, at checkout time, once the customer is logged in.
    setDeliveryAddress: (state, action) => {
      state.address = action.payload;
      if (action.payload?.area) {
        state.area = action.payload.area;
      }
      persist(state);
    },
    clearLocalOrder: (state) => {
      state.orderType = null;
      state.area = null;
      state.address = null;
      state.pickupCenter = null;
      persist(state);
    },
  },
});

export const { setDeliveryArea, setPickup, setDeliveryAddress, clearLocalOrder } =
  localOrderSlice.actions;
export default localOrderSlice.reducer;
