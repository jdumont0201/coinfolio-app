import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {RequestService} from '../../../../lib/globalton/core/services/request.service';
import {DataService} from "../../../../lib/localton/services/data.service";

import {Logic} from "../../../../logic/Logic";
import {StockChart, Chart} from 'angular-highcharts';
import {AppConfigService} from "../../../../lib/localton/services/appconfig.service";
import {MatTableDataSource} from '@angular/material';
import {RefreshService} from "../../services/refresh.service";
import {EventService} from "../../services/event.service";
import {CheckValid} from "../CheckValid/component";

@Injectable()
export abstract class Refreshing  extends CheckValid{
    dataRefreshSubscription = {}
    poolDefinedSubscription = {}
    poolSubscribed = [];
    poolStarted = []

    constructor(public refreshService: RefreshService, public eventService: EventService) {
super();
    }

    subscribeToRefresh(pool: string, f: Function, enable?: boolean) {
        console.log("subscribe pool ", pool)
        this.dataRefreshSubscription[pool] = this.refreshService.getEventByKey(pool).subscribe(f)
        if (enable) {
            let P=this.refreshService.getPool(pool);
            if (!P.isEnabled()) {
                this.poolStarted.push(pool)
                P.enable()
            }
        }
        if (!this.dataRefreshSubscription[pool]) {
            this.poolDefinedSubscription[pool] = this.eventService.poolDefinedEvent.subscribe((val: { name: string, delay: number }) => {
                this.poolSubscribed.push(pool)
                if (val.name == pool)
                    this.dataRefreshSubscription[pool] = this.refreshService.getEventByKey(pool).subscribe(f)
                if (enable) {
                    let P=this.refreshService.getPool(pool)
                    if (!P.isEnabled()) {
                        this.poolStarted.push(pool)
                        P.enable()
                    }
                }
            });
        } else {
            this.poolSubscribed.push(pool)
        }
    }

    unsubscribeToAllRefresh() {
        this.poolSubscribed.forEach((p) => {
            this.unsubscribeToRefresh(p)
        })

    }

    unsubscribeAndStopAllRefresh() {
        this.unsubscribeToAllRefresh()
        this.stopAllStarted()
    }

    stopAllStarted() {
        console.log("Refreshing stop", this.poolStarted)
        this.poolStarted.forEach((p) => {
            this.refreshService.getPool(p).stop()
        })
    }

    unsubscribeToRefresh(pool) {
        if (this.dataRefreshSubscription[pool]) {
            this.dataRefreshSubscription[pool].unsubscribe()
            console.log("unsubscribe pool ", pool)
        } else console.log("non need unsub")

    }
}
