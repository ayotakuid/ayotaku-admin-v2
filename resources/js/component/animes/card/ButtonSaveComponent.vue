<script setup>
  import { onUnmounted, ref } from 'vue';
  import { toast } from 'vue-sonner';
  import Cookies from '../../../utils/handler-cookies';
  import Fetching from '../../../utils/handler-anime-fetching';

  const idAnime = defineProps(['dataAnime']);
  const tokenAyotaku = Cookies.getCookies('tokenAyotaku');
  const indicatorLoading = ref(false);
  
  const closeModal = () => {
    const modalElement = document.getElementById('modal-anime')
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide()

    document.body.style.overflow = '';
    document.querySelectorAll('.modal-backdrop.fade.show').forEach((el) => el.remove())
  }

  onUnmounted(() => {
    document.body.style.overflow = '';
  })

  const handlerClickSave = () => {
    indicatorLoading.value = true
    
    setTimeout(async () => {
      if (!idAnime.dataAnime?.video) {
       toast.error('Choose Video Trailer!')
       indicatorLoading.value = false
       return;
      }

      const responseCreateAnime = await Fetching.createAnime(tokenAyotaku, idAnime?.dataAnime);

      if (responseCreateAnime.status) {
        if (responseCreateAnime.status === 'fail') {
          toast.error(responseCreateAnime.message)
          indicatorLoading.value = false
          return;
        }

        if (responseCreateAnime.status === 'success') {
          toast.success(responseCreateAnime.message)
          indicatorLoading.value = false
          
          setTimeout(() => {
            closeModal();
          }, 1000)
          return
        }
      }

      toast.error('Ada yang salah');
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