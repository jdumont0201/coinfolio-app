import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Injectable, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppConfigService} from "../../lib/localton/services/appconfig.service";
import {EventService} from "../../lib/localton/services/event.service";
import {Workspace, Panel, Item, Row, Tab} from "../../lib/localton/interfaces/interfaces";
import {Logic} from "../../logic/Logic";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {WorkspaceService} from "../../lib/localton/services/workspace.service";
import {Router} from "@angular/router";
import {TradingService} from "../../lib/localton/services/trading.service";
import {ApiService} from "../../lib/globalton/core/services/api.service";
import {RefreshService} from "../../lib/localton/services/refresh.service";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";

@Component({
    selector: 'app-ticker',
    templateUrl: 'template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Injectable()
export class AppTicker implements OnInit, OnDestroy {

    favorites;

    constructor(public refreshService: RefreshService, public appConfigService: AppConfigService, public consoleService: ConsoleService, public eventService: EventService, public tradingService: TradingService, public apiService: ApiService, public logic: Logic, public authService: AuthService, public workspaceService: WorkspaceService, public router: Router, private cd: ChangeDetectorRef) {
        console.log("+ TOPTICKER")
        this.eventService.favoriteUpdatedEvent.subscribe((val) => {
            this.consoleService.eventReceived("favoriteUpdatedEvent --> ticker")
            this.favorites = val;
        })
        this.logic.getMe((user) => {
            if (user)
                this.favorites = user.favoritePairs
        })
        this.authService.loginChanged.subscribe((val) => {
            this.consoleService.eventReceived("loginChanged --> ticker")
            this.logic.getMe((user) => {
                if (user)
                    this.favorites = user.favoritePairs
            })
        })
        this.tradingService.EnabledBrokersLoadingFinishedEvent.subscribe((val) => {
            this.cd.markForCheck()
            this.subscribeToBrokerUpdates()
        })
    }

    dataRefreshSubscription = {}
    poolDefinedSubscription = {}

    subscribeToBrokerUpdates() {
        console.log("subs",this.tradingService.enabledBrokers);
        this.tradingService.enabledBrokers.forEach((b) => {

            let f = (val) => {
                //this.consoleService.eventReceived("POOL " + pool + " --> ticker val=",val)
                //this.consoleService.eventReceived("POOL " + pool + " --> ticker", this.tradingService.getBrokerByName(b).getPortfolio().content['BTC'],this.tradingService.getBrokerByName(b).getTicker().content['BTCUSDT'])
                this.cd.markForCheck()
            };
            let pool = b + "-portfolio"
            this.dataRefreshSubscription[b]={portfolio:null,ticker:null}
            this.dataRefreshSubscription[b].portfolio = this.refreshService.getEventByKey(pool).subscribe(f)
            if (!this.dataRefreshSubscription[b].portfolio) {
                this.poolDefinedSubscription[b].portfolio = this.eventService.poolDefinedEvent.subscribe((val: { name: string, delay: number }) => {
                    if(val.name==pool)
                    this.dataRefreshSubscription[b].portfolio = this.refreshService.getEventByKey(pool).subscribe(f)
                });
            }
            pool = b + "-ticker"
            this.dataRefreshSubscription[b].ticker = this.refreshService.getEventByKey(pool).subscribe(f)
            if (!this.dataRefreshSubscription[b].ticker) {
                this.poolDefinedSubscription[b].ticker = this.eventService.poolDefinedEvent.subscribe((val: { name: string, delay: number }) => {
                    if(val.name==pool)
                    this.dataRefreshSubscription[b].ticker = this.refreshService.getEventByKey(pool).subscribe(f)
                });
            }
        })
    }

    ngOnDestroy() {
        this.tradingService.enabledBrokers.forEach((b) => {
            if (this.dataRefreshSubscription[b])
                this.refreshService.getEventByKey("-ticker").unsubscribe()
        })
    }

    ngOnInit() {


    }

}
