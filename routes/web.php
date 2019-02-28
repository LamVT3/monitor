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

if( !defined("REACT_DEFAULT_ROUTER" )){
	define("REACT_DEFAULT_ROUTER",  'Home\HomeController@index' );
}
/*
 * Main route
 */
Route::get('/', REACT_DEFAULT_ROUTER );

Route::get('/auth/redirect', 'SocialAuthGoogleController@redirect');
Route::get('/auth/callback', 'SocialAuthGoogleController@callback');

Route::get('/login', 'SocialAuthGoogleController@login');
Route::get('/logout', 'SocialAuthGoogleController@logout');

Route::get('/api/helios/all', 'Api\HeliosController@all');
Route::get('/api/helios/get-config-contact', 'Api\HeliosController@getConfigContact');
Route::get('/api/helios/get-config-ping', 'Api\HeliosController@getConfigPing');
Route::post('/api/helios/config', 'Api\HeliosController@postConfig');

Route::get('/report', REACT_DEFAULT_ROUTER);
Route::get('/api/report/get-ping-contact', 'Api\ReportApiController@getPingContact');
Route::get('/api/report/get-ping-server-1', 'Api\ReportApiController@getPingServer1');
Route::get('/api/report/get-ping-server-2', 'Api\ReportApiController@getPingServer2');
Route::get('/api/report/get-ping-server-3', 'Api\ReportApiController@getPingServer3');
Route::get('/api/report/get-ping-server-4', 'Api\ReportApiController@getPingServer4');
Route::get('/api/report/get-ping-server-5', 'Api\ReportApiController@getPingServer5');
