<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use Response;
use App\Models\DestinationCardItems;
use App\Models\DestinationCards;

class DestinationCardItemsController extends Controller
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
    public function index(Request $request,$card_id)
    {
         $cards = DestinationCardItems::where('destination_card_id', $card_id)->get();
		 return $cards->toJson();
		 
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
    public function store(Request $request,$card_id)
    {
      $result = DestinationCardItems::create([
        'destination_card_id' => $card_id,
         'name' => $request->input('name'),
         'fare' => $request->input('fare'),
		 'action_date' => $request->input('action_date'),
		 'action_time' => $request->input('action_time')
		 ]);

      $card = DestinationCards::find($card_id);
      $card->updated_at = date("Y-m-d H:i:s");
      $card->save();
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
		$card = DestinationCardItems::find($id);
		return $card->toJson();
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
    public function destroy($card_id, $id)
    {
        //


		$card = DestinationCardItems::find($id);
		$card->delete();
        return Response::json(['status' => "ok"], 200);

    }
}
