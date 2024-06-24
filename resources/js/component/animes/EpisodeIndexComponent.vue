<script setup>
  import { ref, watchEffect } from 'vue';
  import { toast } from 'vue-sonner';
  import DataTable from 'datatables.net-vue3';
  import DataTablesCore from 'datatables.net';
  import FetchingEpisode from '../../utils/handler-episode-fetching';
  import Cookies from '../../utils/handler-cookies';

  DataTable.use(DataTablesCore);

  // SETTING TITLE FOR PAGE
  const data = [
    {
      name: 'episode-page',
      text: 'Episode Anime Page',
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
      data: 'animes.judul_anime',
      width: '250px'
    },
    {
      data: 'episode',
      width: '250px'
    },
    {
      data: 'link_stream',
      render: (data, type, row) => {
        const resol720 = (data.resol720 !== '' || data.resol720 != null) ? '<span class="badge badge-success">Link 720 Ready</span>' : '<span class="badge badge-danger">Link 720 Not Ready</span>';
        const resol1080 = (data.resol1080 !== '' || data.resol1080 != null) ? '<span class="badge badge-success">Link 1080 Ready</span>' : '<span class="badge badge-danger">Link 1080 Not Ready</span>' 
        return `${resol720} ${resol1080}`
      },
      width: '250px'
    },
    {
      data: 'link_download',
      render: (data, type, row) => {
        const resol720 = (data.resol720 !== '' || data.resol720 != null) ? '<span class="badge badge-success">Link 720 Ready</span>' : '<span class="badge badge-danger">Link 720 Not Ready</span>';
        const resol1080 = (data.resol1080 !== '' || data.resol1080 != null) ? '<span class="badge badge-success">Link 1080 Ready</span>' : '<span class="badge badge-danger">Link 1080 Not Ready</span>' 
        return `${resol720} ${resol1080}`
      },
      width: '250px'
    },
    {
      data: '',
      render: (data, type, row) => {
        return 'b'
      },
      width: '250px'
    },
    {
      data: '',
      render: (data, type, row) => {
        return 'b'
      },
      width: '250px'
    },
  ]

  const dataDataTable = ref();
  const tokenAyotaku = Cookies.getCookies('tokenAyotaku');
  const emit = defineEmits(['parents'])
  emit('parents', data)

  watchEffect(async () => {
    const fetchingEpisodeAnime = await FetchingEpisode.showAllEpisode(tokenAyotaku);

    if (fetchingEpisodeAnime.status) {
      if (fetchingEpisodeAnime.status === 'success') {
        dataDataTable.value = fetchingEpisodeAnime?.data
      }

      if (!fetchingEpisodeAnime.status || fetchingEpisodeAnime.status === 'fail') {
        toast.error('Gagal fetching data anime');
        return
      }
    }
  })
</script>

<template>
  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
    <div class="card shadow-sm">
      <div class="card-body">
        <div class="container">
          <div class="row">
            <div class="col-md-12 my-2 d-flex justify-content-end">
              <router-link 
                to="/" 
                class="btn btn-primary btn-sm btn-icon"
                v-tooltip.bottom-end="'Back to dashboard'"
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
                  {{ props.rowData?.uuid }}
                </template>
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Nama Anime</th>
                    <th>Episode</th>
                    <th>Stream</th>
                    <th>Download</th>
                    <th>Admin</th>
                    <th>Created At</th>
                  </tr>
                </thead>
              </DataTable>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>