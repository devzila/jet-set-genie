<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;

use App\Http\Requests;
use Response;
use App\Models\Visitor;
use Mail;

class VisitorsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index() 
    {
         $visitors = Visitor::all();
		 return $visitors->toJson();
		 
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
        $visitor = Visitor::create([
                'name' => $request->input('name'),
                'email' => $request->input('email'),
                'leaving_date' => $request->input('leaving_date'),
                'returning_date' => $request->input('returning_date'),
                'destination_type' => $request->input('destination_type'),
                'home_airport' => $request->input('home_airport')
            ]);

        $emails = ['nilay@devzila.com', 'ophia.b.popova@gmail.com', 'jnolan@mba2017.hbs.edu', 'jgoldstein@mba2017.hbs.edu', 'hchan@mba2017.hbs.edu', 'scook@mba2017.hbs.edu'];
        //$emails = ['nilay@devzila.com', 'kiran@devzila.com', 'kawal@ideapps.in'];


        Mail::send('email/visitor',['visitor' => $visitor], function($message) use($emails)
        {
            $message->from('jetset@devzila.com', 'JetSetGenie');
            $message->to($emails);
            $message->subject('Someone signed up for JetSetGenie!');
        });


        return Response::json($visitor, 200);
        //
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
		$visitor = Visitor::where('id', $id)->first();
		return $visitor->toJson();
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
