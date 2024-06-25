<script setup>
  import { ref, watchEffect } from 'vue';
  import { toast } from 'vue-sonner';
  import DataTable from 'datatables.net-vue3';
  import DataTablesCore from 'datatables.net';
  import FetchingEpisode from '../../utils/handler-episode-fetching';
  import Cookies from '../../utils/handler-cookies';
  import FormatDate from '../../utils/handler-date';
  import ModalShowEpisodeComponent from '../animes/modal/ModalShowEpisodeComponent.vue';

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
      width: '300px'
    },
    {
      data: 'link_stream',
      render: '#stream',
      orderable: false,
      width: '250px'
    },
    {
      data: 'link_download',
      render: '#download',
      orderable: false,
      width: '250px'
    },
    {
      data: 'whois.username_mal',
      render: '#admin',
      width: '250px'
    },
    {
      data: 'createdAt',
      render: (data, type, row) => {
        return FormatDate.formatDateOnline(data)
      },
      width: '250px'
    },
  ]

  const dataDataTable = ref();
  const dataModalShow = ref();
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

  const handlerClickShowEpisode = (data) => {
    dataModalShow.value = null;
    dataModalShow.value = data
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
                  scrollY: '570px',
                  order: [[0]],
                  fixedColumns: {
                    leftColumns: 1,
                    rightColumns: 0
                  },
                }"
              >
                <template #action="props">
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
                          >
                            Edit
                          </a>
                          <a
                            class="dropdown-item"
                          >
                            Delete
                          </a>
                          <a
                            class="dropdown-item"
                            data-bs-toggle="modal"
                            data-bs-target="#show-episode"
                            @click="handlerClickShowEpisode(props.rowData)"
                          >
                            Show Stream
                          </a>
                        </li>
                        <li>
                          <a
                            class="dropdown-item"
                          >
                            {{ props.rowData?.uuid }}
                          </a>
                        </li>
                      </ul>
                  </div>
                </template>

                <template #stream="props">
                  <span 
                    class="badge mx-1 text-center fs-7" 
                    :class="{ 
                      'badge-danger': !props.rowData?.link_stream?.resol720,
                      'badge-primary': props.rowData?.link_stream?.resol720
                    }"
                  >
                    Stream 720
                  </span>

                  <span 
                    class="badge mx-1 text-center fs-7" 
                    :class="{ 
                      'badge-danger': !props.rowData?.link_stream?.resol1080,
                      'badge-primary': props.rowData?.link_stream?.resol1080
                    }"
                  >
                    Stream 1080
                  </span>
                </template>

                <template #download="props">
                  <span 
                    class="badge mx-1 text-center fs-7" 
                    :class="{ 
                      'badge-danger': !props.rowData?.link_download?.resol720,
                      'badge-primary': props.rowData?.link_download?.resol720
                    }"
                  >
                    Stream 720
                  </span>

                  <span 
                    class="badge mx-1 text-center fs-7" 
                    :class="{ 
                      'badge-danger': !props.rowData?.link_download?.resol1080,
                      'badge-primary': props.rowData?.link_download?.resol1080
                    }"
                  >
                    Stream 1080
                  </span>
                </template>

                <template #admin="props">
                  <span class="badge badge-success fs-7">{{ props.rowData?.whois?.username_mal }}</span>
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

            <ModalShowEpisodeComponent 
              :dataEpisode="dataModalShow"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>