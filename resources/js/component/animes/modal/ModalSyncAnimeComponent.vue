<script setup>
  import { ref, watchEffect } from 'vue';

  const props = defineProps(['dataAnime']);
  const refDataAnime = ref();

  watchEffect(() => {
    refDataAnime.value = props.dataAnime;
  })
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