@extends("layouts.master")


@section('jsg-page-title')
	<title>JetSetGenie | My Favorites?</title>
@stop

@section('content') 
<section class="app-content container-fluid" data-ng-controller="ctrlFavorites">

    <div class="row row-centered favorites-section">
        <div class="row-centered serch-part">
            <div class="col-lg-7 col-md-7 col-sm-9 col-xs-12 col-centered">
                <h3 class="lobster-font text-center">@{{ pagetitle }}</h3>
                @include('shared.searchbox')
            </div>
        </div>
        <div class="hr"></div>
        <div class="col-lg-7 col-md-7 col-sm-9 col-xs-12 col-centered">
            <div class="row" data-ng-show="favorites.length != 0" ng-hide >
                <div class="col-xs-12">
                    <div class="pull-left back">
                        <a href="javascript://" data-ng-click="backtodestinations()">
                            <i class="fa fa-angle-left"></i>
                            <span>BACK TO RESULTS</span>
                        </a>
                    </div>
                    <div class="pull-right fav-share">
                        <span class="favcopied" style="display:none;">Copied!</span>&nbsp;&nbsp;&nbsp;
                        <button id="shareFav" rel="/shared-dashboard/" class="btn btn-default jsg-submit" data-ng-click="shareFavorites()">SHARE</button>
                    </div>
                </div>
            </div>
            <div class="row favorite-container">                
                <div class="col-md-3 col-sm-4 col-xs-6 list-box destinationCard" data-ng-repeat="favorite in favorites" ng-init="parentIndex = $index">
                    <div class="box clearfix" data-ng-style="{ background:  randomcolor }">
                        <div class="box-detail">
                            <a class="setFavorite" data-ng-click="deleteFavorite( $index )"><i class="fa fa-star"></i></a>
                            <a class="lnkFlights" data-ng-click="showFlights( record.airport_code, record.display_name, record.id );">
                                <h5><span>@{{ favorite.display_name }}</span></h5>
                                <div class="box-info">
                                    <p>
                                        <span>
                                            Cheapest
                                            <span class="cardinfo">@{{ favorite.fare }}</span>
                                        </span>
                                        <span>
                                            Shortest
                                            <span data-ng-bind-html="favorite.duration" class="cardinfo"></span>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </div>
                        <div class="blank-bg" data-ng-repeat="flight in favorite.flights">
                            <a class="removeicon" data-ng-click="deleteflight(parentIndex, $index)" title="Remove Flight"> <i class="fa fa-times"></i> </a>
                            <div class="box-info">
                                <h5>FLIGHT</h5>
                                <p>@{{ flight.price + " " + flight.name }}</p>
                                <p>@{{ flight.departDate }}</p>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div>
                <p data-ng-show="favorites.length == 0" ng-hide class="text-center no-results">Sorry, no results found in your Favorites dashboard. Please search for destinations and mark favorite..</p>
            </div>
        </div>
    </div>
</section>
@stop
 
@section('additional-scripts')
<script src="{{ asset('js/masonry.pkgd.min.js') }}" ></script>
<script>
	/* var favoriteMsnry;
	$(document).ready(function(){		
		favoriteMsnry = $('.favorite-container').masonry({
			itemSelector: '.list-box',			
		});
	});
	$( window ).resize(function() {
		 favoriteMsnry.masonry('reloadItems');		 
	});
    */
</script>
@stop
