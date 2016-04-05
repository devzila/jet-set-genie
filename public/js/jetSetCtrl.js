
resturl = "http://jetsetgenie.devzila.com/api/destination-types/beach/airport"; 

var getairports = $.ajax({
    url: resturl,
    dataType: 'jsonp',
    jsonp:false,
    success: function (data) {
        alert(data);
    }
});

alert(getairports);

app.controller('jetSetGenie', function ($scope) {
    $scope.desttypes = [{ "id": 1, "name": "Beach", "created_at": "2016-04-05 13:01:22", "updated_at": "2016-03-30 13:15:00", "icon": "fa-anchor", "slug": "beach" }, { "id": 2, "name": "Mountains", "created_at": "2016-04-05 13:01:22", "updated_at": "2016-03-30 13:15:00", "icon": "fa-tree", "slug": "mountains" }, { "id": 3, "name": "Europe", "created_at": "2016-04-05 13:01:22", "updated_at": "2016-03-30 13:15:21", "icon": "fa-bicycle", "slug": "europe" }, { "id": 4, "name": "Latin America", "created_at": "2016-04-05 13:01:22", "updated_at": "2016-03-30 13:15:21", "icon": "fa-futbol-o", "slug": "latin-america" }, { "id": 5, "name": "Surprise Me", "created_at": "2016-04-05 13:01:22", "updated_at": "-0001-11-30 00:00:00", "icon": "fa-star", "slug": "surprise-me" }];
    
});

app.controller('ctrlFavorites', function($scope, $http){	 
	$scope.favorites = [
	{
			placeName:"Puerto Vallarta",
			shortestFlight:"6hrs 23 mins",
			cheapestFlight: "$509",
			color: "#33cccc",
			flights: [
				{
					price:"$509",
					name:"American",
					departDate:"Sat, Feb 29 6:55PM"
				},
				{
					price:"$499",
					name:"United",
					departDate:"Sat, Feb 29 3:14PM"
				},
			]
		},
		{
			placeName:"Los Angeles",
			shortestFlight:"6hrs 23 mins",
			cheapestFlight: "$509",
			color: "#ffc000",
			flights: [
				{
					price:"$377",
					name:"LAN",
					departDate:"Sun, Mar 1 4:32PM"
				},
			]
		},
		{
			placeName:"Majorca",
			shortestFlight:"6hrs 23 mins",
			cheapestFlight: "$509",
			color: "#7f7f7f",
			flights: []
		},
		{
			placeName:"Malibu",
			shortestFlight:"5hrs 21 mins",
			cheapestFlight: "$399",
			color: "#028c90",
			flights: [
				{
					price:"$509",
					name:"American",
					departDate:"Sat, Feb 29 6:55PM"
				},
				{
					price:"$499",
					name:"United",
					departDate:"Sat, Feb 29 3:14PM"
				},
			]
		},
		{
			placeName:"Puerto Vallarta",
			shortestFlight:"6hrs 23 mins",
			cheapestFlight: "$509",
			color: "#2FD280",
			flights: [
				{
					price:"$509",
					name:"American",
					departDate:"Sat, Feb 29 6:55PM"
				},
				{
					price:"$499",
					name:"United",
					departDate:"Sat, Feb 29 3:14PM"
				},
			]
		} 
	];
	
	$scope.setfavorite = function( index ){
		var con = window.confirm('Are you sure you want to remove this from favorite');
		if(con)
		$scope.favorites.splice(index, 1);
	};
	
	$scope.deleteflight = function( parentindex, index ){
		$scope.favorites[parentindex].flights.splice(index, 1);
		favoriteMsnry.masonry('reloadItems');
	};
});

