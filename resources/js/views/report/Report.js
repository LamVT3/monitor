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
            data    : null
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
        let list_server_chart = '';
        let _this = this;

        if(this.state.data !== null){

            let data = this.state.data;
            list_server_chart = Object.keys(data).map(function(key){
                return (
                    <div key={key} className="box box-warning box-solid">
                        <div className="box-header">
                            <h3 className="box-title">{data[key].name}</h3>
                            <div className="box-tools pull-right">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-warning dropdown-toggle"
                                        data-toggle="dropdown">{_this.monthNames[data[key].month]}
                                    </button>
                                    <ul className="dropdown-menu" role="menu">
                                        {
                                            _this.initDropdown(1, _this.state.data[key].name)
                                        }
                                    </ul>
                                </div>
                                <button type="button" className="btn btn-box-tool" data-widget="collapse">
                                    <i className="fa fa-minus"></i>
                                </button>
                            </div>
                        </div>
                        <div className="box-body">
                            <div className="helios_chart" id={key}></div>
                        </div>
                    </div>
                )
            })
        }

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

                            {list_server_chart}

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
                interval: 1,
                intervalType: "day",
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
                            item.indexLabel     = (item.y * 100).toFixed(1) + '%';
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
                    this.setState({
                        data    : data,
                    });

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
                                item.indexLabel     = (item.y * 100).toFixed(1) + '%';
                                item.markerType     = 'cross';
                                item.markerColor    = 'tomato';
                            }
                        });

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
                                item.indexLabel     = (item.y * 100).toFixed(1) + '%';
                                item.markerType     = 'cross';
                                item.markerColor    = 'tomato';
                            }
                        });

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

