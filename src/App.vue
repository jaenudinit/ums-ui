<template>
  <router-view></router-view>
</template>

<script setup>
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
.swal-small {
  width: 300px !important;
  padding: 20px !important;
}
.swal-title {
  font-size: 1.1rem !important;
}
.swal-text {
  font-size: 0.9rem !important;
}
.swal-confirm {
  font-size: 0.7rem !important;
  padding: 4px 10px !important;
  border-radius: 6px !important;
}
.swal-icon {
  transform: scale(0.5) !important; /* perkecil 60% */
  margin: 0 auto 0 auto !important;
}
div:where(.swal2-container) h2:where(.swal2-title) {
    margin: 0 !important;
    padding: 0 !important;
}
div:where(.swal2-container) div:where(.swal2-html-container) {
    font-size: 0.9em !important;
    padding-top: 0.4em !important;
}

</style>
