@extends("layouts.master")


@section('jsg-page-title')
	<title>JetSetGenie | My Favorites?</title>
@stop

@section('content') 
<section class="app-content container-fluid" data-ng-controller="ctrlFavorites">

<div class="row row-centered favorites-section"  >
	<div class="col-lg-7 col-md-7 col-sm-9 col-xs-12 col-centered">    
		<div class="row">
			<div class="col-md-6 back">
				<button type="submit">
				<i class="fa fa-angle-left"></i>
				<span>BACK TO RESULTS</span></button>                                    
			</div>
			<div class="col-md-6 fav-share">
				<button class="btn btn-default jsg-submit" type="submit">SHARE</button>
			</div>
			
			</div>
			<div class="row">
				<div class="col-md-3 list-box" data-ng-repeat="favorite in favorites">
					<div class="box clearfix" data-ng-style="{background: place_bg_colors[$index % place_bg_colors.length]}">
					<div class="box-detail">
						<a class="setFavorite"></a>
						<h5 data-ng-bind="favorite.placeName"></h5>
						<div class="box-info">
						<p>Shortest Flight</p>
						<p>{{ favorite.shortestFlight }}</p>
						<p>Chepest Flight</p>
						<p data-ng-bind="favorite.cheapestFlight"></p>
						</div>
					</div>
					<div class="blank-bg" data-ng-repeat="flight in favorite.flights">                                        	
						<a href="#"> <i class="fa fa-times"></i> </a>
						<div class="box-info">                                           
						<h5>FLIGHT</h5>
						<p><span data-ng-bind="flight.price"></span> <span data-ng-bind="flight.name"></span></p>
						<p data-ng-bind="flight.departDate"></p>                                            
						</div>
					</div>
					<div class="clear"></div>
					</div>
				</div>
		</div>
	</div>
</div>
</section>
@stop
 
@section('additional-scripts')
<script src="{{ asset('js/masonry.pkgd.min.js') }}" ></script>
<script>
	$(document).ready(function(){		
		$('.list-box .box').masonry({
			itemSelector: '.grid-item'
		});
	});
</script>
@stop
