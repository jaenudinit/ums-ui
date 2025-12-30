<template>
  <aside
    :class="[ 
      'bg-white dark:bg-gray-800 shadow-lg h-screen fixed lg:static z-40 transition-all duration-300',
      isMobile ? (isOpen ? 'w-64' : '-ml-64') : isCollapsed ? 'w-16' : 'w-64'
    ]"
  >
    <!-- Header -->
    <div class="flex items-center justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
      <span v-if="!isCollapsed" class="font-bold text-lg inline-flex items-center">
        <img src="../../public/icon-ums.webp" width="48" alt=""> &nbsp; UM System
      </span>
      <span v-else class="text-2xl text-blue-600">
        <img src="../../public/icon-ums.webp" :style="{ maxWidth: '48px', marginLeft: '-10px' }" alt="">
      </span>

      <button @click="$emit('close')" class="lg:hidden text-gray-600 dark:text-gray-300 cursor-pointer">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <!-- Navigation -->
    <nav class="space-y-2 overflow-auto" :style="{ height: 'calc(100vh - 70px)' }">
      <SidebarItem
        v-for="(menu, index) in menus"
        :key="index"
        :item="menu"
        :is-collapsed="isCollapsed"
      />

      <!-- Logout -->
       <div class="relative group">
        <div
        class="flex items-center w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-red-800 cursor-pointer"
        :class="[
          isCollapsed ? 'justify-center' : 'items-center'
        ]"
          @click="$emit('logout')"
        >
          <i class="fas fa-sign-out"></i>
          <span v-if="!isCollapsed" class="ml-2">Logout</span>
          <span
            v-if="isCollapsed"
            class="absolute left-full ml-2 px-2 py-1 text-sm rounded bg-gray-800 text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition"
          >Logout</span>
        </div>
      </div>
    </nav>
  </aside>
</template>

<script setup>
import SidebarItem from './SidebarItem.vue';

defineProps({
  isOpen: Boolean,
  isCollapsed: Boolean,
  isMobile: Boolean,
  menus: {
    type: Array,
    default: () => [],
  },
});
</script>
