import axios from 'axios';
import { API_BASE_URL } from '@/constants/apiRoutes';
import { isTokenExpired } from '@/utils/jwt';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

/**
 * Wipe the stored session and tell the app to reset its auth state.
 * The listener lives in App.jsx and dispatches the Redux `logout` so the
 * navbar flips back to Sign in / Register immediately (no page reload needed).
 */
function forceLogout() {
  if (!localStorage.getItem('mc_token')) return;
  localStorage.removeItem('mc_token');
  localStorage.removeItem('mc_user');
  window.dispatchEvent(new Event('auth:expired'));
}

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('mc_token');
  if (token && isTokenExpired(token)) {
    // Don't bother sending a token we already know is dead — sign out instead.
    forceLogout();
    return config;
  }
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    // A 401/403 on a token we can no longer trust means the session lapsed —
    // clear it so the user is prompted to sign in again instead of seeing a
    // stale logged-in UI that 403s on the next action (e.g. checkout).
    if (status === 401 || status === 403) {
      const token = localStorage.getItem('mc_token');
      if (!token || isTokenExpired(token)) {
        forceLogout();
      }
    }
    const message = error.response?.data?.message || error.message || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
