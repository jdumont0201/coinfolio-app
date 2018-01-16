import {Component, Input, OnInit, Injectable, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit} from '@angular/core';

import {TradingService} from "../../lib/localton/services/trading.service";
import {EventService} from "../../lib/localton/services/event.service";
import {PageWithTabs} from "../../lib/localton/components/PageWithTabs/component";
import {RefreshService} from "../../lib/localton/services/refresh.service";

@Component({
    selector: 'app-please-login',
    templateUrl: 'template.html'

})
@Injectable()
export class AppPleaseLoginComponent extends PageWithTabs implements OnInit,AfterViewInit {
    selectedTabIndex = 0;
    @ViewChild('tabGroup') tabGroup

    constructor(public tradingService: TradingService, public eventService: EventService, private cd: ChangeDetectorRef, public refreshService: RefreshService) {
        super(refreshService, eventService)
        this.tradingService.EnabledBrokersLoadingFinishedEvent.subscribe((val) => {
            this.brokerLoaded(val)
        })


    }

    brokerLoaded(val) {
        //console.log("rr",this.tradingService.brokers.getConnectedBrokers())
        this.cd.markForCheck()

    }

    ngOnInit() {
        this.eventService.UIEvent.subscribe((val)=>{if(val=="showforgottenpassword") this.setTab(2)});
    }
    ngAfterViewInit(){

    }
    afterLogin() {

    }

    afterSignup() {

    }

    afterForgottenPasswordClick(b: boolean) {
        this.selectedTabIndex = 2
        this.eventService.showForgottenPasswordTab()
        //  this.tabGroup.selectedIndex=2

    }

}
