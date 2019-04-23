import {combineReducers} from "redux";
import heliosReducer from './HeliosReducer'
import ipphoneReducer from "./IPPhoneReducer";


const masterReducer = combineReducers({
    heliosReducer : heliosReducer,
    ipphoneReducer : ipphoneReducer
});

export default masterReducer;