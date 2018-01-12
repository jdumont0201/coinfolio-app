import {Component, Input, OnInit, Injectable, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {TradingService} from "../../lib/localton/services/trading.service";
import {EventService} from "../../lib/localton/services/event.service";
import {RefreshService} from "../../lib/localton/services/refresh.service";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";

@Component({
    selector: 'app-portfolio-value',
    templateUrl: 'template.html',
    changeDetection: ChangeDetectionStrategy.Default
})
@Injectable()
export class AppPortfolioValueComponent implements OnInit,OnDestroy {
    value;
    @Input() broker;

    refreshSubscription;
    constructor(public tradingService: TradingService, public eventService:EventService, public consoleService:ConsoleService, public refreshService:RefreshService, private cd: ChangeDetectorRef) {

    }

    ngOnDestroy(){
        if(this.refreshSubscription)
            this.refreshService.getEventByKey(this.broker+"-portfolio-ticker").unsubscribe()
    }
    ngOnInit() {

        this.refreshSubscription=this.refreshService.subscribe(this.broker+"-portfolio-ticker",(param2) => this.poolUpdated(param2))
        this.update("init");
    }
    poolUpdated(param){
        this.consoleService.eventReceived("POOL-"+this.broker+"-portfolio-ticker --> Portfoliovalue")
        this.update("updatepool")
    }

    update(t) {
        this.value = this.tradingService.getBrokerByName(this.broker).getTotalUSDValue()
        this.cd.markForCheck();
    }
}
