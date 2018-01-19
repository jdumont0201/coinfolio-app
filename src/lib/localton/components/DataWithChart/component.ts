import {Component, ComponentFactoryResolver, ElementRef, Injectable, OnInit, ViewChild} from '@angular/core';
import {RequestService} from '../../../../lib/globalton/core/services/request.service';
import {DataService} from "../../../../lib/localton/services/data.service";

import {Logic} from "../../../../logic/Logic";
import {StockChart, Chart} from 'angular-highcharts';
import {AppConfigService} from "../../../../lib/localton/services/appconfig.service";
import {MatTableDataSource} from '@angular/material';
import {EventService} from "../../services/event.service";
import {RefreshedPage} from "../RefreshedPage/component";
import {RefreshService} from "../../services/refresh.service";
import {ConsoleService} from "../../../globalton/core/services/console.service";
import {ZoomableRefreshable} from "../ZoomableRefreshable/component";

export abstract class DataAndChartTemplate extends ZoomableRefreshable implements OnInit {

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

    @ViewChild('myChart') myChart: ElementRef;
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

    constructor( public consoleService:ConsoleService  ,public refreshService:RefreshService,public logic: Logic, public appConfigService: AppConfigService, public eventService: EventService, public type?) {
        super(refreshService,eventService,consoleService)
        /*if (type === "stock") this.pair-chart = new StockChart(this.stockChartDefOptions)
        if (type === "plain") this.pair-chart = new Chart(this.plainChartDefOptions)
        else this.pair-chart = new StockChart(this.stockChartDefOptions)
*/this.chartId=Math.round(Math.random()*100000)
        if (this.isDataSourceArray)
            this.dataSource = [];
        else {
            this.dataSource = new MatTableDataSource([]);
        }
        this.eventService.windowResizedEvent.subscribe((val) => {
            this.windowResized(val)
        })
    }

    oldParentViewContainerRef;
    newParentViewContainerRef;



    backupData;

    setData(data, options) {
        this.data = data;
        this.backupData = data;

    }



    draw() {
        this.options = JSON.parse(this.backupOptions);
        if (this.type == "stock")
            this.chart = new StockChart(this.options);
        else
            this.chart = new Chart(this.options);
        //console.log("draw" ,JSON.stringify(this.options))
        //console.log("[CHART] draw", this.options, this.type, this.pair-chart, this.myChart, this.backupOptions)

    }

    /****************************************************************************
     *
     * RESIZE
     */
    isResizing = false;
    lastResize;
    redrawInterval;
    isResizeListenerStarted = false;

    startResizeListener() {
        this.isResizeListenerStarted = true;
        this.redrawInterval = setInterval(() => {
            let d = new Date().getTime();
            console.log("lastresize", this.redrawInterval, d, this.lastResize, d - this.lastResize)
            if (d - this.lastResize > 1000) {
                console.log("reflow && clear", this.redrawInterval)
                //this.draw()
                this.highchart.reflow()
                this.highchart.redraw()
                this.isResizing = false;
                //for (var i = 1; i < this.redrawInterval; i++)
                //window.clearInterval(i);
                window.clearInterval(this.redrawInterval)
                this.isResizeListenerStarted = false
            }
        }, 1000)
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

        if (!this.data || this.data.length === 0) {
            this.showNotEnoughData()
            return false
        }
        else if (!this.isDataSourceArray)
            this.dataSource = new MatTableDataSource(this.data);
    }

    backupOptions: string;

    updateOptions(opt, key?) {

       if (key) {
            this.options[key] = this.optionsBase
            this.options[key] = Object.assign(this.options[key], opt);
        } else
            this.options = Object.assign(this.options, opt);
        this.backupOptions = JSON.stringify(this.options)

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


    tabIndex: number = 0;
    tabChanged(event) {
        this.tabIndex = event.index
        console.log("tabchanged", this.tabIndex)
    }
    @ViewChild("tabGroup") tabGroup;
    setTab(n: number) {
        console.log("thistg", this.tabGroup)
        if(!this.tabGroup) console.error("is tabgroup set on template?")
        else{
        let nbtabs=this.tabGroup._tabs._results.length;
        if(n<0)
            n=nbtabs-1;
        this.tabGroup.selectedIndex = n
        }
    }

}
