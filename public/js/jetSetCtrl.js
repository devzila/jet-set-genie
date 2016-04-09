app.controller('jetSetGenie', function ($scope, $http) {
    $scope.desttypes = [];

    $scope.sparams = {
        leaving: '',
        returning: '',
        origin: '',
        origincode: '',
        destination: '',
        dest_code: '',
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

    $scope.convertDate = function ( date ){
        var dt = new Date(date);
        return (dt.getMonth() + 1) + '-' + dt.getDate() + '-' + dt.getFullYear();
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

    $scope.favorites = [
	{
	    placeName: "Puerto Vallarta",
	    shortestFlight: "6hrs 23 mins",
	    cheapestFlight: "$509",
	    color: "#33cccc",
	    flights: [
            {
                price: "$509",
                name: "American",
                departDate: "Sat, Feb 29 6:55PM"
            },
            {
                price: "$499",
                name: "United",
                departDate: "Sat, Feb 29 3:14PM"
            },
	    ]
	},
		{
		    placeName: "Los Angeles",
		    shortestFlight: "6hrs 23 mins",
		    cheapestFlight: "$509",
		    color: "#ffc000",
		    flights: [
				{
				    price: "$377",
				    name: "LAN",
				    departDate: "Sun, Mar 1 4:32PM"
				},
		    ]
		},
		{
		    placeName: "Majorca",
		    shortestFlight: "6hrs 23 mins",
		    cheapestFlight: "$509",
		    color: "#7f7f7f",
		    flights: []
		},
		{
		    placeName: "Malibu",
		    shortestFlight: "5hrs 21 mins",
		    cheapestFlight: "$399",
		    color: "#028c90",
		    flights: [
				{
				    price: "$509",
				    name: "American",
				    departDate: "Sat, Feb 29 6:55PM"
				},
				{
				    price: "$499",
				    name: "United",
				    departDate: "Sat, Feb 29 3:14PM"
				},
		    ]
		},
		{
		    placeName: "Puerto Vallarta",
		    shortestFlight: "6hrs 23 mins",
		    cheapestFlight: "$509",
		    color: "#2FD280",
		    flights: [
				{
				    price: "$509",
				    name: "American",
				    departDate: "Sat, Feb 29 6:55PM"
				},
				{
				    price: "$499",
				    name: "United",
				    departDate: "Sat, Feb 29 3:14PM"
				},
		    ]
		}
    ];

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
    $scope.setfavorite = function (index) {
        //alert($scope.records[index].id);
        return
        $scope.favorites.push({ id: "0" });
    };


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

        alert(type);

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

    dt = new Date(sQuery[3]);
    leavingdt = $scope.daysInWeek[dt.getDay()] + ", " + $scope.months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear();

    dt = new Date(sQuery[5]);
    returningdt = $scope.daysInWeek[dt.getDay()] + ", " + $scope.months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear();

    $scope.sparams.leaving = leavingdt;
    $scope.sparams.returning = returningdt;
    $scope.sparams.origin = decodeURIComponent(sQuery[7]);
    $scope.sparams.origincode = airportCode;
    $scope.sparams.destination = '';
    $scope.sparams.dest_code = '';
    $scope.sparams.type = decodeURIComponent(sQuery[9]);
    
	$scope.trip_type = function( type ){
		if(type)
		return type + ' x ';
		else return '';
	}
	
	$scope.showFlights = function( dest_code, destination ){
		leavingdt = new Date($scope.sparams.leaving)
		leavingdt = (leavingdt.getFullYear() + "-" + (leavingdt.getMonth()+1) + "-" + leavingdt.getDate());
		//console.log(leavingdt.getMonth());
		
		returningdt = new Date($scope.sparams.leaving)
		returningdt = (returningdt.getFullYear() + "-" + (returningdt.getMonth()+1) + "-" + returningdt.getDate());
				
		//$scope.sparams.destination=destination;
		destination = destination + " (" + dest_code + ")";
		destination_type = $scope.sparams.type;
		home_airport=$scope.sparams.origin;
		
		url="/flight-results/leaving/"+leavingdt+"/returning/"+returningdt+"/origin/"+home_airport+"/destination/"+destination+"/type/"+destination_type;
		window.location = url;
	}

	getPlaceUrl = "http://jetsetgenie.devzila.com/api/destination-types/" + $scope.sparams.type + "/airport";

	$scope.loader('show');

	$scope.records = [];

	$scope.fetchCities = function () {
	    $http.get(getPlaceUrl)
        .success(function (data, status, headers, config) {
            $scope.records = $scope.records.concat(data);
            console.log($scope.records);
        })
        .error(function (error, status, headers, config) {
            console.log(status);
            console.log("Error occured");
        });
	}

	$(".tag_places").tagsinput();

	des_type = ($scope.sparams.type).split(',');

	angular.forEach(des_type, function (value, key) {
	    getPlaceUrl = "http://jetsetgenie.devzila.com/api/destination-types/" + value + "/airport";
	    $scope.fetchCities();
	    $('.tag_places').tagsinput('add', value);
	    if (key == des_type.length - 1){
	        $scope.loader('hide');
	    }
	});
 
    $scope.setfavorite = function (index, id) {
        if ($scope.isFavorite(id))
        {
            var con = window.confirm('Are you sure you want to remove this from favorite');
            angular.forEach($scope.favorites, function (value, key) {
                if (value.id == id)
                    $scope.favorites.splice(key, 1);
            });

        }else{
            var getRecord = []
            angular.forEach($scope.favorites, function (value, key) {
                if (value.id == id)
                    getRecord = $scope.favorites[key];
            });

            //console.log(JSON.stringify(getRecord))
       
           $scope.favorites.unshift({
               id: id,
               placeName: "Test",
               shortestFlight: "Test",
               cheapestFlight: "Test",
               flights: []
           });
        }
    }

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

    $scope.flights = {};
  
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
	 
	//alert($scope.sparams.origincode + "" + $scope.sparams.dest_code)

	var FlightRequest = {
        "request": {
            "slice": [
              {
                  "origin": "DCA",
                  "destination": "LAX",
                  "date": "2016-05-11"
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
            "refundable": false
        }
    };

	//getPlaceUrl = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyAdy8-J5mKe_j3q3IBpqTOTwwQf_nuoyoE";
    getPlaceUrl = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyCqYVW7pZrz9kMEAbfxXJNmMRCcAyoAcY4";
 
    $scope.loader('show');

	$http({
	    method: 'POST',
	    url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyCqYVW7pZrz9kMEAbfxXJNmMRCcAyoAcY4",
	    params: FlightRequest,
	    headers: { 'Content-Type': 'application/json; charset=utf-8' },
	    transformRequest: false,
	}).then(function successCallback(response) {

	    $scope.loader('hide');
	    console.log(response);
	    return;
	    $.each(response.trips.tripOption, function (index, value) {
	        flightRecord = {};
	        flightRecord.flights = [{}];

	        flightRecord.price = value.saleTotal;
	        flightRecord.tripType = 'round trip';
	        flightRecord.type = (value.slice[0].segment.length > 1) ? 'Connected' : 'Nonstop';
	        flightRecord.bookUrl = 'http://www.expedia.com';

	        $.each(value.slice[0].segment, function (i, flight) {
	            flightRecord.flights.push({
	                airline: '',
	                airlineLogo: '',
	                duration: '',
	                timings: '',
	            })
	        });

	        //console.log(JSON.stringify(flightRecord))
	        $scope.flights.push(flightRecord);
	    })
	}, function errorCallback(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	});


	console.log(JSON.stringify($scope.flights));

	$scope.deleteflight = function( parentindex, index ){
		$scope.favorites[parentindex].flights.splice(index, 1);
	};

});

