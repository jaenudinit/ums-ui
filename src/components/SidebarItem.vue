<template>
  <!-- Menu tanpa children -->
   <div class="relative group">
  <router-link
    v-if="item.children.length === 0"
    :to="item.path"
    class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
    :class="[
      isCollapsed ? 'justify-center' : 'items-center',
      isActive(item.path) ? 'bg-gray-200 dark:bg-gray-700 font-semibold text-blue-600' : ''
    ]"
  >
    <i :class="item.icon || 'fas fa-circle'"></i>
    <span v-if="!isCollapsed" class="ml-2">{{ item.name }}</span>
    <!-- Tooltip saat collapse -->
    <span
      v-if="isCollapsed"
      class="absolute left-full ml-2 px-2 py-1 text-sm rounded bg-gray-800 text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition"
    >
      {{ item.name }}
    </span>
  </router-link>

  <!-- Menu dengan children -->
  <div v-else>
    <div
      @click="toggle"
      class="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
      :class="[
        isCollapsed ? 'justify-center' : 'items-center',
        isParentActive(item) ? 'bg-gray-200 dark:bg-gray-700 font-semibold text-blue-600' : ''
      ]"
    >
      <i :class="item.icon || 'fas fa-folder'"></i>
      <span v-if="!isCollapsed" class="ml-2">{{ item.name }}</span>
      <i v-if="!isCollapsed" class="fas fa-chevron-down ml-auto text-xs"></i>
    </div>

    <!-- Tooltip untuk parent menu -->
    <span
      v-if="isCollapsed"
      class="absolute left-full ml-2 px-2 py-1 text-sm rounded bg-gray-800 text-white whitespace-nowrap opacity-0 group-hover:opacity-100 transition"
    >
      {{ item.name }}
    </span>

    <div v-if="isOpen" class="ml-6 space-y-1">
      <SidebarItem
        v-for="(child, index) in item.children"
        :key="index"
        :item="child"
        :is-collapsed="isCollapsed"
      />
    </div>
  </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

defineProps({
  item: { type: Object, required: true },
  isCollapsed: Boolean,
});

const route = useRoute();
const isOpen = ref(false);

function toggle() {
  isOpen.value = !isOpen.value;
}

// ✅ cek apakah path sama dengan route sekarang
function isActive(path) {
  return route.path === path;
}

// ✅ cek apakah parent punya child yang aktif
function isParentActive(menu) {
  if (!menu.children || menu.children.length === 0) return false;
  return menu.children.some((child) => isActive(child.path));
}
</script>
