<script setup>
import { watchEffect } from 'vue';

  const idAnime = defineProps(['idAnime']);

  watchEffect(() => {
    console.log(idAnime.idAnime);
  })
</script>

<template>
  <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
  <button type="button" class="btn btn-primary btn-sm">Add Database</button>
</template>