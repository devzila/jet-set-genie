app.controller('jetSetGenie', function($scope) {
	
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

app.controller('ctrlFlightResults', function($scope, $http){	 
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