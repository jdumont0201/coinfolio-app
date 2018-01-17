import {Component, Input, OnInit, Injectable, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit} from '@angular/core';

import {TradingService} from "../../lib/localton/services/trading.service";
import {EventService} from "../../lib/localton/services/event.service";
import {PageWithTabs} from "../../lib/localton/components/PageWithTabs/component";
import {RefreshService} from "../../lib/localton/services/refresh.service";
import {AppConfigService} from "../../lib/localton/services/appconfig.service";
import {Strings} from "../../lib/globalton/core/utils/utils";


@Component({
    selector: 'app-please-addbroker',
    templateUrl: 'template.html'

})
@Injectable()
export class AppPleaseAddBrokerComponent extends PageWithTabs implements OnInit,AfterViewInit {
list;
    constructor(public tradingService: TradingService, public eventService: EventService, private cd: ChangeDetectorRef, public refreshService: RefreshService,public appConfigService: AppConfigService) {
        super(refreshService, eventService)
        this.tradingService.EnabledBrokersLoadingFinishedEvent.subscribe((val) => {
            this.brokerLoaded(val)
        })
        this.list=this.tradingService
    }

    brokerLoaded(val) {
        //console.log("rr",this.tradingService.brokers.getConnectedBrokers())
        this.cd.markForCheck()

    }

    ngOnInit() {

    }
    ngAfterViewInit(){

    }

}
