// router/routes/auth.js
import Login from '../../pages/Login.vue';

export default [
  {
    path: '/',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login - WMS',
      guestOnly: true,
    },
  },
];