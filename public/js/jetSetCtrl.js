app.controller('jetSetGenie', function ($scope, $http) {
    scope = this;
    $scope.desttypes = [];
    $scope.records = [];

    $scope.showShare = true;
  
    $scope.validForm = true;
     
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

    $scope.fetchInfo = function () {
 
        angular.forEach($scope.records, function (value, key) {
            value.duration = '...';
            value.fare = '...';

            setTimeout(function () {

                var origin = $scope.sparams.origincode;
                var destination = value.airport_code;
                var leavingdt = new Date($scope.sparams.leaving);

                var leavingdt = leavingdt.getFullYear() + '-' + (parseInt(leavingdt.getMonth()) + 1) + '-' + leavingdt.getDate();

                var infoRequest = {
                    "request": {
                        "passengers": {
                            "adultCount": 1
                        },
                        "slice": [
                            {
                                "origin": origin,
                                "destination": destination,
                                "date": leavingdt
                            }
                        ],
                        "solutions": 20,
                        "refundable": false,
                        "saleCountry": "US"
                    }
                }

                //     console.log(JSON.stringify(infoRequest) );



                loopNode = $(this);
                var durationContainer = $('.durationInfo', '#card-' + value.id);
                var priceContainer = $('.priceInfo', '#card-' + value.id);
                //     console.log(durationContainer);

                var url = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyCMCG3JaUmNbKhKHFdZ4bUNu2SopqA_MqY";
                $.ajax({
                    type: "POST",
                    url: url,
                    data: JSON.stringify(infoRequest),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data) {
                        //console.log( JSON.stringify(data) );
                        //priceContainer.html(data.trips.tripOption[0].saleTotal);
                        value.fare = parseInt((data.trips.tripOption[0].saleTotal).match(/\d+/), 10);

                        priceContainer.html('$' + parseInt((data.trips.tripOption[0].saleTotal).match(/\d+/), 10));

                        if (data.trips.tripOption[0].slice[0].duration) {
                            minutes = data.trips.tripOption[0].slice[0].duration
                            hr = parseInt(minutes / 60);
                            minutes = minutes % 60;

                            value.duration = hr + " hr " + minutes + " min";
                            durationContainer.html(hr + " hr " + minutes + " min");
                            //durationContainer.html(hr + " hr " + minutes + " min");	                    

                        }

                    },
                    failure: function (errMsg) {
                        alert(errMsg);
                    }
                });

            }, 500);
            //timeout

        });
    } //fetchinfo
     
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

    $scope.fetchCities = function (getPlaceUrl, fetchInfo) {
        console.log(getPlaceUrl);
        $http.get(getPlaceUrl)
        .success(function (data, status, headers, config) {
            $scope.records = $scope.records.concat(data);
            //console.log($scope.records);
            if (fetchInfo) 
            $scope.fetchInfo();
        })
        .error(function (error, status, headers, config) {
            console.log(status);
            console.log("Error occured");
        });
    }

    $scope.convertDate = function ( date, flight ){
        var dt = new Date(date);

        if(!flight)
            return (dt.getMonth() + 1) + '-' + dt.getDate() + '-' + dt.getFullYear();
        else
            return dt.getFullYear() + '-' + (dt.getMonth() + 1) + '-' + dt.getDate();
    }

    $scope.expediaDate = function ( date ){
        var dt = new Date(date);
        return dt.getDate() + '/' + (dt.getMonth() + 1) + '/' + dt.getFullYear();
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
						    destination_type = (selected_destination == '') ? 'Beach' : selected_destination;

						    url = "/search-results/leaving/" + leaving_date + "/returning/" + returning_date + "/origin/" + home_airport + "/type/" + destination_type + "/destid/" + ((($scope.sparams.dest_id).length == 0) ? '0' : $scope.sparams.dest_id) + '/filters/0' ;

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
               // console.log("/api/cards/" + value.card_id);
                $http.delete("/api/cards/" + value.card_id)
                .success(function (data, status, headers, config) {
                    //$scope.favorites = data;
                    //console.log($scope.favorites);
                    console.log(data);
                })
                .error(function (error, status, headers, config) {
                    //console.log(status);
                    console.log("Favorite Error");
                });
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
                "fare": fare,
                "updated_at": Date(),
                "created_at": Date()
            }

            $.post("/api/cards", $scope.FavRequest, function ( response ) {
                $scope.getFavorites();
            });

            mixpanel.track("Destination Starred");
              
    } // Set favorite ends here.

    $scope.getFavorites = function () {
        $http.get("/api/cards")
        .success(function (data, status, headers, config) {
            $scope.favorites = data;
            //console.log($scope.favorites);
        })
        .error(function (error, status, headers, config) {
            //console.log(status);
            console.log("Favorite Error");
        });
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
        stops: 'any',
        duration: [1, 48]
    };

   
    $scope.refineSearch = function () {
        //console.log($scope.sparams.leaving);
        var leaving_date = $scope.convertDate($scope.sparams.leaving);
        var returning_date = $scope.convertDate($scope.sparams.returning);
        var home_airport = $scope.sparams.origin;
        var type = $scope.sparams.type;

        //alert(type);
        type = (type == '') ? 'Beach' : type;

        filters = '/filters/' + $scope.searchfilters.time.leaving.takeoff.timeslot[0] + '';
        filters += ',' + $scope.searchfilters.time.leaving.takeoff.timeslot[1] + '';
        filters += ',' + $scope.searchfilters.price[1];
        filters += ',' + $scope.searchfilters.stops;
        filters += ',' + $scope.searchfilters.duration[1];

        url = "/search-results/leaving/" + leaving_date + "/returning/" + returning_date + "/origin/" + home_airport + "/type/" + type + "/destid/" + ((($scope.sparams.dest_id).length == 0) ? '0' : $scope.sparams.dest_id) + filters;
    
        window.location = url;
    }

    $scope.clearFilters = function () {
        $scope.searchfilters.time.leaving.takeoff.timeslot = ['0050', '2400']
        $scope.searchfilters.time.leaving.landing.timeslot = ['0050', '2400']
        $scope.searchfilters.time.returning.takeoff.timeslot = ['0050', '2400']
        $scope.searchfilters.time.returning.landing.timeslot = ['0050', '2400']
        $scope.searchfilters.price = [0, 2000]
        $scope.searchfilters.stops = 'any';
        $scope.searchfilters.duration = [1, 48];
        //console.log(JSON.stringify($scope.searchfilters));
    }

   
   
});//main controller closes here

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


