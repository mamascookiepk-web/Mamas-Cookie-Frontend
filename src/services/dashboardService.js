import apiClient from '@/lib/axios';
import { API_ROUTES } from '@/constants/apiRoutes';

export const getDashboardStats = () =>
  apiClient.get(API_ROUTES.DASHBOARD.ADMIN_STATS).then((res) => res.data);
