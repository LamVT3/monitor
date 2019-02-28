<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Support\Facades\Auth;

class MonitorAuth
{
    /**
     * The Guard implementation.
     *
     * @var Guard
     */
    protected $auth;

    /**
     * Create a new filter instance.
     *
     * @param  Guard  $auth
     * @return void
     */
    public function __construct(Guard $auth)
    {
        $this->auth = $auth;
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        //Check authenticate
	    $authorized = Auth::check();

        if( !$authorized ){

            if ($request->ajax()) {
                return response('Unauthorized.', 440);
            }
            else {
                return redirect()->guest('login');
            }
        }elseif (isset(Auth::user()->role) && Auth::user()->role == 'None'){
        	return abort(403);
        }

        return $next( $request );
    }
}
