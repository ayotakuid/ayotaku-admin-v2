<script setup>
import { onUpdated, ref, watch, watchEffect } from "vue"

  const search = defineProps(['dataSearch'])
  const dataSearch = ref()

  watchEffect(() => {
    dataSearch.value = search.dataSearch?.data;
    console.log(dataSearch.value);
  })
</script>

<template>
  <div v-for="anime in dataSearch?.data" :key="anime?.node?.id" class="col-md-4">
    <div class="card shadow-sm">
      <div class="card-header">
        <h3 class="card-title">{{ anime?.node?.title }}</h3>
        <div class="card-toolbar">
          <button type="button" class="btn btn-sm btn-secondary">
            Add to Database
            <!-- <div class="spinner-border" role="status">
              <span class="visually-hidden">Loading...</span>
            </div> -->
          </button>
        </div>
      </div>
      <div class="card-body p-0">
        <div class="text-center px-4">
          <img class="card-rounded-bottom mb-3 shadow-sm" alt="" :src="anime?.node?.main_picture?.medium">
        </div>
      </div>
    </div>
  </div>
</template>