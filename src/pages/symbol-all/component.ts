import {Component, Injectable, ViewChild} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {AppConfigService} from "../../lib/localton/services/appconfig.service";
import {Logic} from "../../logic/Logic";
import {Crypto} from "../../lib/localton/utils/utils";
import {TradingService} from "../../lib/localton/services/trading.service";
import {PageWithTabs} from "../../lib/localton/components/PageWithTabs/component";
import {AuthService} from "../../lib/globalton/core/services/auth.service";

@Component({
    selector: 'app-listing',
    templateUrl: 'template.html'

})
@Injectable()
export class AppSymbolAllPage extends PageWithTabs {
    listing = [];
    supports = ['BNB', 'BTC', 'ETH', 'USDT']
    isLoading = true;
    showGraphs = false;
    canShow = [];
    sortby = "has_some_in_portfolio"
    possibleSorts = ["name", "bid_ask_volume_ratio","has_some_in_portfolio"]

    constructor(public requestService: RequestService, public tradingService: TradingService, public dataService: DataService, public appConfigService: AppConfigService, public logic: Logic, public authService: AuthService) {
        super()

        this.tradingService.reload()
        this.logic.BinanceGetBookTickers((listing) => {
            this.isLoading = false
            console.log(listing, Crypto.getSymbolsFromPair)
            for (let k in listing) {
                let pair = Crypto.getSymbolsFromPair(k)
                if (k !== "123456") {

                    let b = Math.ceil(parseFloat(listing[k].bids));
                    let a = Math.ceil(parseFloat(listing[k].asks))
                    console.log(k,listing[k].bids,listing[k].asks,b,a,b/(a+b))
                    this.listing.push({
                        symbol: k,
                        supra: pair.supra,
                        infra: pair.infra,
                        price: listing[k],
                        bid: listing[k].bid,
                        ask: listing[k].ask,
                        inptf:this.tradingService.isInPortfolio(pair.supra),
                        ratio: b / (a + b),
                        bids: b,
                        asks: a
                    });
                }
            }
        this.sort()
        })
    }

    canShowItem(index, s): boolean {
        return true
    }

    setGraphView() {

        this.showGraphs = !this.showGraphs
    }

    getSortField(a) {
        if (this.sortby === "name") return a.supra;
        else if (this.sortby === "bid_ask_volume_ratio") return a.ratio
        else if (this.sortby === "has_some_in_portfolio") return a.inptf
    }
    getSortOrder() :number{
        if (this.sortby === "name") return -1;
        else if (this.sortby === "bid_ask_volume_ratio") return 1
        else if (this.sortby === "has_some_in_portfolio") return 1
    }

    sort() {
        console.log("sort",this.sortby)
        let order:number=this.getSortOrder()
            this.listing.sort( (a, b) =>{
                //console.log("sort",a.supra,b,a.supra < b.supra)
                const keyA = this.getSortField(a), keyB = this.getSortField(b);
                if (keyA < keyB) return order;
                if (keyA > keyB) return -1*order;
                else return a.supra < b.supra ? -1 : 1

            });

    }
}
