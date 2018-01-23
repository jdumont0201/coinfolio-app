import {Component, Injectable, OnDestroy, ViewChild} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {StockChart, Chart} from 'angular-highcharts';
import {PageWithTabs} from "../../lib/localton/components/PageWithTabs/component";
import {RefreshService} from "../../lib/localton/services/refresh.service";
import {EventService} from "../../lib/localton/services/event.service";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";

@Component({
    selector: 'app-page-dashboard-now',
    templateUrl: 'template.html'

})
@Injectable()
export class AppDashboardNowPage extends PageWithTabs implements OnDestroy {
    pairs = {}

    constructor(public requestService: RequestService, public consoleService: ConsoleService, public dataService: DataService, public refreshService: RefreshService, public eventService: EventService) {
        super(refreshService, eventService, consoleService)
        this.eventService.setTheme("black")
        this.pairs['USDT'] = []
        this.pairs['BTC'] = []
        this.dataService.getAll("pair", (res) => {
            console.log("pairres", res)
            let N = 20
            let c = 0;
            for (let i = 0; i < res.length; ++i)
                if (res[i].name !== "123456" && res[i].infra !== "BNB" && res[i].infra !== "ETH")
                    this.pairs[res[i].infra].push(res[i])


        }, {broker: "binance"})
    }

    getUSDTPairs() {
        console.log("this.pairs['USDT']", this.pairs['USDT'])
        return this.pairs['USDT']
    }

    ngOnDestroy() {
        this.eventService.setTheme("blue")
    }
}
