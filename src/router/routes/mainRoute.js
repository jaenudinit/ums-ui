// router/routes/mainRoute.js
import MainLayout from '../../layouts/MainLayout.vue';

// Pages
import Dashboard from '../../pages/Dashboard.vue';
import Users from '../../pages/User.vue';
import Roles from '../../pages/Role.vue';
import Permissions from '../../pages/Permission.vue';
import Menus from '../../pages/Menu.vue';
import UserRoles from '../../pages/UserRoles.vue';
import RolePermissions from '../../pages/RolePermissions.vue';

export default [
  {
    path: '/',
    component: MainLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { title: 'Dashboard - UMS' },
      },
      {
        path: 'users',
        name: 'Users',
        component: Users,
        meta: { title: 'User - UMS' },
      },
      {
        path: 'roles',
        name: 'Roles',
        component: Roles,
        meta: { title: 'Role - UMS' },
      },
      {
        path: 'permissions',
        name: 'Permissions',
        component: Permissions,
        meta: { title: 'Permissions - UMS' },
      },
      {
        path: 'menus',
        name: 'Menus',
        component: Menus,
        meta: { title: 'Menus - UMS' },
      },
      {
        path: 'user-roles',
        name: 'UserRoles',
        component: UserRoles,
        meta: { title: 'User Roles - UMS' },
      },
      {
        path: 'role-permissions',
        name: 'RolePermissions',
        component: RolePermissions,
        meta: { title: 'Role Permissions - UMS' },
      }
    ],
  },
];