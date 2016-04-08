<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <!-- Showing page title -->
    @yield('jsg-page-title')
    <!-- page title -->
    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet" />
    <link href="{{ asset('css/style.css') }}" rel="stylesheet" />
    <link href="{{ asset('css/animate.css') }}" rel="stylesheet" />
    <link href="{{ asset('css/jquery-ui.min.css') }}" rel="stylesheet" />
    <link href='https://fonts.googleapis.com/css?family=Lobster|Roboto:400,300italic,300,400italic,500,500italic,700,700italic,900,900italic,100italic,100' rel='stylesheet' type='text/css' />
    <link rel='stylesheet' href="{{asset('font-awesome/css/font-awesome.min.css') }}" type='text/css' media='all' />

    <script src="{{asset('js/jquery.min.js') }}"></script>
    <script src="{{ asset('js/jquery-ui.min.js') }}"></script>
    <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.min.js"></script>
    <!--[if lt IE 9]>
        <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
        <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->


    <script src="{{ asset('js/angular.min.js') }}"></script>
    <script src="{{ asset('js/angular-route.js') }}"></script>
    <script src="{{asset('js/angular-resource.min.js') }}"></script>

    <script src="{{ asset('js/bootstrap.min.js') }}"></script>
    <script src="{{ asset('js/typeahead.bundle.js') }}"></script>
    <script src="{{asset('js/wow.js') }}"></script>

    <link rel='stylesheet' href="{{ asset('css/bootstrap-tagsinput.css') }}" type='text/css' media='all' />
    <script src="{{asset('js/bootstrap-tagsinput.js') }}"></script>
    <script src="{{asset('js/bootstrap-tagsinput-angular.js') }}"></script>


    <!-- start Mixpanel -->
    <script type="text/javascript">
        (function (e, b) {
            if (!b.__SV) {
                var a, f, i, g; window.mixpanel = b; b._i = []; b.init = function (a, e, d) {
                    function f(b, h) { var a = h.split("."); 2 == a.length && (b = b[a[0]], h = a[1]); b[h] = function () { b.push([h].concat(Array.prototype.slice.call(arguments, 0))) } } var c = b; "undefined" !== typeof d ? c = b[d] = [] : d = "mixpanel"; c.people = c.people || []; c.toString = function (b) { var a = "mixpanel"; "mixpanel" !== d && (a += "." + d); b || (a += " (stub)"); return a }; c.people.toString = function () { return c.toString(1) + ".people (stub)" }; i = "disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
                    for (g = 0; g < i.length; g++) f(c, i[g]); b._i.push([a, e, d])
                }; b.__SV = 1.2; a = e.createElement("script"); a.type = "text/javascript"; a.async = !0; a.src = "undefined" !== typeof MIXPANEL_CUSTOM_LIB_URL ? MIXPANEL_CUSTOM_LIB_URL : "file:" === e.location.protocol && "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//) ? "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js" : "//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js"; f = e.getElementsByTagName("script")[0]; f.parentNode.insertBefore(a, f)
            }
        })(document, window.mixpanel || []);
        mixpanel.init("f97b2eb9569581304a1d8dcaa66e1793");</script><!-- end Mixpanel -->

</head>
<body data-ng-app="jetSetGenie" data-ng-controller="jetSetGenie">
    <header class="jsg-header">
        <div class="container">
            <h1><a href="/" class="animated wow fadeIn"><img src="{{ asset('assets/Logo.png') }}" alt="Jet set Genie" /></a></h1>
        </div>
    </header>

    <div class="app-content">
        @yield('content')
        @yield('additional-scripts')
    </div>

    <footer class="jsg-footer">
        <div class="container">
            <div class="row">
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 footer-copyright">
                    <div class="pull-left copyright"> <p>Copyright reserved 2016, <a href="/">JetSetGenie</a></p></div>
                </div>
                <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 footer-nav">
                    <div class="social-icons clearfix text-right">
                        <ul>
                            <li> <a href="#"><i class="fa fa-facebook"></i></a></li>
                            <li> <a href="#"><i class="fa fa-twitter"></i></a></li>
                            <li> <a href="#"><i class="fa fa-linkedin"></i></a></li>
                            <li> <a href="#"><i class="fa fa-google-plus"></i></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    <div class="bodyloaders"><i class="fa fa-spinner fa-pulse fa-3x"></i></div>

    <script src="{{ asset('js/jetSetApp.js') }}"></script>
    <script src="{{ asset('js/jetSetCtrl.js') }}"></script>
</body>
</html>