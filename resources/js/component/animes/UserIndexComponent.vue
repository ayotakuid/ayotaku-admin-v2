<script setup>
  import { ref, watchEffect } from 'vue';
  import { toast } from 'vue-sonner';
  import DataTable from 'datatables.net-vue3';
  import DataTablesCore from 'datatables.net';
  import Fetching from '../../utils/handler-fetching';
  import Cookies from '../../utils/handler-cookies';

  DataTable.use(DataTablesCore);

  const data = [
    {
      name: 'users-page',
      text: 'Users Page',
    },
  ];

  const columns = [
    {
      data: 'uuid',
      orderable: false,
      width: '50px'
    },
    {
      data: 'img_profile',
      orderable: false,
      width: '250px'
    },
    {
      data: 'name_mal',
      width: '200px',
    },
    {
      data: 'role',
      width: '200px'
    },
    {
      data: 'isLogin',
      width: '300px'
    },
    {
      data: 'created_at',
      width: '200px'
    }
  ];

  const dataDataTable = ref();
  const tokenAyotaku = Cookies.getCookies('tokenAyotaku');
  const emit = defineEmits(['parents']);
  emit('parents', data);

  watchEffect(async () => {
    const fetchingUsers = await Fetching.handlerFetchingShowAllUsers(tokenAyotaku);

    if (fetchingUsers.status) {
      if (fetchingUsers.status === 'success') {
        dataDataTable.value = fetchingUsers?.data;
      }
    }

    if (!fetchingUsers.status || fetchingUsers.status === 'fail') {
      toast.error('Gagal fetching data users');
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
                <thead>
                  <tr>
                    <th>Action</th>
                    <th>Profile MAL</th>
                    <th>Username MAL</th>
                    <th>Role</th>
                    <th>Is login & Time</th>
                    <th>CreatedAt</th>
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