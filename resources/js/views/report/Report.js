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
        this.initPingContactsChart = this.initPingContactsChart.bind(this);
        // this.handleConfigTrackingContact = this.handleConfigTrackingContact.bind(this);
        // this.handleConfigTrackingPing = this.handleConfigTrackingPing.bind(this);
        // this.setWrapperRef = this.setWrapperRef.bind(this);
        // this.handleClickOutside = this.handleClickOutside.bind(this);

    }

    componentDidMount(){
        this.initPingContactsChart();
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <section className="content-header">
                    <h1>
                        <i className="fa fa-dashboard"> </i> Report
                    </h1>
                </section>

                <section className="content">
                    <div className="row">
                        <div className="col-md-12 col-sm-12 col-xs-12">
                            <div className="box">
                                <div className="box-header">
                                    <h3 className="box-title">Tracking contacts</h3>
                                </div>
                                <div className="box-body">
                                    <div id="chartContainer"></div>
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
                crosshair: {
                    enabled: true
                }
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

                this.setChart('chartContainer', data, 'Tracking contacts');

            }).catch(error => {
            // LOG.error(error);
            console.log(error);
        });
    }

}

export default Report;

