import { useSelector, useDispatch } from 'react-redux';
import {
  fetchProducts,
  fetchProductById,
  addProduct,
  editProduct,
  removeProduct,
  uploadImage,
  fetchProductReviews,
  addProductReview,
  clearCurrentProduct,
  clearProductsError,
  clearReviewSubmitStatus,
} from '@/store/productsSlice';

export const useProducts = () => {
  const dispatch = useDispatch();
  const state = useSelector((s) => s.products);

  return {
    items: state.items,
    pagination: state.pagination,
    status: state.status,
    current: state.current,
    detailStatus: state.detailStatus,
    reviews: state.reviews,
    reviewsPagination: state.reviewsPagination,
    reviewsStatus: state.reviewsStatus,
    reviewSubmitStatus: state.reviewSubmitStatus,
    reviewSubmitError: state.reviewSubmitError,
    mutationStatus: state.mutationStatus,
    error: state.error,

    fetchProducts: (params) => dispatch(fetchProducts(params)),
    fetchProductById: (id) => dispatch(fetchProductById(id)),
    addProduct: (payload) => dispatch(addProduct(payload)),
    editProduct: (id, payload) => dispatch(editProduct({ id, payload })),
    removeProduct: (id) => dispatch(removeProduct(id)),
    uploadImage: (id, file) => dispatch(uploadImage({ id, file })),
    fetchProductReviews: (id, params) => dispatch(fetchProductReviews({ id, params })),
    addProductReview: (id, payload) => dispatch(addProductReview({ id, payload })),
    clearCurrentProduct: () => dispatch(clearCurrentProduct()),
    clearProductsError: () => dispatch(clearProductsError()),
    clearReviewSubmitStatus: () => dispatch(clearReviewSubmitStatus()),
  };
};
