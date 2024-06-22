<script setup>
  import { ref, watchEffect } from 'vue';
  import { toast } from 'vue-sonner';
  import FetchingEpisode from '../../../utils/handler-episode-fetching';

  const dataAnime = ref();
  const tokenAyotaku = ref();
  const dataEpisode = ref({
    uuidAnime: '',
    uuidAdmin: '',
    episode: 'Episode ',
    stream: {
      resol720: '',
      resol1080: '',
    },
    download: {
      resol720: '',
      resol1080: '',
    },
  });
  const props = defineProps(['dataAnime', 'token']);
  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

  watchEffect(() => {
    dataAnime.value = props.dataAnime;
    tokenAyotaku.value = props.token;
  })

  const handlerSaveEpisodeAnime = async () => {
    const token = tokenAyotaku.value;
    dataEpisode.value.uuidAnime = dataAnime.value.uuid;
    dataEpisode.value.uuidAdmin = dataAnime.value.id_admin;

    if (
        dataEpisode.value.episode === "Episode " 
        || dataEpisode.value.episode === "Episode"
        || dataEpisode.value.episode.length < 8) {
      dataEpisode.value.episode = 'Episode '
      toast.error('Isi Field Episode dengan benar!');
      return;
    }

    const responseFetchingAdd = await FetchingEpisode.createEpisode(token, dataEpisode.value);

    if (responseFetchingAdd.status) {
      if (responseFetchingAdd.status === 'fail') {
        toast.error(responseFetchingAdd.message);
        return;
      }

      if (responseFetchingAdd.status === 'success') {
        toast.promise((promise), {
          loading: 'Loading...',
          success: () => {
            dataEpisode.value.episode = 'Episode ',
            dataEpisode.value.stream.resol720 = '',
            dataEpisode.value.stream.resol1080 = '',
            dataEpisode.value.download.resol720 = '',
            dataEpisode.value.download.resol1080 = ''
            return `Berhasil add ${dataEpisode.value.episode}`;
          },
          error: 'ERROR',
        });
        return;
      }
    }
  }
</script>

<template>
  <div class="modal fade" tabindex="-1" id="add-episode" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">

        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-md-12 fs-1 mb-5">
                Add Episode - <b>{{ dataAnime?.data?.nama_anime?.romanji }}</b>
              </div>

              <div class="col-md-12">
                <div class="mb-10">
                  <label for="Episode" class="form-label fs-4">Episode:</label>
                  <input 
                    type="text" 
                    class="form-control form-control-solid" 
                    placeholder="Episode..."
                    v-model="dataEpisode.episode"
                  />
                  <span class="badge badge-secondary">Contoh: Episode 1</span>
                </div>
              </div>

              <div class="col-md-6">
                <div class="mb-10">
                  <label for="Stream 720p" class="form-label fs-4">Stream 720p:</label>
                  <input 
                    type="text" 
                    class="form-control form-control-solid" 
                    placeholder="Stream 720p..."
                    v-model="dataEpisode.stream.resol720"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-10">
                  <label for="Stream 1080p" class="form-label fs-4">Stream 1080p:</label>
                  <input 
                    type="text" 
                    class="form-control form-control-solid" 
                    placeholder="Stream 1080p..."
                    v-model="dataEpisode.stream.resol1080"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-10">
                  <label for="Download 720p" class="form-label fs-4">Download 720p:</label>
                  <input 
                    type="text" 
                    class="form-control form-control-solid" 
                    placeholder="Download 720p..."
                    v-model="dataEpisode.download.resol720"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-10">
                  <label for="Download 1080p" class="form-label fs-4">Download 1080p:</label>
                  <input 
                    type="text" 
                    class="form-control form-control-solid" 
                    placeholder="Download 1080p..."
                    v-model="dataEpisode.download.resol1080"
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
            aria-label="Close"
            @click="handlerSaveEpisodeAnime"
          >
            Save Episode
          </button>
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            data-bs-dismiss="modal"
            @click="() => {
              dataEpisode.episode = 'Episode ',
              dataEpisode.stream.resol720 = '',
              dataEpisode.stream.resol1080 = '',
              dataEpisode.download.resol720 = '',
              dataEpisode.download.resol1080 = ''
            }"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  </div>
</template>