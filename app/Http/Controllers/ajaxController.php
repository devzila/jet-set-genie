<?php 

namespace App\Http\Controllers;
use Input;
use Request;
class AccountController extends Controller {
  public function create() {
    // Getting all post data
    if(Request::ajax()) {
      $data = Input::all();
      print_r($data);die;
    }
}