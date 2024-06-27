<script setup>
  import { ref, watchEffect } from 'vue';
  import { toast } from 'vue-sonner';
  import FetchingEpisode from '../../../utils/handler-episode-fetching';


  const props = defineProps(['dataEpisode', 'token']);
  const emitData = defineEmits(['updateListEpisode']);
  const dataDelete = ref();
  const tokenAyotaku = ref();
  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

  watchEffect(() => {
    dataDelete.value = props.dataEpisode;
    tokenAyotaku.value = props.token;
  })
  
  const handlerSoftDeleteEpisode = async () => {
    const responseFetchinDelete = await FetchingEpisode.softDeleteEpisode(tokenAyotaku.value, dataDelete.value?.uuid);

    if (responseFetchinDelete.status) {
      if (responseFetchinDelete === 'fail') {
        toast.error(responseFetchinDelete.message);
        return
      }

      if (responseFetchinDelete.status === 'success') {
        toast.promise((promise), {
          loading: 'Loading...',
          success: () => {
            dataDelete.value = null
            emitData('updateListEpisode', responseFetchinDelete.data)
            return 'Berhasil dihapus!';
          },
          error: 'ERROR',
        });
        return;
      }
    }
  }
</script>

<template>
  <div class="modal fade" tabindex="-1" id="delete-episode">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">

        <div class="modal-body">
          <p>Yakin ingin menghapus <b>{{ dataDelete?.episode }} - {{ dataDelete?.nama }}?</b></p>
        </div>

        <div class="modal-footer">
          <button 
            type="button"
            class="btn btn-danger btn-sm"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="handlerSoftDeleteEpisode"
          >
            Yes
          </button>
          <button
            type="button"
            class="btn btn-secondary btn-sm"
            data-bs-dismiss="modal"
            aria-label="Close"
          >
            No
          </button>
        </div>

      </div>
    </div>
  </div>
</template>