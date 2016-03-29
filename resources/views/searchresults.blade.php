@extends("layouts.master")


@section('jsg-page-title')
	<title>JetSetGenie | My Favorites?</title>
@stop

@section('content') 
<section class="app-content container-fluid" data-ng-controller="ctrlSearchResults">

<div class="row row-centered favorites-section"  >
	<div class="col-lg-7 col-md-7 col-sm-9 col-xs-12 col-centered">    
			<div class="row">
				<div class="col-xs-12">
					<div class="pull-left back">
						<a href="/">
						<i class="fa fa-angle-left"></i>
						<span>BACK TO RESULTS</span></a>                                    
					</div>
					<div class="pull-right fav-share">
						<button class="btn btn-default jsg-submit" type="submit">SHARE</button>
					</div>
				</div>
			</div>
			<div class="row favorite-container">
				<div class="col-md-3 col-sm-4 col-xs-6 list-box" data-ng-repeat="favorite in favorites" ng-init="parentIndex = $index" >
					<div class="box clearfix" data-ng-style="{background: favorite.color}">
						<div class="box-detail">
							<a class="setFavorite" data-ng-click="setfavorite( $index )" title="Remove Favorite" ><i class="fa fa-star"></i></a>
							<h5>@{{ favorite.placeName }}</h5>
							<div class="box-info">
							<p>Shortest Flight</p>
							<p>@{{ favorite.shortestFlight }}</p>
							<p>Chepest Flight</p>
							<p>@{{ favorite.cheapestFlight }}</p>
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
	var favoriteMsnry;
	$(document).ready(function(){		
		favoriteMsnry = $('.favorite-container').masonry({
			itemSelector: '.list-box',			
		});
	});
	$( window ).resize(function() {
		 favoriteMsnry.masonry('reloadItems');		 
	});
</script>
@stop
