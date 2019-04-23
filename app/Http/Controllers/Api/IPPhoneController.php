<?php

namespace App\Http\Controllers\Api;

use App\Config;
use App\IPPhone;
use App\Http\Controllers\Controller;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Exception;
use App\Http\Utils\Debug\Debug;

class IPPhoneController extends Controller {

	public function all(){
		try {
//			$user = Auth::user();

			$date = date('Y-m-d');
			$results_contact = IPPhone::where('type', 0)->where('created_date', 'like', '%' . $date . '%')->get();

			if(!is_null($results_contact)){
				if (count($results_contact)) {
					$data = [
						"results_contact" =>$results_contact
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

				if ($config->status == 0 && $type == 'ipphone-callhistories'){
					$rs = $this->runCronjob("tuanta3", "/usr/bin/python /opt/monitor_ntl/ipphone_check_callhistories.py", (int)$config->interval);
					if ($rs == 'True'){
						return $this->responseSuccess(  $data );
					}
				}
				elseif ($config->status == 1 && $type == 'ipphone-callhistories'){
					$rs = $this->stopCronjob("tuanta3", "/usr/bin/python /opt/monitor_ntl/ipphone_check_callhistories.py");
					if ($rs == 'True'){
						return $this->responseSuccess(  $data );
					}
				}

				return $this->responseError( -1 );
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

	private function runCronjob($user, $cmd, $interval){
		$client = new Client();
		$res = $client->get('http://42.113.206.207:8181/api/cronjob/run' . '?user=' . $user . '&cmd=' . $cmd . '&interval=' . $interval);
		$response_data = null;
		if ($res->getStatusCode() == 200) {
			$response_data = json_decode($res->getBody())->status;
		}
		return $response_data;
	}

	private function stopCronjob($user, $cmd){
		$client = new Client();
		$res = $client->get('http://42.113.206.207:8181/api/cronjob/stop' . '?user=' . $user . '&cmd=' . $cmd);
		$response_data = null;
		if ($res->getStatusCode() == 200) {
			$response_data = json_decode($res->getBody())->status;
		}
		return $response_data;
	}

}