import React, { Component } from 'react';
import {HashRouter, Redirect} from "react-router-dom";
import axios            from 'axios';
import {Button, Modal}  from 'react-bootstrap';
import Popup from 'react-popup';

class Helios extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_contact_table: '',
            data_ping_table: '',
            showModal: false,
            type: '',
        };
        this.close = this.close.bind(this);
        this.submit = this.submit.bind(this);
        this.handleConfigTrackingContact = this.handleConfigTrackingContact.bind(this);
        this.handleConfigTrackingPing = this.handleConfigTrackingPing.bind(this);
        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);

    }

    close() {
        this.setState({ showModal: false });
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            window.location.href = '/';
        }
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleConfigTrackingContact() {
        this.setState({ showModal: true, type: 'helios_contact'});

        axios.get('/api/helios/get-config-contact')
            .then(response => {
                if (response.data.result.status === 1){ $('#status').prop('checked', true); }
                $('#reciptent').val(response.data.result.reciptent);
                $('#interval').val(response.data.result.interval);

            }).catch(error => {
            // LOG.error(error);
            console.log(error);
        });
    }

    handleConfigTrackingPing() {
        this.setState({ showModal: true, type: 'helios_ping'});

        axios.get('/api/helios/get-config-ping')
            .then(response => {
                if (response.data.result.status === 1){ $('#status').prop('checked', true); }
                $('#reciptent').val(response.data.result.reciptent);
                $('#interval').val(response.data.result.interval);

            }).catch(error => {
            // LOG.error(error);
            console.log(error);
        });
    }

    submit(e) {
        e.preventDefault();
        let reciptent = $('#reciptent').val();
        let interval = $('#interval').val();
        let status = 0;
        if ($('#status').is(":checked"))
        {
            status = 1;
        }
        let type = $('#type').val();

        axios.post('/api/helios/config', {reciptent: reciptent, interval: interval, status: status, type: type}).then((response) => {
            console.log(response);
            this.setState({ showModal: false });

            Popup.create({
                title       : 'Success',
                content     : <p ref={this.setWrapperRef} dangerouslySetInnerHTML={{__html: 'Updated success!'}} />,
                buttons     : {
                    right: [{
                        text      : 'Ok',
                        className : 'btn-button',
                        action    : Popup.close()
                    }]
                }
            });

        })
    }

    componentDidMount(){
        axios.get('/api/helios/all')
            .then(response => {
                this.setState({
                    data_contact_table: response.data.result.results_contact,
                    data_ping_table: response.data.result.results_ping,
                });

                $('.helios_table').DataTable({
                    'paging'      : true,
                    'lengthChange': true,
                    'searching'   : true,
                    'order': [[ 0, 'desc' ]],
                    'info'        : true,
                    'autoWidth'   : true
                });

            }).catch(error => {
            // LOG.error(error);
            console.log(error);
        });

        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    render() {
        return (
            <div>
                <section className="content-header">
                    <h1>
                        <i className="fa fa-dashboard"> </i> Helios
                    </h1>
                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Tracking contacts</h3>
                                    <button onClick={this.handleConfigTrackingContact} className="pull-right btn btn-info"><i className="fa fa-gear"> </i> Config</button>
                                </div>
                                <div className="box-body">
                                    <table className="helios_table table table-bordered table-striped">
                                        <thead>
                                        <tr>
                                            <th>Created_date</th>
                                            <th>Check_from</th>
                                            <th>Check_to</th>
                                            <th>Status</th>
                                            <th>Sender</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            typeof this.state.data_contact_table !== 'undefined' &&
                                            this.state.data_contact_table !== '' &&
                                            this.state.data_contact_table.map(function(info,index){
                                                return (
                                                    <tr key={index}>
                                                        <td>{ info.created_date } </td>
                                                        <td>{ info.check_from }</td>
                                                        <td>{ info.check_to }</td>
                                                        <td><span className={"label " + info.status}>{ info.status }</span></td>
                                                        <td>{ info.sender }</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Tracking ping server</h3>
                                    <button onClick={this.handleConfigTrackingPing} className="pull-right btn btn-info"><i className="fa fa-gear"> </i> Config</button>
                                </div>
                                <div className="box-body">
                                    <table className="helios_table table table-bordered table-striped">
                                        <thead>
                                        <tr>
                                            <th>Created_date</th>
                                            <th>Status</th>
                                            <th>Server</th>
                                            <th>Sender</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            typeof this.state.data_ping_table !== 'undefined' &&
                                            this.state.data_ping_table !== '' &&
                                            this.state.data_ping_table.map(function(info,index){
                                                return (
                                                    <tr key={index}>
                                                        <td>{ info.created_date } </td>
                                                        <td><span className={"label " + info.status}>{ info.status }</span></td>
                                                        <td>{ info.server }</td>
                                                        <td>{ info.sender }</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Modal show={this.state.showModal} onHide={this.close} >
                    <Modal.Header closeButton>
                        <Modal.Title>Configuration</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form className="form-horizontal e_ajax_submit" onSubmit={this.submit}>
                            <div className="row">
                                <div className="col-md-12">
                                    <label>List recipients:</label>
                                    <textarea id="reciptent" className="form-control" rows="3" name="reciptent" placeholder="example1@topica.edu.vn;example2@topica.edu.vn;..."></textarea>
                                </div>

                                <div className="col-md-12 mt-10">
                                    <label>Set interval:</label>
                                    <select name="interval" id="interval" className="form-control">
                                        <option value="">Select time</option>
                                        <option value="15">15 minutes</option>
                                        <option value="30">30 minutes</option>
                                        <option value="45">45 minutes</option>
                                        <option value="60">1 hour</option>
                                    </select>
                                </div>
                                <div className="col-md-12 mt-10">
                                    <label>Running Status:</label>
                                    <div><input type="checkbox" id="status" className="icheck-minimal" name="status" /></div>
                                    <input type="hidden" id="type" defaultValue={this.state.type} />
                                </div>

                            </div>

                            <div className="modal-footer">
                                <button className="btn btn-success"><i className="fa fa-save"> </i> Save</button>
                                <button onClick={this.close} type="button" className="btn">Cancel</button>
                            </div>
                        </form>
                    </Modal.Body>
                </Modal>

            </div>

        );
    }
}

export default Helios;

