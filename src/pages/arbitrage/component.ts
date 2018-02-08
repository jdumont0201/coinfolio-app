import {Component, Injectable, OnDestroy, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
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
import {RefreshService} from "../../lib/localton/services/refresh.service";
import {MatTableDataSource, MatSort} from '@angular/material';
import {Structures} from "../../lib/globalton/core/utils/utils";
import {Tick} from "../../lib/localton/structures/Ticker";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";
import {PublicDataService} from "../../lib/localton/services/publicdata.service";


type List = { cheapestask: number, cheapestaskname: string, mostexpensivebidname: string, askdepth: any, biddepth: any, spread: number, mostexpensivebid: number, brokers: any };
type SortedListItem={pair:string, spread: number, askdepth:any[],biddepth:any[],  list: List}

@Component({
    selector: 'app-page-arbitrage',
    templateUrl: 'template.html'    ,
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Injectable()
export class AppArbitragePage extends PageWithTabs implements OnInit, OnDestroy {
    listing: { [pair: string]: List } = {};
    supports = {}
    brokerOptions = {}
    isLoading = true;

    displayedColumnsRef = ['pair', 'broker', 'change', 'bid', 'ask', 'spread', 'spreadpct'];

    showGraphs = false;
    canShow = [];
    sortby = "name"
    possibleSorts = ["name", "bid_ask_volume_ratio", "has_some_in_portfolio", "has_been_traded"]
    possiblePriceviews = ["crypto", "fiat", "crypto_and_fiat"]
    priceview = "both"

    maxVolume = {}

    searchedText = "";
    done = 0;
    searched = []
    filteredData;


    lastListing = {};
    indexes = {}
    filterValue = "";
    budget = 1000;

    constructor(public refreshService: RefreshService, public publicDataService: PublicDataService, public requestService: RequestService, public consoleService: ConsoleService, public eventService: EventService, public tradingService: TradingService, public dataService: DataService, public appConfigService: AppConfigService, public logic: Logic, public authService: AuthService, public cd: ChangeDetectorRef) {
        super(refreshService, eventService, consoleService)


    }

    initPossibleBrokers() {

    }

    ngOnInit() {
        this.doSubscribe("searchUpdatedEvent", this.eventService.searchUpdatedEvent, (val) => {
            this.searchUpdated(val)
        })
        this.appConfigService.possibleBrokers.forEach((b) => {
            let key = "public-" + b + "-listing";
            this.refreshService.getPool(key).enable()
            this.refreshService.getPool(key).addHook("listing-table", () => {
                this.updateListing(b)
            })
        })

    }

    getBuyCommission(b, pair) {
        return this.appConfigService.getFeesPerBroker(b).trading.pc
    }

    getUniversalName(b: string, pair: string) {
        let is = this.appConfigService.infrasuprainv[b][pair];
        let infra = is.infra;
        let supra = is.supra;
        const key = supra + infra;
        return key;
    }

    addDepth(broker,name,raw){
        this.logic.getDepthFromPublic(broker,name,(depth)=>{
            this.listing[name].askdepth[broker]=depth.ask
        });

    }
    updateListing(b: string) {
        if (!(b in this.indexes))
            this.indexes[b] = {}
        let L = this.publicDataService.getListingByName(b)
        let res = L.getContent();
        console.log("CONTENT", b, res)
        for (let pair in res) {

            if (!(pair in this.appConfigService.infrasuprainv[b])) {
                console.log("err unknown pair", b, pair)
            } else {
                const key = this.getUniversalName(b, pair);
                if (pair == "DASHUSD") console.log("--------------------------------------------------------------- linew ", b, pair, JSON.stringify(this.listing[key]))
                const r = res[pair];
                let linew: Tick = {broker: b, pair: key, volume: r.volume, bid: r.bid, ask: r.ask, p: r.last}
                if (linew.ask > 0 && linew.bid > 0) {
                    linew.spread = linew.ask - linew.bid;
                } else {
                    linew.spread = null;
                    linew.spreadpct = null;
                }
                if (pair == "DASHUSD") console.log("linew new", b, key, JSON.stringify(linew))
                if (key in this.listing && b in this.listing[key].brokers) {//b in this.indexes && linew.pair in this.indexes[b]) { //already added
                    if (pair == "DASHUSD") console.log("  linew upd existing", b, JSON.stringify(this.listing[key].brokers))
                    //const j: number = this.indexes[b][linew.pair];
                    let LL = this.listing[key]
                    let Lbroker = LL.brokers[b];
                    if (linew.ask < Lbroker.cheapestask) {
                        Lbroker.cheapestaskname = b;
                    }
                    if (linew.bid > Lbroker.mostexpensivebid) {
                        Lbroker.mostexpensivebidname = b;
                    }
                    if (pair == "DASHUSD") console.log("    linew upd", b, key, JSON.stringify(LL), linew.ask)
                    LL.cheapestask = Math.min(LL.cheapestask, linew.ask)
                    LL.mostexpensivebid = Math.max(LL.mostexpensivebid, linew.bid);
                    LL.spread = LL.mostexpensivebid - LL.cheapestask;
                    if (Lbroker.bid != linew.bid)
                        Lbroker.oldbid = Lbroker.bid;
                    if (Lbroker.ask != linew.ask)
                        Lbroker.oldask = Lbroker.ask;
                    Lbroker.ask = linew.ask;
                    Lbroker.bid = linew.bid;
                    if (Lbroker.ask > 0 && Lbroker.bid > 0) {
                        Lbroker.spread = Lbroker.ask - Lbroker.bid;
                        Lbroker.spreadpct = 100 * Lbroker.spread / Lbroker.ask;
                    } else {
                        Lbroker.spread = null;
                        Lbroker.spreadpct = null;
                    }
                    Lbroker.p = linew.p;
                } else {
                    if (pair == "DASHUSD") console.log("  linew add broker", b, JSON.stringify(linew))
                    if (!(key in this.listing)) {
                        this.listing[key] = {cheapestask: linew.ask, cheapestaskname: b, askdepth:{},biddepth:{},mostexpensivebidname: b, spread: -1, mostexpensivebid: linew.bid, brokers: {}};
                        this.listing[key].brokers[b] = linew;
                        if (pair == "DASHUSD") console.log("    linew create ", b, key, linew.ask, JSON.stringify(this.listing[key]))
                    } else {
                        let LL = this.listing[key];
                        if (linew.ask < LL.cheapestask) {
                            LL.cheapestaskname = b;
                        }
                        if (linew.bid > LL.mostexpensivebid) {
                            LL.mostexpensivebidname = b;
                        }
                        if (pair == "DASHUSD") console.log("  linew", b, key, LL.cheapestask, linew.ask, Math.min(LL.cheapestask, linew.ask))
                        LL.cheapestask = Math.min(LL.cheapestask, linew.ask)
                        LL.mostexpensivebid = Math.max(LL.mostexpensivebid, linew.bid);
                        LL.spread = LL.mostexpensivebid - LL.cheapestask;

                        this.listing[key].brokers[b] = linew;
                    }
                }
            }


        }
        this.sortListing();

        this.cd.markForCheck();

    }

    ngOnDestroy() {
        this.unsubscribeAndStopAllRefresh()
        this.unsubscribeAllEvents()
        this.appConfigService.possibleBrokers.forEach((b) => {
            let key = "public-" + b + "-listing";
            this.refreshService.getPool(key).stop();
        });

    }


    searchCallback() {

    }

    check(sortedListItem) {
        //let broker=sortedlistitem.cheapestaskname;
        //let pair=this.appConfigService.getPairCommonName()
        /*this.logic.getDepthFromPublic(broker,()=>{

        },)*/
    }

    searchUpdated(filterValue) {

        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.filterValue = filterValue
    }

    /*addToSearch(word: string) {
        //console.log("add", word)
        for (let i = 0; i < this.listing.length; ++i) {
            let a: string = this.listing[i].pair.toLowerCase();
            let b: string = word.toLowerCase();
            if (a.indexOf(b) > -1) {
                this.searched.push(this.listing[i])
            }
        }
    }*/


    show(r) {
        console.log("rshow", r)
    }

    loadPublicChangeByBroker(b: string, f: Function) {
        if (!(b in this.indexes))
            this.indexes[b] = {}
        this.logic.getPublicChange(b, (res) => {
            for (let i in res) {
                if (!(i in this.appConfigService.infrasuprainv[b])) {

                } else {
                    let is = this.appConfigService.infrasuprainv[b][i];
                    let infra = is.infra;
                    let supra = is.supra;
                    const key = supra + infra;
                    const r = res[i];
                    if (b in this.indexes && r.pair in this.indexes[b]) { //already added
                        const j: number = this.indexes[b][r.pair];

                        if (b in this.listing[key]) {
                            let L = this.listing[key][b];
                            L.changelastprice = 100 * L.p / r.close - 100;
                        }

                    } else {

                    }
                }
            }
            this.cd.markForCheck();
            f();
        });
    }

    sortedListing = [];

    sortListing() {
        let r :SortedListItem[]= [];
        for (let k in this.listing) {
            r.push({pair: k, spread: this.listing[k].spread / this.listing[k].cheapestask * 100, askdepth:[],biddepth:[],  list: this.listing[k]})
        }
        this.sortedListing = r.sort(function (a, b) {
            let as = a.spread;
            let bs = b.spread;
            return bs - as;
        })

        console.log("thisso", this.sortedListing)
    }


    /*loadDataByBroker(b) {
        let B = this.tradingService.getBrokerByName(b);
        console.log("loaddata", b, B)
        if (!B) return;
        let L = B.getTicker().getList(this.sortby);//getList(this.sortby, "change");
        //update listing
        if (!(b in this.indexes))
            this.indexes[b] = {}
        L.forEach((li) => {
            if (b in this.indexes && li.pair in this.indexes[b]) { //already added
                let i = this.indexes[b][li.pair]
                this.listing[i] = li
            } else {
                this.indexes[b][li.pair] = this.listing.length;
                this.listing.push(li)
            }
        })
        this.maxVolume = B.getTicker().maxVolume;
        this.listing.forEach((l) => {
            if (l.infra && l.infra in this.maxVolume && l.volume) {
                l.relativeVolume = l.volume / this.maxVolume[l.infra];
            } else l.relativeVolume = -1
            this.supports[l.infra] = {symbol: l.infra, active: l.infra in this.supports ? (this.supports[l.infra].active) : true}
            this.brokerOptions[l.broker] = {active: l.broker in this.brokerOptions ? (this.brokerOptions[l.broker].active) : true}
        })
        //this.filterData()
        this.loadTime = new Date()
        this.refreshTimer = this.refreshEvery;
        this.isRefreshing = false
        if (this.listing && this.listing.length > 0) this.isLoading = false
        console.log("loaddata", this.listing)
    }*/

    getObjectKeys(obj): string[] {
        return Object.keys(obj)
    }

    open(pair, broker) {
        console.log("op", pair)
        window.open(this.appConfigService.getTradeScreen(broker, pair), "_blank")
    }

    filterData() {
        /*
                this.listing.forEach((l) => {
                    let isBrokerSelected = this.brokerOptions[l.broker].active
                    if (this.supports[l.infra].active)
                        this.filteredData.push(l)
                })*/
    }


    canShowItem(index, s): boolean {
        return true
    }

    setGraphView() {
        this.showGraphs = !this.showGraphs
    }

    applyFilter(event) {
        console.log("target", event)
        let filterValue = event.target.value;
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    }

    getKeys(obj) {
        return Object.keys(obj)
    }
}
