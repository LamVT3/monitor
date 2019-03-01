import React, { Component } from 'react';
import {HashRouter, Redirect} from "react-router-dom";
import axios            from 'axios';
import {Button, Modal}  from 'react-bootstrap';
import Popup from 'react-popup';

class Report extends Component {
    constructor(props) {
        super(props);
        this.monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];

        this.state = {
            contact_month: '',
            server_1_month: '',
            server_2_month: '',
            server_3_month: '',
            server_4_month: '',
            server_5_month: '',
        };

        this.setChart = this.setChart.bind(this);
        this.initDropdown = this.initDropdown.bind(this);

        this.initPingContactsChart  = this.initPingContactsChart.bind(this);
        this.initAllPingServerChart = this.initAllPingServerChart.bind(this);
        this.initPingServerChart    = this.initPingServerChart.bind(this);
    }

    componentDidMount(){
        let d = new Date();
        let month = d.getMonth();

        this.initPingContactsChart(month);
        this.initAllPingServerChart(month);
    }

    componentWillUnmount() {

    }

    render() {
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
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-success">{this.monthNames[this.state.contact_month]}</button>
                                            <button type="button" className="btn btn-success dropdown-toggle"
                                                    data-toggle="dropdown">
                                                <span className="caret"></span>
                                                <span className="sr-only">Toggle Dropdown</span>
                                            </button>
                                            <ul className="dropdown-menu" role="menu">
                                                {
                                                    this.initDropdown(0)
                                                }
                                            </ul>
                                        </div>
                                        <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                            <i className="fa fa-minus"></i>
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
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-warning">{this.monthNames[this.state.server_1_month]}</button>
                                            <button type="button" className="btn btn-warning dropdown-toggle"
                                                    data-toggle="dropdown">
                                                <span className="caret"></span>
                                                <span className="sr-only">Toggle Dropdown</span>
                                            </button>
                                            <ul className="dropdown-menu" role="menu">
                                                {
                                                    this.initDropdown(1, 1)
                                                }
                                            </ul>
                                        </div>
                                        <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                            <i className="fa fa-minus"></i>
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
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-warning">{this.monthNames[this.state.server_2_month]}</button>
                                            <button type="button" className="btn btn-warning dropdown-toggle"
                                                    data-toggle="dropdown">
                                                <span className="caret"></span>
                                                <span className="sr-only">Toggle Dropdown</span>
                                            </button>
                                            <ul className="dropdown-menu" role="menu">
                                                {
                                                    this.initDropdown(1, 2)
                                                }
                                            </ul>
                                        </div>
                                        <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                            <i className="fa fa-minus"></i>
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
                                        <div className="btn-group">
                                            <button type="button" id="contact_month" className="btn btn-warning">{this.monthNames[this.state.server_3_month]}</button>
                                            <button type="button" className="btn btn-warning dropdown-toggle"
                                                    data-toggle="dropdown">
                                                <span className="caret"></span>
                                                <span className="sr-only">Toggle Dropdown</span>
                                            </button>
                                            <ul className="dropdown-menu" role="menu">
                                                {
                                                    this.initDropdown(1, 3)
                                                }
                                            </ul>
                                        </div>
                                        <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                            <i className="fa fa-minus"></i>
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
                                        <div className="btn-group">
                                            <button type="button" id="contact_month" className="btn btn-warning">{this.monthNames[this.state.server_4_month]}</button>
                                            <button type="button" className="btn btn-warning dropdown-toggle"
                                                    data-toggle="dropdown">
                                                <span className="caret"></span>
                                                <span className="sr-only">Toggle Dropdown</span>
                                            </button>
                                            <ul className="dropdown-menu" role="menu">
                                                {
                                                    this.initDropdown(1, 4)
                                                }
                                            </ul>
                                        </div>
                                        <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                            <i className="fa fa-minus"></i>
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
                                        <div className="btn-group">
                                            <button type="button" id="contact_month" className="btn btn-warning">{this.monthNames[this.state.server_5_month]}</button>
                                            <button type="button" className="btn btn-warning dropdown-toggle"
                                                    data-toggle="dropdown">
                                                <span className="caret"></span>
                                                <span className="sr-only">Toggle Dropdown</span>
                                            </button>
                                            <ul className="dropdown-menu" role="menu">
                                                {
                                                    this.initDropdown(1, 5)
                                                }
                                            </ul>
                                        </div>
                                        <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                            <i className="fa fa-minus"></i>
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

    initPingContactsChart(month) {
        axios.get('/api/report/get-ping-contact', {params: {month: month + 1}})
            .then(response => {
                if (response.data.success === true){
                    this.setState({
                        contact_month: month,
                    });

                    var d = new Date();
                    var currentMonth    = month;
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
                }else
                    console.log(response.data.message);

            }).catch(error => {
            // LOG.error(error);
            console.log(error);
        });
    }

    initAllPingServerChart(month) {
        this.initPingServerChart(month, 1);
        this.initPingServerChart(month, 2);
        this.initPingServerChart(month, 3);
        this.initPingServerChart(month, 4);
        this.initPingServerChart(month, 5);
    }

    initPingServerChart(month, server){
        axios.get('/api/report/get-ping-server',{params: {month: month + 1, serverNum: server}})
            .then(response => {
                if (response.data.success === true){
                    var d = new Date();
                    var currentMonth    = month;
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

                    if(server == 1){
                        this.setState({
                            server_1_month: month,
                        });
                        this.setChart('ping-server-1', data, response.data.result.server);
                    }else if(server == 2){
                        this.setState({
                            server_2_month: month,
                        });
                        this.setChart('ping-server-2', data, response.data.result.server);
                    }else if(server == 3){
                        this.setState({
                            server_3_month: month,
                        });
                        this.setChart('ping-server-3', data, response.data.result.server);
                    }else if(server == 4){
                        this.setState({
                            server_4_month: month,
                        });
                        this.setChart('ping-server-4', data, response.data.result.server);
                    }else if(server == 5){
                        this.setState({
                            server_5_month: month,
                        });
                        this.setChart('ping-server-5', data, response.data.result.server);
                    }

                }else
                    console.log(response.data.message);

            }).catch(error => {
            // LOG.error(error);
            console.log(error);
        });
    }

    initDropdown(type, serverNum){
        var _this = this;
        let rs = [];
        if(type == 0){
            for (let i = 0; i < 12; i++) {
                rs.push(<li key={i} id="month" value={i+1}><a href="#" onClick={()=>{
                    _this.initPingContactsChart(i);
                }}>{_this.monthNames[i]}</a></li>);
            }
        }else if(type == 1){
            for (let i = 0; i < 12; i++) {
                rs.push(<li key={i} id="month" value={i+1}><a href="#" onClick={(e)=>{
                    e.preventDefault();
                    _this.initPingServerChart(i, serverNum);
                }}>{_this.monthNames[i]}</a></li>);
            }
        }
        return rs;
    }
}

export default Report;

