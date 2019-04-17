<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" style="height: auto; min-height: 100%;">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">

        <title>Monitor NTL 1.0</title>
        <!-- Bootstrap 3.3.7 -->
        <link rel="stylesheet" href="{{asset('bower_components/bootstrap/dist/css/bootstrap.min.css')}}">
        <!-- Font Awesome -->
        <link rel="stylesheet" href="{{asset('bower_components/font-awesome/css/font-awesome.min.css')}}">
        <!-- Ionicons -->
        <link rel="stylesheet" href="{{asset('bower_components/Ionicons/css/ionicons.min.css')}}">
        <!-- jvectormap -->
        <link rel="stylesheet" href="{{asset('bower_components/jvectormap/jquery-jvectormap.css')}}">
        <!-- DataTables -->
        <link rel="stylesheet" href="{{asset('bower_components/datatables.net-bs/css/dataTables.bootstrap.min.css')}}">
        <!-- Theme style -->
        <link rel="stylesheet" href="{{asset('dist/css/AdminLTE.min.css')}}">
        <!-- AdminLTE Skins. Choose a skin from the css/skins
             folder instead of downloading all of them to reduce the load. -->
        <link rel="stylesheet" href="{{asset('dist/css/skins/_all-skins.min.css')}}">

        <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
        <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
        <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
        <![endif]-->

        <link rel="stylesheet" type="text/css" href="{{ asset('css/app.css') }}">

        <!-- Google Font -->
        <link rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">

        <script type="text/javascript">
            window.Laravel = {!! json_encode([
                'baseUrl' => url('/'),
                'csrfToken' => csrf_token(),
            ]) !!};
        </script>
        <script src="https://canvasjs.com/assets/script/canvasjs.min.js"></script>

    </head>
    <body class="hold-transition skin-black custom_dark_mode sidebar-mini sidebar-collapse" style="background-color:#d2d6de !important;">
        <div id="root" style="position: unset">
        </div>

        <!-- jQuery 3 -->
        <script src="{{asset('bower_components/jquery/dist/jquery.min.js') }}"></script>
        <!-- Bootstrap 3.3.7 -->
        <script src="{{asset('bower_components/bootstrap/dist/js/bootstrap.min.js') }}"></script>
        <!-- FastClick -->
        {{--<script src="{{asset('bower_components/fastclick/lib/fastclick.js') }}"></script>--}}
        <!-- AdminLTE App -->
        <script src="{{asset('dist/js/adminlte.min.js') }}"></script>
        <!-- Sparkline -->
        <script src="{{asset('bower_components/jquery-sparkline/dist/jquery.sparkline.min.js') }}"></script>
        <!-- jvectormap  -->
        <script src="{{asset('plugins/jvectormap/jquery-jvectormap-1.2.2.min.js') }}"></script>
        <script src="{{asset('plugins/jvectormap/jquery-jvectormap-world-mill-en.js') }}"></script>
        <!-- DataTables -->
        <script src="{{asset('bower_components/datatables.net/js/jquery.dataTables.min.js') }}"></script>
        <script src="{{asset('bower_components/datatables.net-bs/js/dataTables.bootstrap.min.js') }}"></script>
        <!-- SlimScroll -->
        <script src="{{asset('bower_components/jquery-slimscroll/jquery.slimscroll.min.js') }}"></script>
        <!-- ChartJS -->
        {{--<script src="{{asset('bower_components/chart.js/Chart.js') }}"></script>--}}
        <!-- AdminLTE dashboard demo (This is only for demo purposes) -->
{{--        <script src="{{asset('dist/js/pages/dashboard.js') }}"></script>--}}
        <!-- AdminLTE for demo purposes -->

        <script type="text/javascript" src="{{ asset('js/app.js') }}"></script>

        <script src="{{asset('dist/js/demo.js') }}"></script>
    </body>
</html>
