<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>Jet Set Genie</title>

<link href="{{ asset('css/bootstrap.min.css') }}" rel="stylesheet">
<link href="{{ asset('css/style.css') }}" rel="stylesheet">
<link href='https://fonts.googleapis.com/css?family=Lobster' rel='stylesheet' type='text/css'>
<link rel='stylesheet' href="{{ asset('font-awesome/css/font-awesome.min.css') }}"  type='text/css' media='all' />


<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script> 
<script src="{{ asset('js/bootstrap.min.js') }}"></script>

 <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
 <script src="http://ajax.aspnetcdn.com/ajax/jquery.validate/1.9/jquery.validate.min.js"></script>
<script>

$(document).ready(function(){ 


	$('#jetbutton').on('click', function(){	
	
		if ($('#leavingdate').val() == '') {	
			$('#leavingdate').css('border-color', 'red');
		}
		else {
			$('#leavingdate').css('border-color', '');
		}
		
		if ($('#returningdate').val() == '') {
			$('#returningdate').css('border-color', 'red');
		}
		else {
			$('#returningdate').css('border-color', '');
		}
		
		if ($('#homeairport').val() == '') {
				$('#homeairport').css('border-color', 'red');
			}
			else {
				$('#homeairport').css('border-color', '');
			}
	
	});	
		
	
		/* if ($("input[name='destination']:checked").val()) {
		   
		}
		else {
		  alert('Select a destination');
		} */
		
		if ($('#name').val() == '') {
				$('#name').css('border-color', 'red');
			}
			else {
				$('#name').css('border-color', '');
			}
		

	});
</script>

<script type="text/javascript">
	jQuery(document).ready(function(){
		jQuery("#myModal").modal('show');
	});
</script>

	<!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]--> 
    
</head>
<body>
<header>
  <div class="container">
	<h1><a href="#"><img src="{{ asset('assets/Logo.png') }}" alt="Jet set Genie"></a></h1>
  </div>
