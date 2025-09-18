import { defineStore } from 'pinia';
import { authClient } from '../api'; // ✅ gunakan client modular

export const useMenuStore = defineStore('menu', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('menu') || '[]'),
    loaded: false, // 🔄 status apakah menu sudah dimuat
  }),

  actions: {
    async fetchMenu(force = false) {
      // ⛔ Skip jika sudah dimuat dan tidak dipaksa refresh
      if (this.loaded && this.items.length > 0 && !force) {
        return this.items;
      }

      try {
        const res = await authClient.get('/get-user-menu');

        if (res.data.status === 200 && Array.isArray(res.data.data)) {
          this.items = res.data.data;
          this.loaded = true;
          localStorage.setItem('menu', JSON.stringify(this.items));
        } else {
          this.clearMenu();
        }

        return this.items;
      } catch (error) {
        console.error('Menu fetch error:', error);
        this.clearMenu();
        throw error;
      }
    },

    clearMenu() {
      this.items = [];
      this.loaded = false;
      localStorage.removeItem('menu');
    },
  },
});