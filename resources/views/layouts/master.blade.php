<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Jet Set Genie</title>

    <link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet">
    <link href="{{ asset('css/style.css') }}" rel="stylesheet">
    <link href="{{ asset('css/animate.css') }}" rel="stylesheet">
    <link href="{{ asset('css/jquery-ui.min.css') }}" rel="stylesheet">
    <link href='https://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
    <link rel='stylesheet' href="{{ asset('font-awesome/css/font-awesome.min.css') }}"  type='text/css' media='all' />


    <script src="{{ asset('js/jquery.min.js') }}"></script>
    <script src="{{ asset('js/jquery-ui.min.js') }}"></script>
    <script src="{{ asset('js/bootstrap.min.js') }}"></script>
    <script src="{{ asset('js/wow.js') }}"></script>

    <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.min.js"></script>


    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

</head>
<body>
<header class="jsg-header">
    <div class="container">
        <h1 class="wow fadeInDown animated"><a href="#"><img src="{{ asset('assets/Logo.png') }}" alt="Jet set Genie"></a></h1>
    </div>
</header>

	@yield('content')

   <footer class="jsg-footer">
       <div class="container">
           <div class="row">
               <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 footer-copyright">
                   <div class="pull-left copyright"> <p>Copyright reserved 2016, <a href="#">JetSetGenie</a></p></div>
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

</body>
</html>