<script setup>
import { ref, watch } from 'vue';

  const receiveData = defineProps(['textMenu']);
  const active = ref('');

  watch(() => receiveData.textMenu, (newValue) => {
    active.value = newValue?.textTitle ?? ''
  })
</script>

<template>
<!--begin::sidebar menu-->
<div class="app-sidebar-menu overflow-hidden flex-column-fluid">
  <!--begin::Menu wrapper-->
  <div id="kt_app_sidebar_menu_wrapper" class="app-sidebar-wrapper hover-scroll-overlay-y my-5" data-kt-scroll="true" data-kt-scroll-activate="true" data-kt-scroll-height="auto" data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer" data-kt-scroll-wrappers="#kt_app_sidebar_menu" data-kt-scroll-offset="5px" data-kt-scroll-save-state="true">
      <!--begin::Menu-->
      <div class="menu menu-column menu-rounded menu-sub-indention px-3" id="#kt_app_sidebar_menu" data-kt-menu="true" data-kt-menu-expand="true">
          <!--begin:Menu item-->
          <div data-kt-menu-trigger="click" class="menu-item here show menu-accordion">
              <!--begin:Menu link-->
              <span class="menu-link">
                  <span class="menu-icon">
                      <!--begin::Svg Icon | path: icons/duotune/general/gen025.svg-->
                      <span class="svg-icon svg-icon-2">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <rect x="2" y="2" width="9" height="9" rx="2" fill="currentColor" />
                              <rect opacity="0.3" x="13" y="2" width="9" height="9" rx="2" fill="currentColor" />
                              <rect opacity="0.3" x="13" y="13" width="9" height="9" rx="2" fill="currentColor" />
                              <rect opacity="0.3" x="2" y="13" width="9" height="9" rx="2" fill="currentColor" />
                          </svg>
                      </span>
                      <!--end::Svg Icon-->
                  </span>
                  <a href="/dashboard"><span class="menu-title">Dashboard Admin</span></a>
                  <span class="menu-arrow"></span>
              </span>
              <!--end:Menu link-->
              <!--begin:Menu sub-->
              <div class="menu-sub menu-sub-accordion">
                  <!--begin:Menu item-->
                  <div class="menu-item">
                    <a class="menu-link" :class="{ 'active': active?.name === 'dashboard-page' }" href="/dashboard">
                        <span class="menu-bullet">
                            <span class="bullet bullet-dot"></span>
                        </span>
                        <span class="menu-title">Dashboard Admin</span>
                    </a>
                </div>
                  <!--end:Menu item-->											
              </div>
              <!--end:Menu sub-->
          </div>
          <!--end:Menu item-->
          <!--begin:Menu item-->
          <div class="menu-item pt-5">
              <!--begin:Menu content-->
              <div class="menu-content">
                  <span class="menu-heading fw-bold text-uppercase fs-7">Other Contents</span>
              </div>
              <!--end:Menu content-->
          </div>
          <!--end:Menu item-->
          <!--begin:Menu item-->
          <div class="menu-item">
              <!--begin:Menu link-->
              <a class="menu-link" :class="{ 'active': active?.name === 'anime-page' }" href="/anime">
                  <span class="menu-icon">
                      <!--begin::Svg Icon | path: icons/duotune/abstract/abs014.svg-->
                      <span class="svg-icon svg-icon-2">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path opacity="0.3" d="M11.8 5.2L17.7 8.6V15.4L11.8 18.8L5.90001 15.4V8.6L11.8 5.2ZM11.8 2C11.5 2 11.2 2.1 11 2.2L3.8 6.4C3.3 6.7 3 7.3 3 7.9V16.2C3 16.8 3.3 17.4 3.8 17.7L11 21.9C11.3 22 11.5 22.1 11.8 22.1C12.1 22.1 12.4 22 12.6 21.9L19.8 17.7C20.3 17.4 20.6 16.8 20.6 16.2V7.9C20.6 7.3 20.3 6.7 19.8 6.4L12.6 2.2C12.4 2.1 12.1 2 11.8 2Z" fill="currentColor" />
                              <path d="M11.8 8.69995L8.90001 10.3V13.7L11.8 15.3L14.7 13.7V10.3L11.8 8.69995Z" fill="currentColor" />
                          </svg>
                      </span>
                      <!--end::Svg Icon-->
                  </span>
                  <span class="menu-title">Animes</span>
              </a>
              <!--end:Menu link-->

             <!--begin:Menu link-->
             <a class="menu-link" href="">
                <span class="menu-icon">
                  <span class="svg-icon svg-icon-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path opacity="0.3" d="M11.8 5.2L17.7 8.6V15.4L11.8 18.8L5.90001 15.4V8.6L11.8 5.2ZM11.8 2C11.5 2 11.2 2.1 11 2.2L3.8 6.4C3.3 6.7 3 7.3 3 7.9V16.2C3 16.8 3.3 17.4 3.8 17.7L11 21.9C11.3 22 11.5 22.1 11.8 22.1C12.1 22.1 12.4 22 12.6 21.9L19.8 17.7C20.3 17.4 20.6 16.8 20.6 16.2V7.9C20.6 7.3 20.3 6.7 19.8 6.4L12.6 2.2C12.4 2.1 12.1 2 11.8 2Z" fill="currentColor" />
                        <path d="M11.8 8.69995L8.90001 10.3V13.7L11.8 15.3L14.7 13.7V10.3L11.8 8.69995Z" fill="currentColor" />
                    </svg>
                  </span>
                </span>
                <span class="menu-title">Users</span>
              </a>
              <!--end:Menu link-->

          </div>
          <!--end:Menu item-->																																										
      </div>
      <!--end::Menu-->
  </div>
  <!--end::Menu wrapper-->
</div>
<!--end::sidebar menu-->
</template>