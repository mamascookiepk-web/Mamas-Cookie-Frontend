import apiClient from '@/lib/axios';
import { API_ROUTES } from '@/constants/apiRoutes';

export const getAreas = () => apiClient.get(API_ROUTES.AREAS.LIST).then((res) => res.data);

export const createArea = (payload) =>
  apiClient.post(API_ROUTES.AREAS.ADMIN_CREATE, payload).then((res) => res.data);

export const updateArea = (id, payload) =>
  apiClient.put(API_ROUTES.AREAS.ADMIN_UPDATE(id), payload).then((res) => res.data);

export const deleteArea = (id) =>
  apiClient.delete(API_ROUTES.AREAS.ADMIN_DELETE(id)).then((res) => res.data);

export const getPickupCenters = () =>
  apiClient.get(API_ROUTES.PICKUP_CENTERS.LIST).then((res) => res.data);

export const createPickupCenter = (payload) =>
  apiClient.post(API_ROUTES.PICKUP_CENTERS.ADMIN_CREATE, payload).then((res) => res.data);

export const updatePickupCenter = (id, payload) =>
  apiClient.put(API_ROUTES.PICKUP_CENTERS.ADMIN_UPDATE(id), payload).then((res) => res.data);

export const deletePickupCenter = (id) =>
  apiClient.delete(API_ROUTES.PICKUP_CENTERS.ADMIN_DELETE(id)).then((res) => res.data);

export const getAddresses = () =>
  apiClient.get(API_ROUTES.ADDRESSES.LIST).then((res) => res.data);

export const createAddress = (payload) =>
  apiClient.post(API_ROUTES.ADDRESSES.LIST, payload).then((res) => res.data);

export const updateAddress = (id, payload) =>
  apiClient.put(API_ROUTES.ADDRESSES.DETAIL(id), payload).then((res) => res.data);

export const deleteAddress = (id) =>
  apiClient.delete(API_ROUTES.ADDRESSES.DETAIL(id)).then((res) => res.data);

export const setDefaultAddress = (id) =>
  apiClient.put(API_ROUTES.ADDRESSES.SET_DEFAULT(id)).then((res) => res.data);
