<script setup>
  import { ref, watchEffect } from "vue"
  import Fetching from '../../../utils/handler-fetching';
  import Cookies from '../../../utils/handler-cookies';

  const search = defineProps(['dataSearch'])
  const dataSearch = ref()
  const detailAnime = ref(null);
  const tokenAyotaku = Cookies.getCookies('tokenAyotaku');
  const indicatorLoading = ref({
    loading: false,
    id: null
  })

  watchEffect(() => {
    dataSearch.value = search.dataSearch?.data;
  })

  const limitDescAnime = (text) => {
    const limit = 150,
          trimedString = text?.substring(0, limit);
    
    return trimedString;
  }

  const genresAnime = (genres) => {
    if (!genres) return '';

    return genres.map((genre) => genre.name).join(', ');
  }

  const sourceAnime = (source) => {
    const splitSource = source.split('_');
    const mappingSouece = splitSource.map((text) => {
      return text.charAt(0).toUpperCase() + text.slice(1)
    }).join(' ')

    return mappingSouece
  }
  
  const studiosAnime = (studios) => {
    if (!studios) return '';

    return studios.map((studio) => studio.name).join(', ');
  }

  const handlerDetailsAnime = async (id) => {
    const idSelected = dataSearch.value?.data.find((anime) => anime.node.id === id)
    detailAnime.value = null;
    
    if (indicatorLoading.value.loading) {
      return
    }

    if (idSelected) {
      indicatorLoading.value.loading = true
      indicatorLoading.value.id = id

      const fetchingDetail = await Fetching.handlerFetchingDetailAnime(tokenAyotaku, id);
      detailAnime.value = fetchingDetail;

      setTimeout(() => {
        indicatorLoading.value.loading = false
        indicatorLoading.value.id = null 
      }, 1000)
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
            class="btn btn-secondary btn-sm"
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
  <div class="modal fade modal-lg" tabindex="-1" id="modal-anime" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title fw-bold">{{ detailAnime?.data[0]?.title ?? 'Loading...' }}</h3>

          <div class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal" aria-label="Close">
            <i class="fa-solid fa-x"></i>
          </div>

        </div>

        <div class="modal-body">
          <div v-if="detailAnime" class="container">
            <div class="row">
              <div class="col-md-4 text-center">
                <img :src="detailAnime?.data[0].main_picture.medium" :alt="detailAnime?.data[0]?.title" class="rounded" width="200px">
              </div>
              <div class="col-md-8">
                <span class="item-right">Sinopsis:</span>
                <div class="mb-2">
                  {{ detailAnime?.data[0]?.synopsis ? `${limitDescAnime(detailAnime?.data[0]?.synopsis)}` : 'Loading...' }}
                </div>

                <span class="item-right">Genres:</span>
                <div class="mb-2">
                  {{ detailAnime?.data[0]?.genres ? genresAnime(detailAnime?.data[0]?.genres) : '' }}
                </div>

                <span class="item-right">Season:</span>
                <div class="mb-2">
                  {{ detailAnime?.data[0]?.start_season?.season }} {{ detailAnime?.data[0]?.start_season?.year }}
                </div>

                <span class="item-right">Source:</span>
                <div class="mb-2">
                  {{ detailAnime?.data[0]?.source ? sourceAnime(detailAnime?.data[0]?.source) : '' }}
                </div>

                <span class="item-right">Status, Start Date, & Episode:</span>
                <div class="mb-2">
                  {{ detailAnime?.data[0]?.status ? sourceAnime(detailAnime?.data[0]?.status) : '' }} | {{ detailAnime?.data[0]?.start_date }} | {{ detailAnime?.data[0]?.num_episodes }} Episode
                </div>

                <span class="item-right">Studio:</span>
                <div class="mb-2">
                  {{ detailAnime?.data[0]?.studios ? studiosAnime(detailAnime?.data[0]?.studios) : '' }}
                </div>
              </div>
              
              <div class="col-md-12 text-center my-5">
                <iframe :src="detailAnime?.data[1][0]?.trailer?.embed_url" width="86%" height="350px" class="rounded"></iframe>
              </div>
            </div>
          </div>

          <div v-else class="container">
            Loading...
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary btn-sm">Add Database</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.item-right {
  font-weight: bold;
}
</style>