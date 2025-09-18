<template>
  <header class="flex items-center justify-between px-4 py-3 bg-white dark:bg-gray-800 shadow-md">
    <div class="flex items-center space-x-4">
      <!-- Mobile Toggle -->
      <button @click="$emit('toggleSidebar')" class="lg:hidden text-gray-600 dark:text-gray-300 cursor-pointer">
        <i class="fas fa-bars"></i>
      </button>

      <!-- Desktop Collapse -->
      <button @click="$emit('toggleCollapse')" class="hidden lg:block text-gray-600 dark:text-gray-300 cursor-pointer">
        <i class="fas" :class="isCollapsed ? 'fa-angle-double-right' : 'fa-angle-double-left'"></i>
      </button>

      <h1 class="font-bold">Dashboard</h1>
    </div>

    <div class="flex items-center space-x-4 relative">
      <!-- Dark mode toggle -->
      <button
        @click="$emit('toggleDarkMode')"
        class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer"
      >
        <i :class="isDark ? 'fas fa-sun text-yellow-400' : 'fas fa-moon text-gray-400'"></i>
      </button>

      <!-- Avatar dropdown -->
      <div class="relative" @click="toggleDropdown">
        <img
          src="/user.png" alt="User Avatar"
          class="w-10 h-10 rounded-full cursor-pointer border-2 border-gray-300 dark:border-gray-600"
        />
        <div
          v-if="dropdownOpen"
          class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg py-2 z-50"
        >
          <div class="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b dark:border-gray-600">
            {{ userName }}
          </div>
          <button
            @click="$emit('logout')"
            class="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
          >
          <i class="fas fa-sign-out"></i>
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue';

defineProps({ isDark: Boolean, isCollapsed: Boolean })

// Dropdown state
const dropdownOpen = ref(false)
const userName = ref('John Doe') // nanti bisa diambil dari store auth

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value
}

// Optional: klik luar untuk close dropdown
document.addEventListener('click', (e) => {
  if (!e.target.closest('.relative')) {
    dropdownOpen.value = false
  }
})
</script>
