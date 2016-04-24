<?php

namespace App\Http\Controllers;


#use Symfony\Component\HttpKernel\Tests\Controller;

class TestController extends Controller
{

    function flight(){
        return view('test/flight');
    }


}
