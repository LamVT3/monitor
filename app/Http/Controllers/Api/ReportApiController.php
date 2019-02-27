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

	public function getPingContact(){
		try {
            $data = $this->queryPingContact();
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

	private function queryPingContact(){
        $month  = date('m');
        $year   = date('Y');
        $days   = cal_days_in_month(CAL_GREGORIAN, $month, $year);

        $from   = date('Y-m-01');
        $to     = date('Y-m-t');

        $query = Helios::where('type', 0)
            ->where('created_date', '>', $from)
            ->where('created_date', '<=', $to)->get();

        $result = [];
        if(!is_null($query)){

            $results_contact_pass   = [];
            $results_contact_fail   = [];
            $data_contact_pass      = [];
            $data_contact_fail      = [];

            foreach ($query as $item){
                if($item->status == '0'){
                    $d = date("d", strtotime($item->created_date));
                    @$data_contact_pass[$d]++;
                }elseif ($item->status == '1'){
                    $d = date("d", strtotime($item->created_date));
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




}