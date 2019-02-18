<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//Route::get('/', function () {
//    return view('app');
//})->name('app');

if( !defined("REACT_DEFAULT_ROUTER" )){
	define("REACT_DEFAULT_ROUTER",  'Home\HomeController@index' );
}
/*
 * Main route
 */
Route::get('/', REACT_DEFAULT_ROUTER );

Route::get('/auth/redirect', 'SocialAuthGoogleController@redirect');
Route::get('/auth/callback', 'SocialAuthGoogleController@callback');
