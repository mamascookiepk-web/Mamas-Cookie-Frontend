import apiClient from '@/lib/axios';
import { API_ROUTES } from '@/constants/apiRoutes';

export const getMonthlyDrop = () =>
  apiClient.get(API_ROUTES.MONTHLY_DROP.GET).then((res) => res.data);

export const uploadMonthlyDropImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return apiClient
    .post(API_ROUTES.MONTHLY_DROP.ADMIN_IMAGE, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data);
};
