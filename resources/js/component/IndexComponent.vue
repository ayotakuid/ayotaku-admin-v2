<script setup>
  import { onMounted, onUnmounted, reactive, ref, watchEffect } from 'vue';
  import { useRouter } from 'vue-router';
  import { toast, Toaster } from 'vue-sonner';
  import SidebarComponent from './layouts/SidebarComponent.vue';
  import ContentComponent from './layouts/ContentComponent.vue';
  import LoginComponent from './auth/LoginComponent.vue';
  import Cookies from '../utils/handler-cookies';
  import Fetching from '../utils/handler-fetching';

  const getStateLogin = ref(localStorage.getItem('stateLogin'));
  const textTitle = ref(null);
  const router = useRouter()
  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));
  const stateInfo = reactive({
    image: null,
    nameMAL: null,
    role: null
  });
  const infoLocal = localStorage.getItem('infoLogin');

  watchEffect(async () => {
    const { code } = router.currentRoute.value.query;

    if (!code) {
      const tokenCookies = Cookies.getCookies('tokenAyotaku');

      if (tokenCookies) {
        const responseChecking = await Fetching.checkingToken(tokenCookies);
        if (responseChecking.statusCode || responseChecking.statusCode === 401 || responseChecking.status === 'fail') {
          toast.promise(promise, {
            loading: 'Loading...',
            success: responseChecking?.message,
            duration: 2000
          })
  
          setTimeout(() => {
            getStateLogin.value = false
            localStorage.setItem('stateLogin', 'false')
            localStorage.removeItem('infoLogin');
            Cookies.deleteCookies('tokenAyotaku');
            Cookies.deleteCookies('tokenMAL');
          }, 3000);
        }
      }
    }
  })

  const updateStateLogin = () => {
    getStateLogin.value = localStorage.getItem('stateLogin');
  }

  onMounted(() => {
    window.addEventListener('storage', updateStateLogin);
  })
  
  onUnmounted(() => {
    window.removeEventListener('storage', updateStateLogin);
  })

  const emit = defineEmits(['parents', 'stateLogin']);

  const handlerData = (data) => {
    textTitle.value = {
      textTitle: data
    };
    emit('parents', textTitle.value);
  }

  const handlerSignout = async () => {
    const tokenAyotaku = Cookies.getCookies('tokenAyotaku');
    const fetchingUpdate = await Fetching.handlerFetchingSignOut(tokenAyotaku);
    
    if (fetchingUpdate.status === 'success') {
      toast.promise(promise, {
        loading: 'Please wait!',
        success: (data) => {
          return 'Berhasil signout!'
        },
        duration: 2000
      });
  
      setTimeout(() => {
        localStorage.setItem('stateLogin', 'false');
        localStorage.removeItem('infoLogin');
        Cookies.deleteCookies('tokenAyotaku');
        Cookies.deleteCookies('tokenMAL');
        getStateLogin.value = localStorage.getItem('stateLogin');
        router.push('/');
      }, 2000);
    }
  }

  const handlerStateLogin = (data) => {
    setTimeout(() => {
      getStateLogin.value = data;
    }, 2000)
  }
</script>

