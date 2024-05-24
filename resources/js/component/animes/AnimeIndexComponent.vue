<script setup>
  import { ref, watchEffect } from 'vue';
  import { toast } from 'vue-sonner';
  import DataTable from 'datatables.net-vue3';
  import DataTablesCore from 'datatables.net';
  import Fetching from '../../utils/handler-fetching';
  import Cookies from '../../utils/handler-cookies';
  import FormatDate from '../../utils/handler-date';

  DataTable.use(DataTablesCore);

  const columns = [
    {
      data: 'uuid',
      render: '#action',
    },
    { 
      data: 'data.nama_anime',
      render: (data, type, row) => {
        return data?.romanji ? data?.romanji : data?.eng
      },
      width: '350px'
    },
    {
      data: 'data.source',
      width: '200px'
    },
    {
      data: 'data.studio',
      render: (data, type, row) => {
        return data[0].name
      },
      width: '200px'
    },
    {
      data: 'data.genres',
      render: (data, type, row) => {
        return data.map((genre) => genre.name).join(', ')
      },
      width: '500px'
    },
    {
      data: 'data.start_date',
      render: (data, type, row) => {
        return (!data) ? 'Belom dijadwalkan' : FormatDate.formatDateStart(data)
      },
      width: '300px'
    },
    {
      data: 'data.status',
      render: (data, type, row) => {
        return `
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <span class="badge badge-primary">
                  ${data.statusAiring}
                </span>
              </div>
              <div class="col-md-12">
                <span class="badge badge-danger">
                  ${data.total_eps} Episode
                </span>
              </div>
            </div>
          </div>
        `
      }
    },
    {
      data: 'created_at',
      render: (data, type, row) => {
        return FormatDate.formatDateOnline(data)
      }
    },
    {
      data: 'whois.username_mal',
      render: (data, type, row) => {
        return `<span class="badge badge-success">${data}</span>`
      },
      width: '200px'
    }
  ];

  const data = [
    {
      name: 'anime-page',
      text: 'Anime Page',
    },
  ];

  const emit = defineEmits(['parents'])
  emit('parents', data);

  const dataAnime = ref(null);
  const tokenAyotaku = Cookies.getCookies('tokenAyotaku');

  watchEffect(async () => {
    const fetchingShowAnime = await Fetching.handlerFetchingShowAllAnime(tokenAyotaku);

    if (fetchingShowAnime.status) {
      if (fetchingShowAnime.status === 'success') {
        dataAnime.value = fetchingShowAnime?.data
      }
    }

    if (!fetchingShowAnime.status) {
      toast.error('Gagal Fetching Anime')
      return;
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
              <router-link to="/" class="btn btn-primary btn-sm">
                Go to Dashboard
              </router-link>

              <router-link to="/anime/create" class="btn btn-success btn-sm mx-2">
                Add Anime
              </router-link>
            </div>

            <div class="col-md-12 my-2">
              <DataTable
                :columns="columns"
                :data="dataAnime"
                class="table table-striped table-row-bordered gy-5 gs-7 border rounded"
                width="100%"
                :options="{
                  responsive: true,
                  processing: true,
                  pageLength: 10,
                  lengthMenu: [ [10, 25, 50, -1], [10, 25, 50, 'All'] ],
                  scrollX: true,
                  scrollY: '570px',
                  order: [[0]],
                  fixedColumns: {
                    leftColumns: 2,
                    rightColumns: 0
                  },
                }"
              >
                <template #action="props">
                  <button class="btn btn-danger btn-sm" @click="() => toast.success(props.rowData.uuid)">Delete {{ props.rowData.uuid }}</button>
                </template>

                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Name Anime</th>
                    <th>Source</th>
                    <th>Studio</th>
                    <th>Genres</th>
                    <th>Start Date</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Admin</th>
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

<style>
/* Custom styles for DataTables pagination */

.dt-paging-button {
  padding: 0.5rem 1rem;
  margin: 2px;
  border-radius: 7px;
  border: 1px solid #dee2e6;
  background-color: #ffffff;
  color: #3a3a3a;
  transition: 0.5s;
}

.current {
  background-color: #0095e8;
}

.dt-paging-button:hover {
  background-color: #0095e8;
}

/* custom input search DataTables */
.dt-input {
  margin-left: 0.5rem;
  padding: 5px 10px;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  outline: none;
  background-color: #f8f9fa;
  color: #495057;
}

.table {
  overflow-x: auto;
  overflow-y: auto;
  white-space: nowrap;
}

.dtfc-fixed-left {
  z-index: 10;
}
</style>