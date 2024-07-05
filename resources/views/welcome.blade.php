<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Ayotaku Admin</title>

        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js" integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy" crossorigin="anonymous"></script>
      
        {{-- Start CSS Metronic 8 --}}
        <link rel="stylesheet" href="{{ asset('assets/plugins/global/css/plugins.bundle.css') }}">
        <link rel="stylesheet" href="{{ asset('assets/plugins/global/css/style.bundle.css') }}">
        {{-- End CSS Metronic 8 --}}
      
        {{-- Start Javascript Metronic 8 --}}
        <script src="{{ asset('assets/plugins/global/js/plugins.bundle.js') }}"></script>
        <script src="{{ asset('assets/plugins/global/js/scripts.bundle.js') }}"></script>
        {{-- End Javascript Metronic 8 --}}

        {{-- FONT GOOGLE NUNITO --}}
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet">
        {{-- END FONT GOOGLE NUNITO --}}

        {{-- ICON --}}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        {{-- END ICON --}}
      
        <link rel="stylesheet" href="{{ asset('assets/plugins/global/css/select2.css') }}">
        <link rel="stylesheet" href="{{ asset('assets/plugins/custom/datatables/datatables.bundle.css') }}">
        <script src="{{ asset('assets/plugins/custom/datatables/datatables.bundle.js') }}"></script>

        {{-- INI CONFIG UNTUK PRODUCTION --}}
        {{-- <link rel="stylesheet" href="{{ asset('build/assets/app-8aNONUvS.css') }}"> --}}
      
        @vite(['resources/js/app.js'])
      </head>
      <style>
        * {
          font-family: "Nunito", sans-serif;
          font-optical-sizing: normal;
          font-weight: 600;
          font-style: inherit
        }
      </style>
      <body id="kt_app_body" data-kt-app-layout="light-sidebar" data-kt-app-header-fixed="true" data-kt-app-sidebar-enabled="true" data-kt-app-sidebar-fixed="true" data-kt-app-sidebar-hoverable="true" data-kt-app-sidebar-push-header="true" data-kt-app-sidebar-push-toolbar="true" data-kt-app-sidebar-push-footer="true" data-kt-app-toolbar-enabled="true" class="app-default">
        <div id="app"></div>
      </body>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous"></script>

      {{-- INI CONFIG UNTUK PRODUCTION --}}
      {{-- <script src="{{ asset('build/assets/app-D-hd7bqm.js') }}"></script>
      <script src="{{ asset('build/assets/app-l0sNRNKZ.js') }}"></script> --}}


      <script>
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
      </script>
</html>