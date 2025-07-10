<!DOCTYPE html>
<html lang="en" class="color-two font-exo header-style-two">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IkokuOnline Frontend</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body>
    <div id="app"></div>

    <!--==================== Overlay Start ====================-->
    <div class="overlay"></div>
    <!--==================== Overlay End ====================-->

    <!--==================== Sidebar Overlay End ====================-->
    <div class="side-overlay"></div>
    <!--==================== Sidebar Overlay End ====================-->

    <!-- ==================== Scroll to Top End Here ==================== -->
    <div class="progress-wrap">
        <svg class="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
            <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
        </svg>
    </div>
    <!-- ==================== Scroll to Top End Here ==================== -->

    <!-- Web Frontend JS Libraries -->
    <script src="{{url('assets/marketpro/js/jquery-3.7.1.min.js')}}"></script>
    <!-- <script src="assets/js/bootstrap.bundle.min.js"></script> -->
    <script src="{{url('assets/marketpro/js/phosphor-icon.js')}}"></script>
    <script src="{{url('assets/marketpro/js/select2.min.js')}}"></script>
    <script src="{{url('assets/marketpro/js/slick.min.js')}}"></script>
    <script src="{{url('assets/marketpro/js/count-down.js')}}"></script>
    <script src="{{url('assets/marketpro/js/jquery-ui.js')}}"></script>
    <script src="{{url('assets/marketpro/js/wow.min.js')}}"></script>
    <script src="{{url('assets/marketpro/js/aos.js')}}"></script>
    <script src="{{url('assets/marketpro/js/marque.min.js')}}"></script>
    <script src="{{url('assets/marketpro/js/vanilla-tilt.min.js')}}"></script>
    <script src="{{url('assets/marketpro/js/counter.min.js')}}"></script>
    <script src="{{url('assets/marketpro/js/main.js')}}"></script>

    <!-- ================================== Dashboard End =========================== -->
    <!-- Jquery js -->
    <script src="{{url('assets/dp-market-dashboard/js/jquery-3.7.1.min.js')}}"></script>
    <!-- Bootstrap Bundle Js -->
    <script src="{{url('assets/dp-market-dashboard/js/boostrap.bundle.min.js')}}"></script>
    <!-- CountDown -->
    <script src="{{url('assets/dp-market-dashboard/js/countdown.js')}}"></script>
    <!-- counter up -->
    <script src="{{url('assets/dp-market-dashboard/js/counterup.min.js')}}"></script>
    <!-- Slick js -->
    <script src="{{url('assets/dp-market-dashboard/js/slick.min.js')}}"></script>
    <!-- magnific popup -->
    <script src="{{url('assets/dp-market-dashboard/js/jquery.magnific-popup.js')}}"></script>
    <!-- apex chart -->
    <script src="{{url('assets/dp-market-dashboard/js/apexchart.js')}}"></script>
    <!-- marquee -->
    <script src="{{url('assets/dp-market-dashboard/js/marquee.min.js')}}"></script>
    <!-- main js -->
    <script src="{{url('assets/dp-market-dashboard/js/main.js')}}"></script>
</body>

</html>