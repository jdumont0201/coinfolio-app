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
    changeDetection: ChangeDetectionStrategy.Default
})
@Injectable()
export class AppTicker implements OnInit,OnDestroy {

    favorites;

    constructor(public refreshService: RefreshService, public appConfigService: AppConfigService, public consoleService: ConsoleService, public eventService: EventService, public tradingService: TradingService, public apiService: ApiService, public logic: Logic, public authService: AuthService, public workspaceService: WorkspaceService, public router: Router, private cd: ChangeDetectorRef) {
        console.log("+ TOPTICKER")
        let T = this.tradingService.globalBroker.getTicker()
        let P = this.tradingService.globalBroker.getPortfolio().getTotalUSDValue()
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
    }

    refreshSubscription

    ngOnDestroy() {
        if (this.refreshSubscription)
            this.refreshService.getEventByKey("-ticker").unsubscribe()
    }

    ngOnInit() {
        this.consoleService.eventReceived("POOL-ticker --> ticker")
        this.refreshSubscription = this.refreshService.getPool("ticker").event.subscribe((val) => {
            this.cd.markForCheck()
        })
    }

}
