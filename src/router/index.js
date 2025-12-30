// router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '../store/auth';

import authRoutes from './routes/auth';
import mainRoutes from './routes/mainRoute';
import NotFound from '../pages/NotFound.vue';

const routes = [
  ...authRoutes,
  ...mainRoutes,
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound,
    meta: { title: '404 - Not Found' },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Middleware autentikasi
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const token = authStore.token || sessionStorage.getItem('token');
  const isAuthenticated = !!token;

  if (to.meta.requiresAuth && !isAuthenticated) {
    return next({ name: 'Login' });
  }

  if (to.meta.guestOnly && isAuthenticated) {
    return next({ name: 'Dashboard' });
  }

  next();
});

// Middleware title
router.afterEach((to) => {
  document.title = to.meta?.title || 'WMS App';
});

export default router;