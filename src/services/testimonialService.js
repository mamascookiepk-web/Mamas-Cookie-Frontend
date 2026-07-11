import apiClient from '@/lib/axios';
import { API_ROUTES } from '@/constants/apiRoutes';

export const submitTestimonial = (payload) =>
  apiClient.post(API_ROUTES.TESTIMONIALS.CREATE, payload).then((res) => res.data);

export const getTestimonials = () =>
  apiClient.get(API_ROUTES.TESTIMONIALS.LIST).then((res) => res.data);

export const getAdminTestimonials = (params) =>
  apiClient.get(API_ROUTES.TESTIMONIALS.ADMIN_LIST, { params }).then((res) => res.data);

export const getAdminTestimonial = (id) =>
  apiClient.get(API_ROUTES.TESTIMONIALS.ADMIN_DETAIL(id)).then((res) => res.data);

export const updateTestimonialStatus = (id, payload) =>
  apiClient.put(API_ROUTES.TESTIMONIALS.ADMIN_STATUS(id), payload).then((res) => res.data);
