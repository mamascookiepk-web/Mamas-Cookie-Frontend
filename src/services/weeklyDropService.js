import apiClient from '@/lib/axios';
import { API_ROUTES } from '@/constants/apiRoutes';

export const getWeeklyDropImages = () =>
  apiClient.get(API_ROUTES.WEEKLY_DROP.GET).then((res) => res.data);

export const uploadWeeklyDropImage = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return apiClient
    .post(API_ROUTES.WEEKLY_DROP.ADMIN_IMAGE, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    .then((res) => res.data);
};

export const deleteWeeklyDropImage = (id) =>
  apiClient.delete(API_ROUTES.WEEKLY_DROP.ADMIN_DELETE(id)).then((res) => res.data);
