app.controller('jetSetGenie', function ($scope, $http) {
    $scope.desttypes = [];

    $scope.sparams = {
        leaving: '',
        returning: '',
        origin: '',
        origincode: '',
        destination: '',
        dest_code: '',
        dest_id: '',
        type: ''
    };

    $scope.daysInWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    $scope.months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];


    $scope.loader = function (type) {
        if (type == "show")
            $('.bodyloaders').show();
        else
            $('.bodyloaders').hide();
    }
     
    $scope.convertTime = function ( strTime ){  
        if (strTime < 60) return strTime + "m"; 
            else if (strTime.length == 3) {
                hr = strTime.substr(0, 1);
                min = strTime.substr(-2);
                return hr + "h " + min + "m"
            } else {
                hr = strTime.substr(0, 2);
                min = strTime.substr(-2);
                return hr + "h " + min + "m"
            }
    }

    $scope.convertDate = function ( date, flight ){
        var dt = new Date(date);
 
        if(!flight)
            return (dt.getMonth() + 1) + '-' + dt.getDate() + '-' + dt.getFullYear();
        else
            return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
    }

    $http.get("http://jetsetgenie.devzila.com/api/destination-types")
    .success(function (data, status, headers, config) {
        $scope.desttypes = data;
    })
    .error(function (error, status, headers, config) {
        console.log(status);
        console.log("Error occured");
    });

    $scope.getResults = function (selected_destination) {
        mixpanel.track(
			"Destination Select",
			{ "type": selected_destination }
		);

        $('.step-2').hide('slide', { direction: 'left' }, 200, function () {
            $('.step-3').show('slide', { direction: 'right' }, 200, function () {
                setTimeout(
						function () {
						    var name, email, leaving_date, returning_date, home_airport, ip, browser;
						    leaving_date = $("input[name='leaving_date']").val();
						    returning_date = $("input[name='returning_date']").val();
						    home_airport = $("input[name='home_airport']").val();
						    ip = $("input[name='ip']").val();
						    browser = $("input[name='browser']").val();
						    destination_type = selected_destination;

						    url = "/search-results/leaving/" + leaving_date + "/returning/" + returning_date + "/origin/" + home_airport + "/type/" + destination_type;

						    window.location = url;

						    mixpanel.track("Beta Wall View");
						}, 1000);
            });
        });
    }

    $scope.backtodestinations = function () {
        url = "/search-results/leaving/" + $scope.sparams.leaving + "/returning/" + $scope.sparams.returning + "/origin/" + $scope.sparams.origin + "/type/" + $scope.sparams.type;
         
    }

    $scope.setDates = function () {
        var validleaving = formvalidate.element("#leavingdate");
        var validreturning = formvalidate.element("#returningdate");
        var validairport = formvalidate.element("#homeairport");

        if (validleaving && validreturning && validairport) {
            mixpanel.track("JetSet Click");

            $('.step-1').hide('slide', { direction: 'left' }, 200, function () {
                $('.step-2').show('slide', { direction: 'right' }, 200);
            });
        }
    }

    $scope.favorites = $.get("http://jetsetgenie.devzila.com/api/cards");
    console.log($scope.favorites)

    $scope.isFavorite = function (placeid) {
        var foundFavorite = false;
        angular.forEach($scope.favorites, function (value, key) {
            //console.log(JSON.stringify(value))
            //console.log(value.placeName)
            // console.log(value.id + '-----' + placeid)             
            if (value.id == placeid)
                foundFavorite = true;
        });
        //console.log(foundFavorite)
        return foundFavorite;
    };
  

    $scope.deleteFavorite = function (index) {
        var con = window.confirm('Are you sure you want to remove this from favorite');
        if (con)
            $scope.favorites.splice(index, 1);
    };

    $scope.setfavorite = function (index, id, duration, fare, placeName) {
     
        if ($scope.isFavorite(id)) {
            var con = window.confirm('Are you sure you want to remove this from favorite');

            if (!con) return;

            angular.forEach($scope.favorites, function (value, key) {
                if (value.id == id)
                    $scope.favorites.splice(key, 1);
            });

        } else {
            var getRecord = []
            angular.forEach($scope.favorites, function (value, key) {
                if (value.id == id)
                    getRecord = $scope.favorites[key];
            });
            
            $scope.FavRequest = {
                "destination_id": id,
                "duration": duration,
                "fare": fare
            }

            $.post("http://jetsetgenie.devzila.com/api/cards", $scope.FavRequest, function () {
               // $.get("http://jetsetgenie.devzila.com/api/cards");
            });

            //$http.post("http://jetsetgenie.devzila.com/api/cards", $scope.FavRequest).success(function (response) {
              //  console.log(response);
            //});
            
            $scope.favorites.unshift({
                id: id,
                placeName: placeName,
                shortestFlight: duration,
                cheapestFlight: fare,
                flights: []
            });
        }
    }

    $http.get("/api/cards")
    .success(function (data, status, headers, config) {
        $scope.favorites = data;
    })
    .error(function (error, status, headers, config) {
        //console.log(status);
        console.log("Favorite Error");
    });

    $scope.deleteflight = function (parentindex, index) {
        $scope.favorites[parentindex].flights.splice(index, 1);
        favoriteMsnry.masonry('reloadItems');
    };
    
    $scope.searchfilters = {
            time: {
            leaving: {
                        takeoff: {
                        text: "",
                        timeslot: ['0030', '2400']
                        },
                landing: {
                    text: "Sat 12:30 am - Sun 12:30 am",
                    timeslot: ['0030', '2400']
                }
            },
                returning: {
                    takeoff: {
                            text: "Sat 12:30 am - Sun 12:30 am",
                            timeslot: ['0030', '2400']
                    },
                    landing: {
                        text: "Sat 12:30 am - Sun 12:30 am",
                        timeslot: ['0030', '2400']
                    }
                }
            },
        price: [0, 2000],
        stops: ['nonstop', 'one', 'two', ''],
        duration: [1, 48]
    };

   
    $scope.refineSearch = function () {
        var leaving_date = $scope.convertDate($scope.sparams.leaving);
        var returning_date = $scope.convertDate($scope.sparams.returning);
        var home_airport = $scope.sparams.origin;
        var type = $scope.sparams.type;

        //alert(type);

        url = "/search-results/leaving/" + leaving_date + "/returning/" + returning_date + "/origin/" + home_airport + "/type/" + type;

        window.location = url;
    }


   // window.console.log($scope.searchfilters.time.leaving.takeoff.text)
});

