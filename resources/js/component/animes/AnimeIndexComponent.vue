<script setup>
  import { ref, render, watchEffect } from 'vue';
  import DataTable from 'datatables.net-vue3';
  import DataTablesCore from 'datatables.net';
  import Fetching from '../../utils/handler-fetching';
  import Cookies from '../../utils/handler-cookies';
  import { toast } from 'vue-sonner';

  DataTable.use(DataTablesCore);

  const columns = [
    { 
      data: 'data.nama_anime',
      render: (data, type, row) => {
        return data?.romanji ? data?.romanji : data?.eng
      },
      width: '400px'
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
      data: 'whois.username_mal',
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
                  pageLength: 5,
                  lengthMenu: [ [5, 10, 25, 50, -1], [5, 10, 25, 50, 'All'] ],
                  scrollX: true,
                  order: [[0]]
                }"
              >
                <thead>
                  <tr>
                    <th>Nama Anime</th>
                    <th>Source</th>
                    <th>Studio</th>
                    <th>Genres</th>
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
  white-space: nowrap;
}
</style>