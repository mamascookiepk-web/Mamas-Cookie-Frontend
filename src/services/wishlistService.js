import apiClient from '@/lib/axios';
import { API_ROUTES } from '@/constants/apiRoutes';

export const getWishlist = () =>
  apiClient.get(API_ROUTES.WISHLIST.LIST).then((res) => res.data);

export const addToWishlist = (productId) =>
  apiClient.post(API_ROUTES.WISHLIST.ADD(productId)).then(() => productId);

export const removeFromWishlist = (productId) =>
  apiClient.delete(API_ROUTES.WISHLIST.REMOVE(productId)).then(() => productId);
