import {Component, Injectable, OnDestroy, ViewChild} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {AppConfigService} from "../../lib/localton/services/appconfig.service";
import {Logic} from "../../logic/Logic";
import {Crypto} from "../../lib/localton/utils/utils";
import {TradingService} from "../../lib/localton/services/trading.service";
import {PageWithTabs} from "../../lib/localton/components/PageWithTabs/component";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {RefreshedPage} from "../../lib/localton/components/RefreshedPage/component";
import {EventService} from "../../lib/localton/services/event.service";
import {CryptoPair} from "../../lib/localton/structures/Listing";

@Component({
    selector: 'app-listing',
    templateUrl: 'template.html'

})
@Injectable()
export class AppSymbolAllPage extends PageWithTabs implements OnDestroy {
    listing: CryptoPair[] = new Array();
    supports = ['BNB', 'BTC', 'ETH', 'USDT']
    isLoading = true;

    showGraphs = false;
    canShow = [];
    sortby = "has_been_traded"
    possibleSorts = ["name", "bid_ask_volume_ratio", "has_some_in_portfolio","has_been_traded"]
    possiblePriceviews = ["crypto", "usd", "both"]
    priceview = "both"

    maxVolume={}
    getUSDPrice(infra: string, listing: any[]): { ask: number, bid: number } {
        const pair = infra + "USDT"
        if (pair in listing)
            return {ask: parseFloat(listing[pair].ask), bid: parseFloat(listing[pair].bid)}
        else if (infra === "USDT") return {ask: 1, bid: 1}
        else
            console.log("err", "unknown pair in listing", pair, listing)
    }

    rfn = 0;
    hasConnected=false;
    constructor(public requestService: RequestService, public eventService:EventService,public tradingService: TradingService, public dataService: DataService, public appConfigService: AppConfigService, public logic: Logic, public authService: AuthService) {
        super()
        // console.log("typf", Array.isArray(this.listing))
        this.eventService.brokerLoadedEvent.subscribe((val) => {
            this.brokerLoaded(val)
            this.hasConnected=true;
        })


        this.listing = [];
        //this.tradingService.reload()
        this.isLoading = true;
        this.firstloadData();
        this.initRefresh()
    }
    brokerLoaded(val: { key: string, loaded: boolean }) {
        this.loadData()
    }
    refreshData() {
        this.isRefreshing = true;
        this.loadData()
    }

    firstloadData() {
        this.isLoading = true;
        this.loadData()
    }

    searchedText = "";
    done = 0;
    searched = []

    search() {
        this.setTab(-1)
        console.log("search", this.searchedText)
        this.searched = []
        let s: string = this.searchedText.trim()
        let isMultipleWords = s.indexOf(" ")
        if (isMultipleWords) {
            let ss: string[] = s.split(" ");
            for (let j = 0; j < ss.length; ++j) {
                this.addToSearch(ss[j])
            }
        } else
            this.addToSearch(s);

    }

    addToSearch(word: string) {
        console.log("add", word)
        for (let i = 0; i < this.listing.length; ++i) {
            let a: string = this.listing[i].pair.toLowerCase();
            let b: string = word.toLowerCase();
            if (a.indexOf(b) > -1) {
                this.searched.push(this.listing[i])
            }
        }
    }

    ngOnDestroy() {
        clearInterval(this.refreshInterval)
        clearInterval(this.refreshTimerInterval)
    }

    loadData() {
        this.tradingService.getBrokerByName("binance").getListing().refresh();
        this.listing = this.tradingService.getBrokerByName("binance").getListing().getList(this.sortby,"change");
        this.maxVolume=this.tradingService.getBrokerByName("binance").getTicker().maxVolume;
        this.listing.forEach((l)=>{
            if(l.infra && l.infra in this.maxVolume && l.volume){
                //console.log("lvol",l.volume,this.maxVolume,this.maxVolume[l.infra],l.volume/this.maxVolume[l.infra])
                l.relativeVolume=l.volume / this.maxVolume[l.infra];

            } else l.relativeVolume=-1
        })
        this.loadTime = new Date()
        this.refreshTimer = this.refreshEvery;
        this.isRefreshing = false
        if(this.listing && this.listing.length>0) this.isLoading = false
    }

    lastListing = {};


    canShowItem(index, s): boolean {
        return true
    }

    setGraphView() {

        this.showGraphs = !this.showGraphs
    }


}
