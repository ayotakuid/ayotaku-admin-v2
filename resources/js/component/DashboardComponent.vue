<script setup>
  import { ref } from 'vue';

  const contentText = ref('Ini adalah Dashboard');
  const data = [
    {
      name: 'dashboard-page',
      text: 'Dashboard Page',
    },
  ];

  const emit = defineEmits(['parents'])
  emit('parents', data);
</script>
<template>
  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
    <div class="card shadow-sm">
      <div class="card-body">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              {{ contentText }}
            </div>

            <div class="col-md-12">
              <router-link to="/anime" class="btn btn-primary btn-sm">
                Go to Animes
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>