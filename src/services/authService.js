import apiClient from '@/lib/axios';
import { API_ROUTES } from '@/constants/apiRoutes';

export const checkEmail = (email) =>
  apiClient.post(API_ROUTES.AUTH.CHECK_EMAIL, { email }).then((res) => res.data);

export const requestOtp = (payload) =>
  apiClient.post(API_ROUTES.AUTH.REQUEST_OTP, payload).then((res) => res.data);

export const verifyOtp = ({ email, otp }) =>
  apiClient.post(API_ROUTES.AUTH.VERIFY_OTP, { email, otp }).then((res) => res.data);

export const adminLogin = ({ email, password }) =>
  apiClient.post(API_ROUTES.AUTH.ADMIN_LOGIN, { email, password }).then((res) => res.data);

export const getMe = () => apiClient.get(API_ROUTES.USERS.ME).then((res) => res.data);

export const updateMe = (payload) =>
  apiClient.put(API_ROUTES.USERS.ME, payload).then((res) => res.data);
