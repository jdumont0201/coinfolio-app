import {Component, Input, OnInit, Injectable, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';

import {TradingService} from "../../lib/localton/services/trading.service";
import {EventService} from "../../lib/localton/services/event.service";

@Component({
    selector: 'app-portfolio-recap',
    templateUrl: 'template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Injectable()
export class AppPortfolioRecapComponent implements OnInit {

    values={}
    total=-1
    constructor(public tradingService: TradingService,public eventService:EventService, private cd: ChangeDetectorRef) {
        this.tradingService.EnabledBrokersLoadingFinishedEvent.subscribe((val) => {
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
    brokerLoaded(val){
        //console.log("rr",this.tradingService.brokers.getConnectedBrokers())
        this.cd.markForCheck()

    }
    ngOnInit() {

    }


}
