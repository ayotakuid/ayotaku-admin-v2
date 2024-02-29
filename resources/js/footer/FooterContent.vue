<script setup>
  const startDate = '2020'
  const nowDate = new Date().getFullYear();
</script>

<template>
  <div class="text-dark order-2 order-md-1">
    <span class="text-muted fw-semibold me-1">
      {{ startDate }} - {{ nowDate }}&copy;
    </span>
    <a href="https://ayotaku.id" target="_blank" class="text-gray-800 text-hover-primary">
      Ayotaku.id
    </a>
  </div>
</template>