<script setup>
  import { ref, watch } from 'vue';
  import _ from 'lodash';
  import Cookies from '../../utils/handler-cookies';
  import Fetching from '../../utils/handler-anime-fetching';
  import ListCardRecommendComponent from './card/ListCardRecommendComponent.vue';

  const data = [
    {
      name: 'recommend-page',
      text: 'Add Recommend Anime Page',
    },
  ];

  const emit = defineEmits(['parents'])
  emit('parents', data);

  const textSearchAnime = ref('');
  const indicatorLoading = ref(false);
  const searchResult = ref('')
  const tokenCookies = Cookies.getCookies('tokenAyotaku');

  const searchAnimeFromDatabase = _.debounce(async () => {
    if (textSearchAnime.value.length < 5) {
      searchResult.value = '';
      return;
    }

    indicatorLoading.value = true;
    const responseSearchAnime = await Fetching.fetchingSearchAnime(tokenCookies, textSearchAnime.value);

    setTimeout(() => {
      indicatorLoading.value = false;
      searchResult.value = responseSearchAnime;
    }, 1500)
  }, 1000)

  watch(textSearchAnime, () => {
    searchAnimeFromDatabase();
  })
</script>

<template>
  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
    <div class="card shadow-sm">
      <div class="card-body">
        <div class="container">
          <div class="row">

            <div class="col-md-12 my-2 d-flex justify-content-end">
              <router-link
                to="/recommend/"
                class="btn btn-primary btn-sm btn-icon"
                v-tooltip.bottom-end="'Back Recommend Anime'"
              >
                <i class="fa-solid fa-arrow-left"></i>
              </router-link>
            </div>

            <div class="col-md-12">
              <h2>Search Anime from Database</h2>
            </div>
            <div class="col-md-8 col-sm-12 my-2">
              <input 
                type="text" 
                class="form-control form-control-solid" 
                placeholder="Search Anime..."
                v-model="textSearchAnime"
              >
              <span class="fw-semibold text-danger text-hover-primary fs-7 mx-2">
                min 5 huruf
              </span>
            </div>

            <div class="col-md-12 my-5">
              <div class="container">
                <div class="row">
                  <div v-if="indicatorLoading">
                    Loading...
                  </div>
                  <div v-else>

                    <div v-if="searchResult.length === 0" class="container">
                      <div class="row g-0 gap-3">
                        Tidak ada data
                      </div>
                    </div>
                    <div v-else class="container">
                      <div class="row g-0 gap-3">
                        <ListCardRecommendComponent :dataAnime="searchResult"/>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>