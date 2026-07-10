import apiClient from '@/lib/axios';
import { API_ROUTES } from '@/constants/apiRoutes';

export const submitGiftingRequest = (payload) =>
  apiClient.post(API_ROUTES.GIFTING.CREATE, payload).then((res) => res.data);

export const getAdminGiftingRequests = (params) =>
  apiClient.get(API_ROUTES.GIFTING.ADMIN_LIST, { params }).then((res) => res.data);

export const getAdminGiftingRequest = (id) =>
  apiClient.get(API_ROUTES.GIFTING.ADMIN_DETAIL(id)).then((res) => res.data);

export const updateGiftingStatus = (id, payload) =>
  apiClient.put(API_ROUTES.GIFTING.ADMIN_STATUS(id), payload).then((res) => res.data);
