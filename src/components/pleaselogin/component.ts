import {Component, Input, OnInit, Injectable, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';

import {TradingService} from "../../lib/localton/services/trading.service";
import {EventService} from "../../lib/localton/services/event.service";

@Component({
    selector: 'app-please-login',
    templateUrl: 'template.html'

})
@Injectable()
export class AppPleaseLoginComponent implements OnInit {

    constructor(public tradingService: TradingService,public eventService:EventService, private cd: ChangeDetectorRef) {
        this.tradingService.EnabledBrokersLoadingFinishedEvent.subscribe((val) => {
            this.brokerLoaded(val)
        })


    }
    brokerLoaded(val){
        //console.log("rr",this.tradingService.brokers.getConnectedBrokers())
        this.cd.markForCheck()

    }
    ngOnInit() {

    }
    afterLogin(){

    }
    afterSignup(){

    }

}
