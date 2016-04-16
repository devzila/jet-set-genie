app.controller('jetSetGenie', function ($scope, $http) {
    scope = this;
    $scope.desttypes = [];

    $scope.sparams = {
        leaving: '',
        returning: '',
        origin: '',
        origincode: '',
        destination: '',
        dest_code: '',
        dest_id: '0',
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

    $http.get("/api/destination-types")
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

						    url = "/search-results/leaving/" + leaving_date + "/returning/" + returning_date + "/origin/" + home_airport + "/type/" + destination_type + "/destid/" + $scope.sparams.dest_id;

						    window.location = url;

						   // mixpanel.track("Beta Wall View");
						}, 1000);
            });
        });
    }

    $scope.backtodestinations = function () {
        //url = "/search-results/leaving/" + $scope.sparams.leaving + "/returning/" + $scope.sparams.returning + "/origin/" + $scope.sparams.origin + "/type/" + $scope.sparams.type + "/destid/" + $scope.dest_id;
        // window.location = url;
        window.history.back();
    }

    $scope.setDates = function () {
        var validleaving = formvalidate.element("#leavingdate");
        var validreturning = formvalidate.element("#returningdate");
        var validairport = formvalidate.element("#homeairport");

        if (validleaving && validreturning && validairport) {
            mixpanel.track("JetSet Click");

            $('.step-1').hide('slide', { direction: 'left' }, 500, function () {
                $('.step-2').show('slide', { direction: 'right' }, 500);
            });
        }
    }

    $scope.isFavorite = function (placeid) {
        var foundFavorite = false;
        angular.forEach($scope.favorites, function (value, key) {
            //console.log(JSON.stringify(value))
            //console.log(value.placeName)
            // console.log(value.id + '-----' + placeid)             
            if (value.destination_id == placeid)
                foundFavorite = true;
        });
        //console.log(foundFavorite)
        return foundFavorite;
    };
  

    $scope.deleteFavorite = function ( index, id, placeName ) {
        var con = window.confirm('Are you sure you want to remove "' + placeName + '" card from your favorites?');
        
        if (!con) return;

        angular.forEach($scope.favorites, function (value, key) {
            if (value.destination_id == id) {
                $scope.favorites.splice(key, 1);
            }
        });
    };

    $scope.setfavorite = function (index, id, duration, fare, placeName, withFlight) {
            
        if ($scope.isFavorite(id))
            return false;

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

            $.post("/api/cards", $scope.FavRequest, function ( response ) {
                $scope.getFavorites();
            });
              
    } // Set favorite ends here.

    $scope.getFavorites = function () {
        $http.get("/api/cards")
        .success(function (data, status, headers, config) {
            $scope.favorites = data;
        })
        .error(function (error, status, headers, config) {
            //console.log(status);
            console.log("Favorite Error");
        });
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
        stops: [{
            nonstop: 0,
            onestop: 0,
            twostop: 0,
            any: 1
        }],
        duration: [1, 48]
    };

   
    $scope.refineSearch = function () {
        var leaving_date = $scope.convertDate($scope.sparams.leaving);
        var returning_date = $scope.convertDate($scope.sparams.returning);
        var home_airport = $scope.sparams.origin;
        var type = $scope.sparams.type;

        //alert(type);

        url = "/search-results/leaving/" + leaving_date + "/returning/" + returning_date + "/origin/" + home_airport + "/type/" + type + "/destid/" + (( ($scope.sparams.dest_id).length == 0 ) ? '0' : $scope.sparams.dest_id);

        window.location = url;
    }

    $scope.getFavorites();

    $scope.clearFilters = function () {
        $scope.searchfilters.time.leaving.takeoff.timeslot = ['0050', '2400']
        $scope.searchfilters.time.leaving.landing.timeslot = ['0050', '2400']
        $scope.searchfilters.time.returning.takeoff.timeslot = ['0050', '2400']
        $scope.searchfilters.time.returning.landing.timeslot = ['0050', '2400']
        $scope.searchfilters.price = [0, 2000]
        $scope.searchfilters.stops.nonstop = false;
        $scope.searchfilters.stops.onestop = false;
        $scope.searchfilters.stops.twostop = false;
        $scope.searchfilters.stops.any = false;
        $scope.searchfilters.duration = [1, 48];
        console.log(JSON.stringify($scope.searchfilters));
    }

   
});

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function createCookie(name, value, days) {
    var date, expires;
    if (days) {
        date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

//main controller closes here

app.controller('ctrlFavorites', function($scope, $http){	 
    $scope.pagetitle = 'Favorites';

    var getSearchCookie = JSON.parse(readCookie('sparams'));
    $scope.sparams.leaving = getSearchCookie.leaving;
    $scope.sparams.returning = getSearchCookie.returning;
    $scope.sparams.origin = getSearchCookie.origin;
    $scope.sparams.origincode = getSearchCookie.origincode;
    $scope.sparams.destination = getSearchCookie.destination;
    $scope.sparams.dest_code = (getSearchCookie.dest_code == '') ? 0 : getSearchCookie.dest_code;
    $scope.sparams.dest_id = getSearchCookie.dest_id;
    $scope.sparams.type = getSearchCookie.type;
    
    $scope.shareFavorites = function () {
        window.location = "mailto: ?subject=Check out my favorite destination!&body=Hi,%0D%0A%0D%0ACheck out following link to see my favorite destinations:%0D%0A" + $scope.sharedURL + "%0D%0A%0D%0ACheers!%0D%0A-Shared using JetSetGenie - Start a trip to your favorite destinations";
    }

    $http.get("/api/visitors")
    .success(function (data, status, headers, config) {
        $scope.sharedURL = window.location.protocol + "//" + window.location.host + "/shared-dashboard/" + data.visitor_id;
    })
    .error(function (error, status, headers, config) {
        console.log(status);
        console.log("Error occured in fetching visitors API");
    });

    document.getElementById("shareFav").addEventListener("click", function () {
        copyToClipboard($scope.sharedURL);
    });
    $(".tag_places").tagsinput();
    $(".tag_places").on('change', function () {
        $scope.sparams.type = $(this).val();
    })
});



function copyToClipboard(siteurl) {
    // create hidden text element, if it doesn't already exist
    var targetId = "_hiddenCopyText_";
    var origSelectionStart, origSelectionEnd;
    target = document.getElementById(targetId);
    if (!target) {
        var target = document.createElement("textarea");
        target.style.position = "absolute";
        target.style.left = "-9999px";
        target.style.top = "0";
        target.id = targetId;
        document.body.appendChild(target);
    }
    target.textContent = siteurl;
    // select the content
    var currentFocus = document.activeElement;
    target.focus();
    target.setSelectionRange(0, target.value.length);

    // copy the selection
    var succeed;
    try {
        succeed = document.execCommand("copy");
    } catch (e) {
        succeed = false;
    }
    // restore original focus
    if (currentFocus && typeof currentFocus.focus === "function") {
        currentFocus.focus();
    }

    target.textContent = "";

    $('.favcopied').fadeIn(500).delay(3000).fadeOut(500);
        
    return succeed;
}

app.controller('ctrlsideBar', function ($scope, $log, $http) {

    $scope.showFlights = function (dest_code, destination, dest_id) {
        //alert(dest_id); return;

        leavingdt = new Date($scope.sparams.leaving)
        leavingdt = (leavingdt.getFullYear() + "-" + (leavingdt.getMonth() + 1) + "-" + leavingdt.getDate());
        //console.log(leavingdt.getMonth());

        returningdt = new Date($scope.sparams.leaving)
        returningdt = (returningdt.getFullYear() + "-" + (returningdt.getMonth() + 1) + "-" + returningdt.getDate());

        //$scope.sparams.destination=destination;
        destination = destination + " (" + dest_code + ")";
        destination_type = $scope.sparams.type;
        home_airport = $scope.sparams.origin;
        $scope.sparams.dest_id = dest_id;

        url = "/flight-results/leaving/" + leavingdt + "/returning/" + returningdt + "/origin/" + home_airport + "/destination/" + destination + "/type/" + destination_type + "/destid/" + dest_id;
        window.location = url;
    }
});

app.controller('ctrlSearchResults', function ($scope, $log, $http) {

    $scope.lstCount = 9;
    
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

    createCookie('sparams', JSON.stringify($scope.sparams), 1);
    
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
	$(".tag_places").on('change', function () {
	    $scope.sparams.type = $(this).val();
	})

	//$scope.sparams.type = $(".tag_places").val();

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

    $scope.loadmore = function () {
        $scope.lstCount += 9;
    }
});

app.controller('ctrlFlightResults', function ($scope, $http, $resource) {

    $scope.flights = [{}];
  
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
	
    createCookie('sparams', JSON.stringify($scope.sparams), 1);
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
    
    $http.post(getPlaceUrl, $scope.FlightRequest).success(function (response) {
   
    
   // $.get('/flight-result.json', function (response) {
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
        $(".tag_places").tagsinput();
        $(".tag_places").on('change', function () {
            $scope.sparams.type = $(this).val();
        })
       
    });


	$scope.deleteflight = function( parentindex, index ){
		$scope.favorites[parentindex].flights.splice(index, 1);
	};

	$scope.addFlight = function (fare, airline, departure) {
	    var setfav = '';
	    var destination_id = $scope.sparams.dest_id;

	    //Check if the flight if destination card is already added, if not add one
	    if (!$scope.isFavorite(destination_id))
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

                  //  $scope.setfavorite('', findPlace.id, findPlace.duration, findPlace.fare, findPlace.display_name, true);
                    //console.log(JSON.stringify(findPlace));
                    $scope.FavRequest = {
                        "destination_id": findPlace.id,
                        "duration": findPlace.duration,
                        "fare": findPlace.fare
                    }

                     

                    $.post("/api/cards", $scope.FavRequest, function (response) {
                        console.log(response.destination_id);
                        
                        $scope.getFavorites();

                        var flightValue = {
                            "destination_card_id": response.destination_id,
                            "name": airline,
                            "fare": fare,
                            "action_date": departure,
                            "action_time": "",
                            "updated_at": Date(),
                            "created_at": Date(),
                        }

                        $http.post("/api/cards/" + response.destination_id + "/items", flightValue).success(function (response) {
                            $scope.getFavorites();
                        });
                    });


                })
                .error(function (error, status, headers, config) {
                    console.log(status);
                    console.log("Error occured");
                });	         
	    } else {
	        angular.forEach($scope.favorites, function (value, key) {          
	            if (value.destination_id == destination_id) {
	                setfav = value;
	            }	            
	        });

	        var flightValue = {
	            "destination_card_id": $scope.sparams.dest_id,
	            "name": airline,
	            "fare": fare,
	            "action_date": departure,
	            "action_time": "",
	            "updated_at": Date(),
	            "created_at": Date(),
	        }

	        $http.post("/api/cards/" + setfav.card_id + "/items", flightValue).success(function (response) {
	            $scope.getFavorites();
	        });
	    }
	}

    
});

app.controller('ctrlSharedDestinations', function ($scope, $http, $resource) {
    $scope.pagetitle = "Shared Dashboard";
    //visitor_id = '5710b39dbe0d7';
    var sQuery = (window.location.pathname).split("/");
    visitor_id = sQuery[2];
     
    $http.get("/api/cards?visitor_id=" + visitor_id).success(function (response) {
        $scope.getFavorites();
    });
});