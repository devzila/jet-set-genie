@extends("layouts.master")

@section('jsg-page-title')
	<title>JetSetGenie | Flight Results</title>
@stop

@section('content') 
<section class="app-content container-fluid" data-ng-controller="ctrlFlightResults">
	<div class="row-centered serch-part">
		<div class="col-lg-7 col-md-7 col-sm-9 col-xs-12 col-centered">
			<h3 class="lobster-font text-center">Search Results</h3>
			@include('shared.searchbox')
		</div>
	</div>    
	<div class="hr"></div>
	<div class="col-lg-7 col-md-7 col-sm-9 col-xs-12 col-centered">    
		<div class="row row-centered flight-results"  > 
		<div class="col-md-9 left-part">			 		
				<div class="col-md-12 text-center">
					<h4>SHOWING RESULTS TO @{{ destination }}</h4>
				</div>				
			 
				<div class="col-lg-12 timing-results">
					<div class="row flight-booking" data-ng-repeat="flight in flights" >				 
						<div class="col-lg-8 booking-time">
							<ul>
								<li class="count"><h5><strong>@{{ flight.price }}</strong></h5><span>@{{ flight.tripType }}</span></li>
								<li><a class="star"><i class="fa fa-star-o fa-2x"></i></a></li>
								<li class="country-logo"><img data-ng-src="@{{ flight.airlineLogo }}" alt="" /></li>
								<li class="country"><p><strong>@{{ flight.timings }}</strong></p><span>@{{ flight.airline }}</span></li>
								<li class="currnt-time"><i class="fa fa-wifi"></i><p>@{{ flight.duration }}</p></li>
							</ul>
						</div>						
						<div class="col-lg-4 booking">
							<p>@{{ flight.type }}</p>
							<a data-ng-href="@{{ flight.bookUrl }}" class="btn btn-default jsg-submit" title="Book Flight" target="_blank">Book</a>
						</div>
					</div>
				</div>
				
				<div class="col-md-12 text-center load-more">
					<a href="#">LOAD MORE</a>
				</div>
			 
		</div>
		@include('shared.sidebar')
	</div>
	</div>
</section>
@stop
 
@section('additional-scripts')
 
@stop
