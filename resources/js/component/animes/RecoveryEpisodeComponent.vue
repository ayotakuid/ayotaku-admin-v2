<script setup>
  import { ref, render, watchEffect } from 'vue';
  import { toast } from 'vue-sonner';
  import DataTable from 'datatables.net-vue3';
  import DataTableCore from 'datatables.net';
  import FetchingEpisode from '../../utils/handler-episode-fetching';
  import Cookies from '../../utils/handler-cookies';
  import FormatDate from '../../utils/handler-date';
  import ModalRecoveryEpisodeComponent from '../animes/modal/ModalRecoveryEpisodeComponent.vue';

  DataTable.use(DataTableCore);

  const data = [
    {
      name: 'episode-page',
      text: 'Recovery Episode Page',
    },
  ];

  const columns = [
    {
      data: 'uuid',
      render: '#action',
      orderable: false,
      width: '10px'
    },
    {
      data: 'animes.judul_anime',
      width: '250px'
    },
    {
      data: 'episode',
      width: '300px'
    },
    {
      data: 'deletedAt',
      render: (data, type, row) => {
        return FormatDate.formatDateOnline(data);
      },
      width: '250px'
    },
  ];

  const dataDataTable = ref();
  const dataEpisodeProps = ref();
  const tokenAyotaku = Cookies.getCookies('tokenAyotaku');
  const emit = defineEmits(['parents']);
  emit('parents', data)

  watchEffect(async () => {
    const fetchingShowDeleteEpisode = await FetchingEpisode.showDeleteEpisode(tokenAyotaku);

    if (fetchingShowDeleteEpisode.status) {
      if (fetchingShowDeleteEpisode.status === 'success') {
        dataDataTable.value = fetchingShowDeleteEpisode?.data
      }
    }

    if (!fetchingShowDeleteEpisode.status) {
      toast.error('Gagal fetching data episode');
      return;
    }
  });

  const handlerClickRecovery = (episodeUuid, episode, namaAnime) => {
    dataEpisodeProps.value = null;
    dataEpisodeProps.value = {
      uuid: episodeUuid,
      episode: episode,
      nama: namaAnime,
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
                to="/anime/episode"
                class="btn btn-primary btn-sm btn-icon"
                v-tooltip.bottom-end="'Back to Episode'"
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
                  <div class="d-flex justify-content-center button">
                    <button
                      class="btn btn-danger btn-sm btn-icon"
                      data-bs-toggle="modal"
                      data-bs-target="#recovery-episode"
                      @click="handlerClickRecovery(
                        props.rowData?.uuid,
                        props.rowData?.episode,
                        props.rowData?.animes?.judul_anime,
                      )"
                    >
                      <i class="fa-solid fa-rotate-left fs-4"></i>
                    </button>
                  </div>
                </template>
              
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Nama Anime</th>
                    <th>Episode</th>
                    <th>Deleted At</th>
                  </tr>
                </thead>
              </DataTable>
            </div>

            <ModalRecoveryEpisodeComponent 
              :dataEpisode="dataEpisodeProps"
              :token="tokenAyotaku"
              @updateListRecovery="handlerUpdateListRecovery"
            />

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.button {
  margin-right: 10px;
}
</style>