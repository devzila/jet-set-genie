<?php

namespace App\Http\Requests;

use App\Http\Requests\Request;

class CreateAjaxRequest extends Request
{
    public function authorize()
    {
        return true;
    }
public function rules()
    {
        return [
            'name' =>'required',
            'email'=>'unique:users,email|email',

        ];
    }
}