<?php

namespace App\Http\Controllers\Api;

use App\Config;
use App\Helios;
use App\Server;
use App\Http\Controllers\Controller;
use App\System;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Exception;
use App\Http\Utils\Debug\Debug;

class ReportApiController extends Controller {

    const TYPE_PING_CONTACT = 0;
    const TYPE_PING_SERVER  = 1;
    const HELIOS_SERVER_NAME  = 'helios';
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
            $rate                   = [];

            foreach ($query as $item){
                $d = date("d", strtotime($item->created_date));

                if($item->status == '0'){
                    @$data_contact_pass[(int)$d]++;
                }elseif ($item->status == '1'){
                    @$data_contact_fail[(int)$d]++;
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

                if(@$data_contact_pass[$i] != 0 || @$data_contact_fail[$i] != 0){
                    $total = @$data_contact_fail[$i] +  @$data_contact_pass[$i];
                    $rate[] = ['x' => $i, 'y' => round(@$data_contact_pass[$i] / $total, 2)];
                }else{
                    $rate[] = ['x' => $i, 'y' => 0];
                }
            }

            $result = [
                'results_contact_pass'  => $results_contact_pass,
                'results_contact_fail'  => $results_contact_fail,
                'rate'                  => $rate
            ];

        }
        return $result;
    }

    public function getPingServer(Request $request){
        try {
            $month      = $request->month;
            $serverName = $request->serverName;

            $server = $this->getHeliosServer($serverName);

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
        $result = [];

        if($month == ''){
            $month  = date('m');
        }

        $year   = date('Y');
        $days   = cal_days_in_month(CAL_GREGORIAN, $month, $year);

        $from   = date('Y-'.$month.'-01');
        $to     = date('Y-'.$month.'-'.$days);

        $query = Helios::where('type', self::TYPE_PING_SERVER)
            ->whereIn('server', array_values($server))
            ->where('created_date', '>', $from)
            ->where('created_date', '<=', $to)
            ->get();
        if(!is_null($query)){
            $data   = [];
            foreach ($query as $item) {
                $d = date("d", strtotime($item->created_date));

                if ($item->status == '0') {
                    @$data[$item->server]['pass'][(int)$d]++;
                } elseif ($item->status == '1') {
                    @$data[$item->server]['fail'][(int)$d]++;
                }
            }

            for ($i = 1; $i <= $days; $i++) {
                foreach ($server as $key => $value){
                    $slug = str_slug($key);

                    if(@$data[$value]['pass'][$i]){
                        @$result[$slug]['pass'][] = ['x' => $i, 'y' => @$data[$value]['pass'][$i]];
                    }else{
                        @$result[$slug]['pass'][] = ['x' => $i, 'y' => 0];
                    }

                    if(@$data[$value]['fail'][$i]){
                        @$result[$slug]['fail'][] = ['x' => $i, 'y' => @$data[$value]['fail'][$i]];
                    }else{
                        @$result[$slug]['fail'][] = ['x' => $i, 'y' => 0];
                    }

                    if(@$data[$value]['pass'][$i] != 0 || @$data[$value]['fail'][$i] != 0){
                        $total = @$data[$value]['pass'][$i] +  @$data[$value]['fail'][$i];
                        @$result[$slug]['rate'][] = ['x' => $i, 'y' => round(@$data[$value]['pass'][$i] / $total, 2)];
                    }else{
                        @$result[$slug]['rate'][] = ['x' => $i, 'y' => 0];
                    }

                    @$result[$slug]['name'] = $key;
                    @$result[$slug]['ip']   = $server[$key];
                    @$result[$slug]['month'] = intval($month);
                }
            }
        }

        return $result;
	}

	function getHeliosServer($serverName = null){
	    $helios     = System::where('name', self::HELIOS_SERVER_NAME)->first();
        $servers     = [];
	    if(!is_null($helios)){
	        if($serverName){
                $servers = Server::where('system_id', $helios->id)
                    ->where('name', $serverName)
                    ->pluck('address', 'name')
                    ->toArray();
            }else{
                $servers = Server::where('system_id', $helios->id)
                    ->pluck('address', 'name')
                    ->toArray();
            }
        }
	    return $servers;
    }

    public function getDataWidget(Request $request){
        try {
            $server = $this->getHeliosServer();

            $data = $this->queryDataWidget($server);
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

    private function queryDataWidget($server){

	    $result = [];

        $from   = date('Y-m-d');
        $to     = date('Y-m-d',strtotime($from . "+1 days"));

        $query = Helios::where('type', self::TYPE_PING_SERVER)
            ->whereIn('server', array_values($server))
            ->where('created_date', '>', $from)
            ->where('created_date', '<=', $to)
            ->get();

        $data   = [];
        if(!is_null($query)){
            foreach ($query as $item) {
                if ($item->status == '0') {
                    @$data[$item->server_name]['pass']++;
                } elseif ($item->status == '1') {
                    @$data[$item->server_name]['fail']++;
                }
            }

            foreach ($data as $key => $value) {
                $item = [];
                $total = @$value['pass'] + @$value['fail'];
                $item['pass'] = @$value['pass'];
                $item['fail'] = @$value['fail'];
                $item['server'] = @$server[$key];
                $item['server_name'] = $key;
                $item['rate'] = round($value['pass'] / $total, 2);
                if($item['rate'] * 100 > 50){
                    $time = $this->getLastStatus('up', $item['server']);
                    if($time != 'N/A'){
                        $item['message'] = 'Last down '.$time. ' ago';
                    }else{
                        $item['message'] = 'N/A';
                    }

                }else{
                    $time = $this->getLastStatus('down', $item['server']);
                    if($time != 'N/A'){
                        $item['message'] = 'Last up '.$time. ' ago';
                    }else{
                        $item['message'] = 'N/A';
                    }
                }
                $result[] = $item;
            }
        }

        return $result;
    }

    private function getLastStatus($status, $server){
	    if($status == 'up'){
            $query = Helios::where('type', self::TYPE_PING_SERVER)
                ->where('server', $server)
                ->where('status', '1')
                ->orderBy('created_date', 'desc')
                ->first();
        }else{
            $query = Helios::where('type', self::TYPE_PING_SERVER)
                ->where('server', $server)
                ->where('status', '0')
                ->orderBy('created_date', 'desc')
                ->first();
        }

	    if(!$query){
            return 'N/A';
        }

        $date1 = @$query->created_date;
        $date2 = date('Y-m-d h:m:i');

        $diff = abs(strtotime($date2) - strtotime($date1));

        $years  = floor($diff / (365*60*60*24));
        $months = floor(($diff - $years * 365*60*60*24) / (30*60*60*24));
        $days   = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24)/ (60*60*24));
        $hours  = floor(($diff - $years * 365*60*60*24 - $months*30*60*60*24)/ (60*60*24) * 24);

        $result = '';
        if($hours < 24){
            $result .= $hours.' hours ';
        }else{
            $result .= $days.' days ';
        }

        return $result;
    }

}