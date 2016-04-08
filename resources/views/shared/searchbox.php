 
<div class="row">
<div class="col-lg-12 col-sm-12">
<div class="row form-group">
<div class="col-lg-5 col-md-6">

  <input id="homeairport" class="form-control"  type="text" name="" data-ng-model="sparams.origin" data-origin-code="{{ sparams.origincode }}" />
  </div>
  
<div class="col-lg-5 col-md-6">
    <input type="text" class="tag_places form-control" data-ng-model="sparams.type" width="100%" />
 <!--<div class="textbox">
  <span data-ng-bind="trip_type( sparams.type )"></span> 
     
  </div>-->
  </div>
 </div>
</div>

<div class="col-lg-12 col-sm-12">
<div class="row form-group">
  <div class="col-lg-5 col-md-6">
  <div class="input-group">
	
	<label class="input-group-addon btn" for="date">
	   <span class="fa fa-calendar"></span>
	</label>
	<input type="text" id="leaving" class="form-control leavedate" name="leaving" data-ng-model="sparams.leaving" />
</div></div>
	
  <div class="col-lg-5 col-md-6">
  <div class="input-group">
	
	<label class="input-group-addon btn" for="date">
	   <span class="fa fa-calendar"></span>
	</label>
	<input type="text" id="returning" class="form-control returndate" name="returning" data-ng-model="sparams.returning" />
</div></div>
  
  <div class="col-lg-2 col-md-6">
   <button type="submit" class="btn btn-default jsg-submit">Search</button>
  </div>
</div></div>
</div>

<div class="row">
<div class="col-md-8 lists">
		<ul>
			<li class="time">
			<div class="dropdown">
	   <button class="btn btn-default dropdown-toggle" type="button" id="flighttime" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
				<h5>Time</h5> 
				<span class="fa fa-angle-down"></span>
			  </button>
	  <ul class="dropdown-menu time-filter container-fluid" aria-labelledby="flighttime">
		<li class="col-sm-6">
		<h4>TAKE OFF [{{ sparams.origincode }}]</h4>
         
        <small>{{ searchfilters.time.leaving.takeoff.text }}</small>
        <div id="leaving-takeoff" class="filter-slider"></div>
        <input id="leaving-takeoff-time" type="hidden" data-ng-bind="searchfilters.time.leaving.takeoff.timeslot" />
		</li>
			
		<li class="col-sm-6">
		    <h4>TAKE OFF [{{ sparams.dest_code }}]</h4>
		    <small>{{ searchfilters.time.leaving.landing.text }}</small>
            <div id="leaving-landing" class="filter-slider"></div>
            <input id="leaving-landing-time" type="hidden" data-ng-bind="searchfilters.time.leaving.landing.timeslot" />
		</li>
		
		<li class="col-sm-6">
		<h4>TAKE OFF [{{ sparams.dest_code }}]</h4>
		    <small>{{ searchfilters.time.returning.takeoff.text }}</small>
            <div id="returning-takeoff"  class="filter-slider"></div>
            <input id="returning-takeoff-time" type="hidden" data-ng-bind="searchfilters.time.returning.takeoff.timeslot" />
		</li>
		
		
		<li class="col-sm-6">
		<h4>TAKE OFF [{{ sparams.origincode }}]</h4>
		<small>{{ searchfilters.time.returning.landing.text }}</small>
            <div id="returning-landing" class="filter-slider"></div>
            <input id="returning-landing-time" type="hidden" data-ng-bind="searchfilters.time.returning.landing.timeslot" />
		</li>
		
	  </ul>
	</div>
	</li>
			
			<li class="price">
			<div class="dropdown">
	  <button class="btn btn-default dropdown-toggle" type="button" id="flightprice" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
		<h5>Price</h5>
		<span class="fa fa-angle-down"></span>
	  </button>
     
	  <ul class="dropdown-menu" aria-labelledby="flightprice">
        <li><p><span class="pull-left">$0</span> <span class="pull-right">NO LIMIT</span></p></li>
		<li><div id="price-filter" class="filter-slider"></div></li>
	  </ul>
	</div></li>
   
			<li class="stops">
			<div class="dropdown">
	  <button class="btn btn-default dropdown-toggle" type="button" id="flightstop" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
		<h5>Stops</h5>
		<span class="fa fa-angle-down"></span>
	  </button>
	  <ul class="dropdown-menu" aria-labelledby="flightstop">
		<li><label><input type="checkbox" value="" name=""><span>NONSTOP</span></label></li>
		<li><label><input type="checkbox" value="" name=""><span>1 STOP</span></label></li>
		<li><label><input type="checkbox" value="" name=""><span>2 STOPS</span></label></li>
		<li><label><input type="checkbox" value="" name=""><span>ANY</span></label></li>
		
	  </ul>
	</div></li>
	
			<li class="duration">
			<div class="dropdown">
	  <button class="btn btn-default dropdown-toggle" type="button" id="flightduration" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
		<h5>Duration</h5>
		<span class="fa fa-angle-down"></span>
	  </button>
        <ul class="dropdown-menu" aria-labelledby="duration">
            <li><p><span class="pull-left">1hr</span> <span class="pull-right">NO LIMIT</span></p></li>
            <li><div id="duration-filter" class="filter-slider"></div></li>
        </ul>
	</div></li>
			
		   
		</ul>
	
</div>

<div class="col-md-4 clear-text">
	<button type="submit">Clear</button>
</div>

</div>


<script>
    places = [{ "id": 1, "name": "Beach", "created_at": "2016-04-05 13:01:22", "updated_at": "2016-03-30 13:15:00", "icon": "fa-anchor", "slug": "beach" }, { "id": 2, "name": "Mountains", "created_at": "2016-04-05 13:01:22", "updated_at": "2016-03-30 13:15:00", "icon": "fa-tree", "slug": "mountains" }, { "id": 3, "name": "Europe", "created_at": "2016-04-05 13:01:22", "updated_at": "2016-03-30 13:15:21", "icon": "fa-bicycle", "slug": "europe" }, { "id": 4, "name": "Latin America", "created_at": "2016-04-05 13:01:22", "updated_at": "2016-03-30 13:15:21", "icon": "fa-futbol-o", "slug": "latin-america" }, { "id": 5, "name": "Surprise Me", "created_at": "2016-04-05 13:01:22", "updated_at": "-0001-11-30 00:00:00", "icon": "fa-star", "slug": "surprise-me" }];
    $(".tag_places").tagsinput();
    $(function () {
        $("#leaving-takeoff, #leaving-landing, #returning-takeoff, #returning-landing, #price-filter, #duration-filter").slider({
            range: true,
            min: 0030,
            max: 2359,
            values: [0030, 2359],
            slide: function (event, ui) {
                $("#leaving-time").val('["' + ui.values[0] + '","' + ui.values[1] + '"]');
            }
        });
        $("#amount").val("$" + $("#slider-range").slider("values", 0) +
          " - $" + $("#slider-range").slider("values", 1));
    });
</script>