<template>
  <div>
    <div v-if="getStateLogin === 'true'">
      <div class="d-flex flex-column flex-root app-root" id="kt_app_root">
      <!--begin::Page-->
        <div class="app-page flex-column flex-column-fluid" id="kt_app_page">
          <!--begin::Header-->
          <div id="kt_app_header" class="app-header">
            <!--begin::Header container-->
            <div class="app-container container-fluid d-flex align-items-stretch justify-content-between" id="kt_app_header_container">
              <!--begin::sidebar mobile toggle-->
              <div class="d-flex align-items-center d-lg-none ms-n2 me-2" title="Show sidebar menu">
                <div class="btn btn-icon btn-active-color-primary w-35px h-35px" id="kt_app_sidebar_mobile_toggle">
                  <!--begin::Svg Icon | path: icons/duotune/abstract/abs015.svg-->
                  <span class="svg-icon svg-icon-1">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 7H3C2.4 7 2 6.6 2 6V4C2 3.4 2.4 3 3 3H21C21.6 3 22 3.4 22 4V6C22 6.6 21.6 7 21 7Z" fill="currentColor" />
                      <path opacity="0.3" d="M21 14H3C2.4 14 2 13.6 2 13V11C2 10.4 2.4 10 3 10H21C21.6 10 22 10.4 22 11V13C22 13.6 21.6 14 21 14ZM22 20V18C22 17.4 21.6 17 21 17H3C2.4 17 2 17.4 2 18V20C2 20.6 2.4 21 3 21H21C21.6 21 22 20.6 22 20Z" fill="currentColor" />
                    </svg>
                  </span>
                  <!--end::Svg Icon-->
                </div>
              </div>
              <!--end::sidebar mobile toggle-->
              <!--begin::Header wrapper-->
              <div class="d-flex align-items-stretch justify-content-between flex-lg-grow-1" id="kt_app_header_wrapper">
                <!--begin::Menu wrapper-->
                <div class="app-header-menu app-header-mobile-drawer align-items-stretch" data-kt-drawer="true" data-kt-drawer-name="app-header-menu" data-kt-drawer-activate="{default: true, lg: false}" data-kt-drawer-overlay="true" data-kt-drawer-width="250px" data-kt-drawer-direction="end" data-kt-drawer-toggle="#kt_app_header_menu_toggle" data-kt-swapper="true" data-kt-swapper-mode="{default: 'append', lg: 'prepend'}" data-kt-swapper-parent="{default: '#kt_app_body', lg: '#kt_app_header_wrapper'}">
                </div>
                <!--end::Menu wrapper-->
                <!--begin::Navbar-->
                <div class="app-navbar flex-shrink-0">
                  <!-- {{-- NOTIF							 --}} -->
                  
                  <!--begin::User menu-->
                  <div class="app-navbar-item ms-1 ms-lg-3" id="kt_header_user_menu_toggle">
                    <!--begin::Menu wrapper-->
                    <div class="cursor-pointer symbol symbol-35px symbol-md-40px" data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
                      <img src="https://ui-avatars.com/api/?name=Urusai-san" alt="user" />
                    </div>
                    <!--begin::User account menu-->
                    <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px" data-kt-menu="true">
                      <!--begin::Menu item-->
                      <div class="menu-item px-3">
                        <div class="menu-content d-flex align-items-center px-3">
                          <!--begin::Avatar-->
                          <div class="symbol symbol-50px me-5">
                            <img alt="Logo" src="https://ui-avatars.com/api/?name=Urusai-san" />
                          </div>
                          <!--end::Avatar-->
                          <!--begin::Username-->
                          <div class="d-flex flex-column">
                            <div class="fw-bold d-flex align-items-center fs-5">
                              Urusai-san
                              <span class="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2">
                                admin
                              </span>
                            </div>
                            <a href="#" class="fw-semibold text-muted text-hover-primary fs-7">
                              ayotakuid@gmail.com
                            </a>
                          </div>
                          <!--end::Username-->
                        </div>
                      </div>
                      <!--end::Menu item-->
                      <!--begin::Menu separator-->
                      <div class="separator my-2"></div>
                      <!--end::Menu separator-->
                      <!--begin::Menu item-->
                      <div class="menu-item px-5">
                        <a class="menu-link px-5" @click="handlerSignout">Sign Out</a>
                      </div>
                      <!--end::Menu item-->
    
                    </div>
                    <!--end::User account menu-->
                    <!--end::Menu wrapper-->
                  </div>
                  <!--end::User menu-->														
                </div>
                <!--end::Navbar-->
              </div>
              <!--end::Header wrapper-->
            </div>
            <!--end::Header container-->
          </div>
          <!--end::Header-->
          <!--begin::Wrapper-->
          <div class="app-wrapper flex-column flex-row-fluid" id="kt_app_wrapper">
            <SidebarComponent :menuActivated="textTitle"/>
    
            <ContentComponent @parents="handlerData" />
          </div>
          <!--end::Wrapper-->
        </div>
        <!--end::Page-->            
      </div>
    </div>

    <div v-else>
      <LoginComponent @stateLogin="handlerStateLogin"/>
    </div>
    
    <Toaster 
        position="top-right"
        :expand="false"
        theme="dark" 
      />
  </div>

</template>