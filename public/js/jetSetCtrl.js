app.controller('jetSetGenie', function($scope) {
	 
});

app.controller('ctrlFavorites', function($scope, $http){	 
	 $scope.place_bg_colors = [
		 "#33cccc",
		 "#ffc000",
		 "#7f7f7f",
		 "#028c90",
		 "#2FD280"  
	];
	 
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
	},
	{
		placeName:"Majorca",
		shortestFlight:"6hrs 23 mins",
		cheapestFlight: "$509",
		flights: []
	},
	{
		placeName:"Malibu",
		shortestFlight:"5hrs 21 mins",
		cheapestFlight: "$399",
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
	},
	{
		placeName:"Majorca",
		shortestFlight:"6hrs 23 mins",
		cheapestFlight: "$509",
		flights: []
	},
	{
		placeName:"Malibu",
		shortestFlight:"5hrs 21 mins",
		cheapestFlight: "$399",
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
]
	
	$scope.setFavorite = function(){
		window.console.log(this);
	};
	 
});