import ReactDOM from "react-dom";
import React from "react";
import {
    Switch,
    BrowserRouter as Router,
    Route,
    hashHistory
}   from 'react-router-dom';

import Home from "./views/home/Home";
import Report from "./views/report/Report";
import MainLayout from "./views/layout/MainLayout";
import {createStore} from "redux";
import masterReducer from "./reducers/master";
import {Provider} from 'react-redux'
import IPPhone from "./views/home/IPPhone";
import Helios from "./views/home/Helios";

const masterStore = createStore(masterReducer);


if (document.getElementById('root')) {
    ReactDOM.render(
        (
            <Provider store={masterStore}>
                <Router>
                    <Switch>
                        <Route path='/'>
                            <MainLayout>
                                <Route exact={true} path="/" component={Home}/>
                                <Route path="/helios-table" component={Helios}/>
                                <Route path="/helios-report" component={Report}/>
                                <Route path="/ipphone-table" component={IPPhone}/>
                            </MainLayout>
                        </Route>
                    </Switch>
                </Router>
            </Provider>
        )
        ,document.getElementById('root')
    );
}
