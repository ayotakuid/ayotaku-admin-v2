<script setup>
  import { ref } from 'vue';

  const contentText = ref('Ini adalah page Animes');
  const data = [
    {
      name: 'anime-page',
      text: 'Anime Page',
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
              <router-link to="/" class="btn btn-primary btn-sm">
                Go to Dashboard
              </router-link>
            </div>

            <div class="col-md-12 my-2">
              <router-link to="/anime/create" class="btn btn-danger btn-sm">
                Add Anime
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>