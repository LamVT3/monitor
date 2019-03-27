<?php

namespace App\Http\Controllers\Api;

use App\Config;
use App\Helios;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Exception;
use App\Http\Utils\Debug\Debug;

class HeliosController extends Controller {

	public function all(){
		try {
//			$user = Auth::user();

			$date = date('Y-m-d');
			$results_contact = Helios::where('type', 0)->where('created_date', 'like', '%' . $date . '%')->get();
			$results_ping = Helios::where('type', 1)->where('created_date', 'like', '%' . $date . '%')->get();
			if(!is_null($results_contact)){
				if (count($results_contact)) {
					$data = [
						"results_contact" =>$results_contact,
						"results_ping" =>$results_ping,
						];

					return $this->responseSuccess(  $data );
				}else{
					Debug::Error( "ERROR: So luong thong tin tra ve khong co");
					return $this->responseError( -1 );
				}
			}else {
				Debug::Error( "ERROR: Ket qua tra ve NULL");
				return $this->responseError( -1 );
			}
		} catch (Exception $e) {
			Debug::Error("Exception error:" . $e->getMessage() );
			Debug::Error($e->getTraceAsString());
			return $this->responseError( -1 );
		}
	}

	public function getConfig(Request $request){
		try {
			if ($this->checkRole() == false) return $this->responsePermission();

			$config = Config::where('type', $request->type)->first();

			if(!is_null($config)){
				$data = [
					'recipient' => $config->recipient,
					'interval' => $config->interval,
					'status' => $config->status,
					'type' => $request->type
				];

				return $this->responseSuccess(  $data );
			}else {
				Debug::Error( "ERROR: Ket qua tra ve NULL");
				return $this->responseError( -1 );
			}
		} catch (Exception $e) {
			Debug::Error("Exception error:" . $e->getMessage() );
			Debug::Error($e->getTraceAsString());
			return $this->responseError( -1 );
		}
	}

	public function postConfig(Request $request){
		try {
			if ($this->checkRole() == false) return $this->responsePermission();

			$reciptent = $request->recipient;
			$interval = $request->interval;
			$status = $request->status;
			$type = $request->type;

			$config = Config::where('type', $type)->first();

			if ($config == null){
				$config = new Config();
				$config->type = $type;
				$config->recipient = $reciptent;
				$config->interval = $interval;
				$config->status = $status;
				$config->save();
			}else{
				$config->recipient = $reciptent;
				$config->interval = $interval;
				$config->status = $status;
				$config->save();
			}

			if(!is_null($config)){
				$data = $config;

				return $this->responseSuccess(  $data );
			}else {
				Debug::Error( "ERROR: Ket qua tra ve NULL");
				return $this->responseError( -1 );
			}
		} catch (Exception $e) {
			Debug::Error("Exception error:" . $e->getMessage() );
			Debug::Error($e->getTraceAsString());
			return $this->responseError( -1 );
		}
	}

}