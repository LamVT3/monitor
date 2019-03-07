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
            db01                  : '',
            db02                  : '',
            db03                  : '',
            shipper               : '',
            web_portal            : '',
            public_api            : '',
            monitor               : '',
            private_api_worker    : '',
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
                                            <button type="button" className="btn btn-success"></button>
                                            <button type="button" className="btn btn-success dropdown-toggle"
                                                    data-toggle="dropdown">{this.monthNames[this.state.contact_month]}
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
                                    <div className="helios_chart" id="ping-contact-chart"></div>
                                </div>
                            </div>

                            <div className="box box-warning box-solid">
                                <div className="box-header">
                                    <h3 className="box-title">{this.state.db01.name}</h3>
                                    <div className="box-tools pull-right">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-warning dropdown-toggle"
                                                    data-toggle="dropdown">{this.monthNames[this.state.db01.month]}
                                            </button>
                                            <ul className="dropdown-menu" role="menu">
                                                {
                                                    this.initDropdown(1, this.state.db01.name)
                                                }
                                            </ul>
                                        </div>
                                        <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                            <i className="fa fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="helios_chart" id="db01"></div>
                                </div>
                            </div>

                            <div className="box box-warning box-solid">
                                <div className="box-header">
                                    <h3 className="box-title">{this.state.db02.name}</h3>
                                    <div className="box-tools pull-right">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-warning dropdown-toggle"
                                                    data-toggle="dropdown">{this.monthNames[this.state.db02.month]}
                                            </button>
                                            <ul className="dropdown-menu" role="menu">
                                                {
                                                    this.initDropdown(1, this.state.db02.name)
                                                }
                                            </ul>
                                        </div>
                                        <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                            <i className="fa fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="helios_chart" id="db02"></div>
                                </div>
                            </div>

                            <div className="box box-warning box-solid">
                                <div className="box-header">
                                    <h3 className="box-title">{this.state.db03.name}</h3>
                                    <div className="box-tools pull-right">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-warning dropdown-toggle"
                                                    data-toggle="dropdown">{this.monthNames[this.state.db03.month]}
                                            </button>
                                            <ul className="dropdown-menu" role="menu">
                                                {
                                                    this.initDropdown(1, this.state.db03.name)
                                                }
                                            </ul>
                                        </div>
                                        <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                            <i className="fa fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="helios_chart" id="db03"></div>
                                </div>
                            </div>

                            <div className="box box-warning box-solid">
                                <div className="box-header">
                                    <h3 className="box-title">{this.state.shipper.name}</h3>
                                    <div className="box-tools pull-right">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-warning dropdown-toggle"
                                                    data-toggle="dropdown">{this.monthNames[this.state.shipper.month]}
                                            </button>
                                            <ul className="dropdown-menu" role="menu">
                                                {
                                                    this.initDropdown(1, this.state.shipper.name)
                                                }
                                            </ul>
                                        </div>
                                        <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                            <i className="fa fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="helios_chart" id="shipper"></div>
                                </div>
                            </div>

                            <div className="box box-warning box-solid">
                                <div className="box-header">
                                    <h3 className="box-title">{this.state.web_portal.name}</h3>
                                    <div className="box-tools pull-right">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-warning dropdown-toggle"
                                                    data-toggle="dropdown">{this.monthNames[this.state.web_portal.month]}
                                            </button>
                                            <ul className="dropdown-menu" role="menu">
                                                {
                                                    this.initDropdown(1, this.state.web_portal.name)
                                                }
                                            </ul>
                                        </div>
                                        <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                            <i className="fa fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="helios_chart" id="web-portal"></div>
                                </div>
                            </div>

                            <div className="box box-warning box-solid">
                                <div className="box-header">
                                    <h3 className="box-title">{this.state.public_api.name}</h3>
                                    <div className="box-tools pull-right">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-warning dropdown-toggle"
                                                    data-toggle="dropdown">{this.monthNames[this.state.public_api.month]}
                                            </button>
                                            <ul className="dropdown-menu" role="menu">
                                                {
                                                    this.initDropdown(1, this.state.public_api.name)
                                                }
                                            </ul>
                                        </div>
                                        <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                            <i className="fa fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="helios_chart" id="public-api"></div>
                                </div>
                            </div>

                            <div className="box box-warning box-solid">
                                <div className="box-header">
                                    <h3 className="box-title">{this.state.monitor.name}</h3>
                                    <div className="box-tools pull-right">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-warning dropdown-toggle"
                                                    data-toggle="dropdown">{this.monthNames[this.state.monitor.month]}
                                            </button>
                                            <ul className="dropdown-menu" role="menu">
                                                {
                                                    this.initDropdown(1, this.state.monitor.name)
                                                }
                                            </ul>
                                        </div>
                                        <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                            <i className="fa fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="helios_chart" id="monitor"></div>
                                </div>
                            </div>

                            <div className="box box-warning box-solid">
                                <div className="box-header">
                                    <h3 className="box-title">{this.state.private_api_worker.name}</h3>
                                    <div className="box-tools pull-right">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-warning dropdown-toggle"
                                                    data-toggle="dropdown">{this.monthNames[this.state.private_api_worker.month]}
                                            </button>
                                            <ul className="dropdown-menu" role="menu">
                                                {
                                                    this.initDropdown(1, this.state.private_api_worker.name)
                                                }
                                            </ul>
                                        </div>
                                        <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                            <i className="fa fa-minus"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="box-body">
                                    <div className="helios_chart" id="private-api-worker"></div>
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
                title: '',
                valueFormatString: "#0%"
                // crosshair: {
                //     enabled: true
                // }
            },
            toolTip:{
                shared:true
            },
            legend:{
                cursor:"pointer",
                verticalAlign: "top",
                horizontalAlign: "right",
                // dockInsidePlotArea: true,
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
                name: 'Fail',
                visible: false,
                showInLegend: false,
                markerType: "square",
                xValueFormatString: "DD MMM, YYYY",
                yValueFormatString: "#0 (times)",
                color: "#F08080",
                dataPoints: data.fail
            },
            {
                type: "line",
                name: 'Pass',
                visible: false,
                showInLegend: false,
                color: "#1E90FF",
                // lineDashType: "dash",
                yValueFormatString: "#0 (times)",
                dataPoints: data.pass
            },
            {
                type: "line",
                showInLegend: false,
                name: 'Rate',
                color: "#00a65a",
                lineDashType: "dash",
                yValueFormatString: "0 (%)",
                dataPoints: data.rate
            }
            ]
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
                    data.rate = response.data.result.rate;


                    data.pass.forEach(function(item) {
                        item.x = new Date(currentYear, currentMonth, item.x);
                    });
                    data.fail.forEach(function(item) {
                        item.x = new Date(currentYear, currentMonth, item.x);
                    });
                    data.rate.forEach(function(item) {
                        item.x = new Date(currentYear, currentMonth, item.x);
                        if(item.y * 100 == 100){
                            item.indexLabel     = '100%';
                            item.markerType     = 'square';
                            item.markerColor    = '#00a65a';
                        }else{
                            item.indexLabel     = item.y * 100 + '%';
                            item.markerType     = 'cross';
                            item.markerColor    = 'tomato';
                        }
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
        axios.get('/api/report/get-ping-server',{params: {month: month + 1}})
            .then(response => {
                if (response.data.success === true){
                    let d = new Date();
                    let currentMonth    = month;
                    let currentYear     = d.getFullYear();
                    let _this = this;

                    var data = response.data.result;

                    Object.keys(data).forEach(function(key) {

                        data[key].pass.forEach(function(item) {
                            item.x = new Date(currentYear, currentMonth, item.x);
                        });
                        data[key].fail.forEach(function(item) {
                            item.x = new Date(currentYear, currentMonth, item.x);
                        });
                        data[key].rate.forEach(function(item) {
                            item.x = new Date(currentYear, currentMonth, item.x);
                            if(item.y * 100 == 100){
                                item.indexLabel     = '100%';
                                item.markerType     = 'square';
                                item.markerColor    = '#00a65a';
                            }else{
                                item.indexLabel     = item.y * 100 + '%';
                                item.markerType     = 'cross';
                                item.markerColor    = 'tomato';
                            }
                        });

                        if(key == 'db01'){
                            _this.setState({
                                db01    : {
                                    month   : month,
                                    name    : data[key].name
                                },
                            });
                        }else if(key == 'db02'){
                            _this.setState({
                                db02    : {
                                    month   : month,
                                    name    : data[key].name
                                },
                            });
                        }else if(key == 'db03'){
                            _this.setState({
                                db03    : {
                                    month   : month,
                                    name    : data[key].name
                                },
                            });
                        }else if(key == 'shipper'){
                            _this.setState({
                                shipper    : {
                                    month   : month,
                                    name    : data[key].name
                                },
                            });
                        }else if(key == 'web-portal'){
                            _this.setState({
                                web_portal    : {
                                    month   : month,
                                    name    : data[key].name
                                },
                            });
                        }else if(key == 'public-api'){
                            _this.setState({
                                public_api    : {
                                    month   : month,
                                    name    : data[key].name
                                },
                            });
                        }else if(key == 'monitor'){
                            _this.setState({
                                monitor    : {
                                    month   : month,
                                    name    : data[key].name
                                },
                            });
                        }else if(key == 'private-api-worker'){
                            _this.setState({
                                private_api_worker    : {
                                    month   : month,
                                    name    : data[key].name
                                },
                            });
                        }

                        _this.setChart(key, data[key], data[key].ip);

                    });

                }else
                    console.log(response.data.message);

            }).catch(error => {
            // LOG.error(error);
            console.log(error);
        });
    }

    initPingServerChart(month, serverName){
        axios.get('/api/report/get-ping-server',{params: {month: month + 1, serverName: serverName}})
            .then(response => {
                if (response.data.success === true){
                    let d = new Date();
                    let currentMonth    = month;
                    let currentYear     = d.getFullYear();
                    let _this = this;

                    var data = response.data.result;

                    Object.keys(data).forEach(function(key) {

                        data[key].pass.forEach(function(item) {
                            item.x = new Date(currentYear, currentMonth, item.x);
                        });
                        data[key].fail.forEach(function(item) {
                            item.x = new Date(currentYear, currentMonth, item.x);
                        });
                        data[key].rate.forEach(function(item) {
                            item.x = new Date(currentYear, currentMonth, item.x);
                            if(item.y * 100 == 100){
                                item.indexLabel     = '100%';
                                item.markerType     = 'square';
                                item.markerColor    = '#00a65a';
                            }else{
                                item.indexLabel     = item.y * 100 + '%';
                                item.markerType     = 'cross';
                                item.markerColor    = 'tomato';
                            }
                        });


                        if(key == 'db01'){
                            _this.setState({
                                db01    : {
                                    month   : month,
                                    name    : data[key].name
                                },
                            });
                        }else if(key == 'db02'){
                            _this.setState({
                                db02    : {
                                    month   : month,
                                    name    : data[key].name
                                },
                            });
                        }else if(key == 'db03'){
                            _this.setState({
                                db03    : {
                                    month   : month,
                                    name    : data[key].name
                                },
                            });
                        }else if(key == 'shipper'){
                            _this.setState({
                                shipper    : {
                                    month   : month,
                                    name    : data[key].name
                                },
                            });
                        }else if(key == 'web-portal'){
                            _this.setState({
                                web_portal    : {
                                    month   : month,
                                    name    : data[key].name
                                },
                            });
                        }else if(key == 'public-api'){
                            _this.setState({
                                public_api    : {
                                    month   : month,
                                    name    : data[key].name
                                },
                            });
                        }else if(key == 'monitor'){
                            _this.setState({
                                monitor    : {
                                    month   : month,
                                    name    : data[key].name
                                },
                            });
                        }else if(key == 'private-api-worker'){
                            _this.setState({
                                private_api_worker    : {
                                    month   : month,
                                    name    : data[key].name
                                },
                            });
                        }

                        _this.setChart(key, data[key], data[key].ip);

                    });

                }else
                    console.log(response.data.message);

            }).catch(error => {
            // LOG.error(error);
            console.log(error);
        });
    }

    initDropdown(type, serverName){
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
                    _this.initPingServerChart(i, serverName);
                }}>{_this.monthNames[i]}</a></li>);
            }
        }
        return rs;
    }
}

export default Report;

