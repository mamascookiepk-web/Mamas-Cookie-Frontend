import apiClient from '@/lib/axios';
import { API_ROUTES } from '@/constants/apiRoutes';

export const createOrder = (payload) =>
  apiClient.post(API_ROUTES.ORDERS.CREATE, payload).then((res) => res.data);

export const getOrders = (params) =>
  apiClient.get(API_ROUTES.ORDERS.LIST, { params }).then((res) => res.data);

export const getOrder = (id) =>
  apiClient.get(API_ROUTES.ORDERS.DETAIL(id)).then((res) => res.data);

export const getAdminOrders = (params) =>
  apiClient.get(API_ROUTES.ORDERS.ADMIN_LIST, { params }).then((res) => res.data);

export const getAdminOrder = (id) =>
  apiClient.get(API_ROUTES.ORDERS.ADMIN_DETAIL(id)).then((res) => res.data);

export const updateOrderStatus = (id, payload) =>
  apiClient.put(API_ROUTES.ORDERS.ADMIN_STATUS(id), payload).then((res) => res.data);
