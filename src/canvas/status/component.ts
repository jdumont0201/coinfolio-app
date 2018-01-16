import {Component, Injectable, Input, OnInit, ViewChild} from '@angular/core';
import {AppConfigService} from "../../lib/localton/services/appconfig.service";
import {EventService} from "../../lib/localton/services/event.service";
import {Workspace, Panel, Item, Row, Tab} from "../../lib/localton/interfaces/interfaces";
import {Logic} from "../../logic/Logic";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {WorkspaceService} from "../../lib/localton/services/workspace.service";
import {Router} from "@angular/router";
import {TradingService} from "../../lib/localton/services/trading.service";
import {ApiService} from "../../lib/globalton/core/services/api.service";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";

@Component({
    selector: 'app-status',
    templateUrl: 'template.html'

})
@Injectable()
export class AppStatus implements OnInit {
    nbOperational = 0

    constructor(public consoleService:ConsoleService,public appConfigService: AppConfigService, public eventService: EventService, public tradingService: TradingService, public apiService: ApiService, public logic: Logic, public authService: AuthService, public workspaceService: WorkspaceService, public router: Router) {
        console.log("+ MENU")

    }

    ngOnInit() {
        if (this.tradingService.enabledBrokers)
            this.checkOperational()
        this.tradingService.EnabledBrokersLoadingFinishedEvent.subscribe((val) => {
            this.consoleService.eventReceived("EnabledBrokersLoadingFinishedEvent --> AppStatus",val)
            setTimeout(()=>{this.checkOperational()},4000)
        })
    }

    checkOperational() {
        this.tradingService.enabledBrokers.forEach((b) => {
            let sta = this.tradingService.brokers.loadStatus
            let res = true;
            for (let k in sta) {
                console.log("checksta", b, sta[k])
                if (sta[k] !== "done")
                    res = false
            }
            if (res) this.nbOperational++;
        })
    }
}
