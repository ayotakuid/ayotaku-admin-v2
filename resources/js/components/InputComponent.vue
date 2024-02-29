<script setup>
  import { reactive } from 'vue';

  const formBinding = reactive({
    judulAnime: ''
  });
</script>

<template>
  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
    <div class="card bg-light shadow-sm my-5">
      <div class="card-body">
        <div class="mb-10">
          <label for="Judul Anime" class="form-label required">Judul Anime</label>
          <input type="text" class="form-control form-control-solid" placeholder="Judul anime" v-model="formBinding.judulAnime">
        </div>
    
        <div class="mb-10">
          <label for="Genres" class="form-label required">Genres</label>
          <select class="form-select form-select-solid" data-control="select2" id="selectGenres" data-placeholder="Select an option">
              <option></option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>