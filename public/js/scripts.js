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

		$.ajax({
			url:'/jetsetgenie/api/visitor',
			type:'POST',
			data:$("#jetform").serialize(),
			success:function(data){				 
				$('#jetform1').html('<div class="alert alert-success"><h3>Thank you for your Request</h3><p>We\'ll get back to you as soon as possible.</p></div>');
				
				setTimeout(
				function()
				{
					$("#myModal").modal('hide');							 
				}, 3000);
				
				$('#jetform').trigger('reset');
			}
		});
		
		/* remove this code after we've api ready */
		$('#jetform1').html('<div class="alert alert-success"><h3>Thank you for your Request</h3><p>We\'ll get back to you as soon as possible.</p></div>');
				
		setTimeout(
		function()
		{
			$("#myModal").modal('hide');
			$('.step-3').hide('slide', {direction: 'right'}, 200, function(){
				$('.step-1').show('slide', {direction: 'left'}, 200);
			});
			$('#jetform').trigger('reset');
		}, 3000);
		
		
		
		/* remove this code after we've api ready */
		
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