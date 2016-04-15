@extends("layouts.master")

@section('jsg-page-title')
	<title>JetSetGenie | My Favorites</title>
@stop

@section('content')
<section class="app-content container-fluid" data-ng-controller="ctrlSharedDestinations">
    <div class="row row-centered favorites-section">
        <div class="row-centered serch-part">
            <div class="col-lg-7 col-md-7 col-sm-9 col-xs-12 col-centered">
                <h3 class="lobster-font text-center">@{{ pagetitle }}</h3>                
            </div>
        </div>
        <div class="hr"></div>
        <div class="col-lg-7 col-md-7 col-sm-9 col-xs-12 col-centered">
            <div class="row favorite-container">
                <div class="col-md-3 col-sm-4 col-xs-6 list-box destinationCard" data-ng-repeat="favorite in favorites" ng-init="parentIndex = $index">
                    <div class="box clearfix" data-ng-style="{ background:  randomcolor }">
                        <div class="box-detail">
                            <div class="lnkFlights">
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
                            </div>
                        </div>
                        <div class="blank-bg" data-ng-repeat="flight in favorite.flights">                            
                            <div class="box-info">
                                <h5>FLIGHT</h5>
                                <p>@{{ flight.price + " " + flight.name }}</p>
                                <p>@{{ flight.departDate }}</p>
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

@stop
