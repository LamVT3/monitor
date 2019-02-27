import React, { Component } from 'react';
import {HashRouter, Redirect} from "react-router-dom";
import Report from "./Report";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // let login = localStorage.getItem('jwt');
        // if (!login) {
        //     console.log('here');
        //     return (
        //             <div>
        //                 <Redirect to='/auth/login'/>
        //             </div>
        //     )
        // }

        return (
            <div>
                <Report />
            </div>

        );
    }
}

