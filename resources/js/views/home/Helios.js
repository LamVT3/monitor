import React, { Component, Fragment } from 'react';
import axios            from 'axios';
import {Modal}  from 'react-bootstrap';
import Helper from "@/helper/Helper";
import Popup from 'react-popup';
import TableTracking from "./TableTracking";
import WidgetTracking from "./WidgetTracking";
import {connect} from 'react-redux'
import * as ACTIONS from './../../actions/Actions'

class Helios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_table: null,
            data_widget:null,
            showModal: false
        };
        this.close = this.close.bind(this);
        this.submit = this.submit.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.onClickOutside = this.onClickOutside.bind(this);
        this.getDataWidget  = this.getDataWidget.bind(this);

    }

    close() {
        this.setState({ showModal: false }, () =>{
            console.log('close modal')
        });
    }

    onClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            // window.location.href = '/';
        }
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    onClickConfigTracking = (type) => {
        axios.get('/api/helios/get-config', {params: {type: type} })
            .then(response => {
                if (response.data.success === true){
                    this.setState({
                        showModal: true,
                        recipient: response.data.result.recipient,
                        interval: response.data.result.interval,
                        status: response.data.result.status,
                        type: response.data.result.type,
                    });
                }
                else{
                    Popup.alert(response.data.message);
                    console.log(response.data.message);
                }

            }).catch(error => {
            // LOG.error(error);
            console.log(error);
        });
    }

    onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        this.setState({
            [name] : value
        });
    }

    getDataWidget(){
        if (this.props.data_widget == null) {
            axios.get('/api/report/get-data-widget')
                .then(response => {
                    if (response.data.success === true){
                        this.props.setDataWidget(response.data.result);
                    }
                    else
                        console.log(response.data.message);

                }).catch(error => {
                // LOG.error(error);
                console.log(error);
            });
        }
    }

    submit(event) {
        event.preventDefault();
        let recipient = this.state.recipient;
        let interval = this.state.interval;
        let status = this.state.status;
        let type = this.state.type;

        axios.post('/api/helios/config', {recipient: recipient, interval: interval, status: status, type: type}).then((response) => {
            console.log(response);
            this.setState({ showModal: false });

            if (response.data.success === true){
                Popup.create({
                    title       : 'Success',
                    content     : <p ref={this.setWrapperRef} dangerouslySetInnerHTML={{__html: 'Updated success!'}} />,
                    buttons     : {
                        right: [{
                            text      : 'Ok',
                            className : 'btn-button',
                            action    : Popup.close
                        }]
                    }
                });
            } else{
                Popup.alert(response.data.message);
                console.log(response.data.message);
            }



        })
    }

    componentDidMount(){

        // this.getDataWidget();

        if (this.props.data_widget == null) {
            axios.get('/api/report/get-data-widget')
                .then(response => {
                    if (response.data.success === true){
                        this.props.setDataWidget(response.data.result);
                    }
                    else
                        console.log(response.data.message);

                }).catch(error => {
                // LOG.error(error);
                console.log(error);
            });
        }

        if (this.props.data_table == null) {
            axios.get('/api/helios/all')
                .then(response => {
                    if (response.data.success === true){
                        this.props.setDataTable(response.data.result);
                        // this.setState({
                        //     data_table: response.data.result,
                        // });

                        $('.helios_table').DataTable({
                            'paging'      : true,
                            'lengthChange': true,
                            'searching'   : true,
                            'order': [[ 0, 'desc' ]],
                            'info'        : true,
                            'autoWidth'   : true
                        });

                    }
                    else
                        console.log(response.data.message);

                }).catch(error => {
                // LOG.error(error);
                console.log(error);
            });
        }

        document.addEventListener('mousedown', this.onClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.onClickOutside);
    }

    render() {

        let thead_array = {
            "contact": ["Created_date", "Status", "Check_from", "Check_to", "Sender"],
            "ping": ["Created_date", "Status", "Server", "Sender"],
        };
        let thead_contact = thead_array['contact'].map(function (value,key) {
            return (<th key={key}>{value}</th>)
        });
        let thead_ping = thead_array['ping'].map(function (value,key) {
            return (<th key={key}>{value}</th>)
        });
        let tbody_contact = '';
        let tbody_ping = '';
        if (this.props.data_table !== null && this.props.data_table.results_contact !== null) {
            tbody_contact = this.props.data_table.results_contact.map(function(info,index){
                return (
                    <tr key={index}>
                        <td>{ info.created_date }</td>
                        <td><span style={{fontSize: '14px'}} className={"label " + (info.status === '1' ? 'Fail': 'Pass') }>{ info.status === '1' ? 'Fail': 'Pass' }</span></td>
                        <td>{ Helper.convertTimeStampToDate(info.check_from) }</td>
                        <td>{ Helper.convertTimeStampToDate(info.check_to) }</td>
                        <td>{ info.sender }</td>
                    </tr>
                )
            });
        }

        if (this.props.data_table !== null && this.props.data_table.results_ping !== null) {
            tbody_ping = this.props.data_table.results_ping.map(function(info,index){
                return (
                    <tr key={index}>
                        <td>{ info.created_date } </td>
                        <td><span style={{fontSize: '14px'}} className={"label " + (info.status === '1' ? 'Fail': 'Pass')}>{ info.status === '1' ? 'Fail': 'Pass' }</span></td>
                        <td>{ info.server + ' (' + info.server_name + ') ' }</td>
                        <td>{ info.sender }</td>
                    </tr>
                )
            })
        }

        let widgetTracking = '';
        if(this.props.data_widget !== null){
            widgetTracking = this.props.data_widget.map(function(info,index){
                return (
                    <WidgetTracking
                        key={index}
                        server_name={info.server_name}
                        server={info.server}
                        rate={info.rate}
                        message={info.message}
                    />
                    )
            })
        }

        return (
            <Fragment>
                <section className="content-header">
                    <h1>
                        <i className="fa fa-dashboard"> </i> Helios
                    </h1>
                </section>

                <section className="content">
                    <div className="row">
                        {widgetTracking}
                    </div>

                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <TableTracking
                                title="Tracking contacts"
                                thead_data={thead_contact}
                                tbody_data={tbody_contact}
                                type="helios-contact"
                                onClickConfig={this.onClickConfigTracking}
                            />

                            <TableTracking
                                title="Tracking ping server"
                                thead_data={thead_ping}
                                tbody_data={tbody_ping}
                                type="helios-ping"
                                onClickConfig={this.onClickConfigTracking}
                            />

                        </div>
                    </div>
                </section>
                <Modal show={this.state.showModal} onHide={this.close} >
                    <Modal.Header closeButton>
                        <Modal.Title>Configuration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row">
                            <div className="col-md-12">
                                <label>List recipients:</label>
                                <textarea className="form-control" onChange={this.onChange} defaultValue={this.state.recipient !== null ? this.state.recipient : ''} rows="3"
                                          name="recipient" placeholder="example1@topica.edu.vn;example2@topica.edu.vn;..."></textarea>
                            </div>

                            <div className="col-md-12 mt-10">
                                <label>Set interval:</label>
                                <select name="interval" onChange={this.onChange} className="form-control" defaultValue={this.state.interval !== null ? this.state.interval : ''}>
                                    <option value="">Select time</option>
                                    <option value="1">1 minutes</option>
                                    <option value="5">5 minutes</option>
                                    <option value="10">10 minutes</option>
                                    <option value="15">15 minutes</option>
                                    <option value="30">30 minutes</option>
                                    <option value="45">45 minutes</option>
                                </select>
                            </div>
                            <div className="col-md-12 mt-10">
                                <label>Running Status:</label>
                                <select name="status" onChange={this.onChange} className="form-control" defaultValue={this.state.status !== null ? this.state.status : ''}>
                                    <option value="0"> Active</option>
                                    <option value="1"> Inactive</option>
                                </select>
                            </div>
                            <div className="col-md-12 mt-10">
                                <input type="hidden" name="type" defaultValue={this.state.type !== null ? this.state.type : ''}/>
                            </div>

                        </div>

                        <div className="modal-footer">
                            <button className="btn btn-success" onClick={this.submit}><i className="fa fa-save"> </i> Save</button>
                            <button onClick={this.close} type="button" className="btn">Cancel</button>
                        </div>
                    </Modal.Body>
                </Modal>

            </Fragment>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        data_table : state.heliosReducer.data,
        data_widget : state.heliosReducer.data_widget
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        setDataTable: (result) => {
            dispatch(ACTIONS.dataTable(result));
        },
        setDataWidget: (result) => {
            dispatch(ACTIONS.dataWidget(result));
        },
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Helios);

