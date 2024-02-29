<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Ayotaku Admin</title>

  {{-- Start CSS Metronic 8 --}}
  <link rel="stylesheet" href="{{ asset('assets/plugins/global/css/plugins.bundle.css') }}">
  <link rel="stylesheet" href="{{ asset('assets/plugins/global/css/style.bundle.css') }}">
  {{-- End CSS Metronic 8 --}}

  {{-- Start Javascript Metronic 8 --}}
  <script src="{{ asset('assets/plugins/global/js/plugins.bundle.js') }}"></script>
  <script src="{{ asset('assets/plugins/global/js/scripts.bundle.js') }}"></script>
  {{-- End Javascript Metronic 8 --}}

  <link rel="stylesheet" href="{{ asset('assets/plugins/global/css/select2.css') }}">

  @vite(['resources/js/app.js'])
</head>
<!--begin::Body-->
<body id="kt_app_body" data-kt-app-layout="light-sidebar" data-kt-app-header-fixed="true" data-kt-app-sidebar-enabled="true" data-kt-app-sidebar-fixed="true" data-kt-app-sidebar-hoverable="true" data-kt-app-sidebar-push-header="true" data-kt-app-sidebar-push-toolbar="true" data-kt-app-sidebar-push-footer="true" data-kt-app-toolbar-enabled="true" class="app-default">
  <!--begin::Theme mode setup on page load-->
  <!--end::Theme mode setup on page load-->
  <!--begin::App-->
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
              {{-- @include('layouts.notification')								 --}}
              
              <!--begin::User menu-->
              <div class="app-navbar-item ms-1 ms-lg-3" id="kt_header_user_menu_toggle">
                <!--begin::Menu wrapper-->
                <div class="cursor-pointer symbol symbol-35px symbol-md-40px" data-kt-menu-trigger="click" data-kt-menu-attach="parent" data-kt-menu-placement="bottom-end">
                  <img src="https://ui-avatars.com/api/?name=rezu-san" alt="user" />
                </div>
                <!--begin::User account menu-->
                <div class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px" data-kt-menu="true">
                  <!--begin::Menu item-->
                  <div class="menu-item px-3">
                    <div class="menu-content d-flex align-items-center px-3">
                      <!--begin::Avatar-->
                      <div class="symbol symbol-50px me-5">
                        <img alt="Logo" src="https://ui-avatars.com/api/?name=rezu-san" />
                      </div>
                      <!--end::Avatar-->
                      <!--begin::Username-->
                      <div class="d-flex flex-column">
                        <div class="fw-bold d-flex align-items-center fs-5">
                          Urusai-san
                          <span class="badge badge-light-success fw-bold fs-8 px-2 py-1 ms-2">
                            Owner
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
                    <a href="" class="menu-link px-5">Sign Out</a>
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
        @include('layouts.sidebar')

        @include('layouts.content')
      </div>
      <!--end::Wrapper-->
    </div>
    <!--end::Page-->            
  </div>
  <!--end::App-->
  <!--begin::Scrolltop-->
  <div id="kt_scrolltop" class="scrolltop" data-kt-scrolltop="true">            
    <!--begin::Svg Icon | path: icons/duotune/arrows/arr066.svg-->
    <span class="svg-icon">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect opacity="0.5" x="13" y="6" width="13" height="2" rx="1" transform="rotate(90 13 6)" fill="currentColor" />
        <path d="M12.5657 8.56569L16.75 12.75C17.1642 13.1642 17.8358 13.1642 18.25 12.75C18.6642 12.3358 18.6642 11.6642 18.25 11.25L12.7071 5.70711C12.3166 5.31658 11.6834 5.31658 11.2929 5.70711L5.75 11.25C5.33579 11.6642 5.33579 12.3358 5.75 12.75C6.16421 13.1642 6.83579 13.1642 7.25 12.75L11.4343 8.56569C11.7467 8.25327 12.2533 8.25327 12.5657 8.56569Z" fill="currentColor" />
      </svg>
    </span>
    <!--end::Svg Icon-->
  </div>
  <!--end::Scrolltop-->        
  <!--begin::Javascript-->
  <script>var hostUrl = "{{ asset('assets/') }}";</script>
  <!--begin::Vendors Javascript(used by this page)-->		
  @yield('page_js')
  <!--end::Vendors Javascript-->
  <!--begin::Custom Javascript(used by this page)-->
  @yield('custom_js')
  <!--end::Custom Javascript-->
  <!--end::Javascript-->
</body>
<!--end::Body-->
</html>