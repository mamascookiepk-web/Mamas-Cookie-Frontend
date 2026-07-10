import apiClient from '@/lib/axios';
import { API_ROUTES } from '@/constants/apiRoutes';

export const getCategories = () =>
  apiClient.get(API_ROUTES.CATEGORIES.LIST).then((res) => res.data);

export const createCategory = (payload) =>
  apiClient.post(API_ROUTES.CATEGORIES.ADMIN_CREATE, payload).then((res) => res.data);

export const updateCategory = (id, payload) =>
  apiClient.put(API_ROUTES.CATEGORIES.ADMIN_UPDATE(id), payload).then((res) => res.data);

export const deleteCategory = (id) =>
  apiClient.delete(API_ROUTES.CATEGORIES.ADMIN_DELETE(id)).then((res) => res.data);
