import React, { Component, Fragment} from 'react';
import Helios from "./Helios";

export default class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <Helios />
            </Fragment>

    );
    }
}

