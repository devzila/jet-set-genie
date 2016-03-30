<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateDestinationCardItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('destination_card_items', function (Blueprint $table) {
            $table->increments('id');
            $table->integer('destination_card_id');
            $table->integer('flight_id');
			$table->integer('hotel_id');
			$table->dateTime('action_date');
            $table->dateTime('action_time');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

        Schema::drop('destination_card_items');
    }
}
