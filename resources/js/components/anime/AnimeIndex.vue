<script setup>
  import { ref, defineEmits } from 'vue';

  const contentText = ref('Ini adalah page Anime Index')
  const data = [
    {
      name: 'anime page',
      text: 'Anime Page',
    }
  ];
  const emit = defineEmits(['dataParent']);
  emit('dataParent', data);
</script>

<template>
  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
    <div class="card shadow-sm">
      <div class="card-body">
        <!-- TYPE YOUR CONTENT HERE -->
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              {{ contentText }}
            </div>
            <div class="col-md-12">
              <router-link to="/" class="btn btn-primary btn-sm">Go to Dashboard</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>