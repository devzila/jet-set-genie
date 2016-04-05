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

	<div id="resultCont" class="col-lg-7 col-md-7 col-sm-9 col-xs-12 col-centered">    
		<div class="row row-centered search-results"  > 
		<div class="col-md-9 left-part">	 		
			<div class="row result-container">
				<div class="col-md-4 col-sm-4 col-xs-6 list-box" data-ng-repeat="record in records | filter: setfilters" ng-init="parentIndex = $index" >
					<div class="box clearfix" data-ng-style="{background: record.color}">					
						<div class="box-detail">						
							<a class="setFavorite" data-ng-click="setfavorite( $index )" title="Remove Favorite" ><i class="fa @{{ isFavorite ? 'fa-star' : 'fa-star-o' }}"></i></a>
							<a class="lnkFlights" data-ng-click="showFlights(  record.airport_code, record.display_name );" >
								<h5>@{{ record.display_name }}</h5>
								<div class="box-info">
								<p>Shortest Flight</p>
								<p>@{{ record.shortest_flight }}</p>
								<p>Chepest Flight</p>
								<p>@{{ record.cheapest_flight }}</p>
							</div>
							</a>
						</div>
					<div class="clear"></div>
					</div>
				</div>
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
<script src="{{ asset('/js/search-form.js') }}"></script>
<script>
	var days = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
	var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
	var sParams = {};
	

	var sQuery = (window.location.pathname).split("/"); 
	airportCode = (((decodeURIComponent(sQuery[7])).replace('(', '[')).replace(')', ']')).match(/\[(.*)\]/).pop();
	
	dt = new Date(sQuery[3]);	
	leavingdt = days[dt.getDay()] + ", " + months[dt.getMonth()]  + " " + dt.getDate() + ", " + dt.getFullYear();
	
	dt = new Date(sQuery[5]);	
	returningdt = days[dt.getDay()] + ", " + months[dt.getMonth()]  + " " + dt.getDate() + ", " + dt.getFullYear();
	
	sParams = {
		leaving: leavingdt,
		returning: returningdt,
		origin: decodeURIComponent(sQuery[7]),
		origincode: airportCode,
		type: decodeURIComponent(sQuery[9])
	}
</script>

@stop
