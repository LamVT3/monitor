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


if (document.getElementById('root')) {
    ReactDOM.render(
        (
            <Router>
                <Switch>
                    <Route path='/'>
                        <MainLayout>
                            <Route exact={true} path="/" component={Home}/>
                            <Route path="/report" component={Report}/>
                        </MainLayout>
                    </Route>
                </Switch>
            </Router>
        )
        ,document.getElementById('root')
    );
}
