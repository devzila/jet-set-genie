<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Visitor extends Model
{
    protected $fillable = ['name','email', 'ip', 'browser', 'leaving_date', 'returning_date', 'home_airport'];
}
