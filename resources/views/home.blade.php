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

<script>

$(document).ready(function(){ 


				formvalidate = $("#jetform").validate({
						
							highlight: function (element, errorClass, validClass) {
								//alert('........' +element.id);
								$(element.form).find("input[id=" + element.id + "]")
								.addClass("error");
							},
							unhighlight: function (element, errorClass, validClass) {
								$(element.form).find("input[id=" + element.id + "]")
								.removeClass("error");
							},
							
							 errorPlacement: function(error, element) {}
						
				});

	
				$( ".leaving" ).datepicker({
				  minDate: 0,
				  defaultDate: "+1w",
				  changeMonth: false,
				  numberOfMonths: 1,
				  onClose: function( selectedDate ) {
					$( ".returning" ).datepicker( "option", "minDate", selectedDate );
				  }
				});
				$( ".returning" ).datepicker({
				  defaultDate: "+1w",
				  changeMonth: false,
				  numberOfMonths: 1,
				  onClose: function( selectedDate ) {
					$( ".leaving" ).datepicker( "option", "maxDate", selectedDate );
				  }
				});
	
				$('#jetbutton1').on('click', function(e){
					
							var validatename = formvalidate.element( "#name" ); 
							var validateemail = formvalidate.element( "#email" ); 
							if(validatename && validateemail) 
							{		
								$("#myModal").modal('hide');
								$('.step-3').hide('fade', 200, function(){
									 $('.step-1').show('fade', 200);
								});
							}
							

						var formData = $('#jetform').serialize();
						console.log(formData);
						  
						   $.ajax({
							//url:'/',
							type:'POST',
							data:$("#jetform").serialize(),
							success:function(data){
								//console.log('>>>>>>>>>>>>' + data);
							}
						  });

						//return false;
						  //}	
							
						
							
						$('#jetform').trigger('reset');		
						
				});
						
								//});	
				
				//});
				
				
				$('#jetbutton').on('click', function(){	
						
						var validleaving = formvalidate.element( "#leavingdate" ); 
						var validreturning = formvalidate.element( "#returningdate" ); 
						var validairport = formvalidate.element( "#homeairport" ); 
						if( validleaving && validreturning && validairport) 						
						{
									$('.step-1').hide('slide', {direction: 'left'}, 200, function(){
										$('.step-2').show('slide', {direction: 'right'}, 200);
									});	
						}
							
				});	
				
				$('.blocks a').on('click', function(){	
				
					//formvalidate = $("#jetform").validate();
					//formvalidate.element( $("input[name='destination']") );
					
					$('.step-2').hide('slide', {direction: 'left'}, 200, function(){
						$('.step-3').show('slide', {direction: 'right'}, 200, function(){
							setTimeout(
							  function() 
							  {
							   $("#myModal").modal('show');
							  }, 2000);  
						});
					});
				});	
		
		
	});
</script>

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
<section id="jsg-content">

<form id="jetform" class="jetform">

