<script setup>
  import { ref, watchEffect } from 'vue';
  import { toast } from 'vue-sonner';
  import DataTable from 'datatables.net-vue3';
  import DataTablesCore from 'datatables.net';
  import Fetching from '../../utils/handler-fetching';
  import Cookies from '../../utils/handler-cookies';
  import FormatDate from '../../utils/handler-date';
  import ModalImageComponent from './modal/ModalImageComponent.vue';
  import ModalDeleteAnimeComponent from './modal/ModalDeleteAnimeComponent.vue';
  import ModalSyncAnimeComponent from './modal/ModalSyncAnimeComponent.vue';
  import ModalManualEditComponent from './modal/ModalManualEditComponent.vue';
  import ModalAddEpisodeComponent from './modal/ModalAddEpisodeComponent.vue';

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
        const text = data.statusAiring;
        if (text.indexOf('_') === -1) {
          return `
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <span class="badge badge-primary">
                    ${text}
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
        } else {
          const splitText = text.split('_');
          const mappingText = splitText.map((text) => {
            return text.charAt(0).toUpperCase() + text.slice(1);
          }).join(' ');
          return `
            <div class="container">
              <div class="row">
                <div class="col-md-12">
                  <span class="badge badge-primary">
                    ${mappingText}
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
  const animeDelete = ref();
  const animeSync = ref();
  const animeEdit = ref();
  const animeAdd = ref();

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
  });

  const handlerCloseModal = () => {
    const modal = document.getElementById('modal-image');
    modal.style.display = "none";
  }

  const handlerAnimeId = (idAnime, namaAnime) => {
    animeDelete.value = null
    animeDelete.value = {
      uuid: idAnime,
      nama: namaAnime, 
    };
  }

  // handler updating data after delete anime
  const handlerReceiveData = (data) => {
    dataAnime.value = data
  }

  // handler updating data after sync anime from myanimelist and manual edit photo/video 
  const handlerUpdateListAnime = (data) => {
    const findData = dataAnime.value;
    const resultFindIndex = findData.findIndex((item) => item.uuid === data[0].uuid);

    if (resultFindIndex !== -1) {
      findData[resultFindIndex].data.start_date = data[0]?.data?.start_date;
      findData[resultFindIndex].data.end_date = data[0]?.data?.end_date;
      findData[resultFindIndex].data.rating = data[0]?.data?.rating;
      findData[resultFindIndex].data.status = data[0]?.data?.status;
    }

    if (resultFindIndex === -1) {
      toast.error('Ada error')
      return;
    }
  }

  const handlerUpdateListAfterEdit = (data) => {
    const findData = dataAnime.value;
    const resultFindIndex = findData.findIndex((item) => item.uuid === data[0].uuid);

    if (resultFindIndex !== -1) {
      findData[resultFindIndex].data.foto_anime = data[0]?.data?.foto_anime;
      findData[resultFindIndex].data.video = data[0]?.data?.video;
    }

    if (resultFindIndex === -1) {
      toast.error('Ada error');
      return;
    }
  }

  const handlerSyncAnimeToMal = (idAnime, idAnimeMal, namaAnime) => {
    animeSync.value = null
    animeSync.value = {
      uuid: idAnime,
      idMal: idAnimeMal,
      nama: namaAnime,
    };
  };

  const handlerManualEdit = (idAnime, namaAnime, imageLink, videoLink) => {
    animeEdit.value = null
    animeEdit.value = {
      uuid: idAnime,
      nama: namaAnime,
      url: {
        image: imageLink,
        video: videoLink,
      }
    };
  }
  
  const handlerAddEpisode = (dataAnime) => {
    animeAdd.value = null
    animeAdd.value = dataAnime
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

              <router-link 
                to="/anime/recovery-anime" 
                class="btn btn-warning btn-sm mx-2 btn-icon" 
                v-tooltip.bottom-end="'Recovery Anime'"
              >
                <i class="fa-solid fa-rotate-left"></i>
              </router-link>

              <router-link 
                to="/anime/create" 
                class="btn btn-success btn-sm btn-icon"
                v-tooltip.bottom-end="'Add Anime'"
              >
                <i class="fa-solid fa-plus"></i>
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
                    leftColumns: 1,
                    rightColumns: 0
                  },
                }"
              >
              
                <template #action="props">
                  <div class="btn-group dropstart justify-content-center">
                    <button 
                      class="btn btn-light-success btn-icon rounded mt-1 btn-sm"
                      v-tooltip.right="'Add Episode'"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#add-episode"
                      @click="handlerAddEpisode(
                        props?.rowData
                      )"
                    >
                      <i class="fa-solid fa-plus fs-3"></i>
                    </button>
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
                          class="dropdown-item sync"
                          data-bs-toggle="modal"
                          data-bs-target="#sync-anime"
                          @click="handlerSyncAnimeToMal(
                              props?.rowData?.uuid,
                              props?.rowData?.data?.id_anime,
                              props?.rowData?.data?.nama_anime?.romanji
                            )"
                        >
                          Sync to MAL
                        </a>
                      </li>
                      <li>
                        <a 
                          class="dropdown-item delete"
                          data-bs-toggle="modal" 
                          data-bs-target="#delete-anime"
                          @click="handlerAnimeId(props?.rowData?.uuid, props?.rowData?.data?.nama_anime?.romanji)" 
                        >
                          Delete
                        </a>
                      </li>
                      <li>
                        <a 
                          class="dropdown-item edit"
                          data-bs-toggle="modal"
                          data-bs-target="#manual-edits"
                          @click="handlerManualEdit(
                            props?.rowData?.uuid,
                            props?.rowData?.data?.nama_anime?.romanji,
                            props?.rowData?.data?.foto_anime,
                            props?.rowData?.data?.video
                          )"
                        >
                          Manual Edits
                        </a>
                      </li>
                      <li>
                        <ModalImageComponent
                          :uuidAnime="props.rowData?.data?.id_anime" 
                          :imageLink="props.rowData?.data?.foto_anime"
                        />
                      </li>
                    </ul>
                  </div>
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

            <!-- MODAL IMAGE DI DataTable -->
            <div id="modal-image" class="modal-image">
              <span class="close" @click="handlerCloseModal">&times;</span>
              <img class="modal-content-image" id="element">
              <div id="caption"></div>
            </div>

            <!-- MODAL DELETE ANIME -->
            <ModalDeleteAnimeComponent 
              :dataAnime="animeDelete"
              :listAnime="dataAnime"
              @updateDataAnime="handlerReceiveData"
            />

            <!-- MODAL SYNC ANIME TO MAL -->
            <ModalSyncAnimeComponent 
              :dataAnime="animeSync"
              :token="tokenAyotaku"
              @updateListAnime="handlerUpdateListAnime"
            />

            <!-- MODAL MANUAL EDIT ANIME -->
            <ModalManualEditComponent 
              :dataEdit="animeEdit"
              :token="tokenAyotaku"
              @updateListAnime="handlerUpdateListAfterEdit"
            />

            <ModalAddEpisodeComponent 
              :dataAnime="animeAdd"
              :token="tokenAyotaku"
            />
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
  overflow-x: scroll;
  overflow-y: auto;
  white-space: nowrap;
}

