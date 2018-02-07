import {Component, Input, OnInit, Injectable, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {TradingService} from "../../lib/localton/services/trading.service";
import {EventService} from "../../lib/localton/services/event.service";
import {RefreshService} from "../../lib/localton/services/refresh.service";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";
import {Refreshing} from "../../lib/localton/components/Refreshing/component";
import {PublicDataService} from "../../lib/localton/services/publicdata.service";

@Component({
    selector: 'app-portfolio-value',
    templateUrl: 'template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Injectable()
export class AppPortfolioValueComponent extends Refreshing implements OnInit, OnDestroy {
    value;
    @Input() broker;


    constructor(public tradingService: TradingService, public publicDataService:PublicDataService,public eventService: EventService, public consoleService: ConsoleService, public refreshService: RefreshService, private cd: ChangeDetectorRef) {
        super(refreshService,eventService,consoleService)
    }

    ngOnDestroy() {
        let b = this.broker;
        this.unsubscribeToRefresh(b + "-portfolio")
        //this.unsubscribeToRefresh(b + "-ticker")
    }

    ngOnInit() {

        this.update("init");
        let f = () => {
            console.log("ptfvalu",this.broker,this.publicDataService.getListingByName(this.broker).content)

            this.update("update");

        }

        let b = this.broker;
        this.subscribeToRefresh(b + "-portfolio", f)
        this.subscribeToRefresh("public-"+b + "-listing", f)
    }

    update(t) {
        this.value = this.tradingService.getBrokerByName(this.broker).getTotalUSDValue()
        this.eventService.UIEvent.emit({key:"portfolio-value",val:{broker:this.broker,value:this.value}})
        this.cd.markForCheck();
    }
}
