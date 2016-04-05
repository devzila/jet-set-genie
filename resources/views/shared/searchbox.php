
<div class="row">
<div class="col-lg-12 col-sm-12">
<div class="row form-group">
<div class="col-lg-5 col-md-6">

  <input id="homeairport" class="form-control"  type="text" name="" data-ng-model="sparams.origin" data-origin-code="{{ sparams.origincode }}" />
  </div>
  
<div class="col-lg-5 col-md-6">
 <div class="textbox">
  <span data-ng-bind="trip_type( sparams.type )"></span>
  </div>
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
	  <ul class="dropdown-menu" aria-labelledby="flighttime">
		<li>
		<h4>TAKE OFF[NYC]</h4>
		<strong>Sat 12:30a - Sun 12:00a</strong><br />
		</li>
		
		
		<li>
		<h4>TAKE OFF[NYC]</h4>
		<strong>Sat 12:30a - Sun 12:00a</strong>
		
		</li>
		
		<li>
		<h4>TAKE OFF[NYC]</h4>
		<strong>Sat 12:30a - Sun 12:00a</strong>
		
		</li>
		
		
		<li>
		<h4>TAKE OFF[NYC]</h4>
		<strong>Sat 12:30a - Sun 12:00a</strong>
		
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
		<li><a href="#">Action</a></li>
		<li><a href="#">Another action</a></li>
		<li><a href="#">Something else here</a></li>
		
	  </ul>
	</div></li>
   
			<li class="stops">
			<div class="dropdown">
	  <button class="btn btn-default dropdown-toggle" type="button" id="flightstop" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
		<h5>Stops</h5>
		<span class="fa fa-angle-down"></span>
	  </button>
	  <ul class="dropdown-menu" aria-labelledby="flightstop">
		<li><input type="checkbox" value="" name=""><span>NONSTOP</span></li>
		<li><input type="checkbox" value="" name=""><span>1 STOP</span></li>
		<li><input type="checkbox" value="" name=""><span>2 STOPS</span></li>
		<li><input type="checkbox" value="" name=""><span>ANY</span></li>
		
	  </ul>
	</div></li>
	
			<li class="duration">
			<div class="dropdown">
	  <button class="btn btn-default dropdown-toggle" type="button" id="flightduration" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
		<h5>Duration</h5>
		<span class="fa fa-angle-down"></span>
	  </button>
	  <ul class="dropdown-menu" aria-labelledby="flightduration">
		<li><a href="#">Action</a></li>
		<li><a href="#">Another action</a></li>
		<li><a href="#">Something else here</a></li>
		
	  </ul>
	</div></li>
			
		   
		</ul>
	
</div>

<div class="col-md-4 clear-text">
	<button type="submit">Clear</button>
</div>

</div>
 