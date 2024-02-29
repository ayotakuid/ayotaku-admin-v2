<script setup>
  import { ref } from 'vue';

  const getData = ref(null);
  const textTitle = ref('');

  const handlerData = (data) => {
    getData.value = data
    textTitle.value = getData.value[0].text
  }
</script>

<template>
  <!--begin::Main-->
  <div id="app">
    <div class="app-main flex-column flex-row-fluid" id="kt_app_main">
      <!--begin::Content wrapper-->
      <div class="d-flex flex-column flex-column-fluid">
          <!--begin::Toolbar-->
          <div id="kt_app_toolbar" class="app-toolbar py-3 py-lg-6">
              <!--begin::Toolbar container-->
              <div id="kt_app_toolbar_container" class="app-container container-fluid d-flex flex-stack">
                  <!--begin::Page title-->
                  <div class="page-title d-flex flex-column justify-content-center flex-wrap me-3">
                      <!--begin::Title-->
                      <h1 class="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">{{ textTitle }}</h1>
                      <!--end::Title-->

                      <!--begin::Breadcrumb-->
                      <ol class="breadcrumb breadcrumb-dot text-muted fs-6 fw-semibold">
                          <li class="breadcrumb-item pe-3">{{ textTitle }}</li>
                      </ol>
                      <!--end::Breadcrumb-->
                      
                  </div>
                  <!--end::Page title-->									
              </div>
              <!--end::Toolbar container-->
          </div>
          <!--end::Toolbar-->
          <!--begin::Content-->
          <div id="kt_app_content" class="app-content flex-column-fluid">
              <!--begin::Content container-->
              <div id="kt_app_content_container" class="app-container container-fluid">
                  <router-view @dataParent="handlerData"></router-view>
              </div>							
              </div>
              <!--end::Content container-->
          </div>
          <!--end::Content-->
      </div>
      <!--end::Content wrapper-->
      <!--begin::Footer-->
      <div id="kt_app_footer" class="app-footer">
          <!--begin::Footer container-->
          <div class="app-container container-fluid d-flex flex-column flex-md-row flex-center flex-md-stack py-3">
              <!--begin::Copyright-->
              <footer-content />
              <!--end::Copyright-->								
          </div>
          <!--end::Footer container-->
      </div>
      <!--end::Footer-->
    </div>
<!--end:::Main-->
</template>