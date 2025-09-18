<template>
  <div class="flex flex-col items-center justify-center h-screen text-center bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <h1 class="text-6xl font-bold text-red-600 dark:text-red-400">404</h1>
    <p class="mt-4 text-lg">Page Not Found</p>
    <router-link 
      to="/" 
      class="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
    >
      Back To Home
    </router-link>
  </div>
</template>
