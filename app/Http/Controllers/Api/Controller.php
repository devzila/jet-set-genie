<?php

namespace App\Http\Controllers\Api;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
class Controller extends BaseController
{
    protected $user;

    public function __construct($request)
    {
        $this->user = $request->cookie('uuid') ? $request->cookie('uuid') : session('flash_uuid');
    }
}

