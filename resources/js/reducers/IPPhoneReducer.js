import * as ACTION_TYPES from './../actions/ActionTypes'

var initialState = {data: null};

let ipphoneReducer = (state = initialState , action) => {
    switch (action.type) {
        case ACTION_TYPES.IPPHONE_DATA_TRACKING:
        {
            return {...state, data: action.data}
        }
        default:
            return state
    }
};

export default ipphoneReducer;