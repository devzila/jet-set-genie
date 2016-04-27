@extends('layouts.master')

@section('content')

<h1>Hello!</h1>
<div id="price">Price</div>
<div id="duration">Fare</div>

<script src="{{asset('js/qpx.js') }}"></script>
<script>

    $(document).ready(function(){
        getFlight('BOS','LAX',$("#price"),$("#duration"));
    });

</script>
@stop