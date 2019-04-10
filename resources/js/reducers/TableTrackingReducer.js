import * as ACTION_TYPES from './../actions/TrackingActionTypes'
import axios from "axios";

let initialState = [];

let tableTrackingReducer = (state = initialState , action) => {
    switch (action.type) {
        case ACTION_TYPES.LIST_ALL:
        {

            return state
        }
        default:
            return state
    }
};

export default tableTrackingReducer;