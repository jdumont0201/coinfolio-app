import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {RequestService} from '../../../../lib/globalton/core/services/request.service';
import {DataService} from "../../../../lib/localton/services/data.service";

import {Logic} from "../../../../logic/Logic";
import {StockChart, Chart} from 'angular-highcharts';
import {AppConfigService} from "../../../../lib/localton/services/appconfig.service";
import {MatTableDataSource} from '@angular/material';

export abstract class RefreshedPage {
    loadTime;
    refreshInterval
    refreshTimerInterval
    refreshTimer;
    refreshEvery = 4000;
    isRefreshing = false;
    rfn=0;
    initRefresh(){
        this.refreshInterval = window.setInterval(() => {
            this.refreshTimer = this.refreshEvery;

            this.rfn++
            this.refreshData()
            //clearInterval(this.refreshInterval)
            //       clearInterval(this.refreshInterval)
        }, this.refreshEvery)
        this.refreshTimerInterval = window.setInterval(() => {
            this.refreshTimer = Math.max(0, this.refreshTimer - 200);
        }, 200)
    }
    refreshData(){

    }
}
