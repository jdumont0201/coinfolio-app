import {Component, Input, OnInit, Injectable, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';

import {TradingService} from "../../lib/localton/services/trading.service";
import {EventService} from "../../lib/localton/services/event.service";
import {CheckValid} from "../../lib/localton/components/CheckValid/component";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";

@Component({
    selector: 'app-portfolio-recap',
    templateUrl: 'template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Injectable()
export class AppPortfolioRecapComponent extends CheckValid implements OnInit,OnDestroy {

    values={}
    total=-1
    constructor(public tradingService: TradingService,public eventService:EventService, private cd: ChangeDetectorRef,public consoleService:ConsoleService) {
        super(consoleService)
        this.doSubscribe("EnabledBrokersLoadingFinishedEvent",this.tradingService.EnabledBrokersLoadingFinishedEvent,(val) => {
            this.brokerLoaded(val)
            this.eventService.UIEvent.subscribe((val)=>{
                if(val && val.key=="portfolio-value") {
                    this.values[val.val.broker]=val.val.value;
                    let res=0;
                    for(let k in this.values)
                        if(this.values[k]>0) res+=this.values[k]
                    this.total=res;
                } })
        })
    }
    ngOnDestroy(){
        this.unsubscribeAllEvents()
    }
    brokerLoaded(val){
        //console.log("rr",this.tradingService.brokers.getConnectedBrokers())
        this.cd.markForCheck()

    }
    ngOnInit() {

    }


}