app.controller('ctrlFavorites', function($scope, $http){	 
    $scope.pagetitle = 'Favorites';
});


app.controller('ctrlSearchResults', function ($scope, $log, $http) {

    
    var sQuery = (window.location.pathname).split("/");
    airportCode = (((decodeURIComponent(sQuery[7])).replace('(', '[')).replace(')', ']')).match(/\[(.*)\]/).pop();

    

    dt = new Date( sQuery[3].replace(new RegExp('-', 'g'),'/') );

    leavingdt = $scope.daysInWeek[dt.getDay()] + ", " + $scope.months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear();

    dt = new Date( sQuery[5].replace(new RegExp('-', 'g'), '/') );
    returningdt = $scope.daysInWeek[dt.getDay()] + ", " + $scope.months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear();

    $scope.sparams.leaving = leavingdt;
    $scope.sparams.returning = returningdt;
    $scope.sparams.origin = decodeURIComponent(sQuery[7]);
    $scope.sparams.origincode = airportCode;
    $scope.sparams.destination = '';
    $scope.sparams.dest_code = '';
    $scope.sparams.type = decodeURIComponent(sQuery[9]);
    $scope.sparams.dest_id = '';

 
    
	$scope.trip_type = function( type ){
		if(type)
		return type + ' x ';
		else return '';
	}
	
	$scope.showFlights = function( dest_code, destination, dest_id ){
		leavingdt = new Date($scope.sparams.leaving)
		leavingdt = (leavingdt.getFullYear() + "-" + (leavingdt.getMonth()+1) + "-" + leavingdt.getDate());
		//console.log(leavingdt.getMonth());
		
		returningdt = new Date($scope.sparams.leaving)
		returningdt = (returningdt.getFullYear() + "-" + (returningdt.getMonth()+1) + "-" + returningdt.getDate());
				
		//$scope.sparams.destination=destination;
		destination = destination + " (" + dest_code + ")";
		destination_type = $scope.sparams.type;
		home_airport=$scope.sparams.origin;
		
		url = "/flight-results/leaving/" + leavingdt + "/returning/" + returningdt + "/origin/" + home_airport + "/destination/" + destination + "/type/" + destination_type + "/destid/" + dest_id;
		window.location = url;
	}

	getPlaceUrl = "/api/destination-types/" + $scope.sparams.type + "/airport";

	$scope.loader('show');

	$scope.records = [];

	$scope.fetchCities = function () {
	    $http.get(getPlaceUrl)
        .success(function (data, status, headers, config) {
            $scope.records = $scope.records.concat(data);
            //console.log($scope.records);
        })
        .error(function (error, status, headers, config) {
            console.log(status);
            console.log("Error occured");
        });
	}

	$(".tag_places").tagsinput();

	des_type = ($scope.sparams.type).split(',');

	angular.forEach(des_type, function (value, key) {
	    getPlaceUrl = "/api/destination-types/" + value + "/airport";
	    $scope.fetchCities();
	    $('.tag_places').tagsinput('add', value);
	    if (key == des_type.length - 1){
	        $scope.loader('hide');
	    }
	});
 
    // Slider options with event handlers
    $scope.slider = {
        'options': {
            start: function (event, ui) {
                $log.info('Event: Slider start - set with slider options', event);
            },
            stop: function (event, ui) {
                $log.info('Event: Slider stop - set with slider options', event);
            }
        }
    };


});

