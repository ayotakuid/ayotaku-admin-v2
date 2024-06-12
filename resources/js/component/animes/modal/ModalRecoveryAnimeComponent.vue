<script setup>
  import { ref, watchEffect } from 'vue';
  import { toast } from 'vue-sonner';
  import FetchingAnime from '../../../utils/handler-anime-fetching';

  const props = defineProps(['uuidAnime', 'tokenAyotaku']);
  const emitData = defineEmits(['updateListRecovery']);
  const uuidAnime = ref()
  const tokenAyotaku = ref();
  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

  watchEffect(() => {
    uuidAnime.value = props.uuidAnime;
    tokenAyotaku.value = props.tokenAyotaku;
  })

  const handlerClickRecovery = async () => {
    const token = tokenAyotaku.value;
    const uuid = uuidAnime.value?.uuid;
    const responseFetchingRecovery = await FetchingAnime.recoveryAnime(token, uuid);

    if (responseFetchingRecovery.status) {
      if (responseFetchingRecovery.status === 'fail') {
        toast.error(responseFetchingRecovery.message);
        return
      }

      if (responseFetchingRecovery.status === 'success') {
        toast.promise((promise), {
          loading: 'Loading...',
          success: () => {
            uuidAnime.value = null;
            emitData('updateListRecovery', responseFetchingRecovery.data);
            return 'Berhasil di Recovery!';
          },
          error: 'ERROR',
        });
        return;
      }
    }
  }
</script>

<template>
  <div class="modal fade" tabindex="-1" id="recovery-anime">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        
        <div class="modal-body">
          Yakin ingin Recovery anime <b>{{ uuidAnime?.nama }}?</b>
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