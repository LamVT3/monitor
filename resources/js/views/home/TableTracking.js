import React, { Component, Fragment} from 'react';
import {connect} from 'react-redux'

class TableTracking extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <Fragment>
                <div className="box">
                    <div className="box-header">
                        <h3 className="box-title">{this.props.title}</h3>
                        <button onClick={()=>{this.props.onClickConfig(this.props.type)}} className="pull-right btn btn-info">
                            <i className="fa fa-gear"> </i> Config
                        </button>
                    </div>
                    <div className="box-body">
                        <table className="helios_table table table-bordered table-striped">
                            <thead>
                                <tr>
                                    {
                                        this.props.thead_data ? this.props.thead_data : null
                                    }
                                </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.tbody_data ? this.props.tbody_data : null
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    // return {
    //     tbody_data : state.tableTrackingReducer
    // }
};

export default (TableTracking)