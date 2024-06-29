<script setup>
  import { ref, watchEffect } from 'vue';
import { toast } from 'vue-sonner';

  const props = defineProps(['dataEpisode', 'token']);
  const headerData = ref();
  const currentEpisode = ref();
  const stateForm = ref({
    episode: '',
    stream: {
      resol720: '',
      resol1080: ''
    },
    download: {
      resol720: '',
      resol1080: ''
    }
  })

  watchEffect(() => {
    currentEpisode.value = props.dataEpisode?.episode;

    stateForm.value.episode = props.dataEpisode?.episode;
    stateForm.value.stream.resol720 = props.dataEpisode?.link_stream?.resol720;
    stateForm.value.stream.resol1080 = props.dataEpisode?.link_stream?.resol1080;
    stateForm.value.download.resol720 = props.dataEpisode?.link_download?.resol720;
    stateForm.value.download.resol1080 = props.dataEpisode?.link_download?.resol1080;

    headerData.value = {
      nama: props.dataEpisode?.animes?.judul_anime,
      episode: props.dataEpisode?.episode
    };
  })

  const handlerClearState = () => {
    currentEpisode.value = ''
    stateForm.value = {
      episode: '',
      stream: {
        resol720: '',
        resol1080: ''
      },
      download: {
        resol720: '',
        resol1080: ''
      }
    }
  }

  const handlerUpdateEpisode = () => {
    const checkingSlug = (stateForm.value.episode !== currentEpisode.value) ? '1' : '0'
    toast.error(checkingSlug);
    handlerClearState()
    return;
  }
</script>

<template>
  <div class="modal fade" tabindex="-1" id="edit-episode" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">

        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-md-12 mb-5 fs-3">
                Edit - {{ headerData?.nama }} ( {{ headerData?.episode }} )
              </div>

              <div class="col-md-12">
                <div class="mb-10">
                  <label 
                    for="Episode"
                    class="form-label fs-4"
                  >
                    Episode:
                  </label>
                  <input 
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="Episode..."
                    v-model="stateForm.episode"
                  />
                  <span class="badge badge-secondary">*Jika mengubah episode akan mengubah slug juga!</span>
                </div>
              </div>

              <div class="col-md-6">
                <div class="mb-10">
                  <label 
                    for="Stream 720p"
                    class="form-label fs-4"
                  >
                    Stream 720p
                  </label>
                  <input 
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="Stream 720p..."
                    v-model="stateForm.stream.resol720"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-10">
                  <label 
                    for="Stream 1080p"
                    class="form-label fs-4"
                  >
                    Stream 1080p
                  </label>
                  <input 
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="Stream 1080p..."
                    v-model="stateForm.stream.resol1080"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-10">
                  <label 
                    for="Download 720p"
                    class="form-label fs-4"
                  >
                  Download 720p
                  </label>
                  <input 
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="Download 720p..."
                    v-model="stateForm.download.resol720"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-10">
                  <label 
                    for="Download 1080p"
                    class="form-label fs-4"
                  >
                  Download 1080p
                  </label>
                  <input 
                    type="text"
                    class="form-control form-control-solid"
                    placeholder="Download 1080p..."
                    v-model="stateForm.download.resol1080"
                  />
                </div>
              </div>

            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-success btn-sm"
            data-bs-dismiss="modal"
            @click="handlerUpdateEpisode"
          >
            Save Change
          </button>

          <button
            type="button"
            class="btn btn-secondary btn-sm"
            data-bs-dismiss="modal"
            @click="handlerClearState"
          >
            No, Nevermind
          </button>
        </div>

      </div>
    </div>
  </div>
</template>