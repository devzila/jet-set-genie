var app = angular.module("jetSetGenie", ['ngRoute', 'ngResource']).run(function ($rootScope) {
	$rootScope.place_bg_colors = [
	 "#33cccc",
	 "#ffc000",
	 "#7f7f7f",
	 "#028c90",
	 "#2FD280"  
	];
	
	
})

/*.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/search-results/leaving/:leaving/returning/:returning/origin/:origin/type/:type/destination/:destination}', {
        templateUrl: 'Partials/search-results.html',
        controller: 'ctrlFlightResults'
      }).
      otherwise({
        redirectTo: '/'
      });
}]); 
*/