<div class="col-md-3 right-part">
	<div class="row">
		<div class="col-md-12 text-center">
			<h4>FAVORITES</h4>
		</div>
		<div class="col-md-12 favorite-container">
				<div class="list-box" data-ng-repeat="favorite in favorites | limitTo:3" ng-init="parentIndex = $index" >
					<div class="box clearfix" data-ng-style="{background: place_bg_colors[$index % place_bg_colors.length]}">
						<div class="box-detail">
							<a class="setFavorite" data-ng-click="deleteFavorite($index, favorite.id, favorite.display_name)" ><i class="fa fa-star"></i></a>
							<h5>{{ favorite.display_name }}</h5>
							<div class="box-info row">
                                <p class="col-xs-6">Cheapest <span>{{ favorite.fare }}</span></p>
							    <p class="col-xs-6">Shortest <span>{{ favorite.duration }}</span></p>							   
							</div>
						</div>
						<div class="blank-bg" data-ng-repeat="flight in favorite.items"> 							
							<a ng-click="deleteflight(parentIndex, $index)"> <i class="fa fa-times"></i> </a>
							<div class="box-info">                                           
							<h5>FLIGHT</h5>
							<p>{{ flight.price + " " + flight.name }}</p>
							<p>{{ flight.departDate }}</p>                                            
							</div>
						</div>
					<div class="clear"></div>
					</div>
				</div>
		</div>
		<div class="col-md-12 list-box search-options">
			<div class="box">
				<a>
					<i class="fa fa-plus" ></i>
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
