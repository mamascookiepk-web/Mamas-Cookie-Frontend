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
    setDelivery: (state, action) => {
      const { area, address } = action.payload;
      state.orderType = 'DELIVERY';
      state.area = area;
      state.address = address;
      state.pickupCenter = null;
      persist(state);
    },
    setPickup: (state, action) => {
      state.orderType = 'PICKUP';
      state.pickupCenter = action.payload;
      state.area = null;
      state.address = null;
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

export const { setDelivery, setPickup, clearLocalOrder } = localOrderSlice.actions;
export default localOrderSlice.reducer;
