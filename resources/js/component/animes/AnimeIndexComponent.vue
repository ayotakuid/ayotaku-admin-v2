<script setup>
  import { ref } from 'vue';
  import DataTable from 'datatables.net-vue3';
  import DataTablesCore from 'datatables.net';

  DataTable.use(DataTablesCore);

  const columns = [
    { data: 'name' },
    { data: 'position' },
    { data: 'office' },
    { data: 'extn' },
    { data: 'start_date' },
    { 
      data: 'salary',
      render: (data, type, row) => {
        return `<button class="btn btn-primary btn-sm">${data}</button>`
      } 
    },
  ];
  const datatableData = [
    {
      "id": "1",
      "name": "Tiger Nixon",
      "position": "System Architect",
      "salary": "$320,800",
      "start_date": "2011/04/25",
      "office": "Edinburgh",
      "extn": "5421"
    },
    {
      "id": "2",
      "name": "Garrett Winters",
      "position": "Accountant",
      "salary": "$170,750",
      "start_date": "2011/07/25",
      "office": "Tokyo",
      "extn": "8422"
    },
    {
      "id": "3",
      "name": "Ashton Cox",
      "position": "Junior Technical Author",
      "salary": "$86,000",
      "start_date": "2009/01/12",
      "office": "San Francisco",
      "extn": "1562"
    },
    {
      "id": "4",
      "name": "Cedric Kelly",
      "position": "Senior Javascript Developer",
      "salary": "$433,060",
      "start_date": "2012/03/29",
      "office": "Edinburgh",
      "extn": "6224"
    },
    {
      "id": "5",
      "name": "Airi Satou",
      "position": "Accountant",
      "salary": "$162,700",
      "start_date": "2008/11/28",
      "office": "Tokyo",
      "extn": "5407"
    },
  ];

  const data = [
    {
      name: 'anime-page',
      text: 'Anime Page',
    },
  ];

  const emit = defineEmits(['parents'])
  emit('parents', data);
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
                :data="datatableData"
                class="table table-striped table-row-bordered gy-5 gs-7 border rounded"
                width="100%"
                :options="{
                  responsive: true,
                  processing: true,
                  pageLength: 5,
                  lengthMenu: [ [5, 10, 25, 50, -1], [5, 10, 25, 50, 'All'] ],
                  scrollX: true,
                  scrollY: true
                }"
              >
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Office</th>
                    <th>Extn.</th>
                    <th>Start date</th>
                    <th>Salary</th>
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
</style>