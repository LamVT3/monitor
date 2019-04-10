import {combineReducers} from "redux";
import tableTrackingReducer from './TableTrackingReducer.js'

const masterReducer = combineReducers({
    tableTrackingReducer : tableTrackingReducer
});

export default masterReducer;