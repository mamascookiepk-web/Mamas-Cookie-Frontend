import apiClient from '@/lib/axios';
import { API_ROUTES } from '@/constants/apiRoutes';

export const submitContactMessage = (payload) =>
  apiClient.post(API_ROUTES.CONTACT.CREATE, payload).then((res) => res.data);
