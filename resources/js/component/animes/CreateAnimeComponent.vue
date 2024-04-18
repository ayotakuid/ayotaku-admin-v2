<script setup>
  import { ref, watch } from "vue";
  import _ from "lodash";

  const textSelect2 = ref('');
  const indicatorLoading = ref(false)
  const searchResult = ref('');

  // fungsi dari lodash untuk menunda execute function secara langsung
  const searchAnimeMyanimelist = _.debounce(() => {
    if (textSelect2.value.length < 5) {
      searchResult.value = ''
      return
    }

    indicatorLoading.value = true
    setTimeout(() => {
      indicatorLoading.value = false
      searchResult.value = textSelect2.value
    }, 2000) //delay 2 detik dari setTimeout

  }, 1000) //delay 1 detik

  watch(textSelect2, (newSelect2, oldSelect2) => {
    searchAnimeMyanimelist();
  });
</script>

<template>
  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
    <div class="card shadow-sm">
      <div class="card-body">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h1>Search Anime from Myanimelist</h1>
            </div>

            <div class="col-md-8 col-sm-12 my-2">
              <input type="text" class="form-control form-control-solid" placeholder="Search anime..." v-model="textSelect2"/>
              <span class="fw-semibold text-danger text-hover-primary fs-7 mx-2">
                min 5 huruf
              </span>
            </div>

            <div class="col-md-4 col-sm-12 button-checking">
              <button class="btn btn-success btn-sm mx-2">Search</button>
            </div>

            <div class="col-md-12 my-5">
              <div class="card shadow-sm">
                <div class="card-body">
                  <div class="container">
                    <div class="row">
                      {{ indicatorLoading ? 'Loading...' : searchResult }}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-md-12 my-5">
              <router-link to="/anime" class="btn btn-primary btn-sm">
                Back to anime
              </router-link>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
div {
  font-size: 15px;
}

.button-checking {
  margin-top: 11px;
}
</style>