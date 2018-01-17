import {Component, Injectable, ViewChild} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";
import {QueueingSubject} from 'queueing-subject'
import websocketConnect from 'rxjs-websockets'

import {WebsocketService} from '../../lib/globalton/core/services/websocket.service';
import {StockChart, Chart} from 'angular-highcharts';
import {ActivatedRoute} from "@angular/router";
import {Logic} from "../../logic/Logic";
import {Crypto} from "../../lib/localton/utils/utils";
import {TradingService} from "../../lib/localton/services/trading.service";
import {DataAndChartTemplate} from "../../lib/localton/components/DataWithChart/component";
import {AppConfigService} from "../../lib/localton/services/appconfig.service";
import {EventService} from "../../lib/localton/services/event.service";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {RefreshService} from "../../lib/localton/services/refresh.service";

export interface Message {
    author: string,
    message: string
}

@Component({
    selector: 'app-positions',
    templateUrl: 'template.html',
    styleUrls: ['styles.css']

})
@Injectable()
export class AppPositionsPage extends DataAndChartTemplate {

    providers = ["global"]
    hasConnected = false;
    trades = []
isLoading=true;
    constructor(public refreshService:RefreshService,public logic: Logic, public tradingService: TradingService, public authService: AuthService, public appConfigService: AppConfigService, public eventService: EventService, public requestService: RequestService, public websocketService: WebsocketService, public dataService: DataService, private route: ActivatedRoute) {
        super(refreshService,logic, appConfigService, eventService, "plain")

        //console.log("+trades")
        this.route.params.subscribe((params) => {
        });
    }

    update(key) {
        console.log("updatebinance")


    }

    prepareUpdate(key) {
        if (this.providers.indexOf(key) === -1)
            this.providers.push(key)
        this.options[key] = this.optionsBase;
        this.trades[key] = [];
    }

    updateData() {
        this.trades = [];

        this.trades["global"] = [];
        if (this.authService.isAuthenticated()) {
            this.logic.getMe((user) => {
                console.log("logged", user)
                if (user.ConnectionBinance)
                    this.update("binance")

                //if (user.ConnectionKraken)
                //this.updateKraken()

            });

        }
    }


}
