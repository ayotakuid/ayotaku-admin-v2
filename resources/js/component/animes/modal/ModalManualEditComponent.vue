<script setup>
  import { ref, watchEffect } from 'vue';

  const props = defineProps(['dataEdit']);
  const stateForm = ref({
    image: null,
    video: null,
  });
  const dataAnime = ref()

  watchEffect(() => {
    dataAnime.value = {
      uuid: props.dataEdit?.uuid,
      nama: props.dataEdit?.nama
    }

    stateForm.value = {
      image: props.dataEdit?.url?.image,
      video: props.dataEdit?.url?.video
    }
  })
</script>

<template>
  <div class="modal fade" tabindex="-1" id="manual-edits">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">

        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-md-12 mb-5 fs-3">
                Manual Edits - <b>{{ dataAnime?.nama }}</b>
              </div>
              
              <div class="col-md-12">
                <div class="mb-5">
                    <label 
                      for="URL Image" 
                      class="form-label"
                    >
                      URL Image Anime:
                    </label>
                    <input 
                      type="text" 
                      class="form-control form-control-solid" 
                      placeholder="URL Image Anime..."
                      v-model="stateForm.image"
                    />
                </div>
              </div>

              <div class="col-md-12">
                <div class="mb-3">
                    <label 
                      for="URL Image" 
                      class="form-label"
                    >
                      URL Video Anime:
                    </label>
                    <input 
                      type="text" 
                      class="form-control form-control-solid" 
                      placeholder="URL Video Anime..."
                      v-model="stateForm.video"
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
          >
            Save Change
          </button>

          <button
            type="button"
            class="btn btn-secondary btn-sm"
            data-bs-dismiss="modal"
            @click="() => {
              stateForm.image = null;
              stateForm.video = null;
            }"
          >
            No, Nevermind
          </button>
        </div>

      </div>
    </div>
  </div>
</template>