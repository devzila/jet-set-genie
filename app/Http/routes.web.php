<?php

/*
|--------------------------------------------------------------------------
| Routes File
|--------------------------------------------------------------------------
|
| Here is where you will register all of the routes in an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('home');
});
Route::post('/', 'ajaxController@create');

Route::get('/login', function() {
  return View::make('login');
});

Route::post('/login', 'AccountController@login');

Route::get('/flight-results', function () {
    return view('flights');
});

Route::get('/flight-results/leaving/{leaving}/returning/{returning}/origin/{origin}/destination/{destination}/type/{type}/destid/{destid}/filters/{filters}', function () {
    return view('flights');
});

Route::get('/search-results', function () {
    return view('searchresults');
});

Route::get('/search-results/leaving/{leaving}/returning/{returning}/origin/{origin}/type/{type}/destid/{destid}/filters/{filters}', function () {
    return view('searchresults');
});

Route::get('/favorites', function () {
    return view('favorites');
});

Route::get('/shared-dashboard/{visitorid}', function () {
    return view('shareddestinations');
});


Route::get('/email', function () {
    return view('email');
});

Route::get('/register', 'HomeController@register');
Route::get('/login', 'HomeController@login');

Route::post('/post_register', 'HomeController@post_register');
Route::post('/post_login', 'HomeController@post_login');

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| This route group applies the "web" middleware group to every route
| it contains. The "web" middleware group is defined in your HTTP
| kernel and includes session state, CSRF protection, and more.
|
*/

Route::group(['middleware' => ['web']], function () {
    //
});

Route::get('/test_flight', 'TestController@flight');
