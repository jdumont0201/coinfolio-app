import {Component, Injectable, ViewChild}         from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {StockChart, Chart} from 'angular-highcharts';
import {AppConfigService} from "../../lib/localton/services/appconfig.service";
import {Logic} from "../../logic/Logic";

@Component({
    selector: 'app-listing',
    templateUrl: 'template.html'

})
@Injectable()
export class AppSymbolAllPage {
    prices = [];

    constructor(public requestService: RequestService, public dataService: DataService, public appConfigService: AppConfigService, public logic: Logic) {
        this.logic.BinanceGetLivePrices((prices) => {
            console.log(prices)
            for(let k in prices)
            this.prices.push({symbol:k,price:prices[k]});
        })
    }
}
