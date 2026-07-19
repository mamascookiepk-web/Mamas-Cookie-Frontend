import apiClient from '@/lib/axios';
import { API_ROUTES } from '@/constants/apiRoutes';

export const getActiveGstRate = () =>
  apiClient.get(API_ROUTES.GST.ACTIVE).then((res) => res.data);

export const getGstRates = () =>
  apiClient.get(API_ROUTES.GST.ADMIN_LIST).then((res) => res.data);

export const createGstRate = (payload) =>
  apiClient.post(API_ROUTES.GST.ADMIN_CREATE, payload).then((res) => res.data);

export const updateGstRate = (id, payload) =>
  apiClient.put(API_ROUTES.GST.ADMIN_UPDATE(id), payload).then((res) => res.data);

export const deleteGstRate = (id) =>
  apiClient.delete(API_ROUTES.GST.ADMIN_DELETE(id)).then((res) => res.data);
