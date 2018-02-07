import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Injectable, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppConfigService} from "../../lib/localton/services/appconfig.service";
import {EventService} from "../../lib/localton/services/event.service";
import {Logic} from "../../logic/Logic";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {WorkspaceService} from "../../lib/localton/services/workspace.service";
import {Router} from "@angular/router";
import {TradingService} from "../../lib/localton/services/trading.service";
import {ApiService} from "../../lib/globalton/core/services/api.service";
import {RefreshService} from "../../lib/localton/services/refresh.service";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";
import {Refreshing} from "../../lib/localton/components/Refreshing/component";

@Component({
    selector: 'app-ticker',
    templateUrl: 'template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Injectable()
export class AppTicker extends Refreshing implements OnInit, OnDestroy {
    demovalue;
    favorites;
    @Input() isDemo=false;

    constructor(public refreshService: RefreshService, public appConfigService: AppConfigService, public consoleService: ConsoleService, public eventService: EventService, public tradingService: TradingService, public apiService: ApiService, public logic: Logic, public authService: AuthService, public workspaceService: WorkspaceService, public router: Router, private cd: ChangeDetectorRef) {
        super(refreshService, eventService, consoleService)
        //console.log("+ TOPTICKER")
        this.doSubscribe("favoriteUpdatedEvent", this.eventService.favoriteUpdatedEvent, (val) => {
            this.favorites = val;
        }, "ticker")
        this.logic.getMe((user) => {
            if (user)
                this.favorites = user.favoritePairs
            this.cd.markForCheck()
        })
        this.doSubscribe("loginChanged", this.authService.loginChanged, (val) => {
            this.consoleService.eventReceived("loginChanged --> ticker")
            this.logic.getMe((user) => {
                if (user)
                    this.favorites = user.favoritePairs
                this.cd.markForCheck()
            })
        }, "ticker")
        this.doSubscribe("EnabledBrokersLoadingFinishedEvent", this.tradingService.EnabledBrokersLoadingFinishedEvent, (val) => {
            this.cd.markForCheck()
            this.subscribeToBrokerUpdates()
        }, "ticker")
        this.doSubscribe("brokersLoadedAfterConfigEvent", this.tradingService.brokersLoadedAfterConfigEvent, (val) => {
            this.cd.markForCheck()
            this.subscribeToBrokerUpdates()
        }, "ticker")

    }


    subscribeToBrokerUpdates() {
        console.log("subs", this.tradingService.enabledBrokers);
        this.tradingService.enabledBrokers.forEach((b) => {

            let f = (val) => {
                this.cd.markForCheck()
            };
            this.subscribeToRefresh(b + "-portfolio", f)
    //        this.subscribeToRefresh(b + "-ticker", f)

        })
    }

    ngOnDestroy() {
        this.tradingService.enabledBrokers.forEach((b) => {
            this.unsubscribeToRefresh(b + "-portfolio")
      //      this.unsubscribeToRefresh(b + "-ticker")

        })
        this.unsubscribeAllEvents()
        clearInterval(this.demovalue)
    }

    demoInterval
    demovalue2
scroll(){
    window.scrollTo(0,document.body.scrollHeight)
}
    ngOnInit() {

        this.demoInterval = setInterval(() => {
            this.demovalue = Math.round(Math.random() * 100 * 100) / 100 - 30
            this.demovalue2 = Math.round(Math.random() * 100 * 100) / 100 - 30
            this.cd.markForCheck()
        }, 1500)
    }

}
