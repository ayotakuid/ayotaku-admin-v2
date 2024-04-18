<script setup>
  import { onMounted, onUpdated } from "vue";

  // // Select2
  // onMounted(() => {
  //   $('.select-anime').select2({
  //     allowClear: true
  //   });
  // })

  // // Select2
  // onUpdated(() => {
  //   $('.select-anime').select2({
  //     allowClear: true
  //   });
  // })
</script>

<template>
  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
    <div class="card shadow-sm">
      <div class="card-body">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <h1>Search Anime from Myanimelist</h1>
            </div>

            <div class="col-md-8 my-2">
              <input type="text" class="form-control form-control-sm form-control-solid" placeholder="name@example.com"/>
              <!-- <select
                class="form-select form-select-sm form-select-solid select-anime"
                data-control="select2"
                data-placeholder="Select Anime"
              >
                <option></option>
                <option value="1">Option 1</option>
                <option value="2">Option 2</option>
              </select> -->
            </div>

            <div class="col-md-4 button-checking">
              <button class="btn btn-success btn-sm">Checking</button>
            </div>

            <div class="col-md-12 my-5">
              <router-link to="/anime" class="btn btn-primary btn-sm">
                Back to anime
              </router-link>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
div {
  font-size: 15px;
}

.button-checking {
  margin-top: 6px;
}
</style>