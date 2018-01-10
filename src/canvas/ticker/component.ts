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

@Component({
    selector: 'app-ticker',
    templateUrl: 'template.html'

})
@Injectable()
export class AppTicker implements OnInit {


    constructor(public appConfigService: AppConfigService, public eventService: EventService,  public tradingService: TradingService, public apiService:ApiService,public logic: Logic, public authService: AuthService, public workspaceService: WorkspaceService,public router:Router) {
        console.log("+ TICKER")
        let T=this.tradingService.globalBroker.getTicker()
        let P=this.tradingService.globalBroker.getPortfolio().getTotalUSDValue()

    }
    ngOnInit(){

    }

}
