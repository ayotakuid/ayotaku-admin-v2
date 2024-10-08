<script setup>
  import { ref, watchEffect } from 'vue';
  import Fetching from '../../../utils/handler-fetching';
  import Cookies from '../../../utils/handler-cookies';
  import ModalDetailAnimePictureComponent from '../modal/ModalDetailAnimePictureComponent.vue';
  import { toast } from 'vue-sonner';

  const propsList = defineProps(['dataAnime']);
  const dataSearch = ref();
  const dataJikan = ref();
  const dataAnimeDetail = ref();
  const indicatorLoadingButton = ref(false);

  watchEffect(() => {
    dataSearch.value = propsList.dataAnime;
  })
  
  const handlerDetailAnime = async (idAnime, anime) => {
    indicatorLoadingButton.value = true;

    const responsePictureAnime = await Fetching.handlerFetchingJikanPictureAnime(idAnime);

    if (!responsePictureAnime.status && responsePictureAnime.status === 404) {
      setTimeout(() => {
        toast.error(responsePictureAnime.message);
        indicatorLoadingButton.value = false;
      }, 1000)
    }

    if (responsePictureAnime.data) {
      setTimeout(() => {
        indicatorLoadingButton.value = false;
        dataJikan.value = responsePictureAnime.data
        dataAnimeDetail.value = anime;
      }, 1000)
    }
  }
</script>

<template>
  <div v-for="anime in dataSearch.data" :key="anime.uuid" class="col-md-5 bg-dark rounded text-light mt-2">
    <div class="d-flex">
      <div class="me-3">
        <img :src="anime.data.foto_anime" class="rounded" style="width: 100px; height: 150px;" alt="">
      </div>
      <div class="d-flex flex-column justify-content-between flex-grow-1">
        <p class="mt-2 fs-5 px-1">
          {{ anime.data.nama_anime.romanji  }}
        </p>
        <div class="d-flex justify-content-end mx-2 mb-2">
          <button 
            class="btn btn-success btn-sm btn-icon mx-1"
          >
            <i class="fa-solid fa-plus"></i>
          </button>
          <button 
            class="btn btn-warning btn-sm btn-icon mx-1"
            data-bs-toggle="modal"
            data-bs-target="#modal-anime"
            @click="handlerDetailAnime(anime.data.id_anime, anime)"
          >
            <div v-if="indicatorLoadingButton">
              <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>
            </div>
            <div v-else>
              <i class="fa-solid fa-circle-info"></i>
            </div>
          </button>
        </div>
      </div>
    </div>
  </div>

  <ModalDetailAnimePictureComponent 
    :dataImage="dataJikan"
    :dataAnime="dataAnimeDetail"
  />
</template>