app.controller('ctrlSearchResults', function($scope, $http){	
	
	$scope.sparams = {
		leaving: sParams.leaving,
		returning: sParams.returning,
		origin: sParams.origin,
		origincode: sParams.origincode,
		type: sParams.type
	};	 
	 
	$scope.setfilters = { trip_type: $scope.sparams.type };
	
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
	
	$scope.records = [
	  {
		display_name: "Miami",
		city_name: "Miami, FL",
		airport_code: "MIA",
		city_image: "",
		trip_type: "Beach",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#33cccc",
		isFavorite: true,
	  },
	  {
		display_name: "Siesta Beach",
		city_name: "Tampa, FL",
		airport_code: "TPA",
		city_image: "",
		trip_type: "Beach",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#ffc000"
	  },
	  {
		display_name: "Los Angeles",
		city_name: "Los Angeles, CA",
		airport_code: "LAX",
		city_image: "",
		trip_type: "Beach",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#7f7f7f",
		isFavorite: true,
	  },
	  {
		display_name: "San Diego",
		city_name: "San Diego, CA",
		airport_code: "SAN",
		city_image: "",
		trip_type: "Beach",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#028c90",
		isFavorite: false,
	  },
	  {
		display_name: "Santa Barbara",
		city_name: "Santa Barbara, CA",
		airport_code: "SBA",
		city_image: "",
		trip_type: "Beach",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#2FD280",
		isFavorite: false,
	  },
	  {
		display_name: "Cabo San Lucas",
		city_name: "Cabo San Lucas, Mexico",
		airport_code: "SJD",
		city_image: "",
		trip_type: "Beach",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#33cccc",
		isFavorite: false,
	  },
	  {
		display_name: "Acapulco",
		city_name: "Acapulco, Mexico",
		airport_code: "ACA",
		city_image: "",
		trip_type: "Beach",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#ffc000",
		isFavorite: false,
	  },
	  {
		display_name: "Puerto Vallarta",
		city_name: "Puerto Vallarta, Mexico",
		airport_code: "PVR",
		city_image: "",
		trip_type: "Beach",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#7f7f7f",
		isFavorite: false,
	  },
	  {
		display_name: "Tulum",
		city_name: "Tulum, Mexico",
		airport_code: "CZM",
		city_image: "",
		trip_type: "Beach",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#028c90",
		isFavorite: false,
	  },
	  {
		display_name: "Nassau",
		city_name: "Nassau, Bahamas",
		airport_code: "PID",
		city_image: "",
		trip_type: "Beach",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#2FD280",
		isFavorite: false,
	  },
	  {
		display_name: "Grand Cayman",
		city_name: "Grand Cayman Islands",
		airport_code: "GCM",
		city_image: "",
		trip_type: "Beach",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#33cccc",
		isFavorite: false,
	  },
	  {
		display_name: "Key West",
		city_name: "Key West, FL",
		airport_code: "EYW",
		city_image: "",
		trip_type: "Beach",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#7f7f7f",
		isFavorite: false,
	  },
	  {
		display_name: "St. Thomas",
		city_name: "St. Thomas, US Virgin Islands",
		airport_code: "STT",
		city_image: "",
		trip_type: "Beach",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#2FD280",
		isFavorite: false,
	  },
	  {
		display_name: "St. Croix",
		city_name: "St. Croix, US Virgin Islands",
		airport_code: "STX",
		city_image: "",
		trip_type: "Beach",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#33cccc",
		isFavorite: false,
	  },
	  {
		display_name: "Puerto Rico",
		city_name: "San Juan, Puerto Rico",
		airport_code: "SJU",
		city_image: "",
		trip_type: "Beach",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#028c90",
		isFavorite: false,
	  },
	  {
		display_name: "Jamaica",
		city_name: "Montego Bay, Jamaica",
		airport_code: "MBJ",
		city_image: "",
		trip_type: "Beach",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#33cccc",
		isFavorite: false,
	  },
	  {
		display_name: "Dominican Republic",
		city_name: "Punta Cana, Dominican Republic",
		airport_code: "PUJ",
		city_image: "",
		trip_type: "Beach",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#ffc000",
		isFavorite: false,
	  },
	  {
		display_name: "Jackson Hole",
		city_name: "Jackson Hole, Wyoming",
		airport_code: "JAC",
		city_image: "",
		trip_type: "Mountain",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#2FD280",
		isFavorite: false,
	  },
	  {
		display_name: "Beaver Creek",
		city_name: "Beaver Creek, CO",
		airport_code: "EGE",
		city_image: "",
		trip_type: "Mountain",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#028c90",
		isFavorite: false,
	  },
	  {
		display_name: "Vail",
		city_name: "Vail, CO",
		airport_code: "EGE",
		city_image: "",
		trip_type: "Mountain",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#ffc000",
		isFavorite: false,
	  },
	  {
		display_name: "Mammoth",
		city_name: "Mammoth Mountain, CO",
		airport_code: "MMH",
		city_image: "",
		trip_type: "Mountain",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#7f7f7f",
		isFavorite: false,
	  },
	  {
		display_name: "Steamboat Springs",
		city_name: "Steamboat Springs, CO",
		airport_code: "HDN",
		city_image: "",
		trip_type: "Mountain",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#33cccc",
		isFavorite: false,
	  },
	  {
		display_name: "Aspen",
		city_name: "Aspen, CO",
		airport_code: "ASE",
		city_image: "",
		trip_type: "Mountain",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#ffc000",
		isFavorite: false,
	  },
	  {
		display_name: "Deer Valley",
		city_name: "Deer Valley, UT",
		airport_code: "SLC",
		city_image: "",
		trip_type: "Mountain",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#028c90",
		isFavorite: false,
	  },
	  {
		display_name: "Breckenridge",
		city_name: "Breckenridge, CO",
		airport_code: "DEN",
		city_image: "",
		trip_type: "Mountain",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#33cccc",
		isFavorite: false,
	  },
	  {
		display_name: "Alta",
		city_name: "Alta, UT",
		airport_code: "SLC",
		city_image: "",
		trip_type: "Mountain",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#028c90",
		isFavorite: false,
	  },
	  {
		display_name: "Whistler",
		city_name: "Whistler Blackcomb, Canada",
		airport_code: "YVR",
		city_image: "",
		trip_type: "Mountain",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#2FD280",
		isFavorite: false,
	  },
	  {
		display_name: "Snowbird",
		city_name: "Snowbird, UT",
		airport_code: "SLC",
		city_image: "",
		trip_type: "Mountain",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#028c90",
		isFavorite: false,
	  },
	  {
		display_name: "Telluride",
		city_name: "Telluride, CO",
		airport_code: "TEX",
		city_image: "",
		trip_type: "Mountain",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#7f7f7f",
		isFavorite: false,
	  },
	  {
		display_name: "Paris",
		city_name: "Paris, France",
		airport_code: "CDG",
		city_image: "",
		trip_type: "Europe",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#ffc000",
		isFavorite: false,
	  },
	  {
		display_name: "London",
		city_name: "London, England",
		airport_code: "CDG",
		city_image: "",
		trip_type: "Europe",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#33cccc",
		isFavorite: false,
	  },
	  {
		display_name: "Istanbul",
		city_name: "Istanbul, Turkey",
		airport_code: "IST",
		city_image: "",
		trip_type: "Europe",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#2FD280",
		isFavorite: false,
	  },
	  {
		display_name: "Barcelona",
		city_name: "Barcelona, Spain",
		airport_code: "BCN",
		city_image: "",
		trip_type: "Europe",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#028c90",
		isFavorite: false,
	  },
	  {
		display_name: "Madrid",
		city_name: "Madrid, Spain",
		airport_code: "MAD",
		city_image: "",
		trip_type: "Europe",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#ffc000",
		isFavorite: false,
	  },
	  {
		display_name: "Lisbon",
		city_name: "Lisbon, Portugal",
		airport_code: "LIS",
		city_image: "",
		trip_type: "Europe",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#7f7f7f",
		isFavorite: false,
	  },
	  {
		display_name: "Copenhagen",
		city_name: "Copenhagen, Denmark",
		airport_code: "CPH",
		city_image: "",
		trip_type: "Europe",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#33cccc",
		isFavorite: false,
	  },
	  {
		display_name: "Stockholm",
		city_name: "Stockholm, Sweden",
		airport_code: "ARN",
		city_image: "",
		trip_type: "Europe",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#ffc000",
		isFavorite: false,
	  },
	  {
		display_name: "Rome",
		city_name: "Rome, Italy",
		airport_code: "ROM",
		city_image: "",
		trip_type: "Europe",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#33cccc",
		isFavorite: false,
	  },
	  {
		display_name: "Venice",
		city_name: "Venice, Italy",
		airport_code: "VCE",
		city_image: "",
		trip_type: "Europe",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#7f7f7f",
		isFavorite: false,
	  },
	  {
		display_name: "Athens",
		city_name: "Athens, Greece",
		airport_code: "ATH",
		city_image: "",
		trip_type: "Europe",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#2FD280",
		isFavorite: false,
	  },
	  {
		display_name: "Nice",
		city_name: "Nice, France",
		airport_code: "NCE",
		city_image: "",
		trip_type: "Europe",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#7f7f7f",
		isFavorite: false,
	  },
	  {
		display_name: "Prague",
		city_name: "Prague, Czech Republic",
		airport_code: "PRG",
		city_image: "",
		trip_type: "Europe",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#ffc000",
		isFavorite: false,
	  },
	  {
		display_name: "Budapest",
		city_name: "Budapest, Hungary",
		airport_code: "BUD",
		city_image: "",
		trip_type: "Europe",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#33cccc",
		isFavorite: false,
	  },
	  {
		display_name: "Amsterdam",
		city_name: "Amsterdam, Netherlands",
		airport_code: "AMS",
		city_image: "",
		trip_type: "Europe",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#2FD280",
		isFavorite: false,
	  },
	  {
		display_name: "Berlin",
		city_name: "Berlin, Germany",
		airport_code: "SXF",
		city_image: "",
		trip_type: "Europe",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#028c90",
		isFavorite: false,
	  },
	  {
		display_name: "Edinburgh",
		city_name: "Edinburgh, Scotland",
		airport_code: "EDI",
		city_image: "",
		trip_type: "Europe",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#33cccc",
		isFavorite: false,
	  },
	  {
		display_name: "Santorini",
		city_name: "Santorini, Greece",
		airport_code: "JTR",
		city_image: "",
		trip_type: "Europe",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#ffc000",
		isFavorite: false,
	  },
	  {
		display_name: "Santorini",
		city_name: "Santorini, Greece",
		airport_code: "",
		city_image: "JTR",
		trip_type: "Beach",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#028c90",
		isFavorite: false,
	  },
	  {
		display_name: "Vienna",
		city_name: "Vienna, Austria",
		airport_code: "VIE",
		city_image: "",
		trip_type: "Europe",
		shortest_flight: "6hrs 23 mins",
		cheapest_flight: "$509",
		color: "#7f7f7f",
		isFavorite: false,
	  }
	];

});

