<script setup>
  import { ref } from 'vue';

  const imageLink = ref();
  const idAnime = ref();
  const props = defineProps(['imageLink', 'uuidAnime']);
  imageLink.value = props.imageLink
  idAnime.value = props.uuidAnime

  const handlerImageModal = () => {
    const modal = document.getElementById('modal-image');
    const imgInModal = document.getElementById(`element`);
    const captionText = document.getElementById('caption');

    modal.style.display = "block";
    imgInModal.src = imageLink.value;
    captionText.innerHTML = imageLink.value
  }
</script>

<template>
  <a class="dropdown-item" @click="handlerImageModal" :id="`btn-${idAnime}`">Show image</a>
</template>