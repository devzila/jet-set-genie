var app = angular.module("jetSetGenie", ['ngRoute', 'ngResource', 'ngSanitize', 'ui.slider']).run(function ($rootScope) {
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
})
 

app.filter('getById', function () {
    return function (input, id) {
        var i = 0, len = input.length;
        for (; i < len; i++) {
            if (+input[i].id == +id) {
                return input[i];
            }
        }
        return null;
    }
})

app.filter('myDateFilter', function () {
    return function (value, scope, dt) {
        var date = new Date(dt);
        var ampm = 'am';
        var time = '';
        var split = 1;
        var hrs = '';
        var timeValue = value[0];
        var to = '';

        var timetxt = timeValue.toString();
        var timetxt = timeValue.toString();
        var mins = timetxt.substr(timetxt.length - 2);

        if (parseInt(timeValue) == 50) {
            hrs = "12"
        } else if (parseInt(timeValue) < 1000) {
            hrs = timetxt.substr(0, 1);
        } else {
            
            hrs = timetxt.substr(0, 2);
        }

        if (parseInt(timeValue) > 50){
            if (hrs == 12)
                ampm = 'pm'

            if (hrs > 12)
            {
                ampm = 'pm'
                hrs = parseInt(hrs) - 12;
            }
        }

        time = hrs + ":" + ((mins == 50) ? '30' : '00');

        timeValue = value[1];

        // to value
        var timetxt = timeValue.toString();
        var timetxt = timeValue.toString();
        var mins = timetxt.substr(timetxt.length - 2);

        if (parseInt(timeValue) == 50) {
            hrs = "12"
        } else if (parseInt(timeValue) < 1000) {
            hrs = timetxt.substr(0, 1);
        } else {

            hrs = timetxt.substr(0, 2);
        }

        if (parseInt(timeValue) > 50) {
            if (hrs == 12)
                ampm = 'pm'

            if (hrs > 12) {
                ampm = 'pm'
                hrs = parseInt(hrs) - 12;
            }
        }

        to = hrs + ":" + ((mins == 50) ? '30' : '00');

        dayIndex = (timeValue == 2400) ? date.getDay() + 1 : date.getDay();
        ampm = (timeValue == 2400) ? "am" : "pm";

        return scope.daysInWeek[date.getDay()] + " " + time + ampm + ' - ' + scope.daysInWeek[dayIndex] + " " + to + ampm;
    };
});