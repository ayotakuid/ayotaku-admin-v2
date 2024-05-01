<script setup>
  import { ref, watchEffect } from 'vue';
  import Cookies from '../../../utils/handler-cookies';
  import { toast } from 'vue-sonner';

  const idAnime = defineProps(['dataAnime']);
  const tokenAyotaku = Cookies.getCookies('tokenAyotaku');
  const indicatorLoading = ref(false);

  watchEffect(() => {
    console.log(idAnime.dataAnime);
  })

  const handlerClickSave = () => {
    indicatorLoading.value = true
    
    setTimeout(() => {
      if (!idAnime.dataAnime?.video) {
       toast.error('Choose Video Trailer!')
       indicatorLoading.value = false
       return;
      }

      console.log('123');
      toast.success('Saving success!')
      indicatorLoading.value = false
    }, 1000)
  }
</script>

<template>

  <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">Close</button>
  <button 
    type="button" 
    class="btn btn-primary btn-sm" 
    @click="handlerClickSave"
  >
  <div v-if="indicatorLoading">
    <div class="spinner-border" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
  <div v-else>
    Add Database
  </div>
  </button>

</template>