import ReactDOM from "react-dom";
import React from "react";
import {
    Switch,
    BrowserRouter as Router,
    Route,
    hashHistory
}   from 'react-router-dom';

import Home from "./views/home/Home";
import Login                 from  './views/auth/Login';
import MainLayout from "./views/layout/MainLayout";
import LoginLayout from "./views/layout/LoginLayout";


if (document.getElementById('root')) {
    ReactDOM.render(
        (
            <Router>
                <Switch>
                    <Route path='/auth/'>
                        <LoginLayout>
                            <Route path="/auth/login" component={Login}/>
                        </LoginLayout>
                    </Route>

                    <Route path='/'>
                        <MainLayout>
                            <Route exact={true} path="/" component={Home}/>
                            {/*<Route path="/Logout" component={Logout}/>*/}
                        </MainLayout>
                    </Route>
                </Switch>
            </Router>
        )
        ,document.getElementById('root')
    );
}
