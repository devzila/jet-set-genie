<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use Response;
use App\Models\DestinationTypes;

use DB;
class DestinationsController extends Controller
{
    public function __construct(Request $request)
    {
        parent::__construct($request);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index($id)  
    {

        $select = DB::table('destination')
            ->join('destination_type_airport_mapping', 'destination_type_airport_mapping.destination_id', '=', 'destination.id')
            ->select('destination.*');

        // 0 = 'surprise me'
        if($id !== 0 and $id !== 5 and $id !=='surprise-me'){
            $destination_type = DestinationTypes::where('slug', $id)->get();
            if($destination_type){
                $select->where('destination_type_airport_mapping.destination_type_id','=',$destination_type[0]->id);
            }

        }


        $data = $select->limit(40)->get();
		 
	    foreach($data as $key => $value){
            $duration = rand(30, 300);
            if($duration < 60){
                $duration = "$duration Minutes";
            }
            else{
                $hour = intval($duration/60);
                $min = $duration%60;

                $duration = $min == 0 ? "$hour Hour(s)" : "$hour Hour(s) $min Minute(s)";
            }
            $data[$key]->duration = $duration;
            $data[$key]->fare = '$' . rand(40, 2000);
        }
        return Response::json($data, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
		
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
		
    }
}
