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
            <div class="row">
              <div class="col-md-12 fs-1 mb-5">
                {{ renderEpisode?.animes?.judul_anime }} - {{ renderEpisode?.episode }}
              </div>

              <label for="Resolusi 720" class="form-label fs-4">Resolusi 720:</label>
              <div class="col-md-12">
                <iframe 
                  :src="renderEpisode?.link_stream?.resol720" 
                  frameborder="0"
                  marginwidth="0"
                  marginheight="0"
                  scrolling="no"
                  width="400"
                  height="200"
                  allowfullscreen="true"
                  class="rounded align-item-center"
                />
              </div>
              <label for="Resolusi 1080" class="form-label fs-4">Resolusi 1080:</label>
              <div class="col-md-12">
                <iframe 
                  :src="renderEpisode?.link_stream?.resol1080" 
                  frameborder="0"
                  marginwidth="0"
                  marginheight="0"
                  scrolling="no"
                  width="400"
                  height="200"
                  allowfullscreen="true"
                  class="rounded align-item-center"
                />
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
          >
            Close
          </button>
        </div>

      </div>
    </div>
  </div>
</template>