import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  createOrder,
  getOrders,
  getOrder,
  getAdminOrders,
  getAdminOrder,
  updateOrderStatus,
} from '@/services/orderService';

export const placeOrder = createAsyncThunk('orders/placeOrder', createOrder);

export const fetchMyOrders = createAsyncThunk('orders/fetchMyOrders', getOrders);

export const fetchMyOrderById = createAsyncThunk('orders/fetchMyOrderById', getOrder);

export const fetchAdminOrders = createAsyncThunk('orders/fetchAdminOrders', getAdminOrders);

export const fetchAdminOrderById = createAsyncThunk('orders/fetchAdminOrderById', getAdminOrder);

export const changeOrderStatus = createAsyncThunk(
  'orders/changeOrderStatus',
  ({ id, payload }) => updateOrderStatus(id, payload)
);

const initialState = {
  myOrders: [],
  myOrdersStatus: 'idle',
  currentOrder: null,
  currentOrderStatus: 'idle',

  adminOrders: [],
  adminOrdersStatus: 'idle',
  adminCurrentOrder: null,
  adminCurrentOrderStatus: 'idle',

  placeStatus: 'idle',
  placeError: null,
  statusUpdateStatus: 'idle',
  statusUpdateError: null,

  error: null,
};

const toList = (payload) => (Array.isArray(payload) ? payload : (payload?.content ?? []));

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
      state.currentOrderStatus = 'idle';
    },
    clearAdminCurrentOrder: (state) => {
      state.adminCurrentOrder = null;
      state.adminCurrentOrderStatus = 'idle';
    },
    clearPlaceError: (state) => {
      state.placeError = null;
    },
    clearOrdersError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.placeStatus = 'loading';
        state.placeError = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.placeStatus = 'succeeded';
        state.myOrders.unshift(action.payload);
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.placeStatus = 'failed';
        state.placeError = action.error.message;
      })

      .addCase(fetchMyOrders.pending, (state) => {
        state.myOrdersStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action) => {
        state.myOrdersStatus = 'succeeded';
        state.myOrders = toList(action.payload)
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      })
      .addCase(fetchMyOrders.rejected, (state, action) => {
        state.myOrdersStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchMyOrderById.pending, (state) => {
        state.currentOrderStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchMyOrderById.fulfilled, (state, action) => {
        state.currentOrderStatus = 'succeeded';
        state.currentOrder = action.payload;
      })
      .addCase(fetchMyOrderById.rejected, (state, action) => {
        state.currentOrderStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchAdminOrders.pending, (state) => {
        state.adminOrdersStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchAdminOrders.fulfilled, (state, action) => {
        state.adminOrdersStatus = 'succeeded';
        state.adminOrders = toList(action.payload)
          .slice()
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      })
      .addCase(fetchAdminOrders.rejected, (state, action) => {
        state.adminOrdersStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchAdminOrderById.pending, (state) => {
        state.adminCurrentOrderStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchAdminOrderById.fulfilled, (state, action) => {
        state.adminCurrentOrderStatus = 'succeeded';
        state.adminCurrentOrder = action.payload;
      })
      .addCase(fetchAdminOrderById.rejected, (state, action) => {
        state.adminCurrentOrderStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(changeOrderStatus.pending, (state) => {
        state.statusUpdateStatus = 'loading';
        state.statusUpdateError = null;
      })
      .addCase(changeOrderStatus.fulfilled, (state, action) => {
        state.statusUpdateStatus = 'succeeded';
        state.adminOrders = state.adminOrders.map((o) =>
          o.id === action.payload.id ? action.payload : o
        );
        if (state.adminCurrentOrder?.id === action.payload.id) {
          state.adminCurrentOrder = action.payload;
        }
      })
      .addCase(changeOrderStatus.rejected, (state, action) => {
        state.statusUpdateStatus = 'failed';
        state.statusUpdateError = action.error.message;
      });
  },
});

export const {
  clearCurrentOrder,
  clearAdminCurrentOrder,
  clearPlaceError,
  clearOrdersError,
} = ordersSlice.actions;
export default ordersSlice.reducer;
