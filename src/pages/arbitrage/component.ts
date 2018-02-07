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

@Component({
    selector: 'app-page-arbitrage',
    templateUrl: 'template.html'

})
@Injectable()
export class AppArbitragePage extends PageWithTabs implements OnInit, OnDestroy {
    listing = new Array();
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
    budget=1000;

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
    getBuyCommission(b,pair){
        return this.appConfigService.getFeesPerBroker(b).trading.pc
    }
    updateListing(b: string) {

        if (!(b in this.indexes))
            this.indexes[b] = {}
        let L = this.publicDataService.getListingByName(b)
        let res = L.getContent();
        console.log("CONTENT", b, res)
        for (let pair in res) {
            if (!(pair in this.appConfigService.infrasuprainv[b])) {

            } else {
                let is = this.appConfigService.infrasuprainv[b][pair];
                let infra = is.infra;
                let supra = is.supra;
                const key = supra + infra;
                const r = res[pair];
                const linew: Tick = {broker: b, pair: pair, volume: r.volume, bid: r.bid, ask: r.ask, p: r.last}
                if (b in this.indexes && linew.pair in this.indexes[b]) { //already added
                    const j: number = this.indexes[b][linew.pair];
                    let LL = this.listing[key]
                    let L = LL.brokers[b];
                    if (linew.ask < L.cheapestask) {
                        L.cheapestaskname = b;
                    }
                    if (linew.bid > L.mostexpensivebid) {
                        L.mostexpensivebidname = b;
                    }
                    L.cheapestask = Math.min(L.cheapestask, linew.ask)
                    L.mostexpensivebid = Math.max(L.mostexpensivebid, linew.bid);
                    L.spread = L.mostexpensivebid - L.cheapestask;
                    if (L.bid != linew.bid)
                        L.oldbid = L.bid;
                    if (L.ask != linew.ask)
                        L.oldask = L.ask;
                    L.ask = linew.ask;
                    L.bid = linew.bid;
                    if (L.ask > 0 && L.bid > 0) {
                        L.spread = L.ask - L.bid;
                        L.spreadpct = 100 * L.spread / L.ask;
                    } else {
                        L.spread = null;
                        L.spreadpct = null;
                    }
                    L.p = linew.p;
                } else {
                    this.indexes[b][linew.pair] = this.listing.length;
                    if (linew.ask > 0 && linew.bid > 0) {
                        linew.spread = linew.ask - linew.bid;
                    } else {
                        linew.spread = null;
                        linew.spreadpct = null;
                    }
                    linew.changelastprice = Math.random()
                    if (!(key in this.listing)) {

                        this.listing[key] = {cheapestask: linew.ask, cheapestaskname: b, mostexpensivebidname: b, spread: -1, mostexpensivebid: linew.bid, brokers: {}};
                        this.listing[key].brokers[b] = linew;
                    } else {
                        let L = this.listing[key];
                        if (linew.ask < L.cheapestask) {
                            L.cheapestaskname = b;
                        }
                        if (linew.bid > L.mostexpensivebid) {
                            L.mostexpensivebidname = b;
                        }
                        L.cheapestask = Math.min(L.cheapestask, linew.ask)
                        L.mostexpensivebid = Math.max(L.mostexpensivebid, linew.bid);
                        L.spread = L.mostexpensivebid - L.cheapestask;

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


    searchUpdated(filterValue) {

        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.filterValue = filterValue
    }

    addToSearch(word: string) {
        //console.log("add", word)
        for (let i = 0; i < this.listing.length; ++i) {
            let a: string = this.listing[i].pair.toLowerCase();
            let b: string = word.toLowerCase();
            if (a.indexOf(b) > -1) {
                this.searched.push(this.listing[i])
            }
        }
    }




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
        let r = [];
        for (let k in this.listing) {
            r.push({pair: k, spread: this.listing[k].spread / this.listing[k].cheapestask * 100, list: this.listing[k]})
        }
        this.sortedListing = r.sort(function (a, b) {
            let as = a.spread;
            let bs = b.spread;
            return bs - as;
        })

        console.log("thisso", this.sortedListing)
    }


    loadDataByBroker(b) {
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
    }

    getObjectKeys(obj): string[] {
        return Object.keys(obj)
    }

    filterData() {

        this.listing.forEach((l) => {
            let isBrokerSelected = this.brokerOptions[l.broker].active
            if (this.supports[l.infra].active)
                this.filteredData.push(l)
        })
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
