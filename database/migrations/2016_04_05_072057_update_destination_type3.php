<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class UpdateDestinationType3 extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('destination_types', function ($table) {
            $table->string('icon', 20);
            $table->string('slug' ,255);
        });
        DB::table('destination_types')->insert(['name' => 'Surprise Me']);
        DB::table('destination_types')->where('name', 'Beach')->update(array('icon' => 'fa-anchor'));
        DB::table('destination_types')->where('name', 'Mountains')->update(array('icon' => 'fa-tree'));
        DB::table('destination_types')->where('name', 'Europe')->update(array('icon' => 'fa-bicycle'));
        DB::table('destination_types')->where('name', 'Latin America')->update(array('icon' => 'fa-futbol-o'));
        DB::table('destination_types')->where('name', 'Surprise Me')->update(array('icon' => 'fa-star'));
        DB::table('destination_types')->where('name', 'Beach')->update(array('slug' => 'beach'));
        DB::table('destination_types')->where('name', 'Mountains')->update(array('slug' => 'mountains'));
        DB::table('destination_types')->where('name', 'Europe')->update(array('slug' => 'europe'));
        DB::table('destination_types')->where('name', 'Latin America')->update(array('slug' => 'latin-america'));
        DB::table('destination_types')->where('name', 'Surprise Me')->update(array('slug' => 'surprise-me'));
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('destination_types', function($table)
        {
            $table->dropColumn('icon');
            $table->dropColumn('slug');
        });
    }
}
