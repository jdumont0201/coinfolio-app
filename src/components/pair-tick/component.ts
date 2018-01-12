import {Component, Input, OnInit, Injectable, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {StockChart, Chart} from 'angular-highcharts';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {MatTableDataSource} from '@angular/material';
import {Logic} from "../../logic/Logic";

import {DataAndChartTemplate} from "../../lib/localton/components/DataWithChart/component";
import {TradingService} from "../../lib/localton/services/trading.service";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";
import {RefreshService} from "../../lib/localton/services/refresh.service";

@Component({
    selector: 'app-pair-tick',
    templateUrl: 'template.html',
    changeDetection: ChangeDetectionStrategy.Default
})
@Injectable()
export class AppPairTickComponent implements OnInit,OnDestroy{
    @Input() pair: string;
    @Input() broker: string;
    @Input() showPrice:boolean=true;
    value;
    lastprice;
    currentprice;
    lastTime;
    closeTime;
    p;
    constructor(public tradingService: TradingService,public refreshService:RefreshService,private cd: ChangeDetectorRef,public consoleService:ConsoleService) {
        //this.tradingService.PriceUpdatedEvent.subscribe((param) => this.priceUpdated(param))


    }
    refreshSubscription;
    ngOnInit(){
        console.log("AppPairTickComponent init" );
        //this.tradingService.PriceChangeUpdatedEvent.subscribe((param) => this.priceUpdated(param))
        let k=this.broker+"-"+this.pair+"tick";
        this.refreshService.createPool(k);
        this.refreshService.getPool(k).define(4000,(f)=>{
            let T = this.tradingService.getBrokerByName(this.broker).getTicker();
            T.getPairChange(this.pair, (res) => {
                if (res) {
                    console.log("resed",this.pair,res)
                    this.currentprice=res.current;//T.content[this.pair].p;
                    this.lastprice=res.last;
                    this.lastTime=res.changeLastTime;
                    this.closeTime=new Date(res.changeCloseTime).toString();
                    this.p=res.p;
                    let v=((this.currentprice-res.last)/res.last)*100;
                    this.value = v; this.cd.markForCheck();

                }
                f();
            },true)
        })
        this.refreshService.getPool(k).enable()
        this.refreshSubscription=this.refreshService.getEventByKey(this.broker+"-"+this.pair+"tick").subscribe((param2) => this.poolUpdated(param2))
        this.getChange("pairtick init")
    }
    ngOnDestroy(){
        if(this.refreshSubscription)
            this.refreshSubscription.unsubscribe()
    }
    poolUpdated(param2){
        this.consoleService.eventReceived("POOL-"+this.broker+"-"+this.pair+"tick --> Portfoliovalue")
        this.getChange("update")
    }
    /*priceUpdated(param) {
        this.consoleService.eventReceived("PriceChangeUpdatedEvent --> PairTick",param)
        console.log("AppPairTickComponent price updated" );
        if(param.pair==this.pair || param.pair=="all")
            this.getChange("update")
    }*/

    getChange(t) {
        console.log("  AppPairTickComponent getchange" );

        if (this.broker) {
            let T = this.tradingService.getBrokerByName(this.broker).getTicker();
            if (this.pair in T.content) {
                T.getPairChange(this.pair, (res) => {
                    if (res) {
                        console.log("rese",this.pair,res)
                        this.currentprice=res.current;//T.content[this.pair].p;
                        this.lastprice=res.last;
                        this.lastTime=res.changeLastTime;
                        this.closeTime=new Date(res.changeCloseTime).toString();
                        this.p=res.p;
                        let v=((this.currentprice-res.last)/res.last)*100;
                        this.value = v; this.cd.markForCheck();
                    }
                })
            } else {
          //      console.log("gpc update this.pair not in ", this.pair, T.content)
            }
        } else {
            return null
        }
    }
}