app.controller('ctrlFavorites', function ($scope, $http) {

    $scope.getFavorites();

    $scope.showShare = false;
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
   
    var favoriteMsnry;
    
    $(document).ready(function () {
        //$(".tag_places").tagsinput();

       // $(".tag_places").on('change', function () {
      ///      $scope.sparams.type = $(this).val();
      //  })

        favoriteMsnry = $('.favorite-container').masonry({
            itemSelector: '.list-box',
        });

        $(window).resize(function () {
            favoriteMsnry.masonry('reloadItems');
        });
    });

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
    
        filters = '/filters/' + $scope.searchfilters.time.leaving.takeoff.timeslot[0] + '';
        filters += ',' + $scope.searchfilters.time.leaving.takeoff.timeslot[1] + '';
        filters += ',' + $scope.searchfilters.price[1];
        filters += ',' + $scope.searchfilters.stops;
        filters += ',' + $scope.searchfilters.duration[1];

        url = "/flight-results/leaving/" + leavingdt + "/returning/" + returningdt + "/origin/" + home_airport + "/destination/" + destination + "/type/" + destination_type + "/destid/" + dest_id + filters;
        window.location = url;
        //console.log(url)
    }

    $scope.deleteflight = function (parentindex, index, pid, fid) {
        var con = window.confirm('Are you sure you want to remove flight card from your favorites?');

        if (!con) return;

        $http.delete("/api/cards/" + pid + "/items/" + fid)
        .success(function (data, status, headers, config) {
            //$scope.favorites = data;
            //console.log($scope.favorites);
            $scope.favorites[parentindex].items.splice(index, 1);
        })
        .error(function (error, status, headers, config) {
            //console.log(status);
            console.log("Favorite Error");
        });
    };

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

    $scope.deleteflight = function (parentindex, index, pid, fid) {
        var con = window.confirm('Are you sure you want to remove flight card from your favorites?');
        
        if (!con) return;

        $http.delete("/api/cards/" + pid + "/items/" + fid)
        .success(function (data, status, headers, config) {
            //$scope.favorites = data;
            //console.log($scope.favorites);
            $scope.favorites[parentindex].items.splice(index, 1);
        })
        .error(function (error, status, headers, config) {
            //console.log(status);
            console.log("Favorite Error");
        });
    };

    $scope.getFavorites();

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

    $scope.showFavorites = function () {
        window.location = window.location.protocol + "//" + window.location.host + "/favorites";
    }

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

        filters = '/filters/' + $scope.searchfilters.time.leaving.takeoff.timeslot[0] + '';
        filters += ',' + $scope.searchfilters.time.leaving.takeoff.timeslot[1] + '';
        filters += ',' + $scope.searchfilters.price[1];
        filters += ',' + $scope.searchfilters.stops;
        filters += ',' + $scope.searchfilters.duration[1];

        url = "/flight-results/leaving/" + leavingdt + "/returning/" + returningdt + "/origin/" + home_airport + "/destination/" + destination + "/type/" + destination_type + "/destid/" + dest_id + filters;
        window.location = url;
    }
});

