<script setup>
  import { ref, watchEffect } from 'vue';
  import { toast } from 'vue-sonner';
  import FetchingAnime from '../../../utils/handler-anime-fetching';

  const props = defineProps(['dataAnime', 'token']);
  const emitData = defineEmits(['updateListAnime']);
  const refDataAnime = ref();
  const tokenAyotaku = ref();
  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

  watchEffect(() => {
    refDataAnime.value = props.dataAnime;
    tokenAyotaku.value = props.token;
  })

  const handlerButtonSyncNow = async () => {
    const token = tokenAyotaku.value;
    const responseFetchingSync = await FetchingAnime.syncAnimeById(token, refDataAnime.value);

    if (responseFetchingSync.status) {
      if (responseFetchingSync.status === 'fail') {
        toast.error(responseFetchingSync.message);
        return;
      }

      if (responseFetchingSync.status === 'success') {
        toast.promise((promise), {
          loading: 'Loading...',
          success: () => {
            emitData('updateListAnime', responseFetchingSync.data);
            return 'Berhasil Synchronize anime!';
          },
          error: 'ERROR',
        });
        return;
      }
    }
  }
</script>

<template>
  <div class="modal fade" tabindex="-1" id="sync-anime">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">

        <div class="modal-body">
          Ingin Synchronize anime <b>{{ refDataAnime?.nama }}</b> ke Myanimelist?
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-success btn-sm"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="handlerButtonSyncNow"
          >
            Yes, Sync now!
          </button>
          
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            data-bs-dismiss="modal"
          >
            No
          </button>
        </div>

      </div>
    </div>
  </div>
</template>