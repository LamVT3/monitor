import React, { Component, Fragment} from 'react';
import {connect} from 'react-redux'

class WidgetTracking extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        let rate = (this.props.rate * 100).toFixed();

        return(
            <Fragment>
                <div className="col-lg-3 col-xs-6">
                    <div className={(rate > 50) ? 'small-box bg-green' : 'small-box bg-red'}>
                        <div className="inner">
                            <h3>{rate}<sup style={{fontSize: 20 + 'px'}}>%</sup></h3>
                            <p>{this.props.server_name} - {this.props.server}</p>
                            <hr style={{margin: 0 + 'px'}}/>
                            <i><b>Capacity: </b>{this.props.capacity} | <b>RAM: </b>{this.props.ram}</i>
                        </div>
                        <div className="icon">
                            <i className={(rate > 50) ? 'ion ion-arrow-up-a' : 'ion ion-arrow-up-a'}></i>
                        </div>
                    </div>
                </div>
            </Fragment>
        )

    }
}

export default WidgetTracking