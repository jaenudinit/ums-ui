import { defineStore } from 'pinia';
import { authClient } from '../api'; // ✅ gunakan client modular
import { useMenuStore } from './menu';
import { isTokenExpired } from '../utils/token';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: sessionStorage.getItem('token') || '',
    refreshToken: sessionStorage.getItem('refreshToken') || '',
    user: null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token && !isTokenExpired(state.token),
  },

  actions: {
    async init() {
      if (this.token && isTokenExpired(this.token)) {
        const success = await this.refreshAccessToken();

        if (!success) {
          this.logout(); // 🔐 jika refresh gagal, logout paksa
        }
      }
    },

    async login(username, password) {
      try {
        const res = await authClient.post('/auth/login', { username, password });

        if (res.data.status === 200 && res.data.data.accessToken) {
          this.setTokens(res.data.data.accessToken, res.data.data.refreshToken);

          // Optional: load user profile if available
          if (res.data.data.user) {
            this.user = res.data.data.user;
          }

          // Load menu after login
          const menuStore = useMenuStore();
          await menuStore.fetchMenu(true);

          return { success: true };
        }

        return {
          success: false,
          message: res.data.message || 'Login gagal',
        };
      } catch (error) {
        console.error('Login error:', error);
        return {
          success: false,
          message: error.response?.data?.message || 'Tidak bisa terhubung ke server',
        };
      }
    },

    setTokens(accessToken, refreshToken) {
      this.token = accessToken;
      this.refreshToken = refreshToken;

      sessionStorage.setItem('token', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
    },

    async refreshAccessToken() {
      try {
        const res = await authClient.post('/auth/refresh', {
          token: this.refreshToken,
        });

        if (res.data.status === 200 && res.data.data?.accessToken) {
          this.token = res.data.data.accessToken;
          sessionStorage.setItem('token', this.token);
          return true;
        } else {
          this.logout();
          return false;
        }
      } catch (error) {
        console.error('Refresh token error:', error);
        this.logout();
        return false;
      }
    },

    async logout() {
      try {
        if (this.refreshToken) {
          await authClient.post('/auth/logout', {
            token: this.refreshToken,
          });
        }
      } catch (error) {
        console.error('Logout error:', error);
      }

      const menuStore = useMenuStore();
      menuStore.clearMenu();
      this.clearTokens();
    },

    clearTokens() {
      this.token = '';
      this.refreshToken = '';
      this.user = null;
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('refreshToken');
    },
  },
});