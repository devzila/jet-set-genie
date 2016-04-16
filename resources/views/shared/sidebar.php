<div class="col-md-3 right-part" data-ng-controller="ctrlsideBar">
    <div class="row">
        <div class="col-md-12 text-center">
            <h4>FAVORITES</h4>
        </div>
        <div class="col-md-12 favorite-container">
            <div class="list-box destinationCard" data-ng-repeat="favorite in favorites | limitTo:3" ng-init="parentIndex = $index">
                <div class="box clearfix" data-ng-style="{background: place_bg_colors[$index % place_bg_colors.length]}">
                    <div class="box-detail">                         
                        <a class="setFavorite" data-ng-click="deleteFavorite($index, favorite.destination_id, favorite.display_name)"><i class="fa fa-star"></i></a>
                        <a class="lnkFlights" data-ng-click="showFlights( favorite.airport_code, favorite.display_name, favorite.destination_id );">
                            <h5><span>{{ favorite.display_name }}</span></h5>
                            <div class="box-info">
                                <p>
                                    <span>Cheapest <span >{{ favorite.fare }}</span></span>
                                    <span>Shortest <span data-ng-bind-html="favorite.duration"></span></span>
                                </p>
                            </div>
                        </a>
                    </div>
                    <div class="blank-bg" data-ng-repeat="flight in favorite.items">
                        <a ng-click="deleteflight(parentIndex, $index)"> <i class="fa fa-times"></i> </a>
                        <div class="box-info flight-info">
                            <h5>FLIGHT</h5>
                            <p class="farename">{{ flight.fare + " " + flight.name }}</p>
                            <p>{{ flight.action_date +  " " + flight.action_time }}</p>
                        </div>
                    </div>
                    <div class="clear"></div>
                </div>
            </div>
        </div>
        <div class="col-md-12 list-box search-options">
            <div class="box">
                <a>
                    <i class="fa fa-plus"></i>
                </a>
                <div class="box-info">
                    <P>ADD A FLIGHT BY</P>
                    <P>STARRING A</P>
                    <p>SEARCH OPTION</p>
                </div>
            </div>
        </div>
    </div>
</div>
