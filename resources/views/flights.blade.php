@extends("layouts.master")

@section('jsg-page-title')
	<title>JetSetGenie | Flight Results</title>
@stop

@section('content') 
<section class="app-content container-fluid" data-ng-controller="ctrlFlightResults">
    <div class="row-centered serch-part">
        <div class="col-lg-8 col-md-8 col-sm-9 col-xs-12 col-centered">
            <h3 class="lobster-font text-center">Search Results</h3>
            @include('shared.searchbox')
        </div>
    </div>
    <div class="hr"></div>
    <div class="col-lg-8 col-md-8 col-sm-9 col-xs-12 col-centered">
        <div class="row row-centered flight-results">
            <div class="col-md-9 left-part">
                <div class="col-md-12 text-center flight-result-for">
                    <h4><a href="javascript:()" data-ng-click="backtodestinations()" class="pull-left">< Back</a> SHOWING RESULTS TO @{{ sparams.destination }}</h4>
                </div>

                <div class="timing-results">
                    <div class="row flight-booking @{{ flight.type }}" data-ng-repeat="flight in flights">

                        <div class="flight-booking" data-ng-repeat="route in flight.flights">
                            <div class="col-lg-8 booking-time">
                                <ul>
                                    <li class="count"><p>@{{ $index == 0 ? flight.price : '' }}</p><span>@{{ $index == 0 ? flight.tripType : '' }}</span></li>
                                    <li>
                                        <a data-ng-show="$index == 0" data-ng-hide="$index != 0" class="star" data-ng-click="addFlight( flight.price, route.airline, route.departTime )">
                                            <i class="fa fa-2x @{{ hasFlight(record.id) ? 'fa-star' : 'fa-star-o' }}"></i>
                                        </a>
                                        <a data-ng-show="$index != 0" data-ng-hide="$index == 0" class="star"></a>
                                    </li>
                                    <li class="country-logo">
                                        <i class="fa fa-plane fa-2x" style="color:#ccc;"></i>
                                        <!-- <img data-ng-src="@{{ route.airlineLogo }}" alt="" /> -->
                                    </li>
                                    <li class="country">
                                        <p>@{{ route.timings }}</p><span>@{{ route.airline }} <br /> @{{ route.flightOrigin + " &#8594; " + route.flightDest }}</span><br />

                                    </li>
                                    <li class="currnt-time"><p><i data-ng-if="$index == 0" class="fa fa-wifi"></i> @{{ route.duration  }}</p></li>
                                </ul>
                            </div>
                            <div class="col-lg-4 booking">
                                <p>@{{ flight.type }}</p>
                                <a data-ng-href="@{{ flight.bookUrl }}" class="btn btn-default jsg-submit" title="Book Flight" target="_blank">Book</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <p class="text-center no-results alert alert-info" style="display:none;">Sorry, no results found for selected criteria. Please select again.</p>
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
