<script setup>
  import { ref, watchEffect } from 'vue';
  import { toast } from 'vue-sonner';
  import DataTable from 'datatables.net-vue3';
  import DataTablesCore from 'datatables.net';
  import FetchingAnime from '../../utils/handler-anime-fetching';
  import Cookies from '../../utils/handler-cookies';
  import FormatDate from '../../utils/handler-date';
  import ModalRecoveryAnimeComponent from './modal/ModalRecoveryAnimeComponent.vue';

  DataTable.use(DataTablesCore);

  const data = [
    {
      name: 'anime-page',
      text: 'Recovery Anime Page',
    },
  ];
  const columns = [
    {
      data: 'uuid',
      render: '#action',
      orderable: false,
      width: '50px'
    },
    {
      data: 'data.nama_anime.romanji',
      title: 'Nama Anime',
      width: '500px'
    },
    {
      data: 'whois.username_mal',
      render: (data, type, row) => {
        return `<span class="badge badge-success">${data}</span>`
      },
      width: '200px'
    },
    {
      data: 'deleted_at',
      render: (data, type, row) => {
        return FormatDate.formatDateOnline(data);
      }
    },
  ]
  const dataDataTable = ref();
  const modalUuid = ref();
  const tokenAyotaku = Cookies.getCookies('tokenAyotaku');
  const emit = defineEmits(['parents'])
  emit('parents', data);

  watchEffect(async () => {
    const fetchingShowDeleteAnime = await FetchingAnime.showDeleteAnime(tokenAyotaku);

    if (fetchingShowDeleteAnime.status) {
      if (fetchingShowDeleteAnime.status === 'success') {
        dataDataTable.value = fetchingShowDeleteAnime?.data
      }
    }

    if (!fetchingShowDeleteAnime.status) {
      toast.error('Gagal fetching data anime');
      return;
    }
  });

  const handlerClickRecoveryAnime = (uuidParams, namaParams) => {
    modalUuid.value = null
    modalUuid.value = {
      uuid: uuidParams,
      nama: namaParams,
    };
  }

  const handlerUpdateListRecovery = (data) => {
    dataDataTable.value = data
  }
</script>

<template>
  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
    <div class="card shadow-sm">
      <div class="card-body">
        <div class="container">
          <div class="row">
            <div class="col-md-12 my-2 d-flex justify-content-end">
              <router-link 
                to="/anime" 
                class="btn btn-primary btn-sm btn-icon"
                v-tooltip.bottom-end="'Back to Anime'"
              >
                <i class="fa-solid fa-arrow-left"></i>
              </router-link>
            </div>
  
            <div class="col-md-12 my-2">
              <DataTable
                :columns="columns"
                :data="dataDataTable"
                class="table table-striped table-row-bordered gy-5 gs-7 border rounded"
                width="100%"
                :options="{
                  responsive: true,
                  processing: true,
                  pageLength: 10,
                  lengthMenu: [ [10, 25, 50, -1], [10, 25, 50, 'All'] ],
                  scrollX: true,
                  order: [[0]],
                  fixedColumns: {
                    leftColumns: 1,
                    rightColumns: 0
                  },
                }"
              >
                <template #action="props">
                  <div class="d-flex justify-content-center">
                    <button 
                      class="btn btn-danger btn-sm btn-icon"
                      @click="handlerClickRecoveryAnime(props.rowData?.uuid, props?.rowData?.data?.nama_anime?.romanji)"
                      data-bs-toggle="modal"
                      data-bs-target="#recovery-anime"
                    >
                      <i class="fa-solid fa-rotate-left fs-4"></i>
                    </button>
                  </div>
                </template>

                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Nama Anime</th>
                    <th>Admin</th>
                    <th>Deleted At</th>
                  </tr>
                </thead>
              </DataTable>
            </div>
            
            <ModalRecoveryAnimeComponent 
              :uuidAnime="modalUuid"
              :tokenAyotaku="tokenAyotaku"
              @updateListRecovery="handlerUpdateListRecovery"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>