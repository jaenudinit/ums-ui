<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
    <!-- Sidebar -->
    <!-- <Sidebar
      :isOpen="sidebarOpen"
      :isCollapsed="isCollapsed"
      :isMobile="isMobile"
      @close="sidebarOpen = false"
      @logout="handleLogout"
    /> -->

    <Sidebar
      :isOpen="sidebarOpen"
      :isCollapsed="isCollapsed"
      :isMobile="isMobile"
      :menus="menuStore.items"
      @close="sidebarOpen = false"
      @logout="handleLogout"
    />

    <!-- Overlay untuk mobile -->
    <div
      v-if="sidebarOpen && isMobile"
      class="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
      @click="sidebarOpen = false"
    ></div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Navbar -->
      <Navbar
        @toggleSidebar="handleSidebarToggle"
        @toggleCollapse="toggleCollapse"
        @toggleDarkMode="toggleDarkMode"
        @logout="handleLogout"
        :isDark="isDark"
        :isCollapsed="isCollapsed"
      />

      <!-- Page Content -->
      <main class="flex-1 overflow-y-auto p-4 md:p-6">
        <router-view />
      </main>

      <!-- Footer -->
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue';
import Sidebar from '../components/Sidebar.vue';
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import { useMenuStore } from '../store/menu';

const authStore = useAuthStore();
const router = useRouter();
const menuStore = useMenuStore();

const sidebarOpen = ref(true);
const isCollapsed = ref(false);
const isMobile = ref(window.innerWidth < 1024);

const handleResize = () => {
  isMobile.value = window.innerWidth < 1024;
  if (isMobile.value) {
    sidebarOpen.value = false;
    isCollapsed.value = false;
  } else {
    sidebarOpen.value = true;
  }
};

const handleSidebarToggle = () => {
  if (isMobile.value) {
    sidebarOpen.value = !sidebarOpen.value;
  }
};

const toggleCollapse = () => {
  if (!isMobile.value) {
    isCollapsed.value = !isCollapsed.value;
  }
};


//#region Dark Mode
const storedTheme = localStorage.getItem('theme');
const isDark = ref(storedTheme ? storedTheme === 'dark' : false);

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light');
};

watch(isDark, (val) => {
  document.documentElement.classList.toggle('dark', val);
});

onMounted(async () => {
  handleResize();
  window.addEventListener('resize', handleResize);
  document.documentElement.classList.toggle('dark', isDark.value);

  await menuStore.fetchMenu(); // 🔥 ambil menu saat layout dimount
  
});

//#endregion

//#region Logout Functionality
import Swal from 'sweetalert2';
const handleLogout = async () => {
  const result = await Swal.fire({
    title: 'Logout?',
    text: 'Apakah Anda yakin ingin keluar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Ya, Logout',
    customClass: {
        popup: 'swal-small',
        title: 'swal-title',
        content: 'swal-text',
        confirmButton: 'swal-confirm',
        cancelButton: 'swal-confirm',
        icon: 'swal-icon'
      }
  });

  if (result.isConfirmed) {
    await authStore.logout();
    router.push('/');
  }
};
//#endregion



onUnmounted(() => window.removeEventListener('resize', handleResize));
</script>