import {Component, Injectable, OnDestroy, ViewChild} from '@angular/core';
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
import {MatTableDataSource} from "@angular/material";
import {RefreshService} from "../../lib/localton/services/refresh.service";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";

export interface Message {
    author: string,
    message: string
}

@Component({
    selector: 'app-trades',
    templateUrl: 'template.html',
    styleUrls: ['styles.css']

})
@Injectable()
export class AppTradesPage extends DataAndChartTemplate implements OnDestroy {

    providers = ["global"]
    hasConnected = false;
    trades = []
    isLoading = true;
    displayedColumns = ['symbol', 'direction', 'time', 'price','qty','total'];
    displayedColumns2 = ['symbol', 'count'];
    dataSource2;

    constructor(public consoleService:ConsoleService,public logic: Logic, public appConfigService: AppConfigService, public eventService:EventService,public refreshService:RefreshService,public tradingService:TradingService,public authService:AuthService) {
        super(consoleService,refreshService,logic,appConfigService,eventService, "plain")

        ////console.log("+trades")

        this.startRefresh();
    }

    refreshInterval

    startRefresh() {
        this.refreshInterval = window.setInterval(() => {
            this.updateData()
            if (this.progress == 100) clearInterval(this.refreshInterval)
        }, 1000)
    }

    ngOnDestroy() {
        clearInterval(this.refreshInterval)
    }

    progress = {};

    update(key) {
        console.log("update", key)
        this.prepareUpdate(key)
        if (this.tradingService.isBrokerLoaded(key)) {
            //this.tradingService.getBrokerByName("binance").getTrades().refresh();
            let T = this.tradingService.getBrokerByName(key).getTrades();
            let L = this.tradingService.getBrokerByName(key).getListing().content;

            let tradeList: any[] = T.getTrades()
            let n = Object.keys(tradeList).length;
            this.progress[key] = {analysed: T.progress, total: n, ratio: Math.round(n > 0 ? (T.progress / n * 100) : 0)};
            console.log("updatetrades", key, tradeList, "len=", Object.keys(L).length, this.progress[key])
            this.trades[key] = tradeList;
            this.dataSource[key] = new MatTableDataSource(tradeList);
            this.dataSource2 = new MatTableDataSource(T.getPairCount());
        } else {
            console.log("broker", key, "not ready")
        }
    }

    prepareUpdate(key) {
        if (this.providers.indexOf(key) === -1)
            this.providers.push(key)
        this.trades[key] = [];
        this.progress[key] = 0;
    }

    updateData() {
        console.log("Updatedata")
        this.trades = [];
        this.trades["global"] = [];
        if (this.authService.isAuthenticated()) {
            this.logic.getMe((user) => {
                console.log("logged", user)
                if (user.ConnectionBinance)
                    this.update("binance")
                this.update("global")
                //if (user.ConnectionKraken)
                //this.updateKraken()

            });

        }
    }


}
