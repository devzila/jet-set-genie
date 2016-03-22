$(document).ready(function(){
	formvalidate = $("#jetform").validate({
		highlight: function (element, errorClass, validClass) {
			console.log('........' +element.id);
			$('#'+element.id).addClass("error");
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
		$('.email-alert-error').hide();
		
		if(validatename && validateemail)
		{
			 
		}else{		 
			return;
		}

		mixpanel.track(
			"Beta Dialogue Click",
			{"name":  $('#name').val(), "email": $('#email').val()} 
		);
		
		var formData = $('#jetform').serialize();
		
		var name, email, leaving_date, returning_date, home_airport, ip, browser;
		name = $("input[name='name']").val();
		email = $("input[name='email']").val();
		leaving_date = $("input[name='leaving_date']").val();
		returning_date = $("input[name='returning_date']").val();
		home_airport = $("input[name='home_airport']").val();
		ip = $("input[name='ip']").val();
		browser = $("input[name='browser']").val();
		destination_type = $("input[name='destination_type']").val();
		
 
		$.ajax({
			type: 'POST',
			url: 'http://jetsetgenie.devzila.com/api/visitors',			
			data: {name:name , email:email , leaving_date:leaving_date, returning_date:returning_date, home_airport:home_airport, ip:ip, browser:browser, destination_type:destination_type},
			success:function(data){				 
			 
				$('.email-alert').show();
				$('.jetform1').hide();
				
				setTimeout(
					function()
					{
						$("#myModal").modal('hide');
						$('#jetform').trigger('reset');
										
						$('.step-3').hide('slide', {direction: 'right'}, 200, function(){
						$('.step-1').show('slide', {direction: 'left'}, 200);
						
						$('.email-alert').hide();
						$('.jetform1').show();
				
					});					
				}, 3000);
				
			 			
			}
		});		
	});



	$('#jetbutton').on('click', function(){

		var validleaving = formvalidate.element( "#leavingdate" );
		var validreturning = formvalidate.element( "#returningdate" );
		var validairport = formvalidate.element( "#homeairport" );
		if( validleaving && validreturning && validairport)
		{
			mixpanel.track("JetSet Click");
			
			$('.step-1').hide('slide', {direction: 'left'}, 200, function(){
				$('.step-2').show('slide', {direction: 'right'}, 200);
			});
		}

	});

	$('.destinations a').on('click', function(){

		//formvalidate = $("#jetform").validate();
		//formvalidate.element( $("input[name='destination']") );

		$('.step-2').hide('slide', {direction: 'left'}, 200, function(){
			mixpanel.track("Destination Select");
			$('.step-3').show('slide', {direction: 'right'}, 200, function(){
				setTimeout(
						function()
						{
							$("#myModal").modal('show');
							mixpanel.track("Beta Wall View");
						}, 2000);
			});
		});
	});

});