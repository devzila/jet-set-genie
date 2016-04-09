<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use Response;
use App\Models\DestinationCards;
use DB;

class CardsController extends Controller
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
    public function index()
    {
        $select = DB::table('destination_cards')
            ->join('destination', 'destination.id', '=', 'destination_cards.destination_id')
            ->where('destination_cards.user_id', $this->user)
            ->select('destination.display_name', 'destination.city_name', 'destination.airport_code', 'destination.id');

       return Response::json($select->get(), 200);
		 
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
      $result = DestinationCards::create([
         'user_id' => $this->user,
         'destination_id' => $request->input('destination_id'),
         'duration' => $request->input('duration'),
         'fare' => $request->input('fare')
		 ]);
        return Response::json($result, 200);
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
		$card = DestinationCards::find($id);
		return $card->toJson();
    }
	
	public function getCards($id)
    {
        //
		$data = DB::table('destination_cards')->where('destination_cards.user_id','=',$id)->get();
		return Response::json($data, 200);
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
		$card = DestinationCards::find($id);
		$card->delete();
        return Response::json(['status' => 'ok'], 200);
    }
}
