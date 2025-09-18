// router/routes/mainRoute.js
import MainLayout from '../../layouts/MainLayout.vue';

// Pages
import Dashboard from '../../pages/Dashboard.vue';
import Settings from '../../pages/StockIn.vue';
import Picking from '../../pages/Picking.vue';
import Packing from '../../pages/Packing.vue';
import Shipment from '../../pages/Shipment.vue';
import Retur from '../../pages/Retur.vue';
// import Inventory from '../../pages/Inventory.vue'; // Contoh tambahan

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
        meta: { title: 'Dashboard - WMS' },
      },
      {
        path: 'stockin',
        name: 'Stock In',
        component: Settings,
        meta: { title: 'Stock In - WMS' },
      },
      {
        path: 'picking',
        name: 'Picking',
        component: Picking,
        meta: { title: 'Picking - WMS' },
      },
      {
        path: 'packing',
        name: 'Packing',
        component: Packing,
        meta: { title: 'Packing - WMS' },
      },
      {
        path: 'shipment',
        name: 'Shipment',
        component: Shipment,
        meta: { title: 'Shipment - WMS' },
      },
      {
        path: 'retur',
        name: 'Retur',
        component: Retur,
        meta: { title: 'Retur - WMS' },
      }
    ],
  },
];