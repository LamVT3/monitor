<?php
namespace App\Http\Utils\Debug;

use Illuminate\Support\Facades\Log;

class Debug {

    const DBG_LEVEL = Debug::DBG_LEVEL_DBG;

    const DBG_LEVEL_DBG     = 0;
    const DBG_LEVEL_INFO    = 1;
    const DBG_LEVEL_NORMAL  = 3;
    const DBG_LEVEL_WARN    = 4;
    const DBG_LEVEL_ERROR   = 5;
    const DBG_LEVEL_FATAL   = 6;

    public static function Dbg( $msg ){
        if( Debug::DBG_LEVEL <= Debug::DBG_LEVEL_DBG ){
            Log::debug( $msg );
        }
    }

    public static function Info( $msg ){
        if( Debug::DBG_LEVEL <= Debug::DBG_LEVEL_INFO ){
            Log::info( $msg );
        }
    }

    public static function Normal( $msg ){
        if( Debug::DBG_LEVEL <= Debug::DBG_LEVEL_NORMAL ){
            Log::notice( $msg );
        }
    }

    public static function Warn( $msg ){
        if( Debug::DBG_LEVEL <= Debug::DBG_LEVEL_WARN ){
            Log::warning( $msg );
        }
    }

    public static function Error( $msg ){
        if( Debug::DBG_LEVEL <= Debug::DBG_LEVEL_ERROR ){
            Log::error( $msg );
        }
    }

    public static function Fatal( $mag ){
        if( Debug::DBG_LEVEL <= Debug::DBG_LEVEL_FATAL ){
            Log::critical( $mag );
        }
    }

    public static function jsonPretty( $obj ) {
        return json_encode( $obj,
                JSON_UNESCAPED_UNICODE |
                JSON_UNESCAPED_SLASHES|
                JSON_PRETTY_PRINT );
    }
}
?>
