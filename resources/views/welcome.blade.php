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

        {{-- FONT GOOGLE NUNITO --}}
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" rel="stylesheet">
        {{-- END FONT GOOGLE NUNITO --}}

        {{-- ICON --}}
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
        {{-- END ICON --}}
      
        <link rel="stylesheet" href="{{ asset('assets/plugins/global/css/select2.css') }}">
      
        @vite(['resources/js/app.js'])
      </head>
<body id="kt_app_body" data-kt-app-layout="light-sidebar" data-kt-app-header-fixed="true" data-kt-app-sidebar-enabled="true" data-kt-app-sidebar-fixed="true" data-kt-app-sidebar-hoverable="true" data-kt-app-sidebar-push-header="true" data-kt-app-sidebar-push-toolbar="true" data-kt-app-sidebar-push-footer="true" data-kt-app-toolbar-enabled="true" class="app-default">
  <div id="app"></div>
</body>
</html>