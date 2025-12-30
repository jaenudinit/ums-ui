<template>
  <div class="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600">
    <div class="w-full max-w-sm bg-white rounded-xl shadow-lg p-6 transform transition duration-300 hover:scale-105 m-8">
      <div class="flex justify-center mb-0">
        <img src="../../public/logo-ums.webp" alt="logo" class="w-40 h-40" />
      </div>

      <!-- <h2 class="text-xl font-bold text-center text-gray-800 mb-1">Welcome Back</h2> -->
      <p class="text-center text-gray-500 mb-4 text-sm">Sign in to continue</p>

      <form @submit.prevent="handleLogin" class="space-y-3">
        <!-- Email/Username -->
        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400 text-sm">
            <i class="fas fa-user"></i>
          </span>
          <input
            v-model="login"
            type="text"
            placeholder="Email or Username"
            class="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>

        <!-- Password -->
        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-2 text-gray-400 text-sm">
            <i class="fas fa-lock"></i>
          </span>
          <input
            v-model="password"
            type="password"
            placeholder="Password"
            class="w-full pl-8 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            required
          />
        </div>

        <!-- Button -->
        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 text-white font-semibold py-2 text-sm rounded-md hover:bg-blue-700 transition disabled:bg-gray-400 flex items-center justify-center"
        >
          <span v-if="loading" class="flex items-center gap-2">
            <svg class="w-4 h-4 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
            </svg>
            Loading...
          </span>
          <span v-else>Login</span>
        </button>
      </form>

      <!-- Error Message (Fallback) -->
      <div v-if="error" class="mt-3 bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded text-xs animate-fade-in" role="alert">
        <strong class="font-bold">Oops! </strong>
        <span>{{ error }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../store/auth';
import Swal from 'sweetalert2';

const login = ref('');
const password = ref('');
const loading = ref(false);
const error = ref('');

const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  error.value = '';
  loading.value = true;

  const res = await authStore.login(login.value, password.value);
  loading.value = false;

  if (!res.success) {
    Swal.fire({
      icon: 'error',
      title: 'Login Failed',
      text: res.message || 'Email atau password salah',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'OK',
      customClass: {
        popup: 'swal-small',
        title: 'swal-title',
        content: 'swal-text',
        confirmButton: 'swal-confirm',
        icon: 'swal-icon'
      }
    });
  } else {
    router.push('/dashboard');
  }
};
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

</style>
