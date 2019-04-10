import {createStore} from "redux";
import {config} from "./actions/ConfigAction.js";
import trackingReducer from "./reducers/ConfigReducer";


const store = createStore(trackingReducer);

console.log('DEFAULT: ', store.getState());

store.dispatch(config());

console.log('CHANGE: ', store.getState());