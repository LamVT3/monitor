import * as ACTION_TYPES from './../actions/ActionTypes'

var initialState = {data: null, data_widget: null};

let heliosReducer = (state = initialState , action) => {
    switch (action.type) {
        case ACTION_TYPES.HELIOS_DATA_TRACKING:
        {
            return {...state, data: action.data}
        }
        case ACTION_TYPES.HELIOS_DATA_WIDGET:
        {
            return {...state, data_widget: action.data}
        }
        default:
            return state
    }
};

export default heliosReducer;