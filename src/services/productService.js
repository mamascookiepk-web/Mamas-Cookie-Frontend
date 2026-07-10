import apiClient from '@/lib/axios';
import { API_ROUTES } from '@/constants/apiRoutes';

export const getProducts = (params) =>
  apiClient.get(API_ROUTES.PRODUCTS.LIST, { params }).then((res) => res.data);

export const getProduct = (id) =>
  apiClient.get(API_ROUTES.PRODUCTS.DETAIL(id)).then((res) => res.data);

export const createProduct = (payload) =>
  apiClient.post(API_ROUTES.PRODUCTS.ADMIN_CREATE, payload).then((res) => res.data);

export const updateProduct = (id, payload) =>
  apiClient.put(API_ROUTES.PRODUCTS.ADMIN_UPDATE(id), payload).then((res) => res.data);

export const deleteProduct = (id) =>
  apiClient.delete(API_ROUTES.PRODUCTS.ADMIN_DELETE(id)).then((res) => res.data);

export const uploadProductImage = (id, file) => {
  const formData = new FormData();
  formData.append('file', file);
  return apiClient
    .post(API_ROUTES.PRODUCTS.ADMIN_IMAGE(id), formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data);
};

export const getProductReviews = (id, params) =>
  apiClient.get(API_ROUTES.PRODUCTS.REVIEWS(id), { params }).then((res) => res.data);

export const submitProductReview = (id, payload) =>
  apiClient.post(API_ROUTES.PRODUCTS.REVIEWS(id), payload).then((res) => res.data);
