import {Component, Injectable, OnDestroy, ViewChild} from '@angular/core';
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
export class AppSymbolAllPage extends PageWithTabs  implements OnDestroy{
    listing: any[] = new Array();
    supports = ['BNB', 'BTC', 'ETH', 'USDT']
    isLoading = true;
    isRefreshing = false;
    showGraphs = false;
    canShow = [];
    sortby = "has_some_in_portfolio"
    possibleSorts = ["name", "bid_ask_volume_ratio", "has_some_in_portfolio"]
    loadTime;
    refreshInterval
    refreshTimerInterval
    refreshTimer;
    refreshEvery = 4000;

    getUSDPrice(infra: string, listing: any[]): { ask: number, bid: number } {
        const pair = infra + "USDT"
        if (pair in listing)
            return {ask: parseFloat(listing[pair].ask), bid: parseFloat(listing[pair].bid)}
        else if (infra === "USDT") return {ask: 1, bid: 1}
        else
            console.log("err", "unknown pair in listing", pair, listing)
    }
    rfn= 0;
    constructor(public requestService: RequestService, public tradingService: TradingService, public dataService: DataService, public appConfigService: AppConfigService, public logic: Logic, public authService: AuthService) {
        super()
       // console.log("typf", Array.isArray(this.listing))
        this.listing = [];
        this.tradingService.reload()
        this.isLoading = true;
        this.firstloadData();
        this.refreshInterval = window.setInterval(() => {
            this.refreshTimer = this.refreshEvery;
            this.loadTime = new Date();
            this.rfn++
            this.refreshData()
         //       clearInterval(this.refreshInterval)
        }, this.refreshEvery)
        this.refreshTimerInterval = window.setInterval(() => {
            this.refreshTimer = Math.max(0, this.refreshTimer - 200);
        }, 200)


    }

    refreshData() {
        this.isRefreshing = true;
        this.loadData()
    }

    firstloadData() {
        this.isLoading = true;
        this.loadData()
    }
    searchedText="";
    done = 0;
    searched=[]
    search(){
        this.setTab(-1)
        console.log("search",this.searchedText)
        this.searched=[]
        let s:string=this.searchedText.trim()
        let isMultipleWords=s.indexOf(" ")
        if(isMultipleWords){
            let ss:string[]=s.split(" ");
            for(let j=0;j<ss.length;++j){
                this.addToSearch(ss[j])
            }
        }else
            this.addToSearch(s);
        console.log("done")
    }
    addToSearch(word:string){
        console.log("add",word)
        for(let i=0;i<this.listing.length;++i){
            let a:string=this.listing[i].symbol.toLowerCase();
            let b:string=word.toLowerCase();
            //console.log("check",a,b,a.indexOf(b)>-1)
            if(a.indexOf(b)>-1){console.log("found");
                this.searched.push(this.listing[i])}
        }
    }
    ngOnDestroy(){
        clearInterval(this.refreshInterval)
        clearInterval(this.refreshTimerInterval)
    }

    loadData() {

        this.done = 0;
        this.logic.BinanceGetBookTickers((res) => {
            //console.log(listing, Crypto.getSymbolsFromPair)

            for (let k in res) {
                let pair = Crypto.getSymbolsFromPair(k)
                if (k !== "123456") {
                    let b = Math.ceil(parseFloat(res[k].bids));
                    let a = Math.ceil(parseFloat(res[k].asks))
                    //console.log(k, listing[k].bids, listing[k].asks, b, a, b / (a + b))
                    let usdref = this.getUSDPrice(pair.infra, res);
                    const l = res[k];
                    const val = {
                        symbol: k,
                        supra: pair.supra,
                        infra: pair.infra,
                        price: l.price,
                        bid: l.bid,
                        ask: l.ask,
                        usdbid: usdref.ask * l.bid,
                        usdask: usdref.bid * l.ask,
                        inptf: this.tradingService.isInPortfolio(pair.supra),
                        ratio: b / (a + b),
                        bids: b,
                        asks: a,
                        oldbid:k in this.lastListing?this.lastListing[k].bid:l.bid,
                        oldask:k in this.lastListing?this.lastListing[k].ask:l.ask,
                    };
                    this.loadTime = new Date()
                    this.refreshTimer = this.refreshEvery;
                    this.upsert(val, k);

                    this.isLoading = false
                    this.isRefreshing = false

                }
            }
            this.sort()
        })
    }
    lastListing={};

    upsert(val: any, symbol: string) {
        this.done++;
        let torefreshidx: number = -1;
        for (let i = 0; i < this.listing.length; ++i) {

            if (this.listing[i].symbol == symbol) {
                torefreshidx = i;
                break;
            }
        }



        if (torefreshidx < 0) this.listing.push(val);
        else {this.lastListing[symbol] =this.listing[torefreshidx];
            this.listing[torefreshidx].bid = val.bid;
            this.listing[torefreshidx].usdbid = val.usdbid;
            this.listing[torefreshidx].usdask = val.usdask;
            this.listing[torefreshidx].asks = val.asks;
            this.listing[torefreshidx].bids = val.bids;
        }
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

    getSortOrder(): number {
        if (this.sortby === "name") return -1;
        else if (this.sortby === "bid_ask_volume_ratio") return 1
        else if (this.sortby === "has_some_in_portfolio") return 1
    }

    sort() {

        let order: number = this.getSortOrder()
        this.listing.sort((a, b) => {
            //console.log("sort",a.supra,b,a.supra < b.supra)
            const keyA = this.getSortField(a), keyB = this.getSortField(b);
            if (keyA < keyB) return order;
            if (keyA > keyB) return -1 * order;
            else return a.supra < b.supra ? -1 : 1

        });

    }
}
