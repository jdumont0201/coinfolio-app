import {Component, ElementRef, Injectable, OnInit, ViewChild} from '@angular/core';
import {RequestService} from '../../../../lib/globalton/core/services/request.service';
import {DataService} from "../../../../lib/localton/services/data.service";

import {Logic} from "../../../../logic/Logic";
import {StockChart, Chart} from 'angular-highcharts';
import {AppConfigService} from "../../../../lib/localton/services/appconfig.service";
import {MatTableDataSource} from '@angular/material';
import {EventService} from "../../services/event.service";

export abstract class DataAndChartTemplate implements OnInit {

    displayedColumns
    dataSource;
    showDataTable = false;
    data: any = [];
    options: any;
    chart;
    isDataSourceArray;
    saveInstance(chartInstance) {
        this.highchart = chartInstance;
    }
    highchart;

    @ViewChild( 'myChart') myChart: ElementRef;
    stockChartDefOptions = {

        chart: {
            type: 'candlestick'
        },
        title: {
            text: 'Loading'
        },
        credits: {
            enabled: false
        }, rangeSelector: {
            selected: 4,
            inputEnabled: false,
            buttonTheme: {
                visibility: 'hidden'
            },
            labelStyle: {
                visibility: 'hidden'
            }
        },
        series: [{
            name: 'Line 1',
            data: [1, 1]
        }]
    }

    plainChartDefOptions = {

        chart: {
            type: 'column'
        },
        title: {
            text: 'Loading'
        },
        credits: {
            enabled: false
        }, rangeSelector: {
            selected: 4,
            inputEnabled: false,
            buttonTheme: {
                visibility: 'hidden'
            },
            labelStyle: {
                visibility: 'hidden'
            }
        },
        series: [{
            name: 'Line 1',
            data: [1, 1]
        }]
    }
    optionsBase: any;

    constructor(public logic: Logic, public appConfigService: AppConfigService, public eventService: EventService, public type?) {
        /*if (type === "stock") this.chart = new StockChart(this.stockChartDefOptions)
        if (type === "plain") this.chart = new Chart(this.plainChartDefOptions)
        else this.chart = new StockChart(this.stockChartDefOptions)
*/
        if (this.isDataSourceArray)
            this.dataSource = [];
        else {
            this.dataSource = new MatTableDataSource([]);
        }
        this.eventService.windowResizedEvent.subscribe((val) => {
            this.windowResized(val)
        })
    }

    draw() {
        if (this.type == "stock")
            this.chart = new StockChart(this.options);
        else
            this.chart = new Chart(this.options);

        console.log("[CHART] draw", this.options,this.type,this.chart,this.myChart)

    }

    /****************************************************************************
     *
     * RESIZE
     */
    isResizing=false;
    lastResize;
    redrawInterval;
    isResizeListenerStarted=false;
    startResizeListener(){
        this.isResizeListenerStarted=true;
        this.redrawInterval=setInterval(()=>{
            let d=new Date().getTime();
            console.log("lastresize",this.redrawInterval,d,this.lastResize,d-this.lastResize)
            if(d-this.lastResize>1000 ){
                console.log("reflow && clear",this.redrawInterval)
                //this.draw()
                this.highchart.reflow()
                this.highchart.redraw()
                this.isResizing=false;
                //for (var i = 1; i < this.redrawInterval; i++)
                    //window.clearInterval(i);
                window.clearInterval(this.redrawInterval)
                this.isResizeListenerStarted=false
            }
        },1000)
    }
    windowResized(val) {
        /**this.lastResize=new Date().getTime();
        this.isResizing=true;
        if(!this.isResizeListenerStarted)
            this.startResizeListener();
*/

    }

    ngOnInit() {
        this.updateData();
    }

    abstract updateData()

    checkData(): boolean {
        console.log("checkData data=", this.data)
        if (!this.data || this.data.length === 0) {
            this.showNotEnoughData()
            return false
        }
        else if (!this.isDataSourceArray)
            this.dataSource = new MatTableDataSource(this.data);
    }

    updateOptions(opt, key?) {
        if (key) {
            this.options[key] = this.optionsBase
            this.options[key] = Object.assign(this.options[key], opt);
        } else
            this.options = Object.assign(this.options, opt);
    };

    findLastUpdate() {

    }

    showNotEnoughData() {
        this.chart = new StockChart({
            chart: {
                type: 'candlestick'
            },
            title: {
                text: 'Not enough data. Please change plot options.'
            },
            credits: {
                enabled: false
            }, rangeSelector: {
                selected: 4,
                inputEnabled: false,
                buttonTheme: {
                    visibility: 'hidden'
                },
                labelStyle: {
                    visibility: 'hidden'
                }
            },
            series: [{
                name: 'Line 1',
                data: [1, 1]
            }]
        });
    }


}
