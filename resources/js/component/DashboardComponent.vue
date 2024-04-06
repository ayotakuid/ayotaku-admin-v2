<script setup>
  import { computed, onMounted, ref, watchEffect } from 'vue';
  import Paginate from 'vuejs-paginate-next';
  import CountUp from 'vue-countup-v3';
  import Fetching from '../utils/handler-fetching';
  import Cookies from '../utils/handler-cookies';
  import { toast } from 'vue-sonner';

  const tokenCookies = Cookies.getCookies('tokenAyotaku');
  const pagePagination = ref(1);
  const querySearch = ref('');
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

  const items = ref([]),
        currentPage = ref(1),
        perPage = 10;

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

      const responseLogs = await Fetching.handlerFetchingLogs(tokenCookies);
      items.value = responseLogs?.data;
    }
  })

  const toastShow = (text, oldValue, newValue) => {
    if (oldValue === newValue) {
      return toast.error(`Total ${text} masih sama`);
    }

    return toast.success(`Total ${text} telah berubah`);
  }

  const handlerClickRefresh = async (text) => {
    const idSelected = totalBox.value.find(item => item.id === text);
    if (idSelected) {
      const responseTotal = await Fetching.handlerFetchingTotal(tokenCookies);
      idSelected.startValue = idSelected.endValue
      if (idSelected.id === 'count_up_user') {
        toastShow('User', idSelected.endValue, responseTotal?.data?.totalUser)
        idSelected.endValue = responseTotal?.data?.totalUser
      }
      
      if (idSelected.id === 'count_up_online') {
        toastShow('Online', idSelected.endValue, responseTotal?.data?.onlineUser)
        idSelected.endValue = responseTotal?.data?.onlineUser
      }
    }
  }

  const totalItems = computed(() => {
    const search = querySearch.value
    return Math.ceil(
      items.value.filter((item) => JSON.stringify(item).toLowerCase().includes(search.toLowerCase())).length / perPage
    );
  })

  const displayItems = computed(() => {
    const search = querySearch.value
    const start = (currentPage.value - 1) * perPage;
    const end = start + perPage;
    return items.value.filter((item) => {
      return JSON.stringify(item).toLowerCase().includes(search.toLowerCase());
    }).slice(start, end);
  })

  const handlerClickCallback = (pagenum) => {
    currentPage.value = pagenum
    console.log(pagenum);
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
              <div class="card shadow-lg">
                <div class="card-body">
                  <div class="px-5">
                    <div class="box-input-search">
                      <div class="input-group input-group-solid mb-5 width-input-box">
                        <span class="input-group-text" id="search-logs">
                          <i class="fa-solid fa-magnifying-glass"></i>
                        </span>
                        <input type="text" class="form-control" placeholder="Search..." v-model="querySearch">
                      </div>
                    </div>
                    <div 
                      v-for="item in displayItems" 
                      :key="item.uuid"
                      class="item-logs-paginate"
                    >
                      {{ item.text }}
                    </div>
                  </div>
                  <div class="box-paginate">
                    <paginate
                      v-model="pagePagination"
                      :page-count="totalItems"
                      :click-handler="handlerClickCallback"
                    >
                    </paginate>
                  </div>
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

.box-input-search {
  display: flex;
  justify-content: end;
  margin: 0 0 15px 0;
}

.box-paginate {
  display: flex;
  justify-content: start;
  margin: 20px 0;
}

.page-item .page-link {
  cursor: pointer;
}

.item-logs-paginate {
  border: 1px solid #000000;
  padding: 8px 10px;
  border-radius: 7px;
  margin: 5px 0;
}

.width-input-box{
  width: 30%;
}

@media (max-width: 450px) {
  .width-input-box{
  width: 70%;
}
}

@keyframes refresh {
  50% {
    transform: rotate(180deg);
  }
}
</style>