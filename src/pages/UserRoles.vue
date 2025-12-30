<template>
  <div class="space-y-6 max-w-2xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">User Roles</h1>

    <div class="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
      <div>
        <label class="block text-sm font-medium mb-1">Full Name</label>
        <input type="text" class="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600" placeholder="Enter your name" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Email</label>
        <input type="email" class="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600" placeholder="Enter your email" />
      </div>

      <div>
        <label class="block text-sm font-medium mb-1">Password</label>
        <input type="password" class="w-full px-4 py-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600" placeholder="Enter new password" />
      </div>

      <button class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Save Changes</button>
    </div>
  </div>
</template>
