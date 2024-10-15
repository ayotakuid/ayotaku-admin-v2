<script setup>
  import { ref, watchEffect } from 'vue';
  import DataTable from 'datatables.net-vue3';
  import DataTablesCore from 'datatables.net';
  import { toast } from 'vue-sonner';
  import Fetching from '../../utils/handler-fetching';
  import FetchingAnime from '../../utils/handler-anime-fetching';
  import Cookies from '../../utils/handler-cookies';
  import FormatDate from '../../utils/handler-date';
  import ModalDeleteRecommendComponent from './modal/ModalDeleteRecommendComponent.vue';
  import ModalManualEditRecommend from './modal/ModalManualEditRecommend.vue';

  DataTable.use(DataTablesCore);

  const columns = [
    {
      data: 'uuid',
      render: '#actionButton',
    },
    {
      data: 'detail.nama_anime',
      render: (data, type, row) => {
        return data?.romanji ? data?.romanji : data?.eng
      },
      width: '250px'
    },
    {
      data: 'default_img',
      render: '#defaultImg',
    },
    {
      data: 'edit_img',
      render: '#editImg',
    },
    {
      data: 'created_at',
      render: (data, type, row) => {
        return FormatDate.formatDateOnline(data);
      },
      width: '250px'
    },
  ]

  const data = [
    {
      name: 'recommend-page',
      text: 'Recommend Anime Page',
    },
  ];
  const tokenAyotaku = Cookies.getCookies('tokenAyotaku');
  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));
  const isAdmin = ref();
  const dataRecommend = ref();
  const deleteRecommend = ref();
  const updateRecommend = ref();

  const emit = defineEmits(['parents'])
  emit('parents', data);

  watchEffect(async () => {
    const responseProfile = await Fetching.handlerFetchingProfile(tokenAyotaku);

    if (!responseProfile.status || responseProfile.status !== 'success' || responseProfile.data.role !== 'admin') {
      toast.promise((promise), {
        loading: 'Loading...',
        success: () => {
          isAdmin.value = false
          location.reload()
          return 'Tidak berhak disini!';
        },
        error: 'ERROR',
      })
      return;
    }
  });

  watchEffect(async () => {
    const responseRecommend = await FetchingAnime.fetchingShowRecommendAnime(tokenAyotaku);

    if (responseRecommend.status === 'fail') {
      toast.error(responseRecommend.message ?? 'ERROR Recommend Anime');
      return;
    }

    if (responseRecommend.status === 'success') {
      isAdmin.value = true;
      dataRecommend.value = responseRecommend?.data
    }
  })

  const handlerClickDeleteRecommend = (idAnime, namaAnime) => {
    deleteRecommend.value = null;
    deleteRecommend.value = {
      uuid: idAnime,
      nama: namaAnime,
    };
  };

  const handlerClickEditRecommend = (idAnime, namaAnime, imageRecommend) => {
    updateRecommend.value = null;
    updateRecommend.value = {
      uuid: idAnime,
      nama: namaAnime,
      image: imageRecommend,
    };
  };

  const handlerReceiveDataDelete = (data) => {
    const filterRecommend = dataRecommend.value.filter((item) => item.uuid !== data);

    dataRecommend.value = filterRecommend;
  }

  const handlerReceiveDataEdit = (data) => {
    const updateRecommend = dataRecommend.value.map((item) => {

      if (item.uuid === data.uuid) {
        return {
          ...item,
          edit_img: data.image
        }
      }

      return item;
    });

    dataRecommend.value = updateRecommend;
  }
  
</script>

<template>
  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
    <div class="card shadow-sm">
      <div class="card-body">
        <div class="container">
          <div class="row">
            <div v-if="isAdmin" class="col-md-12 my-2 d-flex justify-content-end">
              <router-link
                to="/recommend/add"
                class="btn btn-success btn-sm btn-icon"
                v-tooltip.bottom-end="'Edit Recommend Anime'"
              >
                <i class="fa-solid fa-plus"></i>
              </router-link>
            </div>
            <div v-else class="col-md-12 my-2 d-flex justify-content-end"></div>

            <div class="col-md-12 my-2">
              <p class="fs-8 text-danger fw-bolder">
                Note: Tekan <code>Shift</code> + <code>Scroll Up/Down</code> pada table untuk Scroll ke samping
              </p>
              <p class="d-block fs-4 fw-bolder">Total Recommend {{ dataRecommend?.length }} Anime</p>
              <DataTable
                class="table table-striped table-row-bordered gy-5 gs-7 border rounded"
                width="100%"
                :columns="columns"
                :data="dataRecommend"
                :options="{
                  responsive: true,
                  processing: true,
                  pageLength: 10,
                  lengthMenu: [ [10, 25, 50, -1], [10, 25, 50, 'All'] ],
                  scrollX: true,
                  scrollY: '570px',
                  order: [[0]],
                  fixedColumns: {
                    leftColumns: 1,
                    rightColumns: 0
                  },
                }"
              >

                <template #actionButton="props">
                  <div class="btn-group dropstart justify-content-center">
                      <button
                        class="btn btn-light-warning btn-icon rounded mx-3 mt-1 btn-sm"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        data-bs-offset="-5,40"
                        v-tooltip.right="'Options'"
                      >
                        <i class="fa-solid fa-ellipsis-vertical fs-3"></i>
                      </button>

                      <ul class="dropdown-menu">
                        <li>
                          <a
                            class="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#manual-edit-recommend"
                            @click="handlerClickEditRecommend(
                              props.rowData?.uuid,
                              props.rowData?.detail?.nama_anime?.romanji,
                              props.rowData?.edit_img
                            )"
                          >
                            Edit
                          </a>
                          <a
                            class="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#delete-recommend"
                            @click="handlerClickDeleteRecommend(
                              props.rowData?.uuid,
                              props.rowData?.detail?.nama_anime?.romanji
                            )"
                          >
                            Delete
                          </a>
                        </li>
                      </ul>
                  </div>
                </template>

                <template #defaultImg="props">
                  <img :src="props?.cellData" class="rounded mx-auto d-block" width="70px" :alt="props?.rowData.detail.nama_anime.romanji" referrerpolicy="no-referrer">
                </template>

                <template #editImg="props">
                  <div v-if="!props?.cellData" class="d-flex justify-content-center">
                    Tidak ada
                  </div>
                  <img v-else :src="props?.cellData" class="rounded mx-auto d-block" width="70px" :alt="props?.rowData.detail.nama_anime.romanji" referrerpolicy="no-referrer">
                </template>

                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Name Anime</th>
                    <th>Default Image</th>
                    <th>Edit Image</th>
                    <th>Created At</th>
                  </tr>
                </thead>
              </DataTable>
            </div>

            <ModalDeleteRecommendComponent 
              :dataDelete="deleteRecommend"
              :token="tokenAyotaku"
              @deleteListRecommend="handlerReceiveDataDelete"
            />

            <ModalManualEditRecommend 
              :dataEdit="updateRecommend"
              :token="tokenAyotaku"
              @updateListRecommend="handlerReceiveDataEdit"
            />

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css" scoped>
  code {
    background-color: #2f303e;
    color: #ffffff;
  }
</style>