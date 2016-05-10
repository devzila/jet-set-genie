@extends("layouts.master")


@section('jsg-page-title')
	<title>JetSetGenie | My Favorites</title>
@stop

@section('content') 
<section class="app-content container-fluid" data-ng-controller="ctrlFavorites">

    <div class="row row-centered favorites-section">
        <div class="row-centered serch-part">
            <div class="col-lg-7 col-md-7 col-sm-9 col-xs-12 col-centered">
                <h3 class="lobster-font text-center">Favorites</h3>
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
                <div class="col-md-3 col-sm-4 col-xs-6 list-box destinationCard" data-ng-repeat="favorite in favorites | orderBy: 'updated_at'" ng-init="parentIndex = $index">
                    <div class="box clearfix" data-ng-style="{ background:  randomcolor }">
                        <div class="box-detail">
                            <a class="setFavorite" data-ng-click="deleteFavorite($index, favorite.destination_id,  favorite.display_name)"><i class="fa fa-star"></i></a>
                            <a class="lnkFlights" data-ng-click="showFlights( favorite.airport_code, favorite.display_name, favorite.destination_id );">
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
                        <div class="blank-bg" data-ng-repeat="flight in favorite.items">
                            <a href="javascript://" ng-click="deleteflight(parentIndex, $index, favorite.card_id, flight.id)">
                                <i class="fa fa-times"></i>
                            </a>
                            <div class="box-info flight-info">
                                <small>FLIGHT</small>
                                <p class="farename">@{{ flight.fare + " " + flight.name }}</p>
                                <p>@{{ flight.action_date +  " " + flight.action_time }}</p>
                            </div>
                        </div>
                        <div class="clear"></div>
                    </div>
                </div> 
                <div class="col-md-12">
                    <p data-ng-show="favorites.length === 0" data-ng-hide="favorites.length != 0" class="text-center no-results alert alert-info">Sorry, no results found in your Favorites dashboard. Please search for destinations and mark favorite..</p>
                </div>
            </div>
        </div>
    </div>
</section>
@stop
 
@section('additional-scripts')
<script src="{{ asset('js/masonry.pkgd.min.js') }}" ></script>
@stop