app.controller('ctrlFlightResults', function($scope, $http){
	$scope.sparams = {
		leaving: sParams.leaving,
		returning: sParams.returning,
		origin: sParams.origin,
		origincode: sParams.origincode,
		destination: sParams.destination,
		dest_code: sParams.dest_code,
		type: sParams.type
	};
	
	$scope.favorites = [
	{
			placeName:"Puerto Vallarta",
			shortestFlight:"6hrs 23 mins",
			cheapestFlight: "$509",
			flights: [
				{
					price:"$509",
					name:"American",
					departDate:"Sat, Feb 29 6:55PM"
				},
				{
					price:"$499",
					name:"United",
					departDate:"Sat, Feb 29 3:14PM"
				},
			]
		},
		{
			placeName:"Los Angeles",
			shortestFlight:"6hrs 23 mins",
			cheapestFlight: "$509",
			flights: [
				{
					price:"$377",
					name:"LAN",
					departDate:"Sun, Mar 1 4:32PM"
				},
			]
		}		 
	];
	
	$scope.flights = [
		{
			price: '$509',
			tripType: 'round trip',
			timings: '6:55 pm - 10:45 pm',
			airline: 'American-Alaska',
			airlineLogo: '/assets/flight-dummy.png',
			duration: '6:50m',
			type: 'Nonstop',
			bookUrl: 'http://www.expedia.com'
		},
		{
			price: '$509',
			tripType: 'round trip',
			timings: '6:55 pm - 10:45 pm',
			airline: 'American-Alaska',
			airlineLogo: '/assets/flight-dummy.png',
			duration: '6:50m',
			type: 'Nonstop',
			bookUrl: 'http://www.expedia.com'
		},
		{
			price: '$509',
			tripType: 'round trip',
			timings: '6:55 pm - 10:45 pm',
			airline: 'American-Alaska',
			airlineLogo: '/assets/flight-dummy.png',
			duration: '6:50m',
			type: 'Nonstop',
			bookUrl: 'http://www.expedia.com'
		}
	]
	
	$scope.deleteflight = function( parentindex, index ){
		$scope.favorites[parentindex].flights.splice(index, 1);
	};
	
	$scope.setfavorite = function( index ){
		var con = window.confirm('Are you sure you want to remove this from favorite');
		if(con)
		$scope.favorites.splice(index, 1);
	};
});

