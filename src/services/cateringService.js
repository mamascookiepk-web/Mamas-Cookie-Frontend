import apiClient from '@/lib/axios';
import { API_ROUTES } from '@/constants/apiRoutes';

export const submitCateringRequest = (payload) =>
  apiClient.post(API_ROUTES.CATERING.CREATE, payload).then((res) => res.data);

export const getAdminCateringRequests = (params) =>
  apiClient.get(API_ROUTES.CATERING.ADMIN_LIST, { params }).then((res) => res.data);

export const getAdminCateringRequest = (id) =>
  apiClient.get(API_ROUTES.CATERING.ADMIN_DETAIL(id)).then((res) => res.data);

export const updateCateringStatus = (id, payload) =>
  apiClient.put(API_ROUTES.CATERING.ADMIN_STATUS(id), payload).then((res) => res.data);
