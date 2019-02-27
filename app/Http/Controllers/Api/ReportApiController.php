<?php

namespace App\Http\Controllers\Api;

use App\Config;
use App\Helios;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Exception;
use App\Http\Utils\Debug\Debug;

class ReportApiController extends Controller {

	public function all(){
		try {

			$results_contact = Helios::where('type', 0)->get();
			$results_ping = Helios::where('type', 1)->get();

			if(!is_null($results_contact)){
				if (count($results_contact)) {
					foreach ($results_contact as $result){
						$result->status == 1 ? $result->status = "Fails" : $result->status = "OK";
						if (!empty($result->check_from)) $result->check_from = date('d-m-Y h:i:s', (string)$result->check_from / 1000);
						else $result->check_from = 'N/a';

						if (!empty($result->check_to)) $result->check_to = date('d-m-Y h:i:s', (string)$result->check_to / 1000);
						else $result->check_to = 'N/a';
					}

					foreach ($results_ping as $result){
						$result->status == 1 ? $result->status = "Fails" : $result->status = "OK";
					}

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

	public function getConfigContact(){
		try {
			$config = Config::where('type', 'helios_contact')->first();

			if(!is_null($config)){
				$data = [
					'reciptent' => $config->reciptent,
					'interval' => $config->interval,
					'status' => $config->status
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
			$reciptent = $request->reciptent;
			$interval = $request->interval;
			$status = $request->status;
			$type = $request->type;

			$config = Config::where('type', $type)->first();

			if ($config == null){
				$config = new Config();
				$config->type = $type;
				$config->reciptent = $reciptent;
				$config->interval = $interval;
				$config->status = $status;
				$config->save();
			}else{
				$config->reciptent = $reciptent;
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

	public function getConfigPing(){
		try {
			$config = Config::where('type', 'helios_ping')->first();

			if(!is_null($config)){
				$data = [
					'reciptent' => $config->reciptent,
					'interval' => $config->interval,
					'status' => $config->status
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
}