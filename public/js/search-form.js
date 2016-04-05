$(document).ready(function(){
	$( ".leavedate" ).datepicker({
		minDate: 0,
		defaultDate: "+1w",
		changeMonth: false,
		numberOfMonths: 1,
		dateFormat: 'D, M dd, yy',
		onClose: function( selectedDate ) {
			$( ".returning" ).datepicker( "option", "minDate", selectedDate );
		}
	});

	$( ".returndate" ).datepicker({
		defaultDate: "+1w",
		changeMonth: false,
		numberOfMonths: 1,
		dateFormat: 'D, M dd, yy',
		onClose: function( selectedDate ) {
			$( ".leaving" ).datepicker( "option", "maxDate", selectedDate );
		}
	});
	$.widget( "custom.catcomplete", $.ui.autocomplete, {
		_create: function() {
		  this._super();
		  this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
		},
		_renderMenu: function( ul, items ) {
		  var that = this;
		  $.each( items, function( index, item ) {
			var li;
			 
			li = that._renderItemData( ul, item );
			if ( item.category ) {
			  li.attr( "aria-label", item.label + " : " + item.code );
			}
		  });
		}
	});
	 
	var xhr;
	  $( "#homeairport" ).catcomplete({
		delay: 0,
		source: function( request, response ) {
		  var regex = new RegExp(request.term, 'i');
		  if(xhr){
			xhr.abort();
		  }
		  xhr = $.ajax({
			  url: "/data/airports.json",
			  dataType: "json",
			  cache: false,
			  success: function(data) {
				response($.map(data.list, function(item) {
				  if(regex.test(item.label)){
					return {
						label: item.label,
						country: item.country,
						code: item.code
					};
				  }
				}));
			  }
		  });
		},
		minlength:3
	  });
	
	favoriteMsnry = $('.result-container').masonry({
		itemSelector: '.list-box',			
	});
	
	
});
 

