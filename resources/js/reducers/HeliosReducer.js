import * as ACTION_TYPES from './../actions/ActionTypes'

var initialState = {data: null};

let heliosReducer = (state = initialState , action) => {
    switch (action.type) {
        case ACTION_TYPES.HELIOS_DATA_TRACKING:
        {
            return {data: action.data}
        }
        default:
            return state
    }
};

export default heliosReducer;