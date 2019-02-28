import React, { Component } from 'react';
import {HashRouter, Redirect} from "react-router-dom";
import axios            from 'axios';
import {Button, Modal}  from 'react-bootstrap';
import Popup from 'react-popup';

class Report extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data_contact_table: '',
            data_ping_table: '',
            showModal: false,
            type: '',
        };
        this.setChart = this.setChart.bind(this);
        this.initPingContactsChart  = this.initPingContactsChart.bind(this);
        this.initPingServerChart    = this.initPingServerChart.bind(this);
        this.initPingServerChart1   = this.initPingServerChart1.bind(this);
        this.initPingServerChart2   = this.initPingServerChart2.bind(this);
        this.initPingServerChart3   = this.initPingServerChart3.bind(this);
        this.initPingServerChart4   = this.initPingServerChart4.bind(this);
        this.initPingServerChart5   = this.initPingServerChart5.bind(this);
    }

    componentDidMount(){
        this.initPingContactsChart();
        this.initPingServerChart();
    }

    componentWillUnmount() {

    }

    render() {
        // function initDropdown(){
        //     var rs = [];
        //     for (let i = 0; i < 12; i++) {
        //         rs.push(<li id="month" value=i><a href="javascript:void(0);">i</a></li>);
        //     }
        //
        //     return rs;
        // }

        return (
            <div>
                <section className="content-header">
                    <h1>
                        <i className="fa fa-area-chart"> </i> Report
                    </h1>
                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="box box-success box-solid">
                                <div className="box-header">
                                    <h3 className="box-title">Tracking Contact</h3>
                                    <div className="box-tools pull-right">
                                        {/*<div className="btn-group">*/}
                                            {/*<button type="button" className="btn btn-success">Action</button>*/}
                                            {/*<button type="button" className="btn btn-success dropdown-toggle"*/}
                                                    {/*data-toggle="dropdown">*/}
                                                {/*<span className="caret"></span>*/}
                                                {/*<span className="sr-only">Toggle Dropdown</span>*/}
                                            {/*</button>*/}
                                            {/*<ul className="dropdown-menu" role="menu">*/}
                                                {/*{*/}
                                                    {/*initDropdown()*/}
                                                {/*}*/}
                                            {/*</ul>*/}
                                        {/*</div>*/}
                                        <button type="button" className="btn btn-box-tool" data-widget="collapse"><i
                                            className="fa fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div id="ping-contact-chart"></div>
                                </div>
                            </div>

                            <div className="box box-warning box-solid">
                                <div className="box-header">
                                    <h3 className="box-title">Tracking Server</h3>
                                    <div className="box-tools pull-right">
                                        <button type="button" className="btn btn-box-tool" data-widget="collapse"><i
                                            className="fa fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div id="ping-server-1"></div>
                                </div>
                            </div>

                            <div className="box box-warning box-solid">
                                <div className="box-header">
                                    <h3 className="box-title">Tracking Server</h3>
                                    <div className="box-tools pull-right">
                                        <button type="button" className="btn btn-box-tool" data-widget="collapse"><i
                                            className="fa fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div id="ping-server-2"></div>
                                </div>
                            </div>

                            <div className="box box-warning box-solid">
                                <div className="box-header">
                                    <h3 className="box-title">Tracking Server</h3>
                                    <div className="box-tools pull-right">
                                        <button type="button" className="btn btn-box-tool" data-widget="collapse"><i
                                            className="fa fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div id="ping-server-3"></div>
                                </div>
                            </div>

                            <div className="box box-warning box-solid">
                                <div className="box-header">
                                    <h3 className="box-title">Tracking Server</h3>
                                    <div className="box-tools pull-right">
                                        <button type="button" className="btn btn-box-tool" data-widget="collapse"><i
                                            className="fa fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div id="ping-server-4"></div>
                                </div>
                            </div>

                            <div className="box box-warning box-solid">
                                <div className="box-header">
                                    <h3 className="box-title">Tracking Server</h3>
                                    <div className="box-tools pull-right">
                                        <button type="button" className="btn btn-box-tool" data-widget="collapse"><i
                                            className="fa fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div id="ping-server-5"></div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </div>
        );
    }

    setChart(item, data, chart_name){
        var chart = new CanvasJS.Chart(item, {
            animationEnabled: true,
            theme: "light2",
            title:{
                text: chart_name
            },
            axisX:{
                valueFormatString: "DD MMM",
                crosshair: {
                    enabled: true,
                    snapToDataPoint: true
                }
            },
            axisY: {
                title: 'Number of Tracking',
                // crosshair: {
                //     enabled: true
                // }
            },
            toolTip:{
                shared:true
            },
            legend:{
                cursor:"pointer",
                verticalAlign: "bottom",
                horizontalAlign: "left",
                dockInsidePlotArea: true,
                itemclick: function (e){
                    if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
                        e.dataSeries.visible = false;
                    } else{
                        e.dataSeries.visible = true;
                    }
                    chart.render();
                }
            },
            data: [{
                type: "line",
                showInLegend: true,
                name: 'Fail',
                markerType: "square",
                xValueFormatString: "DD MMM, YYYY",
                color: "#F08080",
                dataPoints: data.fail
            },
            {
                type: "line",
                showInLegend: true,
                name: 'Pass',
                lineDashType: "dash",
                dataPoints: data.pass
            }]
        });
        chart.render();
    }

    initPingContactsChart() {
        axios.get('/api/report/get-ping-contact')
            .then(response => {
                var d = new Date();
                var currentMonth    = d.getMonth();
                var currentYear     = d.getFullYear();

                var data = {};
                data.pass = response.data.result.results_contact_pass;
                data.fail = response.data.result.results_contact_fail;

                data.pass.forEach(function(item) {
                    item.x = new Date(currentYear, currentMonth, item.x);
                });

                data.fail.forEach(function(item) {
                    item.x = new Date(currentYear, currentMonth, item.x);
                });

                this.setChart('ping-contact-chart', data, 'Tracking Contact');

            }).catch(error => {
            // LOG.error(error);
            console.log(error);
        });
    }

    initPingServerChart() {
        this.initPingServerChart1();
        this.initPingServerChart2();
        this.initPingServerChart3();
        this.initPingServerChart4();
        this.initPingServerChart5();
    }

    initPingServerChart1(){
        axios.get('/api/report/get-ping-server-1')
            .then(response => {
                var d = new Date();
                var currentMonth    = d.getMonth();
                var currentYear     = d.getFullYear();

                var data = {};
                data.pass = response.data.result.pass;
                data.fail = response.data.result.fail;

                data.pass.forEach(function(item) {
                    item.x = new Date(currentYear, currentMonth, item.x);
                });

                data.fail.forEach(function(item) {
                    item.x = new Date(currentYear, currentMonth, item.x);
                });

                this.setChart('ping-server-1', data, response.data.result.server);

            }).catch(error => {
            // LOG.error(error);
            console.log(error);
        });
    }

    initPingServerChart2(){
        axios.get('/api/report/get-ping-server-2')
            .then(response => {
                var d = new Date();
                var currentMonth    = d.getMonth();
                var currentYear     = d.getFullYear();

                var data = {};
                data.pass = response.data.result.pass;
                data.fail = response.data.result.fail;

                data.pass.forEach(function(item) {
                    item.x = new Date(currentYear, currentMonth, item.x);
                });

                data.fail.forEach(function(item) {
                    item.x = new Date(currentYear, currentMonth, item.x);
                });

                this.setChart('ping-server-2', data, response.data.result.server);

            }).catch(error => {
            // LOG.error(error);
            console.log(error);
        });
    }

    initPingServerChart3(){
        axios.get('/api/report/get-ping-server-3')
            .then(response => {
                var d = new Date();
                var currentMonth    = d.getMonth();
                var currentYear     = d.getFullYear();

                var data = {};
                data.pass = response.data.result.pass;
                data.fail = response.data.result.fail;

                data.pass.forEach(function(item) {
                    item.x = new Date(currentYear, currentMonth, item.x);
                });

                data.fail.forEach(function(item) {
                    item.x = new Date(currentYear, currentMonth, item.x);
                });

                this.setChart('ping-server-3', data, response.data.result.server);

            }).catch(error => {
            // LOG.error(error);
            console.log(error);
        });
    }

    initPingServerChart4(){
        axios.get('/api/report/get-ping-server-4')
            .then(response => {
                var d = new Date();
                var currentMonth    = d.getMonth();
                var currentYear     = d.getFullYear();

                var data = {};
                data.pass = response.data.result.pass;
                data.fail = response.data.result.fail;

                data.pass.forEach(function(item) {
                    item.x = new Date(currentYear, currentMonth, item.x);
                });

                data.fail.forEach(function(item) {
                    item.x = new Date(currentYear, currentMonth, item.x);
                });

                this.setChart('ping-server-4', data, response.data.result.server);

            }).catch(error => {
            // LOG.error(error);
            console.log(error);
        });
    }

    initPingServerChart5(){
        axios.get('/api/report/get-ping-server-5')
            .then(response => {
                var d = new Date();
                var currentMonth    = d.getMonth();
                var currentYear     = d.getFullYear();

                var data = {};
                data.pass = response.data.result.pass;
                data.fail = response.data.result.fail;

                data.pass.forEach(function(item) {
                    item.x = new Date(currentYear, currentMonth, item.x);
                });

                data.fail.forEach(function(item) {
                    item.x = new Date(currentYear, currentMonth, item.x);
                });

                this.setChart('ping-server-5', data, response.data.result.server);

            }).catch(error => {
            // LOG.error(error);
            console.log(error);
        });
    }

}

export default Report;