</header>
<section id="jsg-content">
<section class="jsg-banner">
  <div class="container">
    <div class="row row-centered main">
	<div id="slider">
     <div class="slider-step1" id="slide" style="display:none;">
      <div class="steps col-lg-6 col-md-7 col-sm-9 col-xs-12 col-centered">
        
		<form id="jetform">
          <h2>WHEN CAN YOU GO?</h2>
            <div class="row">
              <div class="col-lg-10 col-sm-10">
                <div class="form-group form-inline">
                  <label class="control-label">LEAVING</label>
                  <input class="form-control leaving" type="date" name="leavingdate" id="leavingdate" value="" placeholder="MM/DD/YY" />               
                  <label class="control-label">RETURNING</label>
                  <input class="form-control returning" type="date" id="returningdate" name="returningdate" value="" placeholder="MM/DD/YY" />    
                </div>
              </div>
            </div>
            <div class="row">
                <div class="col-lg-12 col-sm-12">
                <div class="form-group form-inline">
				  <label class="control-label ">HOMEAIRPORT</label>
				  <input class="form-control home-airport" id="homeairport" placeholder="Hometown or Airport Code" type="text" name="homeairport" value=""/>
                  <!--<button class="jet-set-submit" type="submit" value="jetset">JetSet!</button>-->
                  <button class="btn btn-default jsg-submit" id="jetbutton" type="button">JetSet!</button>
              </div></div>

            </div>
          </form>
        </div>
      </div>
      <div class="slider-step2" id="slide" style="display:none;">
       <div class="steps col-lg-9 col-md-10 col-sm-12 col-xs-12 col-centered">        
          <h2>HAVE A DESTINATION IN MIND?</h2>          
        
        <div class="blocks">
         <div class="col-lg-2 col-md-3 col-sm-3 col-xs-6">
             <label>
                 	<i class="fa fa-anchor"></i>
                    <h4>Beach</h4>
                    <input type="radio" name="destination" value="">
                
                </label>
                
            </div>
            <div class="col-lg-2 col-md-3 col-sm-3 col-xs-6">
            
            <label>
             <i class="fa fa-tree"></i>
                <h4>Mountain</h4>
                 <input type="radio" name="destination" value="">
                </label>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-3 col-xs-6">
            <label>
              <i class="fa fa-bicycle"></i>
                <h4>Europe</h4>
                 <input type="radio" name="destination" value="">
                </label>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-3 col-xs-6">
            <label>
             <i class="fa fa-futbol-o"></i>
                <h4>Latin America</h4>
                 <input type="radio" name="destination" value="">
                </label>
            </div>
            
            <div class="col-lg-2 col-md-3 col-sm-3 col-xs-6">
            <label>
             <i class="fa fa-star"></i>
                <h4>Surprise Me</h4>
                 <input type="radio" name="destination" value="">
                </label>
            </div>
            
        </div>
      </div>
    </div>

     <div class="slider-step3" id="slide" style="display:none;">
         <div class="steps col-lg-12 col-md-12 col-sm-12 col-xs-12 col-centered">   
                <div class="finding-options">
             <h3 class="lobster-font">JetSetGenie</h3>            
                <div class="option-gif"><i class="fa fa-spinner fa-pulse fa-3x"></i> </div>            
                <h2>FINDING ALL YOUR OPTIONS...</h2>
          </div>
          </div>
       </div>
       
       
       <div class="slider-step4" id="slide">
        <div class="steps col-lg-12 col-md-12 col-sm-12 col-xs-12 col-centered">         
             <div class="finding-options">
             <h3 class="lobster-font">JetSetGenie</h3>            
                <div class="option-gif"><i class="fa fa-spinner fa-pulse fa-3x"></i> </div>            
                	<h2>FINDING ALL YOUR OPTIONS...</h2>
          		</div>
               
           <div id="myModal" class="modal fade">
    			<div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <!--<button type="button" class="close" data-dismiss="modal">&times;</button>-->
                        <h2 class="lobster-font modal-title" align="center">Jet <span class="light">Set</span> Genie is still in Beta</h2>
                        <p align="center">We'll email you your search results</p>                        
                      </div>
                      <div class="modal-body">
                        <form id="jetsetform4" role="form">
                          <div class="form-group">                            
                            <input type="text" class="form-control" id="name" placeholder="NAME" required>
                          </div>
                          <div class="form-group">                            
                            <input type="email" class="form-control" id="pwd" placeholder="EMAIL">
                          </div>  
                                                  
                          <button type="button" id="jetsetbutton2" class="btn btn-default jsg-submit">Go</button>
                        </form>
                      </div>
                      <div class="modal-body" align="center";>
                        <p>JetSetGenie will never spam you or<br> share your contact information</p>
                      </div>
                    </div>
                
                  </div>
					</div>
					
              </div>
       </div>
	   </div>
    
	</div>
  </div>
</section>

<section class="inner-content">
  <div class="container">
    <div class="row row-centered">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <h3 class="lobster-font">How Does Jet <span class="light">Set</span> Genie Work</h3>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 jsg-work"> <img src="{{ asset('assets/iconmonstr-calendar-4-240.png') }}" alt="">
        <h4>You tell us when.<br/>
          we'll tell you where</h4>
        <p>Search all available destinations based on your schedule.</p>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 jsg-work"> <img src="{{ asset('assets/iconmonstr-share-2-240.png') }}" alt="">
        <h4>Share options with<br/>
          Your travel buddies</h4>
        <p>Easily share one link that shows all your alternatives so that you can compare.</p>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 jsg-work"> <img src="{{ asset('assets/iconmonstr-paper-plane-2-240.png') }}" alt="">
        <h4>Jetset</h4>
        <p>Book your travel with one click and rest assured that you got the best deal.</p>
      </div>
    </div>
  </div>
</section>
</section>
<footer>
	<div class="container">
    <div class="row">
    <div class="col-lg-6 col-md-6 col-sm-6 col-xs-12 footer-copyright">
      <div class="pull-left copyright"> <p>Copyright reserved 2016, <a href="#">JETSETGENIE</a></p></div>
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
 