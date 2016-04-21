@extends("layouts.master")


@section('jsg-page-title')
<title>JetSetGenie | WHEN CAN YOU GO?</title>
@stop

@section('content')
<form id="jetform" class="jetform" method="POST">
    <section id="jsg-content">
        <section class="jsg-banner wow fadeIn animated ">
            <div class="container">
                <div class="row row-centered main">
                    <div id="slider">
                        <div class="slider-step1 step-1">
                            <div class="steps col-lg-6 col-md-7 col-sm-9 col-xs-12 col-centered">
                                <h2>WHEN CAN YOU GO?</h2>

                                <div class="home-airport-form">
                                    <div class="row">
                                        <div class="col-lg-10 col-sm-10">
                                            <div class="form-group form-inline">
                                                <label class="control-label">LEAVING</label>
                                                <input class="form-control leaving datepicker" type="text" name="leaving_date" id="leavingdate" value="" placeholder="MM-DD-YY" required />
                                                <label class="control-label">RETURNING</label>
                                                <input class="form-control returning datepicker" type="text" id="returningdate" name="returning_date" value="" placeholder="MM-DD-YY" required />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-lg-12 col-sm-12">
                                            <div class="form-group form-inline">
                                                <label class="control-label ">From&nbsp;&nbsp;&nbsp;&nbsp;</label>
                                                <input class="form-control home-airport" id="homeairport" placeholder="Hometown or Airport Code" type="text" name="home_airport" value="" required />
                                                <!--<button class="jet-set-submit" type="submit" value="jetset">JetSet!</button>-->
                                                <button class="btn btn-default jsg-submit" id="jetbutton" type="button" data-ng-click="setDates()">JETSET!</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="slider-step2 step-2" style="display:none;">
                            <a href="javascript://" class="step-back"></a>
                            <div class="steps col-lg-9 col-md-10 col-sm-12 col-xs-12 col-centered">
                                <h2>HAVE A DESTINATION IN MIND?</h2>

                                <div class="blocks text-center destinations">
                                    <a href="" data-ng-repeat="desttype in desttypes" data-ng-click="getResults( desttype.name )">
                                        <label>
                                            <i class="fa @{{ desttype.icon }} wow fadeIn animated"></i>
                                            <h5 class="wow fadeIn animated">@{{ desttype.name }}</h5>
                                            <input class="destination" type="radio" name="destination_type" value="@{{ desttype.slug }}">
                                        </label>
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div class="slider-step3 step-3" slider-step4 style="display:none;">
                            <div class="steps col-lg-12 col-md-12 col-sm-12 col-xs-12 col-centered">
                                <div class="finding-options">
                                    <h3 class="lobster-font">JetSetGenie</h3>
                                    <div class="option-gif"><i class="fa fa-spinner fa-pulse fa-3x"></i> </div>
                                    <h2>FINDING ALL YOUR OPTIONS...</h2>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="inner-content">
            <div class="container">
                <div class="row row-centered">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                        <h3 class="lobster-font wow animated fadeIn">How Does Jet<span class="light">Set</span>Genie Work?</h3>
                    </div>
                    <div class="col-md-12 modal-video">
                        <a href="#" data-toggle="modal" data-target="#video"><i class="fa fa-play-circle fa-3x" aria-hidden="true"></i><br /> Watch Video</a>
                        <div id="video" class="modal fade">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>                                                                             
                                    </div>
                                    <div class="modal-body" id="jetform1">
                                        <iframe width="800" height="450" style="max-width:100%;" src="https://www.youtube.com/embed/fIAnCMf5an4" frameborder="0" allowfullscreen></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 jsg-work">
                        <img src="{{ asset('assets/iconmonstr-calendar-4-240.png') }}" alt="" class="wow fadeIn animated" />
                        <h4 class="wow fadeIn animated">
                            You tell us when.<br />
                            we'll tell you where
                        </h4>
                        <p class="wow fadeIn animated">Search all available destinations based on your schedule.</p>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 jsg-work">
                        <img src="{{ asset('assets/iconmonstr-share-2-240.png') }}" alt="" class="wow fadeIn animated" />
                        <h4 class="wow fadeIn animated">
                            Share options with<br />
                            Your travel buddies
                        </h4>
                        <p class="wow fadeIn animated">Easily share one link that shows all your alternatives so that you can compare.</p>
                    </div>
                    <div class="col-lg-4 col-md-4 col-sm-4 col-xs-12 jsg-work">
                        <img src="{{ asset('assets/iconmonstr-paper-plane-2-240.png') }}" alt="" class="wow fadeIn animated" />
                        <h4 class="wow fadeIn animated">Jetset</h4>
                        <p class="wow fadeIn animated">Book your travel with one click and rest assured that you got the best deal.</p>
                    </div>
                </div>
            </div>
        </section>
    </section>
    <section class="step-4">
        <div id="myModal" class="modal fade">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <!--<button type="button" class="close" data-dismiss="modal">&times;</button>-->
                        <h2 class="lobster-font modal-title" align="center">Jet<span class="light">Set</span>Genie is still in Beta</h2>
                        <p align="center">We'll email you your search results</p>
                    </div>
                    <div class="modal-body" id="jetform1">
                        <div class="jetform1">
                            <div class="form-group">
                                <input type="text" class="form-control" name="name" id="name" placeholder="NAME" required />
                            </div>
                            <div class="form-group">
                                <input type="email" name="email" class="form-control" id="email" placeholder="EMAIL" required />
                            </div>
                            <div class="action-btn">
                                <button type="button" id="jetbutton1" class="btn btn-default jsg-submit">Go</button>
                            </div>
                        </div>
                        <div class="alert email-alert-error alert-error text-center" style="display:none">The request to send email failed. Please try again.</p></div>
                        <div class="alert email-alert alert-success text-center" style="display:none"><h3>Thank you for your Request</h3><p>We'll get back to you as soon as possible.</p></div>

                    </div>

                    <div class="modal-body" align="center" ;>
                        <p>JetSetGenie will never spam you or<br> share your contact information</p>
                    </div>
                </div>

            </div>
        </div>
    </section>
    <input type="hidden" name="ip" />
    <input type="hidden" name="browser" />
