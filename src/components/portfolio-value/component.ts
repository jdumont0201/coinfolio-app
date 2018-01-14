import {Component, Input, OnInit, Injectable, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {TradingService} from "../../lib/localton/services/trading.service";
import {EventService} from "../../lib/localton/services/event.service";
import {RefreshService} from "../../lib/localton/services/refresh.service";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";
import {Refreshing} from "../../lib/localton/components/Refreshing/component";

@Component({
    selector: 'app-portfolio-value',
    templateUrl: 'template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Injectable()
export class AppPortfolioValueComponent extends Refreshing implements OnInit, OnDestroy {
    value;
    @Input() broker;


    constructor(public tradingService: TradingService, public eventService: EventService, public consoleService: ConsoleService, public refreshService: RefreshService, private cd: ChangeDetectorRef) {
        super(refreshService, eventService)
    }

    ngOnDestroy() {
        let b = this.broker;
        this.unsubscribeToRefresh(b + "-portfolio")
        this.unsubscribeToRefresh(b + "-ticker")
    }

    ngOnInit() {

        this.update("init");
        let f = () => {
            this.update("update");

        }

        let b = this.broker;
        this.subscribeToRefresh(b + "-portfolio", f)
        this.subscribeToRefresh(b + "-ticker", f)
    }

    update(t) {
        this.value = this.tradingService.getBrokerByName(this.broker).getTotalUSDValue()
        this.cd.markForCheck();
    }
}