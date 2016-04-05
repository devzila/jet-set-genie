<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use Response;


class HomeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
	 
	 public function index()
	 {
	 
	 }
	 
	 public function register()
	 {
	 	return view("register");
	 }
	 
	 public function login()
	 {
	 	return view("testlogin");
	 }
	 
	 
	 public function post_register(Request $request)
	 {
	 	print_r($request->all());
	 }
	 
	 public function post_login(Request $request)
	 {
	 	$user = array("email" => $request->email, "password"=>$request->password);
		Auth::attempt($user);	
	 }

}
