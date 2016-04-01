<?php
Route::resource('api/visitors', 'VisitorsController');
Route::resource('api/cards', 'CardsController');
Route::resource('api/cards.items', 'DestinationCardItemsController');
Route::resource('api/destination', 'DestinationTypesController');