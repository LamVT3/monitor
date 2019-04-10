import {combineReducers} from "redux";
import heliosReducer from './HeliosReducer'


const masterReducer = combineReducers({
    heliosReducer : heliosReducer
});

export default masterReducer;