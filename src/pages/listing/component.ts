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

@Component({
    selector: 'app-listing',
    templateUrl: 'template.html',
    changeDetection: ChangeDetectionStrategy.OnPush})
@Injectable()
export class AppSymbolAllPage extends PageWithTabs implements OnInit, OnDestroy {
    listing: Tick[] = new Array();
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
    dataSource = new MatTableDataSource();

    @ViewChild(MatSort) sort: MatSort;

    constructor(public refreshService: RefreshService, public requestService: RequestService, public consoleService: ConsoleService, public eventService: EventService, public tradingService: TradingService, public dataService: DataService, public appConfigService: AppConfigService, public logic: Logic, public authService: AuthService, public cd: ChangeDetectorRef) {
        super(refreshService, eventService, consoleService)
        this.firstloadData();
        this.dataSource = new MatTableDataSource(this.listing);

    }

    initPossibleBrokers() {

    }

    ngOnInit() {
        this.doSubscribe("searchUpdatedEvent", this.eventService.searchUpdatedEvent, (val) => {
            this.searchUpdated(val)
        })
        this.doSubscribe("EnabledBrokersLoadingFinishedEvent", this.tradingService.EnabledBrokersLoadingFinishedEvent, (val) => {
            this.brokerLoaded(val)
            this.tradingService.enabledBrokers.forEach((b) => {
                let f = () => {
                    this.loadDataByBroker(b);
                }
                this.subscribeToRefresh(b + "-ticker", f, true)
                this.brokerOptions[b] = {active: true}
            })
        })
        this.tradingService.enabledBrokers.forEach((b) => {
            let f = () => {
                this.loadDataByBroker(b);
            }
            this.subscribeToRefresh(b + "-ticker", f, true)
            this.brokerOptions[b] = {active: true}
        })
    }

    ngOnDestroy() {
        this.unsubscribeAndStopAllRefresh()
        this.unsubscribeAllEvents()
        this.appConfigService.possibleBrokers.forEach((b) => {
            let key = "public-" + b + "-ticker";
            this.refreshService.createPool(key);
            this.refreshService.getPool(key).stop();
        });

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

        this.cd.markForCheck();
        this.loadData()
    }

    searchCallback() {

    }


    searchUpdated(filterValue) {
        console.log("search filter", filterValue, this, this.dataSource)

        filterValue = filterValue.trim();
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.filterValue = filterValue
        this.dataSource.filter = filterValue;
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


    loadData() {
        console.log("loaddata");
        let loadFromPublic = true;
        if (loadFromPublic) {
            this.loadPublicData();
        } else {
            console.log("loaddata", this.tradingService.enabledBrokers)
            if (this.tradingService.enabledBrokers)
                this.tradingService.enabledBrokers.forEach((b) => {
                    this.loadDataByBroker(b)
                })
        }
    }

    loadPublicData() {
        console.log("loadpublic")
        this.appConfigService.possibleBrokers.forEach((b) => {
            //if(b=="binance") return;
            let key = "public-" + b + "-ticker";
            this.refreshService.createPool(key);
            this.refreshService.getPool(key).define(5000, () => {
                this.loadPublicDataByBroker(b, () => {
                    this.cd.markForCheck()
                })
            })
            this.refreshService.getPool(key).enable();
            this.loadPublicDataByBroker(b, () => {
                this.cd.markForCheck()
            })
            let key2 = "public-" + b + "-change";
            this.refreshService.createPool(key2);
            this.refreshService.getPool(key2).define(10000, () => {
                this.loadPublicChangeByBroker(b, () => {
                    this.cd.markForCheck()
                })
            })
            this.refreshService.getPool(key2).enable();
            this.loadPublicChangeByBroker(b, () => {
                this.cd.markForCheck()
            })
        })
        this.loadTime = new Date()
        this.refreshTimer = this.refreshEvery;
        this.isRefreshing = false
        if (this.listing && this.listing.length > 0) this.isLoading = false
        console.log("loadpublicdata", this.listing)
    }

    loadPublicChangeByBroker(b: string, f: Function) {
        if (!(b in this.indexes))
            this.indexes[b] = {}
        this.logic.getPublicChange(b, (res) => {
           for (let i in res) {
                const key = b + "-" + i;
                const r = res[i];
                if (b in this.indexes && r.pair in this.indexes[b]) { //already added
                    const j: number = this.indexes[b][r.pair];
                    let L = this.listing[j];
                    L.changelastprice = 100 * L.p / r.close-100;
                } else {

                }

            }

            this.cd.markForCheck();
            this.dataSource=new MatTableDataSource(this.listing)
                      this.dataSource.filter = this.filterValue;
                    this.dataSource.sort=this.sort;
            f();
        });
    }

    loadPublicDataByBroker(b: string, f: Function) {
        if (!(b in this.indexes))
            this.indexes[b] = {}
        this.logic.getFromPublic(b, "bidask", (res) => {
            for (let i in res) {
                const key = b + "-" + i;
                const r = res[i];
                const linew: Tick = {broker: b, pair: i, volume: r.volume, bid: r.bid, ask: r.ask, p: r.last}
                if (b in this.indexes && linew.pair in this.indexes[b]) { //already added
                    const j: number = this.indexes[b][linew.pair];
                    let L = this.listing[j]
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
                    linew.changelastprice=Math.random()
                    this.listing.push(linew);
                }
            }
            this.dataSource = new MatTableDataSource(this.listing)
            this.dataSource.filter = this.filterValue;
            this.dataSource.sort = this.sort;
            f();
        });
    }

    changeSort() {
        console.log("changesort",this.sort)
        this.cd.markForCheck();
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
        this.dataSource = new MatTableDataSource(this.filteredData);
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
        this.dataSource.filter = filterValue;
    }
}
