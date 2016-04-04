<?php
Route::group(['middleware' => ['cookie.auth'], 'prefix' => 'api'], function () {
    Route::resource('visitors', 'VisitorsController');
    Route::resource('cards', 'CardsController');
    Route::resource('cards.items', 'DestinationCardItemsController');
    Route::resource('destination-types', 'DestinationTypesController');
    Route::resource('destination-types.airport', 'DestinationsController');
});