</form>
@stop

@section('additional-scripts')
<script src="{{asset('js/scripts.js') }}"></script>
<script type="text/javascript">
    mixpanel.track("Home View");
    $.widget("custom.catcomplete", $.ui.autocomplete, {
        _create: function () {
            this._super();
            this.widget().menu("option", "items", "> :not(.ui-autocomplete-category)");
        },
        _renderMenu: function (ul, items) {
            var that = this;
            $.each(items, function (index, item) {
                var li;

                li = that._renderItemData(ul, item);
                if (item.category) {
                    li.attr("aria-label", item.label + " : " + item.code);
                }
            });
        }
    });

    $(document).ready(function () {
        var xhr;
        $('.modal-video button.close').on('click', function () {
            $('.modal-video .modal-body').html('<iframe width="800" height="450" style="max-width:100%;" src="https://www.youtube.com/embed/fIAnCMf5an4" frameborder="0" allowfullscreen></iframe>');
        })
        $("#homeairport").catcomplete({
            delay: 0,
            source: function (request, response) {
                var regex = new RegExp(request.term, 'i');
                if (xhr) {
                    xhr.abort();
                }
                xhr = $.ajax({
                    url: "/data/airports.json",
                    dataType: "json",
                    cache: false,
                    success: function (data) {
                        response($.map(data.list, function (item) {
                            if (regex.test(item.label)) {
                                return {
                                    label: item.label,
                                    country: item.country,
                                    code: item.code
                                };
                            }
                        }));
                    }
                });
            },
            minlength: 3
        });

    });

    var FlightRequest = {
        "request": {
            "slice": [
              {
                  "origin": "DCA",
                  "destination": "LAX",
                  "date": "2016-05-11"
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
            "refundable": false
        }
    };
    function fetchFlights123() {
        $.ajax({
            type: "POST",
            //Set up your request URL and API Key.
            url: "https://www.googleapis.com/qpxExpress/v1/trips/search?key=AIzaSyAdy8-J5mKe_j3q3IBpqTOTwwQf_nuoyoE",
            contentType: 'application/json', // Set Content-type: application/json
            dataType: 'json',
            // The query we want from Google QPX, This will be the variable we created in the beginning
            data: JSON.stringify(FlightRequest),
            success: function (data) {
                //Once we get the result you can either send it to console or use it anywhere you like.
                return data;
            },
            error: function () {
                //Error Handling for our request
                alert("Access to Google QPX Failed.");
            }
        });
    }
    //fetchFlights123();

    /*
    $.ajax({
        type: "GET",
        //Set up your request URL and API Key.
        url: "http://jetsetgenie.devzila.com/api/destination-types",
        contentType: 'application/json', // Set Content-type: application/json
        dataType: 'json',
        // The query we want from Google QPX, This will be the variable we created in the beginning
        data: "getdestinations=1",
        success: function (data) {
            //Once we get the result you can either send it to console or use it anywhere you like.
            console.log(JSON.stringify(data));
        },
        error: function () {
            //Error Handling for our request
        alert("Access to JetSet api failed.");
    }


}); */

</script>
@stop
