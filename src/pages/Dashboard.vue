<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">Dashboard</h1>

    <!-- Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <p class="text-gray-500 dark:text-gray-300">Total Users</p>
        <h2 class="text-xl font-bold">1,245</h2>
      </div>
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <p class="text-gray-500 dark:text-gray-300">Active Companies</p>
        <h2 class="text-xl font-bold">32</h2>
      </div>
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <p class="text-gray-500 dark:text-gray-300">Applications</p>
        <h2 class="text-xl font-bold">8</h2>
      </div>
      <div class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <p class="text-gray-500 dark:text-gray-300">New Signups</p>
        <h2 class="text-xl font-bold">120</h2>
      </div>
    </div>

    <!-- Chart -->
    <div class="bg-white dark:bg-gray-800 mt-6 p-4 rounded-lg shadow">
      <h3 class="text-lg font-bold mb-4">User Growth</h3>
      <canvas id="userChart"></canvas>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import Chart from 'chart.js/auto';

onMounted(() => {
  const ctx = document.getElementById('userChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      datasets: [
        {
          label: 'Users',
          data: [100, 200, 300, 400, 520, 650],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59,130,246,0.3)',
          fill: true
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
});
</script>

<style>
canvas {
  height: 300px !important;
}
</style>
