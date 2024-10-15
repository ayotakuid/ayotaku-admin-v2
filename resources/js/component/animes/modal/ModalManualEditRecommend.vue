<script setup>
  import { ref, watchEffect } from 'vue';
  import { toast } from 'vue-sonner';
  import FetchingAnime from '../../../utils/handler-anime-fetching';

  const props = defineProps(['dataEdit', 'token']);
  const emitData = defineEmits(['updateListRecommend']);
  const dataRecommend = ref();
  const stateForm = ref({
    urlImage: null,
  });
  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

  watchEffect(() => {
    dataRecommend.value = {
      uuid: props.dataEdit?.uuid,
      nama: props.dataEdit?.nama,
      image: props.dataEdit?.image,
    };

    stateForm.value.urlImage = props.dataEdit?.image;
  })

  const handlerCancel = () => {
    dataRecommend.value = null;
    stateForm.value.urlImage = null;
  }

  const handlerSaveChange = async () => {
    const dataUpdate = {
      uuid: dataRecommend.value.uuid,
      image: (!stateForm.value.urlImage) ? null : stateForm.value.urlImage,
    };
    const responseFetchingEdit = await FetchingAnime.fetchingUpdateRecommendAnime(props.token, dataUpdate);

    if (responseFetchingEdit.status === 'fail') {
      toast.error(responseFetchingEdit.message);
      return;
    }

    if (responseFetchingEdit.status === 'success') {
      toast.promise((promise), {
        loading: 'Loading...',
        success: () => {
          emitData('updateListRecommend', dataUpdate);
          return responseFetchingEdit.message;
        },
        error: 'ERROR',
      });
      return;
    }
  }
</script>

<template>
  <div class="modal fade" tabindex="-1" id="manual-edit-recommend">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">

        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-md-12 mb-5 fs-3">
                Edit Recommend - <b>{{ dataRecommend.nama }}</b>
              </div>

              <div class="col-md-12">
                <div class="mt-5">
                  <label 
                    for=""
                  >
                    URL Edit Image:
                  </label>
                  <input 
                    type="text"
                    class="form-control form-control-solid mt-2"
                    placeholder="URL Edit Image..."
                    v-model="stateForm.urlImage"
                  />
                </div>
              </div>

              <div class="col-md-12 mt-5">
                <label for="Image Choose">Preview Image</label>
                <img :src="stateForm.urlImage" class="rounded d-block mt-1" width="150px" :alt="dataRecommend.nama" referrerPolicy="no-referrer">
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
            @click="handlerSaveChange"
          >
            Save Change
          </button>

          <button
            type="button"
            class="btn btn-secondary btn-sm"
            data-bs-dismiss="modal"
            @click="handlerCancel"
          >
            No, Nevermind
          </button>
        </div>

      </div>
    </div>
  </div>
</template>