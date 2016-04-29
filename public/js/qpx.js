function getFlight(origin, destination, leaving, priceContainer, durationContainer){
    var url = "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyBJvpzl_XUZnc_9-1kz8CnCPfQdfF3DMls";
    var request = {
        "request": {
            "passengers": {
                "adultCount": 1
            },
            "slice": [
                {
                    "origin": origin,
                    "destination": destination,
                    "date": leaving
                }
            ]
        }
    };

    $.ajax({
        type: "POST",
        url: url,
        data: JSON.stringify(request),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data){
            console.log(data);
            priceContainer.html(data.trips.tripOption[0].saleTotal);
            if(data.trips.tripOption[0].slice[0].duration){
                minutes = data.trips.tripOption[0].slice[0].duration
                hr = parseInt(minutes / 60);
                minutes = minutes % 60;

                durationContainer.html(hr + " hr " + minutes + " min");
            }

        },
        failure: function(errMsg) {
            alert(errMsg);
        }
    });


}