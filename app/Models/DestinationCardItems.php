<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DestinationCardItems extends Model
{
    protected $fillable = ['destination_card_id','action_date','action_time', 'name', 'fare'];
}
