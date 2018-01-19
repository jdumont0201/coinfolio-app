import {AfterViewInit, Component, Injectable, Input, OnInit, ViewChild} from '@angular/core';
import {RequestService} from '../../../../lib/globalton/core/services/request.service';
import {DataService} from "../../../../lib/localton/services/data.service";

import {Logic} from "../../../../logic/Logic";
import {StockChart, Chart} from 'angular-highcharts';
import {AppConfigService} from "../../../../lib/localton/services/appconfig.service";
import {MatTableDataSource} from '@angular/material';
import {Refreshing} from "../Refreshing/component";
import {RefreshService} from "../../services/refresh.service";
import {EventService} from "../../services/event.service";
import {ConsoleService} from "../../../globalton/core/services/console.service";
import {RefreshedPage} from "../RefreshedPage/component";

export abstract class ZoomableRefreshable extends RefreshedPage implements AfterViewInit{
    @Input() isZoomed = false;
    constructor(public refreshService:RefreshService,public eventService:EventService,public consoleService:ConsoleService){
        super(refreshService,eventService,consoleService)
    }
    chartId;
    scrollY = window.scrollY;
    zoom() {
        console.log("full zoom",this.isZoomed)
        this.isZoomed = !this.isZoomed
        this.doZoom()
    }
    doZoom(){

        if (this.isZoomed) {
            this.scrollY = window.scrollY;
            window.scrollTo(0, 0);
            this.eventService.isTickerVisible=false
            this.eventService.enableFullscreen(this.chartId)
        }
        else {
            window.scrollTo(0, this.scrollY)
            this.eventService.isTickerVisible=true
            this.eventService.disableFullscreen(this.chartId)
        }
        setTimeout(() => {
            this.draw()
        }, 100)
    }
    ngAfterViewInit(){
        if(this.isZoomed) this.doZoom()
    }
    abstract draw()
}
