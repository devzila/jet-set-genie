var app = angular.module("jetSetGenie", ['ngRoute', 'ngResource']).run(function ($rootScope) {
	$rootScope.place_bg_colors = [
	 "#33cccc",
	 "#ffc000",
	 "#7f7f7f",
	 "#028c90",
	 "#2FD280"  
	];
	$rootScope.searchopts = [{
		fromlocation: 'Bahamas',
		tripchoice: 'Beach', 
		leaving: '03/30/16',
		returning: '03/25/16',
		filters: [{}]
	}] 
});
 