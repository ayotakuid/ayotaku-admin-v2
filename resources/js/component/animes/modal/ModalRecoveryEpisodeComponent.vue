<script setup>
  import { ref, watchEffect } from 'vue';
  import { toast } from 'vue-sonner';
  import FetchingEpisode from '../../../utils/handler-episode-fetching';

  const props = defineProps(['dataEpisode', 'token']);
  const emitData = defineEmits(['updateListRecovery']);
  const modalEpisode = ref();
  const tokenAyotaku = ref();
  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

  watchEffect(() => {
    modalEpisode.value = props.dataEpisode;
    tokenAyotaku.value = props.token;
  })

  const handlerClickRecovery = async () => {
    const uuid = modalEpisode.value?.uuid;
    const responseFetchingRecovery = await FetchingEpisode.recoveryEpisode(tokenAyotaku.value, uuid);

    if (responseFetchingRecovery.status) {
      if (responseFetchingRecovery.status === 'fail') {
        toast.error(responseFetchingRecovery.message);
        return;
      }

      if (responseFetchingRecovery.status === 'success') {
        toast.promise((promise), {
          loading: 'Loading...',
          success: () => {
            modalEpisode.value = null;
            emitData('updateListRecovery', responseFetchingRecovery.data);
            return 'Berhasil di Recovery!'
          },
          error: 'ERROR',
        });
        return
      }
    }
  }
</script>

<template>
  <div class="modal fade" tabindex="-1" id="recovery-episode">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">

        <div class="modal-body">
          Yakin ingin Recovery Episode <b>{{ modalEpisode?.episode }} - {{ modalEpisode?.nama }}</b>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-success btn-sm"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="handlerClickRecovery"
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