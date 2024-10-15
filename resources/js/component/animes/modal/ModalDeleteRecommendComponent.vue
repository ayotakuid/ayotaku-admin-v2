<script setup>
  import { ref, watchEffect } from 'vue';
  import { toast } from 'vue-sonner';
  import FetchingAnime from '../../../utils/handler-anime-fetching';

  const props = defineProps(['dataDelete', 'token']);
  const emitData = defineEmits(['deleteListRecommend']);
  const dataRecommend = ref();
  const tokenAyotaku = ref();
  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

  watchEffect(() => {
    dataRecommend.value = props?.dataDelete;
    tokenAyotaku.value = props?.token;
  })
  
  const handlerClickDelete = async () => {
    const responseFetching = await FetchingAnime.fetchingDeleteRecommendAnime(tokenAyotaku.value, dataRecommend.value.uuid);

    if (responseFetching.status === 'fail') {
      toast.error(responseFetching.message);
      return;
    }

    if (responseFetching.status === 'success') {
      toast.promise((promise), {
        loading: 'Loading...',
        success: () => {
          emitData('deleteListRecommend', dataRecommend.value.uuid)
          dataRecommend.value = null;
          return responseFetching.message;
        },
        error: 'ERROR',
      });
      return;
    }
  }
</script>

<template>
  <div class="modal fade" tabindex="-1" id="delete-recommend">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">

        <div class="modal-body">
          <p>
            Yakin ingin menghapus <b>{{ dataRecommend?.nama }}</b>
          </p>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-danger btn-sm"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="handlerClickDelete"
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