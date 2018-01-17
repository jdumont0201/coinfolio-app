import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {RequestService} from '../../../../lib/globalton/core/services/request.service';
import {DataService} from "../../../../lib/localton/services/data.service";

import {Logic} from "../../../../logic/Logic";
import {StockChart, Chart} from 'angular-highcharts';
import {AppConfigService} from "../../../../lib/localton/services/appconfig.service";
import {MatTableDataSource} from '@angular/material';
import {RefreshedPage} from "../RefreshedPage/component";
import {ConsoleService} from "../../../globalton/core/services/console.service";
import {EventService} from "../../services/event.service";
import {RefreshService} from "../../services/refresh.service";

export abstract class PageWithTabs extends RefreshedPage implements OnInit {
    constructor(public refreshService:RefreshService,public eventService:EventService,public consoleService:ConsoleService){
        super(refreshService,eventService,consoleService)
    }

    tabIndex: number = 0;
    tabChanged(event) {
        this.tabIndex = event.index
        console.log("tabchanged", this.tabIndex)
    }
    @ViewChild("tabGroup") tabGroup;
    setTab(n: number) {
        console.log("thistg", this.tabGroup)
        let nbtabs=this.tabGroup._tabs._results.length;
        if(n<0)
            n=nbtabs-1;
        this.tabGroup.selectedIndex = n
    }

    ngOnInit() {

    }
}
