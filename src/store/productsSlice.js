import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  getProductReviews,
  submitProductReview,
} from '@/services/productService';

export const fetchProducts = createAsyncThunk('products/fetchProducts', getProducts);

export const fetchProductById = createAsyncThunk('products/fetchProductById', getProduct);

export const addProduct = createAsyncThunk('products/addProduct', createProduct);

export const editProduct = createAsyncThunk('products/editProduct', ({ id, payload }) =>
  updateProduct(id, payload)
);

export const removeProduct = createAsyncThunk('products/removeProduct', async (id) => {
  await deleteProduct(id);
  return id;
});

export const uploadImage = createAsyncThunk('products/uploadImage', ({ id, file }) =>
  uploadProductImage(id, file)
);

export const fetchProductReviews = createAsyncThunk(
  'products/fetchProductReviews',
  ({ id, params }) => getProductReviews(id, params)
);

export const addProductReview = createAsyncThunk('products/addProductReview', ({ id, payload }) =>
  submitProductReview(id, payload)
);

const initialState = {
  items: [],
  pagination: null,
  status: 'idle',
  current: null,
  detailStatus: 'idle',
  reviews: [],
  reviewsPagination: null,
  reviewsStatus: 'idle',
  mutationStatus: 'idle',
  error: null,
};

const toList = (payload) => (Array.isArray(payload) ? payload : (payload?.content ?? []));

const toPagination = (payload) =>
  Array.isArray(payload)
    ? null
    : {
        page: payload?.number ?? 0,
        size: payload?.size ?? payload?.content?.length ?? 0,
        totalElements: payload?.totalElements ?? 0,
        totalPages: payload?.totalPages ?? 0,
      };

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearCurrentProduct: (state) => {
      state.current = null;
      state.detailStatus = 'idle';
      state.reviews = [];
      state.reviewsPagination = null;
      state.reviewsStatus = 'idle';
    },
    clearProductsError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = toList(action.payload);
        state.pagination = toPagination(action.payload);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchProductById.pending, (state) => {
        state.detailStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.detailStatus = 'succeeded';
        state.current = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.detailStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(addProduct.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items.unshift(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(editProduct.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items = state.items.map((p) => (p.id === action.payload.id ? action.payload : p));
        if (state.current?.id === action.payload.id) state.current = action.payload;
      })
      .addCase(editProduct.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(removeProduct.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(removeProduct.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items = state.items.filter((p) => p.id !== action.payload);
      })
      .addCase(removeProduct.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(uploadImage.pending, (state) => {
        state.mutationStatus = 'loading';
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.mutationStatus = 'succeeded';
        state.items = state.items.map((p) => (p.id === action.payload.id ? action.payload : p));
        if (state.current?.id === action.payload.id) state.current = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.mutationStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchProductReviews.pending, (state) => {
        state.reviewsStatus = 'loading';
      })
      .addCase(fetchProductReviews.fulfilled, (state, action) => {
        state.reviewsStatus = 'succeeded';
        state.reviews = toList(action.payload);
        state.reviewsPagination = toPagination(action.payload);
      })
      .addCase(fetchProductReviews.rejected, (state, action) => {
        state.reviewsStatus = 'failed';
        state.error = action.error.message;
      })

      .addCase(addProductReview.fulfilled, (state, action) => {
        state.reviews.unshift(action.payload);
      });
  },
});

export const { clearCurrentProduct, clearProductsError } = productsSlice.actions;
export default productsSlice.reducer;
