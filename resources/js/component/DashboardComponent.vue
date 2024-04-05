<script setup>
  import { onMounted, ref, watchEffect } from 'vue';
  import CountUp from 'vue-countup-v3';
  import Fetching from '../utils/handler-fetching';
  import Cookies from '../utils/handler-cookies';

  const tokenCookies = Cookies.getCookies('tokenAyotaku');
  const totalBox = ref([
    {
      id: 'count_up_user',
      startValue: 0,
      endValue: 10
    },
    {
      id: 'count_up_anime',
      startValue: 0,
      endValue: 10
    },
    {
      id: 'count_up_episode',
      startValue: 0,
      endValue: 10
    },
    {
      id: 'count_up_online',
      startValue: 0,
      endValue: 10
    }
  ])
  const contentText = ref('Ini adalah Dashboard');
  const data = [
    {
      name: 'dashboard-page',
      text: 'Dashboard Page',
    },
  ];
  const emit = defineEmits(['parents'])
  emit('parents', data);

  onMounted(async () => {
    if (tokenCookies) {
      const responseTotal = await Fetching.handlerFetchingTotal(tokenCookies);
      totalBox.value.forEach((item) => {
        if (item.id === 'count_up_user') {
          item.endValue = responseTotal?.data?.totalUser;
        }

        if (item.id === 'count_up_online') {
          item.endValue = responseTotal?.data?.onlineUser;
        }
      })

    }
  })

  const handlerClickRefresh = async (text) => {
    const idSelected = totalBox.value.find(item => item.id === text);
    if (idSelected) {
      const responseTotal = await Fetching.handlerFetchingTotal(tokenCookies);
      idSelected.startValue = idSelected.endValue
      if (idSelected.id === 'count_up_user') {
        idSelected.endValue = responseTotal?.data?.totalUser
      }

      if (idSelected.id === 'count_up_online') {
        idSelected.endValue = responseTotal?.data?.onlineUser
      }
    }
  }
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
                  <count-up 
                    :start-val="totalBox.find(item => item.id === 'count_up_user').startValue" 
                    :end-val="totalBox.find(item => item.id === 'count_up_user').endValue" 
                    :delay="1000" 
                    class="text-end">
                  </count-up>
                </div>
                <div class="text-end mt-3 mb-3">
                  <button 
                    class="button-refresh rounded"
                    @click="handlerClickRefresh('count_up_user')">
                    <i class="fa-solid fa-arrows-rotate text-light icon-rotate"></i>
                  </button>
                </div>
              </div>
            </div>

            <div class="col-md-3 col-sm-6 col-xs-12 text-light mb-4">
              <div class="box-dashboard-counting">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="text-start">Total Anime</div>
                  <count-up 
                    :start-val="totalBox.find(item => item.id === 'count_up_anime').startValue" 
                    :end-val="totalBox.find(item => item.id === 'count_up_anime').endValue" 
                    :delay="1000" 
                    class="text-end">
                  </count-up>
                </div>
                <div class="text-end mt-3 mb-3">
                  <button 
                    class="button-refresh rounded"
                    @click="handlerClickRefresh('count_up_anime')">
                    <i class="fa-solid fa-arrows-rotate text-light icon-rotate"></i>
                  </button>
                </div>
              </div>
            </div>

            <div class="col-md-3 col-sm-6 col-xs-12 text-light mb-4">
              <div class="box-dashboard-counting">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="text-start">Total Episode</div>
                  <count-up 
                    :start-val="totalBox.find(item => item.id === 'count_up_episode').startValue" 
                    :end-val="totalBox.find(item => item.id === 'count_up_episode').endValue" 
                    :delay="1000" 
                    class="text-end">
                  </count-up>
                </div>
                <div class="text-end mt-3 mb-3">
                  <button 
                    class="button-refresh rounded"
                    @click="handlerClickRefresh('count_up_episode')">
                    <i class="fa-solid fa-arrows-rotate text-light icon-rotate"></i>
                  </button>
                </div>
              </div>
            </div>

            <div class="col-md-3 col-sm-6 col-xs-12 text-light mb-4">
              <div class="box-dashboard-counting">
                <div class="d-flex align-items-center justify-content-between">
                  <div class="text-start">Total Online</div>
                  <count-up 
                    :start-val="totalBox.find(item => item.id === 'count_up_online').startValue" 
                    :end-val="totalBox.find(item => item.id === 'count_up_online').endValue" 
                    :delay="1000" 
                    class="text-end">
                  </count-up>
                </div>
                <div class="text-end mt-3 mb-3">
                  <button 
                    class="button-refresh rounded"
                    @click="handlerClickRefresh('count_up_online')">
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