app.controller('ctrlRefineSearch', function ($scope, $log, $http) {
    $(".leavedate").datepicker({
        minDate: 0,
        defaultDate: "+1w",
        changeMonth: false,
        numberOfMonths: 1,
        dateFormat: 'D, M dd, yy',
        onClose: function (selectedDate) {
            $(".returndate").datepicker("option", "minDate", selectedDate);
            console.log(selectedDate);
            $scope.sparams.leaving = selectedDate;
        }
    });

    $(".returndate").datepicker({
        defaultDate: "+1w",
        changeMonth: false,
        numberOfMonths: 1,
        dateFormat: 'D, M dd, yy',
        onClose: function (selectedDate) {
            //$(".leavedate").datepicker("option", "maxDate", selectedDate);
            $scope.sparams.returning = selectedDate;
        }
    });

    var cities = new Bloodhound({
        datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        prefetch: '/api/destination-types'
    });
    cities.initialize();

    var elt = $('.tag_places');
    elt.tagsinput({
        itemValue: 'name',
        itemText: 'name',
        typeaheadjs: {
            name: 'cities',
            displayKey: 'name',
            source: cities.ttAdapter()
        }
    });

    $('.tag_places').on('itemAdded itemRemoved', function (event) {
        $scope.sparams.type = $('.tag_places').val();
    });

    $scope.setDesType = function (destination) {
        el =  $('.tag_places');
        $http.get("/api/destination-types")
       .success(function (data, status, headers, config) {
           $scope.desttypes = data;           
           angular.forEach($scope.desttypes, function (value, key) {              
               if (destination.indexOf(value.name) >= 0) {
                   el.tagsinput('add', value);
                   //console.log(value);
               }
           });
       })
       .error(function (error, status, headers, config) {
           console.log(status);
           console.log("Error occured");
       });
    };

    des_type = ($scope.sparams.type).split(',');
    $scope.setDesType(des_type);

    angular.forEach(des_type, function (value, key) {
        getPlaceUrl = "/api/destination-types/" + value + "/airport";
        $scope.fetchCities(getPlaceUrl, false);
        if (key == des_type.length - 1) {
            $scope.loader('hide');

        }
    });
 
});

