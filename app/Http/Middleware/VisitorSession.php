<?php namespace App\Http\Middleware;

use Closure;
use DB;
use Config;
/**
 * Middleware class to verify user access for
 * API requests.
 *
 */
class VisitorSession {

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next) {

        if($request->hasCookie('uuid')){
            return $next($request);
        }
        else{
            $uuid = uniqid();

            // set session for first request
            session(['flash_uuid' => $uuid]);
            $response = $next($request);
            return $response->withCookie(cookie()->forever('uuid',$uuid));
        }


    }
}