// api/authClient.js
import api from './axiosInstance';
import { useAuthStore } from '../store/auth';
import { isTokenExpired } from '../utils/token';

api.interceptors.request.use(async (config) => {
  const authStore = useAuthStore();

  if (authStore.token && !config.url.includes('/auth/refresh')) {
    if (isTokenExpired(authStore.token)) {
      const success = await authStore.refreshAccessToken();
      if (!success) {
        authStore.logout();
        return Promise.reject(new Error('Token expired & refresh gagal'));
      }
    }

    config.headers.Authorization = `Bearer ${authStore.token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const authStore = useAuthStore();
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      authStore.refreshToken &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;

      const success = await authStore.refreshAccessToken();
      if (success) {
        originalRequest.headers.Authorization = `Bearer ${authStore.token}`;
        return api(originalRequest);
      } else {
        authStore.logout();
        return Promise.reject(new Error('Refresh token gagal'));
      }
    }

    return Promise.reject(error);
  }
);

export default api;