app.controller('ctrlSearchResults', function ($scope, $log, $http) {

    $scope.lstCount = 9;
    
    var sQuery = (window.location.pathname).split("/");
    airportCode = (((decodeURIComponent(sQuery[7])).replace('(', '[')).replace(')', ']')).match(/\[(.*)\]/).pop();
    
    if (sQuery[13] != '0') {
        setFilters = sQuery[13].split(',');
        $scope.searchfilters.time.leaving.takeoff.timeslot[0] = (setFilters[0] == 50) ? '0050' : setFilters[0];
        $scope.searchfilters.time.leaving.takeoff.timeslot[1] = setFilters[1];
        $scope.searchfilters.price[1] = setFilters[2];
        $scope.searchfilters.stops = setFilters[3];
        $scope.searchfilters.duration[1] = setFilters[4];
    }

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
		home_airport = $scope.sparams.origin;

		filters = '/filters/' + $scope.searchfilters.time.leaving.takeoff.timeslot[0] + '';
		filters += ',' + $scope.searchfilters.time.leaving.takeoff.timeslot[1] + '';
		filters += ',' + $scope.searchfilters.price[1];
		filters += ',' + $scope.searchfilters.stops;
		filters += ',' + $scope.searchfilters.duration[1];
		
		url = "/flight-results/leaving/" + leavingdt + "/returning/" + returningdt + "/origin/" + home_airport + "/destination/" + destination + "/type/" + destination_type + "/destid/" + dest_id + filters;
		window.location = url;
	}

	//getPlaceUrl = "/api/destination-types/" + $scope.sparams.type + "/airport";

	$scope.loader('show');

	des_type = ($scope.sparams.type).split(',');
	 
	angular.forEach(des_type, function (value, key) {
	    getPlaceUrl = "/api/destination-types/" + value + "/airport";
	    $scope.fetchCities( getPlaceUrl, true );
	    if (key == des_type.length - 1) {
	        $scope.loader('hide');
	    }
	});

	//$scope.fetchCities(getPlaceUrl);

    testctr = 0;
 
 
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
    $scope.carriers = [];
  
    var sQuery = (window.location.pathname).split("/");
    
    setFilters = sQuery[15].split(',');
    $scope.searchfilters.time.leaving.takeoff.timeslot[0] = (setFilters[0] == 50) ? '0050' : setFilters[0];
    $scope.searchfilters.time.leaving.takeoff.timeslot[1] = setFilters[1];
    $scope.searchfilters.price[1] = setFilters[2];
    $scope.searchfilters.stops = setFilters[3];
    $scope.searchfilters.duration[1] = setFilters[4];
    
    airportCode = (((decodeURIComponent(sQuery[7])).replace('(', '[')).replace(')', ']')).match(/\[(.*)\]/).pop();
    dest_code = (((decodeURIComponent(sQuery[9])).replace('(', '[')).replace(')', ']')).match(/\[(.*)\]/).pop();

    dt = new Date(sQuery[3].replace(/-/g, '/'));
    leavingdt = $scope.daysInWeek[dt.getDay()] + ", " + $scope.months[dt.getMonth()] + " " + dt.getDate() + ", " + dt.getFullYear();

    dt = new Date(sQuery[5].replace(/-/g, '/'));
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

    //$scope.FlightRequest.request.slice[0]["maxStops"] = 1;
   // console.log(JSON.stringify($scope.searchfilters));
    //return;
    if ( $scope.searchfilters.stops != 'any')
        $scope.FlightRequest.request.slice[0]["maxStops"] = $scope.searchfilters.stops;
    
    //$scope.searchfilters.price[1] = 1000;
    if ($scope.searchfilters.price[1] < 2000)
        $scope.FlightRequest.request["maxPrice"] = 'USD' + $scope.searchfilters.price[1];
    
    //$scope.searchfilters.duration[1] = 20
    if ($scope.searchfilters.duration[1] < 48)
        $scope.FlightRequest.request.slice[0]["maxConnectionDuration"] = $scope.searchfilters.duration[1];

    //$scope.searchfilters.time.leaving.takeoff.timeslot[1] = 2200;
    if (parseInt($scope.searchfilters.time.leaving.takeoff.timeslot[0]) > 50 || parseInt($scope.searchfilters.time.leaving.takeoff.timeslot[1]) < 2400) {
        eTime = $scope.searchfilters.time.leaving.takeoff.timeslot[0] + '';
        lTime = $scope.searchfilters.time.leaving.takeoff.timeslot[1] + '';

        earliest = eTime.substr(0, 2) + ":" + eTime.substr(2, 2);
        latest = lTime.substr(0, 2) + ":" + lTime.substr(2, 2);

        $scope.FlightRequest.request.slice[0]["permittedDepartureTime"] = { "earliestTime": earliest, 'latestTime': latest };
        console.log(JSON.stringify($scope.FlightRequest.request.slice[0].permittedDepartureTime));
    }
    
    //console.log(JSON.stringify($scope.FlightRequest));
      
	//getPlaceUrl = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyAdy8-J5mKe_j3q3IBpqTOTwwQf_nuoyoE";
    //getPlaceUrl = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyCqYVW7pZrz9kMEAbfxXJNmMRCcAyoAcY4";
    getPlaceUrl = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyCMCG3JaUmNbKhKHFdZ4bUNu2SopqA_MqY"

    $scope.loader('show');
    
    $http.post(getPlaceUrl, $scope.FlightRequest).success(function (response) {
        $scope.checkCarrier = function (code) {
            //return $scope.carriers;
            carrier_name = '';
            angular.forEach($scope.carriers, function (value, key) {
                if (value.code == code) {
                    carrier_name = value.name;
                }
            });
            return carrier_name;
        }
   
    tempResults = '';
    //$.get('/flight-result.json', function (response) {
        var currChar = "$";
        var ctr = 0;
        //console.log(JSON.stringify(response.trips.tripOption));
         
        if (!response.hasOwnProperty("trips") ) {
            $scope.loader('hide');
            $('.no-results').show();
            $('.load-more').hide();
            return;
        } else if (!response.trips.hasOwnProperty("tripOption")) {
            $scope.loader('hide');
            $('.no-results').show();
            $('.load-more').hide();
            return;
        }

        $scope.carriers = response.trips.data.carrier;
        //console.log('carriers: ' + JSON.stringify(carriers));
         
        $.each( response.trips.tripOption, function (index, value) {
            var price, timings;
            ctr++;

            price = currChar + (value.saleTotal).match(/[\d\.]+/g)[0];
             
            var departureTime = "";
            var arrivalTime = "";

            var flightRoute = [];

            var stops = 0;

            //var flight_pricing = value.pricing;
            //console.log("carrier: " + flight_pricing[0].fare);
            

            $.each(value.slice, function (index, value) {
                //console.log(value.segment);
                stops = value.segment.length;
                duration = $scope.convertTime(value.duration.toString());

                $.each(value.segment, function (sindex, svalue) {

                    //console.log(svalue.flight.carrier)
                    var getCarrier = $scope.checkCarrier(svalue.flight.carrier);
                    //console.log(getCarrier);
                    //console.log(svalue.leg[0].departureTime);
                    departuredt = new Date(svalue.leg[0].departureTime);
                    //console.log(departuredt);
                    //console.log('-----')
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
                    
                    departure_date_time = $scope.daysInWeek[departuredt.getDay()] + ", " + $scope.months[departuredt.getMonth() + 1] + " " + departuredt.getDate() + " at " + hrs + ":" + mins + ampm;
                    //console.log(departure_date_time);
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
                    //airline = getCarrier;

                    flightRoute.push({
                        arrival: svalue.leg[0].arrivalTime,
                        departure: svalue.leg[0].departureTime,
                        departTime: departure_date_time,
                        timings: departuretime + "-" + arrivaltime,
                        duration: (sindex == 0) ? duration : '',
                        airline: getCarrier,
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
                bookUrl: 'http://domestic-air-tickets.expedia.co.in/flights/results?from=' + $scope.sparams.origincode + '&to=' + $scope.sparams.dest_code + '&depart_date=' + $scope.expediaDate($scope.sparams.leaving) + '&return_date=' + $scope.expediaDate($scope.sparams.leaving) + '&adults=1&childs=0&infants=0&dep_time=0&class=Economy&airline=&carrier=&x=57&y=16&intl=y',
                //bookUrl: 'http://domestic-air-tickets.expedia.co.in/flights/results?from=ALB&to=LCY&depart_date=28/05/2016&return_date=30/06/2016&adults=1&childs=0&infants=0&dep_time=0&class=Economy&airline=&carrier=&x=57&y=16&intl=y',
                flights: {}
            }
            flights.flights = flightRoute;
 
            $scope.flights.push(flights);
          //  console.log( ">> " + JSON.stringify($scope.flights) );
        });
   
        $scope.loader('hide');
       // $(".tag_places").tagsinput();
        //$(".tag_places").on('change', function () {
       //     $scope.sparams.type = $(this).val();
      //  })
       
    });


	

	$scope.addFlight = function (fare, airline, departure) {
	    var setfav = '';
	    var destination_id = $scope.sparams.dest_id;
	    //console.log('destination_id:' + destination_id);
	     
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
                        "fare": findPlace.fare,
                        "updated_at": Date(),
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
	    mixpanel.track("Flight Added to Card");
	}

	$(document).on('click', '.btn-booking', function () {
	    mixpanel.track("Book Flight Click");
	});
    
});

app.controller('ctrlSharedDestinations', function ($scope, $http, $resource) {
    $scope.pagetitle = "Shared Dashboard";
    //visitor_id = '5710b39dbe0d7';
    var sQuery = (window.location.pathname).split("/");
    visitor_id = sQuery[2];
     
    $http.get("/api/cards?visitor_id=" + visitor_id).success(function (response) {
        $scope.favorites = response;
    });
});


// all other functions

// This should work in node.js and other ES5 compliant implementations.
function isEmptyObject(obj) {
    return !Object.keys(obj).length;
}

// This should work both there and elsewhere.
function isEmptyObject(obj) {
    for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            return false;
        }
    }
    return true;
}