app.controller('ctrlFlightResults', function ($scope, $http, $resource) {

    $scope.flights = [{ }];
  
    var sQuery = (window.location.pathname).split("/");

    airportCode = (((decodeURIComponent(sQuery[7])).replace('(', '[')).replace(')', ']')).match(/\[(.*)\]/).pop();
    dest_code = (((decodeURIComponent(sQuery[9])).replace('(', '[')).replace(')', ']')).match(/\[(.*)\]/).pop();
    //console.log(sQuery[9])
    dt = new Date(sQuery[3]);
    leavingdt = $scope.daysInWeek[dt.getDay()] + ", " + $scope.months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear();

    dt = new Date(sQuery[5]);
    returningdt = $scope.daysInWeek[dt.getDay()] + ", " + $scope.months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear();

    sParams = {
        leaving: leavingdt,
        returning: returningdt,
        origin: decodeURIComponent(sQuery[7]),
        origincode: airportCode,
        type: decodeURIComponent(sQuery[11]),
        destination: decodeURIComponent(sQuery[9]),
        dest_code: dest_code
    }

 
    $scope.sparams.leaving = leavingdt;
    $scope.sparams.returning = returningdt;
    $scope.sparams.origin = decodeURIComponent(sQuery[7]);
    $scope.sparams.origincode = airportCode;
    $scope.sparams.destination = decodeURIComponent(sQuery[9]);
    $scope.sparams.dest_code = dest_code;
    $scope.sparams.type = decodeURIComponent(sQuery[11]);
    $scope.sparams.dest_id = sQuery[13];
	
   // alert($scope.sparams.dest_id)
	//alert($scope.sparams.origincode + "" + $scope.sparams.dest_code)

    $scope.FlightRequest = {
        "request": {
            "slice": [
              {
                  "origin": $scope.sparams.origincode,
                  "destination": $scope.sparams.dest_code,
                  "date": $scope.convertDate($scope.sparams.leaving, true)
              }
            ],
            "passengers": {
                "adultCount": 1,
                "infantInLapCount": 0,
                "infantInSeatCount": 0,
                "childCount": 0,
                "seniorCount": 0
            },
            "solutions": 20,
            "refundable": false,
            "saleCountry": "US"
        }
    };

	getPlaceUrl = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyAdy8-J5mKe_j3q3IBpqTOTwwQf_nuoyoE";
   // getPlaceUrl = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyCqYVW7pZrz9kMEAbfxXJNmMRCcAyoAcY4";
 
    $scope.loader('show');
    
    //$http.post(getPlaceUrl, $scope.FlightRequest).success(function (response) {
   
    
    $.get('/flight-result.json', function (response) {
        var currChar = "$";
        var ctr = 0;
        console.log(JSON.stringify(response.trips.tripOption));
      
        $.each( response.trips.tripOption, function (index, value) {
            var price, timings;
            ctr++;

            price = currChar + (value.saleTotal).match(/[\d\.]+/g)[0];
             
            var departureTime = "";
            var arrivalTime = "";

            var flightRoute = [];

            var stops = 0;

            $.each(value.slice, function (index, value) {
                //console.log(value.segment);
                stops = value.segment.length;
                duration = $scope.convertTime(value.duration.toString());

                $.each(value.segment, function (sindex, svalue) {
                    departuredt = new Date(svalue.leg[0].departureTime);
                    arrivaldt = new Date(svalue.leg[0].arrivalTime);

                    departuredate = (departuredt.getMonth() + 1) + "-" + departuredt.getDate() + "-" + departuredt.getFullYear();
                    var ampm, hrs = "";
                    if (departuredt.getHours() >= 12) {
                        hrs = (departuredt.getHours() == 12) ? '12' : departuredt.getHours() - 12;
                        ampm = 'pm';
                    } else {
                        hrs = departuredt.getHours();
                        ampm = 'am';
                    }

                    var mins = (departuredt.getMinutes().length < 2) ? '0' + departuredt.getMinutes() : departuredt.getMinutes();

                    mins = (mins == "0") ? "00" : mins;
                    hrs = (hrs == "0") ? "00" : hrs;

                    departuretime = hrs + ":" + mins + ampm;

                    arrivaldate = (arrivaldt.getMonth() + 1) + "-" + arrivaldt.getDate() + "-" + arrivaldt.getFullYear();
                    var ampm, hrs = "";
                    if (arrivaldt.getHours() >= 12) {
                        hrs = (arrivaldt.getHours() == 12) ? '12' : arrivaldt.getHours() - 12;
                        ampm = 'pm';
                    } else {
                        hrs = arrivaldt.getHours();
                        ampm = 'am';
                    }

                    var mins = (arrivaldt.getMinutes().length < 2) ? '0' + arrivaldt.getMinutes() : arrivaldt.getMinutes();

                    mins = (mins == "0") ? "00" : mins;
                    hrs = (hrs == "0") ? "00" : hrs;

                    arrivaltime = hrs + ":" + mins + ampm;
                    
                    
                   // console.log(JSON.stringify(svalue.leg[0].operatingDisclosure));

                    //airline = 'airfrance';
                    airline = svalue.leg[0].operatingDisclosure;
                    
                    if (airline != undefined)
                        airline = airline.replace('OPERATED BY ', '');
                    else
                        airline = 'AIR FRANCE';

                    flightRoute.push({
                        arrival: svalue.leg[0].arrivalTime,
                        departure: svalue.leg[0].departureTime,
                        timings: departuretime + "-" + arrivaltime,
                        duration: (sindex == 0) ? duration : '',
                        airline: airline,
                        airlineLogo: '/assets/flight-dummy.png',
                        flightOrigin: svalue.leg[0].origin,
                        flightDest: svalue.leg[0].destination
                    });
                });

                    
            });
            //loop for adding a flight ends here.

            var flights = {
                id: value.id,
                price: price,
                tripType: 'round trip',
                type : (value.slice[0].segment.length > 1) ? 'Connected' : 'Nonstop',
                bookUrl: 'http://www.expedia.com',
                flights: {}
            }
            flights.flights = flightRoute;
 
            $scope.flights.push(flights);
        });
   
        $scope.loader('hide');
       
    });


	$scope.deleteflight = function( parentindex, index ){
		$scope.favorites[parentindex].flights.splice(index, 1);
	};

	$scope.addFlight = function (fare, airline, departure) {
	    
	    //Check if the flight if destination card is already added, if not add one
	    if (!$scope.isFavorite($scope.sparams.dest_id))
	    {
	        getPlaceUrl = "/api/destination-types/" + $scope.sparams.type + "/airport";

	        var getPlacedata =  $http.get(getPlaceUrl)
                .success(function (data, status, headers, config) {
                    var findPlace = {};
                    $.each(data, function (key, value) {
                        if (value.id == $scope.sparams.dest_id) {
                            findPlace = value
                        }
                    });

                    var setfav = $scope.setfavorite('', findPlace.id, findPlace.duration, findPlace.fare, findPlace.display_name);

                    var flightValue = {
                        "destination_card_id": $scope.sparams.dest_id,
                        "name": airline,
                        "fare": fare,
                        "action_date": "",
                        "action_time": "",
                        "updated_at": "2016-04-09 18:01:33",
                        "created_at": "2016-04-09 18:01:33",
                        "id": 2
                    }

                    $http.post("/api/cards", $scope.FavRequest).success(function (response) {
                        console.log(response);
                    });
                    //console.log(JSON.stringify(findPlace));
                })
                .error(function (error, status, headers, config) {
                    console.log(status);
                    console.log("Error occured");
                });
	         
	    }
	}

    
});

