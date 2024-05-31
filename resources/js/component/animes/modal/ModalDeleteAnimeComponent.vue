<script setup>
  import { ref, watchEffect } from 'vue';
  import { toast } from 'vue-sonner';
  import FetchingAnime from '../../../utils/handler-anime-fetching';
  import Cookies from '../../../utils/handler-cookies';

  const idAnime = ref();
  const props = defineProps(['dataAnime', 'listAnime']);
  const emitData = defineEmits(['updateDataAnime']);
  const tokenAyotaku = Cookies.getCookies('tokenAyotaku')
  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));
  
  watchEffect(() => {
    idAnime.value = props.dataAnime;
  })

  const handlerSoftDelete = async () => {
    const responseFetchingDelete = await FetchingAnime.softDeleteAnime(tokenAyotaku, idAnime.value?.uuid);
    
    if (responseFetchingDelete.status) {
      if (responseFetchingDelete.status === 'fail') {
        toast.error(responseFetchingDelete.message);
        return;
      }

      if (responseFetchingDelete.status === 'success') {
        toast.promise((promise), {
          loading: 'Loading...',
          success: () => {
            idAnime.value = null
            emitData('updateDataAnime', responseFetchingDelete.data)
            return 'Berhasil dihapus!'
          },
          error: 'ERROR'
        });
        return;
      }
    }
  }
</script>

<template>
  <div class="modal fade" tabindex="-1" id="delete-anime">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">

        <div class="modal-body">
          <p>Yakin ingin menghapus <b>{{ idAnime?.nama }}?</b></p>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-danger btn-sm" @click="handlerSoftDelete" data-bs-dismiss="modal" aria-label="Close">
            Yes
          </button>
          <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal" aria-label="Close">
            No
          </button>
        </div>
      </div>
    </div>
  </div>
</template>