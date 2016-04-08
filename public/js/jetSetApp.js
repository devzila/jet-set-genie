var app = angular.module("jetSetGenie", ['ngRoute', 'ngResource']).run(function ($rootScope) {
	$rootScope.place_bg_colors = [
	 "#33cccc",
	 "#ffc000",
	 "#7f7f7f",
	 "#028c90",
	 "#2FD280",  
	];
	
	$rootScope.randomcolor = function () {
	    return $rootScope.place_bg_colors[Math.floor(Math.random() * $rootScope.place_bg_colors.length)];
	}
	
}).filter('getById', function () {
    return function (input, id) {
        var i = 0, len = input.length;
        for (; i < len; i++) {
            if (+input[i].id == +id) {
                return input[i];
            }
        }
        return null;
    }
});
