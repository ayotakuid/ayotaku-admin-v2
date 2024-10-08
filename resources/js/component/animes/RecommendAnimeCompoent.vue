<script setup>
  const data = [
    {
      name: 'recommend-page',
      text: 'Recommend Anime Page',
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
            <div class="col-md-12 my-2 d-flex justify-content-end">
              <router-link
                to="/recommend/add"
                class="btn btn-success btn-sm btn-icon"
                v-tooltip.bottom-end="'Edit Recommend Anime'"
              >
                <i class="fa-solid fa-plus"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>