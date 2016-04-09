 
<div class="row">
<div class="col-lg-12 col-sm-12">
<div class="row form-group">
<div class="col-lg-5 col-md-6">

  <input id="homeairport" class="form-control"  type="text" name="" data-ng-model="sparams.origin" data-origin-code="{{ sparams.origincode }}" />
  </div>
  
<div class="col-lg-5 col-md-6">
    <input type="text" class="tag_places form-control" data-ng-model="sparams.type" width="100%" />
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
   <button class="btn btn-default jsg-submit" data-ng-click="refineSearch()">Search</button>
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
	  <ul class="dropdown-menu time-filter container-fluid slidercontainer" aria-labelledby="flighttime">
        <li class="col-sm-6">
                <h4>TAKE OFF {{ sparams.origincode != ' ' ? '[' + sparams.origincode + ']' : '' }}</h4>
                <small>{{ searchfilters.time.leaving.takeoff.timeslot | myDateFilter:this:sparams.leaving }}</small>
                <div ui-slider="{range: true}" min="0050" max="2400" step="50" use-decimals ng-model="searchfilters.time.leaving.takeoff.timeslot" class="filter-slider"></div>
                 
                <h4>LAND {{ sparams.dest_code != ' ' ? '[' + sparams.dest_code + ']' : '' }}</h4>
                <small>{{ searchfilters.time.leaving.landing.timeslot | myDateFilter:this:sparams.leaving }}</small>
                <div ui-slider="{range: true}" min="0050" max="2400" step="50" use-decimals ng-model="searchfilters.time.leaving.landing.timeslot" class="filter-slider"></div>
		</li>
			
		<li class="col-sm-6">
 
                <h4>TAKE OFF {{ sparams.dest_code != ' ' ? '[' + sparams.dest_code + ']' : '' }}</h4>
                <small>{{ searchfilters.time.returning.takeoff.timeslot | myDateFilter:this:sparams.returning }}</small>
                <div ui-slider="{range: true}" min="0050" max="2400" step="50" use-decimals ng-model="searchfilters.time.returning.takeoff.timeslot" class="filter-slider"></div>
                 
                <h4>LAND {{ sparams.origincode != ' ' ? '[' + sparams.origincode + ']' : '' }}</h4>
                <small>{{ searchfilters.time.returning.landing.timeslot | myDateFilter:this:sparams.returning }}</small>
                <div ui-slider="{range: true}" min="0050" max="2400" step="50" use-decimals ng-model="searchfilters.time.returning.landing.timeslot" class="filter-slider"></div>
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
                    <li>
                        <p><span class="pull-left">{{ searchfilters.price[0] }}</span> <span class="pull-right">{{ searchfilters.price[1] == 2000 ? 'NO LIMIT' : searchfilters.price[1] }}</span></p>
                        <div ui-slider="{range: true}" min="0" max="2000" step="200" ng-model="searchfilters.price" class="filter-slider"></div>
                    </li>
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
            <li><p><span class="pull-left">{{ searchfilters.duration[0] }}hr</span> <span class="pull-right">{{ searchfilters.duration[1] < 48 ? searchfilters.duration[1] + 'hr' : 'NO LIMIT' }}</span></p>
                <div ui-slider="{range: true}" min="1" max="48" step="1" ng-model="searchfilters.duration" class="filter-slider"></div>
            </li>

        </ul>
	</div></li>
			
		   
		</ul>
	
</div>

<div class="col-md-4 clear-text">
	<button data-ng-click="clearFilters">Clear</button>
</div>

</div>
 