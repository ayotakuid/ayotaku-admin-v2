<script setup>
  import { ref, watchEffect } from 'vue';


  const props = defineProps(['dataEpisode']);
  const renderEpisode = ref();

  watchEffect(async () => {
    renderEpisode.value = props.dataEpisode;
  })
</script>

<template>
  <div class="modal fade" tabindex="-1" id="show-episode" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered modal-lg  modal-dialog-scrollable">
      <div class="modal-content">

        <div class="modal-body">
          <div class="container">
            <div class="row d-flex">
              <div class="col-md-12 fs-1 mb-5 justify-content-center">
                {{ renderEpisode?.animes?.judul_anime }} - {{ renderEpisode?.episode }}
              </div>

              <div class="col-md-6">
                <div class="card">
                  <iframe 
                    :src="renderEpisode?.link_stream?.resol720" 
                    frameborder="0"
                    marginwidth="0"
                    marginheight="0"
                    scrolling="no"
                    width="400"
                    height="200"
                    allowfullscreen="true"
                    class="card-img-top"
                  />
                  <div class="card-body">
                    <h5 class="card-title">Revolusi 720p - {{ renderEpisode?.episode }}</h5>
                    <a :href="renderEpisode?.link_download?.resol720" class="btn btn-primary btn-sm">Download Button</a>
                  </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="card">
                  <iframe 
                    :src="renderEpisode?.link_stream?.resol1080" 
                    frameborder="0"
                    marginwidth="0"
                    marginheight="0"
                    scrolling="no"
                    width="400"
                    height="200"
                    allowfullscreen="true"
                    class="card-img-top"
                  />
                  <div class="card-body">
                    <h5 class="card-title">Revolusi 1080p - {{ renderEpisode?.episode }}</h5>
                    <a :href="renderEpisode?.link_download?.resol1080" class="btn btn-primary btn-sm">Download Button</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="() => {
              renderEpisode = null
            }"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  </div>
</template>