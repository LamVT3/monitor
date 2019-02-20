<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Response;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;

	public function __construct( $requireAuth = true ){
		if( $requireAuth ){
			$this->middleware('MonitorAuth');
		}
	}

	public function responseSuccess( $data = null ){

		//Protect APIs, donnot show results when calling from URL browwser address
		if( !Request::wantsJson()){
			return response('This is private API!!!');
		}

		return Response::json([
			                      "success" => true,
			                      "result"  => $data
		                      ] );
	}

	public function responseError( $errorCode, $msg=null ){
		return Response::json([
			                      "success"       => false,
			                      "error_code"    => $errorCode,
			                      "message"       => $msg
		                      ] );
	}
}
