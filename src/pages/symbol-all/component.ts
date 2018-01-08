import {Component, Injectable, ViewChild}         from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {AppConfigService} from "../../lib/localton/services/appconfig.service";
import {Logic} from "../../logic/Logic";
import {Crypto } from "../../lib/localton/utils/utils";
import {TradingService} from "../../lib/localton/services/trading.service";
import {PageWithTabs} from "../../lib/localton/components/PageWithTabs/component";

@Component({
    selector: 'app-listing',
    templateUrl: 'template.html'

})
@Injectable()
export class AppSymbolAllPage extends PageWithTabs{
    listing = [];
    supports=['BNB','BTC','ETH','USDT']
    isLoading=true;
    showGraphs=false;

    constructor(public requestService: RequestService, public tradingService:TradingService, public dataService: DataService, public appConfigService: AppConfigService, public logic: Logic) {
        super()
        this.tradingService.reload()
        this.logic.BinanceGetLivePrices((listing) => {
            this.isLoading=false
            console.log(listing,Crypto.getSymbolsFromPair)
            for(let k in listing){
                let pair=Crypto.getSymbolsFromPair(k)
                this.listing.push({symbol:k,supra:pair.supra,infra:pair.infra,price:listing[k]});

            }
            console.log("this",this.listing)
            this.listing.sort(function (a, b) {
                const keyA = a.supra, keyB = b.supra;
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            });
            console.log("this",this.listing)
        })
    }
    setGraphView(){

        this.showGraphs=!this.showGraphs
    }
}