.dtfc-fixed-left {
  z-index: 10;
}

.table th, .table td {
  border: 1px solid #dee2e6;
}

ul li {
  cursor: pointer;
}

.sync {
 transition: 0.5ms;
}

.sync:hover {
  background-color: #f1bc00;
}

.delete {
  transition: 0.5ms;
}

.delete:hover {
  background-color: #d9214e;
  color: #ffffff;
}

/* The Modal (background) */
.modal-image {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 1000; /* Sit on top */
  padding-top: 100px; /* Location of the box */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.9); /* Black w/ opacity */
}

/* Modal Content (image) */
.modal-content-image {
  margin: auto;
  display: block;
  width: 30%;
  max-width: 500px;
}

/* Caption of Modal Image */
#caption {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 700px;
  text-align: center;
  color: #ccc;
  padding: 10px 0;
  height: 150px;
}

/* Add Animation */
.modal-content-image, #caption {  
  -webkit-animation-name: zoom;
  -webkit-animation-duration: 0.6s;
  animation-name: zoom;
  animation-duration: 0.6s;
}

@-webkit-keyframes zoom {
  from {-webkit-transform:scale(0)} 
  to {-webkit-transform:scale(1)}
}

@keyframes zoom {
  from {transform:scale(0)} 
  to {transform:scale(1)}
}

/* The Close Button */
.close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: 0.3s;
}

.close:hover,
.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

/* 100% Image Width on Smaller Screens */
@media only screen and (max-width: 700px){
  .modal-content-image {
    width: 100%;
  }
}
</style>