<script setup>
  import { ref, watchEffect } from 'vue';
  import { toast } from 'vue-sonner';
  import Fetching from '../../../utils/handler-anime-fetching';
  import Cookies from '../../../utils/handler-cookies';

  const propsImage = defineProps(['dataImage', 'dataAnime']);
  const imageList = ref();
  const animeDetail = ref();
  const tokenAyotaku = Cookies.getCookies('tokenAyotaku');
  const formSaveRecommend = ref({
    id_anime_db: null,
    slug_anime: null,
    default_img: null,
    edit_img: null,
  });
  const pictureJikan = ref({
    urlPicture: null
  });
  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

  watchEffect(() => {
    imageList.value = propsImage.dataImage;
    animeDetail.value = propsImage.dataAnime;
  })

  const handlerClickSelectedPicture = (url) => {
    pictureJikan.value.urlPicture = url;
  }

  const handlerCloseModel = () => {
    imageList.value = null;
    pictureJikan.value.urlPicture = null;
    animeDetail.value = null;
  }

  const handlerClearState = () => {
    imageList.value = null;
    pictureJikan.value.urlPicture = null;
    animeDetail.value = null;
  }

  const handlerSaveRecommend = async () => {
    formSaveRecommend.value = {
      id_anime_db: animeDetail?.value.uuid,
      slug_anime: animeDetail?.value.slug,
      default_img: animeDetail?.value.data.foto_anime,
      edit_img: pictureJikan.value.urlPicture,
    }

    const responseSaveRecommend = await Fetching.fetchingSaveRecommend(tokenAyotaku, formSaveRecommend.value);

    if (responseSaveRecommend.status === 'fail') {
      setTimeout(() => {
        toast.error(responseSaveRecommend.message);
        handlerClearState();
      }, 1000)
      return;
    }
    
    if (responseSaveRecommend.status === 'success') {
      toast.promise((promise), {
        loading: 'Loading...',
        success: () => {
          handlerClearState();
          return responseSaveRecommend.message;
        },
        error: 'ERROR',
      });
      return;
    }

    return;
  }
</script>

<template>
  <div class="modal fade modal-lg" tabindex="-1" id="modal-anime" data-bs-backdrop="static" data-bs-keyboard="false">
    <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title fw-bold">
            Add Recommend Anime
          </h3>

          <div 
            class="btn btn-icon btn-sm btn-active-light-primary ms-2" data-bs-dismiss="modal"
            aria-label="Close"
            @click="handlerCloseModel"
          >
            <i class="fa-solid fa-x"></i>
          </div>
        </div>

        <div class="modal-body">
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <span class="fs-3">
                  {{ animeDetail?.data.nama_anime.romanji }}
                </span>
              </div>
              <div class="col-md-12 my-3">
                <div class="d-flex">
                  <div>
                    <span class="fs-5 d-block text-center my-2">
                      Default Image
                    </span>
                    <img :src="animeDetail?.data.foto_anime" class="rounded" width="150px" :alt="animeDetail?.data.nama_anime.romanji" referrerPolicy="no-referrer">
                  </div>
                  <div v-if="pictureJikan.urlPicture" class="mx-5">
                    <span class="fs-5 d-block text-center my-2">
                      Image your choose
                    </span>
                    <img :src="pictureJikan.urlPicture" class="rounded" width="150px" :alt="animeDetail?.data.nama_anime.romanji" referrerPolicy="no-referrer">
                  </div>
                </div>
              </div>
              <div class="col-md-12">
                <h2>Choose Image Recommend Anime</h2>
              </div>
              <div 
                v-for="image in imageList"
                :key="image.webp.image_url"
                class="col-md-3 mt-2"
              >
                <div>
                  <h3 
                    class="fw-bold text-trailer"
                    @click="handlerClickSelectedPicture(image.webp.image_url)"
                  >
                    <input 
                      type="radio"
                      :value="image.webp.image_url"
                      v-model="pictureJikan.urlPicture"
                    >
                  </h3>
                </div>
                <img 
                  :src="image.webp.image_url" 
                  :alt="image.webp.image_url"
                  width="150px" 
                  class="rounded img-trailer"
                  @click="handlerClickSelectedPicture(image.webp.image_url)"
                  referrerPolicy="no-referrer"
                >
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button 
            type="button" 
            class="btn btn-danger btn-sm btn-icon"
            @click="handlerCloseModel"
            data-bs-dismiss="modal"
            aria-label="Close"
            v-tooltip.bottom-end="'Cancel'"
          >
            <i class="fa-solid fa-x"></i>
          </button>
          <button 
            type="button" 
            class="btn btn-success btn-sm btn-icon"
            @click="handlerSaveRecommend"
            data-bs-dismiss="modal"
            aria-label="Close"
            v-tooltip.bottom-end="'Save'"
          >
            <i class="fa-solid fa-check"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .img-trailer {
    cursor: pointer;
  }
</style>