<section class="jsg-banner">
  <div class="container">
    <div class="row row-centered main">
	<div id="slider">
     <div class="slider-step1 step-1">
      <div class="steps col-lg-6 col-md-7 col-sm-9 col-xs-12 col-centered">
        
		
          <h2>WHEN CAN YOU GO?</h2>
            <div class="row">
              <div class="col-lg-10 col-sm-10">
                <div class="form-group form-inline">
                  <label class="control-label">LEAVING</label>
                  <input class="form-control leaving datepicker" type="text" name="leavingdate" id="leavingdate" value="" placeholder="MM/DD/YY" required />               
                  <label class="control-label">RETURNING</label>
                  <input class="form-control returning datepicker" type="text" id="returningdate" name="returningdate" value="" placeholder="MM/DD/YY" required />    
                </div>
              </div>
            </div>
            <div class="row">
                <div class="col-lg-12 col-sm-12">
                <div class="form-group form-inline">
				  <label class="control-label ">HOMEAIRPORT</label>
				  <input class="form-control home-airport" id="homeairport" placeholder="Hometown or Airport Code" type="text" name="homeairport" value="" required/>
                  <!--<button class="jet-set-submit" type="submit" value="jetset">JetSet!</button>-->
                  <button class="btn btn-default jsg-submit" id="jetbutton" type="button">JetSet!</button>
              </div></div>

            </div>
       
        </div>
      </div>

      <div class="slider-step2 step-2" style="display:none;">
       <div class="steps col-lg-9 col-md-10 col-sm-12 col-xs-12 col-centered">        
          <h2>HAVE A DESTINATION IN MIND?</h2>          
        
       <div class="blocks text-center">
         <a href="">
             <label>
                 	<i class="fa fa-anchor wow fadeInDown animated"></i>
                    <h5 class="wow fadeInDown animated">Beach</h5>
                    <input class="destination" type="radio" name="destination" value="">
                
                </label>
                
            </a>
            <a href="">
            
            <label>
             <i class="fa fa-tree wow fadeInDown animated"></i>
                <h5 class="wow fadeInDown animated">Mountain</h5>
                 <input class="destination" type="radio" name="destination" value="">
                </label>
            </a>
            <a href="">
            <label>
              <i class="fa fa-bicycle wow fadeInDown animated"></i>
                <h5 class="wow fadeInDown animated">Europe</h5>
                 <input class="destination" type="radio" name="destination" value="">
                </label>
            </a>
            <a href="">
            <label>
             <i class="fa fa-futbol-o wow fadeInDown animated"></i>
                <h5 class="wow fadeInDown animated">Latin America</h5>
                 <input class="destination" type="radio" name="destination" value="">
                </label>
            </a>
            
            <a href="">
            <label>
             <i class="fa fa-star wow fadeInDown animated"></i>
                <h5 class="wow fadeInDown animated">Surprise Me</h5>
                 <input class="destination" type="radio" name="destination" value="">
                </label>
           </a>
            
        </div>
      </div>
    </div>

     <div class="slider-step3 step-3" slider-step4 style="display:none;">
         <div class="steps col-lg-12 col-md-12 col-sm-12 col-xs-12 col-centered">   
                <div class="finding-options">
             <h3 class="lobster-font">JetSetGenie</h3>            
                <div class="option-gif"><i class="fa fa-spinner fa-pulse fa-3x"></i> </div>            
                <h2>FINDING ALL YOUR OPTIONS...</h2>
          </div>
          </div>
       </div>
	 
       
       
 
	   </div>
    
	</div>

  </div>
  <section class="step-4">
  <div id="myModal" class="modal fade">
    			<div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <!--<button type="button" class="close" data-dismiss="modal">&times;</button>-->
                        <h2 class="lobster-font modal-title" align="center">Jet <span class="light">Set</span> Genie is still in Beta</h2>
                        <p align="center">We'll email you your search results</p>                        
                      </div>
                      <div class="modal-body jetform1" id="jetform1">

                          <div class="form-group">                            
                            <input type="text" class="form-control" name="name" id="name" placeholder="NAME" required/>
                          </div>
                          <div class="form-group">                            
                            <input type="email" name="email" class="form-control" id="email" placeholder="EMAIL" required/>
                          </div>  
                                                  
                          <button type="button" id="jetbutton1" class="btn btn-default jsg-submit">Go</button>
   
                      </div>
                      <div class="modal-body" align="center";>
                        <p>JetSetGenie will never spam you or<br> share your contact information</p>
                      </div>
                    </div>
                
                  </div>
					</div>
</section>
  </form>
</section>


<section class="inner-content">
  <div class="container">
    <div class="row row-centered">
      <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
        <h3 class="lobster-font">How Does Jet <span class="light">Set</span> Genie Work</h3>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 jsg-work"> <img src="{{ asset('assets/iconmonstr-calendar-4-240.png') }}" alt="">
        <h4 class="wow fadeInDown animated">You tell us when.<br/>
          we'll tell you where</h4>
        <p class="wow fadeInDown animated">Search all available destinations based on your schedule.</p>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 jsg-work"> <img src="{{ asset('assets/iconmonstr-share-2-240.png') }}" alt="">
        <h4 class="wow fadeInDown animated">Share options with<br/>
          Your travel buddies</h4>
        <p class="wow fadeInDown animated">Easily share one link that shows all your alternatives so that you can compare.</p>
      </div>
      <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 jsg-work"> <img src="{{ asset('assets/iconmonstr-paper-plane-2-240.png') }}" alt="">
        <h4 class="wow fadeInDown animated">Jetset</h4>
        <p class="wow fadeInDown animated">Book your travel with one click and rest assured that you got the best deal.</p>
      </div>
    </div>
  </div>
</section>
</section>
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
 