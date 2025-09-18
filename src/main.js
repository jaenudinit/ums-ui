import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia'
import { authClient } from './api';
import './assets/tailwind.css';
import { useAuthStore } from './store/auth';

const app = createApp(App);
const pinia = createPinia();

app.use(pinia);
app.use(router);

// 🔐 Inisialisasi token saat startup
const authStore = useAuthStore();
authStore.init();

// 🌐 Global API client
app.config.globalProperties.$axios = authClient;

app.mount('#app');