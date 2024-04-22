<script setup>
import { ref, watchEffect } from "vue"

  const search = defineProps(['dataSearch'])
  const dataSearch = ref()
  const indicatorLoading = ref({
    loading: false,
    id: null
  })

  watchEffect(() => {
    dataSearch.value = search.dataSearch?.data;
  })

  const handlerDetailsAnime = (id) => {
    const idSelected = dataSearch.value?.data.find((anime) => anime.node.id === id)
    
    if (indicatorLoading.value.loading) {
      return
    }

    if (idSelected) {
      indicatorLoading.value.loading = true
      indicatorLoading.value.id = id

      setTimeout(() => {
        indicatorLoading.value.loading = false
        indicatorLoading.value.id = null 
      }, 1500)
      console.log(indicatorLoading.value);
    }
  }
</script>

<template>
  <div v-for="anime in dataSearch?.data" :key="anime?.node?.id" class="col-md-4 my-2">
    <div class="card shadow-sm bg-dark">
      <div class="card-header">
        <h3 class="card-title text-white">{{ anime?.node?.title }}</h3>
        <div class="card-toolbar">
          <button 
            type="button" 
            class="btn btn-sm btn-secondary"
            data-bs-toggle="modal"
            data-bs-target="#modal-anime"
            @click="handlerDetailsAnime(anime?.node?.id)"
          >
            <div v-if="indicatorLoading.loading && indicatorLoading.id === anime?.node?.id">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <div v-else>
              Details
            </div>
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="text-center px-4">
          <img class="card-rounded-bottom mb-3 shadow-sm rounded" height="300px" width="200px" alt="" :src="anime?.node?.main_picture?.medium">
        </div>
      </div>
    </div>
  </div>

  <!-- MODAL DETAIL ANIME -->
  <div class="modal fade" tabindex="-1" id="modal-anime" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Judul Anime</h3>

          <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
            <i class="fa-solid fa-x"></i>
          </div>

        </div>

        <div class="modal-body">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nulla quia sequi corporis facilis, impedit exercitationem perferendis. Quibusdam ullam esse veniam consequuntur dignissimos aspernatur culpa doloribus, non provident quasi accusamus dicta.</p>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>