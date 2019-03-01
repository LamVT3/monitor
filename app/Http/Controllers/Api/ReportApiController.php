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

    const TYPE_PING_CONTACT = 0;
    const TYPE_PING_SERVER  = 1;
    const IP_SERVER_1 = '42.115.221.30';
    const IP_SERVER_2 = '42.115.221.43';
    const IP_SERVER_3 = '42.115.221.99';
    const IP_SERVER_4 = '42.115.221.11';
    const IP_SERVER_5 = '42.115.221.111';

	public function getPingContact(Request $request){
		try {
            $month = $request->month;
            if($month < 10){
                $month = '0'.$month;
            }
            $data = $this->queryPingContact($month);
			if(!is_null($data)){
				if (count($data)) {
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

	private function queryPingContact($month){
	    if($month == ''){
            $month  = date('m');
        }
        $year   = date('Y');
        $days   = cal_days_in_month(CAL_GREGORIAN, $month, $year);

        $from   = date('Y-'.$month.'-01');
        $to     = date('Y-'.$month.'-'.$days);

        $query = Helios::where('type', self::TYPE_PING_CONTACT)
            ->where('created_date', '>', $from)
            ->where('created_date', '<=', $to)->get();

        $result = [];
        if(!is_null($query)){

            $results_contact_pass   = [];
            $results_contact_fail   = [];
            $data_contact_pass      = [];
            $data_contact_fail      = [];

            foreach ($query as $item){
                $d = date("d", strtotime($item->created_date));

                if($item->status == '0'){
                    @$data_contact_pass[$d]++;
                }elseif ($item->status == '1'){
                    @$data_contact_fail[$d]++;
                }
            }

            for ($i = 1; $i <= $days; $i++) {
                if(@$data_contact_pass[$i]){
                    @$results_contact_pass[] = ['x' => $i, 'y' => $data_contact_pass[$i]];
                }else{
                    @$results_contact_pass[] = ['x' => $i, 'y' => 0];
                }

                if(@$data_contact_fail[$i]){
                    @$results_contact_fail[] = ['x' => $i, 'y' => $data_contact_fail[$i]];
                }else{
                    @$results_contact_fail[] = ['x' => $i, 'y' => 0];
                }
            }

            $result = [
                'results_contact_pass' => $results_contact_pass,
                'results_contact_fail' => $results_contact_fail
            ];

        }
        return $result;
    }

    public function getPingServer(Request $request){
        try {
            $month      = $request->month;
            $serverNum  = $request->serverNum;
            $server     = '';

            if($serverNum == 1){
                $server = self::IP_SERVER_1;
            }elseif ($serverNum == 2){
                $server = self::IP_SERVER_2;
            }elseif ($serverNum == 3){
                $server = self::IP_SERVER_3;
            }elseif ($serverNum == 4){
                $server = self::IP_SERVER_4;
            }elseif ($serverNum == 5){
                $server = self::IP_SERVER_5;
            }

            if($month < 10){
                $month = '0'.$month;
            }
            $data = $this->queryPingServer($month, $server);
            if(!is_null($data)){
                if (count($data)) {
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

    private function queryPingServer($month, $server){
        if($month == ''){
            $month  = date('m');
        }

        $year   = date('Y');
        $days   = cal_days_in_month(CAL_GREGORIAN, $month, $year);

        $from   = date('Y-'.$month.'-01');
        $to     = date('Y-'.$month.'-'.$days);

        $query = Helios::where('type', self::TYPE_PING_SERVER)
            ->where('server', $server)
            ->where('created_date', '>', $from)
            ->where('created_date', '<=', $to)->get();

        $result = [];
        if(!is_null($query)){

            $data = [];
            foreach ($query as $item) {
                $d = date("d", strtotime($item->created_date));

                if ($item->status == '0') {
                    @$data['pass'][$d]++;
                } elseif ($item->status == '1') {
                    @$data['fail'][$d]++;
                }
            }

            for ($i = 1; $i <= $days; $i++) {
                if(@$data['pass'][$i]){
                    @$result['pass'][] = ['x' => $i, 'y' => @$data['pass'][$i]];
                }else{
                    @$result['pass'][] = ['x' => $i, 'y' => 0];
                }

                if(@$data['fail'][$i]){
                    @$result['fail'][] = ['x' => $i, 'y' => @$data['fail'][$i]];
                }else{
                    @$result['fail'][] = ['x' => $i, 'y' => 0];
                }
            }
        }

        $result['server'] = $server;

        return $result;
	}

}