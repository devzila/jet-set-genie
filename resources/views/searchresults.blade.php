@extends("layouts.master")

@section('jsg-page-title')
	<title>JetSetGenie | Search Results</title>
	<link href="{{ asset('css/bootstrap-slider.css') }}" rel="stylesheet" />
@stop

@section('content') 
<section class="app-content container-fluid" data-ng-controller="ctrlSearchResults">
	<div class="row-centered serch-part">
	<div class="col-lg-7 col-md-7 col-sm-9 col-xs-12 col-centered">
	<h3 class="lobster-font text-center">Search Results</h3>
	@include('shared.searchbox')
	</div>
	</div>    
	<div class="hr"></div>

    <div id="resultCont" class="col-lg-8 col-md-8 col-sm-9 col-xs-12 col-centered">    
		<div class="row row-centered search-results"  > 
		<div class="col-md-9 left-part">	 		
			<div class="row result-container">
				<div class="col-md-4 col-sm-4 col-xs-6 list-box" data-ng-repeat="record in records" ng-init="parentIndex = $index" >
                         
                        <div class="box clearfix" data-ng-style="{ background:  randomcolor }">					
						<div class="box-detail">
                                <a class="setFavorite" data-ng-click="setfavorite( $index, record.id, record.duration, record.fare, record.display_name )" title="Remove Favorite" ><i class="fa @{{ isFavorite(record.id) ? 'fa-star' : 'fa-star-o' }}"></i></a>
                                <a class="lnkFlights" data-ng-click="showFlights( record.airport_code, record.display_name, record.id );" >
                                <h5>@{{ record.display_name }}</h5>
								<div class="box-info">
								<p>Shortest Flight</p>
								<p>@{{ record.duration }}</p>
								<p>Cheapest Flight</p>
								<p>@{{ record.fare }}</p>
							</div>
							</a>
						</div>
					<div class="clear"></div>
					</div>
				</div>
                    <p ng-hide="records.length">Sorry, no results found for selected criteria. Please select again.</p>
			</div>
		</div>
		@include('shared.sidebar')
	</div>
	</div>
</section>
@stop
 
@section('additional-scripts')
<script src="{{ asset('/js/bootstrap-slider.js') }}"></script>
<script src="{{ asset('js/masonry.pkgd.min.js') }}" ></script>
<script src="{{asset('/js/search-form.js') }}"></script>
<script src="{{asset('js/masonry.pkgd.min.js') }}"></script>
<script>
	var favoriteMsnry;
	$(document).ready(function(){
	    favoriteMsnry = $('.result-container').masonry({
	        itemSelector: '.list-box',
		});
	});
	$( window ).resize(function() {
	    $('.result-container').masonry({
	        itemSelector: '.list-box',
	    });
	});
    
	/*//tag inputs
	var tagit = $('.tag_places');

	tagit.tagsinput({
	    tagClass: function (item) {
	        switch (item.continent) {
	            case 'Europe': return 'label label-primary';
	            case 'America': return 'label label-danger label-important';
	            case 'Australia': return 'label label-success';
	            case 'Africa': return 'label label-default';
	            case 'Asia': return 'label label-warning';
	        }
	    },
	    itemValue: 'slug',
	    itemText: 'name',
	    typeaheadjs: {
	        name: 'destinations',
	        displayKey: 'name',
	        source: [{ "value": 1, "text": "Amsterdam", "continent": "Europe" }],
            freeInput: false
	    }
	});

	tagit.tagsinput('add', { "value": 1, "text": "Amsterdam", "continent": "Europe" });
    */

	 

</script>
@stop
