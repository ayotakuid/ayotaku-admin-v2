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
                  <router-link to="/dashboard"><span class="menu-title">Main Content</span></router-link>
                  <span class="menu-arrow"></span>
              </span>
              <!--end:Menu link-->
              <!--begin:Menu sub-->
              <div class="menu-sub menu-sub-accordion">
                  <!--begin:Menu item-->
                  <div class="menu-item">
                    <router-link to="/dashboard" class="menu-link" :class="{ 'active': active?.name === 'dashboard-page' }">
                        <span class="menu-bullet">
                          <i class="fa-solid fa-house"></i>
                        </span>
                        <span class="menu-title">Dashboard Admin</span>
                    </router-link>
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
              <router-link to="/anime" class="menu-link" :class="{ 'active': active?.name === 'anime-page' }">
                  <span class="menu-icon">
                      <!--begin::Svg Icon | path: icons/duotune/abstract/abs014.svg-->
                      <span class="svg-icon svg-icon-2">
                        <i class="fa-solid fa-database"></i>
                      </span>
                      <!--end::Svg Icon-->
                  </span>
                  <span class="menu-title">List Animes</span>
              </router-link>
              <!--end:Menu link-->

              <!--begin:Menu link-->
              <router-link to="/anime/episode" class="menu-link" :class="{ 'active': active?.name === 'episode-page' }">
                  <span class="menu-icon">
                      <!--begin::Svg Icon | path: icons/duotune/abstract/abs014.svg-->
                      <span class="svg-icon svg-icon-2">
                        <i class="fa-solid fa-database"></i>
                      </span>
                      <!--end::Svg Icon-->
                  </span>
                  <span class="menu-title">List Episodes</span>
              </router-link>
              <!--end:Menu link-->

            <!--begin:Menu link-->
            <router-link to="/recommend" class="menu-link" :class="{ 'active': active?.name === 'recommend-page' }">
              <span class="menu-icon">
                <!--begin::Svg Icon | path: icons/duotune/abstract/abs014.svg-->
                <span class="svg-icon svg-icon-2">
                  <i class="fa-solid fa-gear"></i>
                </span>
                <!--end::Svg Icon-->
              </span>
              <span class="menu-title">Recommend Anime</span>
            </router-link>
            <!--end:Menu link-->

            <!--begin:Menu link-->
            <router-link to="/users" class="menu-link" :class="{ 'active': active?.name === 'users-page' }">
              <span class="menu-icon">
                <!--begin::Svg Icon | path: icons/duotune/abstract/abs014.svg-->
                <span class="svg-icon svg-icon-2">
                  <i class="fa-solid fa-gear"></i>
                </span>
                <!--end::Svg Icon-->
              </span>
              <span class="menu-title">Manage User</span>
            </router-link>
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