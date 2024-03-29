$(document).ready(function(){
	formvalidate = $("#jetform").validate({
		highlight: function (element, errorClass, validClass) {
			//console.log('........' +element.id);
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
		dateFormat: 'mm-dd-yy',
		onClose: function( selectedDate ) {
			$( ".returning" ).datepicker( "option", "minDate", selectedDate );
		}
	});
	
	$( ".returning" ).datepicker({
		defaultDate: "+1w",
		changeMonth: false,
		numberOfMonths: 1,
		dateFormat: 'mm-dd-yy',
		onClose: function( selectedDate ) {
			$( ".leaving" ).datepicker( "option", "maxDate", selectedDate );
		}
	});
	
	$('#name, #email').focusin(function() { $('.error-on-form').remove() });
	 

	$('#jetbutton1').on('click', function(e){

		var validatename = formvalidate.element( "#name" );
		var validateemail = formvalidate.element( "#email" );
		$('.email-alert-error').hide();
		$('.error-on-form').remove();
		
		if(validatename && validateemail)
		{
			 
		}else{		 
			if(!validatename)
				$('#name').after('<div class="error-on-form">WRONG FORMAT</div>');
			if(!validateemail)
				$('#email').after('<div class="error-on-form">WRONG FORMAT</div>');
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
		
	 
		
		/*
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
		*/
		
	});
	
	$('#myModal').on('hidden.bs.modal', function (e) {
	  // do something...
	  $('.step-3').hide('slide', {direction: 'right'}, 200, function(){
		$('.step-1').show('slide', {direction: 'left'}, 200);		
		$('.email-alert').hide();
		$('.jetform1').show();
		$('#jetform').trigger('reset');
	});	
	})

	$('.step-back').on('click',function(){
	 
		$('.step-2').hide('slide', {direction: 'right'}, 200, function(){
			$('.step-1').show('slide', {direction: 'left'}, 200);		
		});			
	});

	$('#jetbutton').on('click', function(){

		

	});

});

getFormattedTime = function (fourDigitTime) {
    var hours24 = parseInt(fourDigitTime.substring(0, 2),10);
    var hours = ((hours24 + 11) % 12) + 1;
    var amPm = hours24 > 11 ? 'pm' : 'am';
    var minutes = fourDigitTime.substring(2);

    return hours + 'h ' + minutes + 'm';
};