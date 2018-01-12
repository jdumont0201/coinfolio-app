import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {RequestService} from '../../../../lib/globalton/core/services/request.service';
import {DataService} from "../../../../lib/localton/services/data.service";

import {Logic} from "../../../../logic/Logic";
import {StockChart, Chart} from 'angular-highcharts';
import {AppConfigService} from "../../../../lib/localton/services/appconfig.service";
import {MatTableDataSource} from '@angular/material';
import {RefreshService} from "../../services/refresh.service";
import {EventService} from "../../services/event.service";
@Injectable()
export abstract class Refreshing {
    dataRefreshSubscription = {}
    poolDefinedSubscription = {}
    constructor(public refreshService:RefreshService,public eventService:EventService){

    }
    subscribeToRefresh(pool:string,f:Function){
        console.log("subscribe pool ",pool)
        this.dataRefreshSubscription[pool] = this.refreshService.getEventByKey(pool).subscribe(f)
        if (!this.dataRefreshSubscription[pool]) {
            this.poolDefinedSubscription[pool] = this.eventService.poolDefinedEvent.subscribe((val: { name: string, delay: number }) => {
                if(val.name==pool)
                    this.dataRefreshSubscription[pool] = this.refreshService.getEventByKey(pool).subscribe(f)
            });
        }
    }
    unsubscribeToRefresh(pool){
        if (this.dataRefreshSubscription[pool]){

            this.dataRefreshSubscription[pool].unsubscribe()
            console.log("unsubscribe pool ",pool)
        }else console.log("non need unsub")

    }
}
