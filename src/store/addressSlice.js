import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getAddresses,
  createAddress,
  updateAddress,
  deleteAddress,
  setDefaultAddress,
} from '@/services/locationService';

export const fetchAddresses = createAsyncThunk('addresses/fetchAddresses', getAddresses);

export const addAddress = createAsyncThunk('addresses/addAddress', createAddress);

export const editAddress = createAsyncThunk('addresses/editAddress', ({ id, payload }) =>
  updateAddress(id, payload)
);

export const removeAddress = createAsyncThunk('addresses/removeAddress', async (id) => {
  await deleteAddress(id);
  return id;
});

export const makeDefaultAddress = createAsyncThunk('addresses/makeDefaultAddress', (id) =>
  setDefaultAddress(id)
);

const initialState = {
  items: [],
  status: 'idle',
  mutationStatus: 'idle',
  error: null,
};

const toList = (payload) => (Array.isArray(payload) ? payload : (payload?.content ?? []));

const addressSlice = createSlice({
  name: 'addresses',
  initialState,
  reducers: {
    clearAddressesError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddresses.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = toList(action.payload);
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addAddress.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items.push(action.payload);
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(editAddress.fulfilled, (state, action) => {
        state.items = state.items.map((a) => (a.id === action.payload.id ? action.payload : a));
      })

      .addCase(removeAddress.fulfilled, (state, action) => {
        state.items = state.items.filter((a) => a.id !== action.payload);
      })

      .addCase(makeDefaultAddress.fulfilled, (state, action) => {
        state.items = state.items.map((a) => ({
          ...a,
          default: a.id === action.payload.id,
        }));
      });
  },
});

export const { clearAddressesError } = addressSlice.actions;
export default addressSlice.reducer;
