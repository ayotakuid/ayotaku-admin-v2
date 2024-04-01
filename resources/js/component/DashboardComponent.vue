<script setup>
  import { onMounted, ref } from 'vue';
  import { toast } from 'vue-sonner';

  const contentText = ref('Ini adalah Dashboard');
  const data = [
    {
      name: 'dashboard-page',
      text: 'Dashboard Page',
    },
  ];
  const emit = defineEmits(['parents'])
  emit('parents', data);

  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));

  onMounted(() => {
    const infoLogin = localStorage.getItem('infoLogin');
    const parse = JSON.parse(infoLogin);
    setTimeout(() => {
      toast.promise(promise, {
        loading: 'Loading...',
        success: `Welcome back, ${parse.name}`
      })
    }, 1000)
  })
</script>
<template>
  <div class="row g-5 g-xl-10 mb-5 mb-xl-10">
    <div class="card shadow-sm">
      <div class="card-body">
        <div class="container">
          <div class="row">

            <div class="col-md-3 col-sm-6 col-xs-12 text-light mb-4">
              <div class="box-dashboard-counting">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="text-start">Total User</div>
                  <div data-kt-countup="true" data-kt-countup-value="100" class="text-end">0</div>
                </div>
                <div class="text-end mt-3 mb-3">
                  <button class="button-refresh rounded">
                    <i class="fa-solid fa-arrows-rotate text-light icon-rotate"></i>
                  </button>
                </div>
              </div>
            </div>

            <div class="col-md-3 col-sm-6 col-xs-12 text-light mb-4">
              <div class="box-dashboard-counting">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="text-start">Total Anime</div>
                  <div data-kt-countup="true" data-kt-countup-value="100" class="text-end">0</div>
                </div>
                <div class="text-end mt-3 mb-3">
                  <button class="button-refresh rounded">
                    <i class="fa-solid fa-arrows-rotate text-light icon-rotate"></i>
                  </button>
                </div>
              </div>
            </div>

            <div class="col-md-3 col-sm-6 col-xs-12 text-light mb-4">
              <div class="box-dashboard-counting">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="text-start">Total Episode</div>
                  <div data-kt-countup="true" data-kt-countup-value="100" class="text-end">0</div>
                </div>
                <div class="text-end mt-3 mb-3">
                  <button class="button-refresh rounded">
                    <i class="fa-solid fa-arrows-rotate text-light icon-rotate"></i>
                  </button>
                </div>
              </div>
            </div>

            <div class="col-md-3 col-sm-6 col-xs-12 text-light mb-4">
              <div class="box-dashboard-counting">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="text-start">Total Online</div>
                  <div data-kt-countup="true" data-kt-countup-value="100" class="text-end">0</div>
                </div>
                <div class="text-end mt-3 mb-3">
                  <button class="button-refresh rounded">
                    <i class="fa-solid fa-arrows-rotate text-light icon-rotate"></i>
                  </button>
                </div>
              </div>
            </div>

            <div class="col-md-12 mt-5">
              {{ contentText }}
            </div>

            <div class="col-md-12">
              <router-link to="/anime" class="btn btn-primary btn-sm">
                Go to Animes
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.box-dashboard-counting {
  padding: 5px 15px;
  background-color: #2F303E;
  border-radius: 5px;
  font-size: 18px;
  box-shadow: 3px 5px 15px black;
}

.text-end {
  flex: 1;
  text-align: right;
}

.button-refresh {
  font-size: 12px;
  border: none;
  outline: none;
  text-align: center;
  padding: 5px 10px;
  transition: 0.5s;
  background-color: #50CD89;
}

.button-refresh:hover {
  background-color: #01b351;
}

.button-refresh:hover .icon-rotate {
  animation: refresh 3s;
}

@keyframes refresh {
  50% {
    transform: rotate(180deg);
  }
}
</style>