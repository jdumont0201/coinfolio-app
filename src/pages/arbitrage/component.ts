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


type List = { cheapestask: number, cheapestaskname: string, mostexpensivebidname: string, infra: string, supra: string, askdepth: any, biddepth: any, spread: number, mostexpensivebid: number, brokers: any ,preask:any,postbid:any};
type SortedListItem = { pair: string, spread: number, askdepth: any[], biddepth: any[], list: List, infra: string, supra: string }

@Component({
    selector: 'app-page-arbitrage',
    templateUrl: 'template.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
@Injectable()
export class AppArbitragePage extends PageWithTabs implements OnInit, OnDestroy {
    grid: { [pair: string]: List } = {};
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


    lastgrid = {};
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
                this.updateGrid(b)
            })
        })

    }

    getTradingCommission(b, pair) {
        let S=this.appConfigService.getFeesPerBroker(b);
        if (S)
        return S.trading.pc
        else return 0
    }
    getDepositCommission(b, pair) {
        return this.appConfigService.getFeesPerBroker(b).deposit
    }
    getWithdrawCommission(b, pair) {
        if( pair in this.appConfigService.getFeesPerBroker(b).withdraw) {
            return this.appConfigService.getFeesPerBroker(b).withdraw[pair]
        }else{
            return 0
        }

    }



    addDepth(broker, name, raw) {
        this.logic.getDepthFromPublic(broker, name, (depth) => {
            this.grid[name].askdepth[broker] = depth.ask
        });

    }

    updateKey(b: string, pair: string, res: any) {
        if (!(pair in this.appConfigService.infrasuprainv[b])) {
            console.log("err unknown pair", b, pair)
        } else {
            const key = this.appConfigService.getPairRawName(b, pair);
            const r = res[pair];
            //console.log("b",b,"USD",this.appConfigService.infrasupra,r.infra)

            let prepair;
            let prer;
            let prepairask=1
            let prepairbid=1
            if(r.infra!=="USD"){
                if("USD" in this.appConfigService.infrasupra && r.infra in this.appConfigService.infrasupra["USD"])
                prepair=this.appConfigService.infrasupra["USD"][r.infra][b];
                if(prepair){
                    prer=res[prepair];
                    prepairask=prer.ask;
                    prepairbid=prer.bid;
                }
            }
            let linew= {broker: b, pair: key, volume: r.volume, bid: r.bid, ask: r.ask, p: r.last, infra: r.infra, supra: r.supra,preask:prepairask,postbid:prepairbid,spread:null,spreadpct:null}
            if (linew.ask > 0 && linew.bid > 0) {
                linew.spread = linew.ask - linew.bid;
            } else {
                linew.spread = null;
                linew.spreadpct = null;
            }
            if (key in this.grid && b in this.grid[key].brokers) {// if broker already added to compare grid
                this.updatePairExistingKeyExistingBroker(b, key, linew)
            } else {
                if (!(key in this.grid)) {
                    this.updatePairNewKeyNewBroker(b, key, linew)
                } else {
                    this.updatePairExistingKeyNewBroker(b, key, linew)

                }
            }
        }
    }

    updatePairExistingKeyExistingBroker(b: string, key: string, linew: any) {
        let LL = this.grid[key]
        let Lbroker = LL.brokers[b];
        if (linew.ask < Lbroker.cheapestask) {
            Lbroker.cheapestaskname = b;
            Lbroker.preask=linew.preask;
        }
        if (linew.bid > Lbroker.mostexpensivebid) {
            Lbroker.mostexpensivebidname = b;
            Lbroker.postbid=linew.postbid;
        }

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
    }

    updatePairExistingKeyNewBroker(b: string, key: string, linew: any) {
        let LL = this.grid[key];
        if (linew.ask < LL.cheapestask) {
            LL.cheapestaskname = b;
            LL.preask=linew.preask;
        }
        if (linew.bid > LL.mostexpensivebid) {
            LL.mostexpensivebidname = b;
            LL.postbid=linew.postbid;
        }
        LL.cheapestask = Math.min(LL.cheapestask, linew.ask)
        LL.mostexpensivebid = Math.max(LL.mostexpensivebid, linew.bid);
        LL.spread = LL.mostexpensivebid - LL.cheapestask;

        this.grid[key].brokers[b] = linew;
    }

    updatePairNewKeyNewBroker(b: string, key: string, linew: any) {
        this.grid[key] = {
            cheapestask: linew.ask,
            cheapestaskname: b,
            preask:linew.preask,
            postbid:linew.postbid,
            askdepth: {},
            biddepth: {},
            mostexpensivebidname: b,
            spread: -1,
            mostexpensivebid: linew.bid,
            brokers: {},
            infra: linew.infra,
            supra: linew.supra


        };
        this.grid[key].brokers[b] = linew;
    }

    updateGrid(b: string) {
        if (!(b in this.indexes))
            this.indexes[b] = {}
        let L = this.publicDataService.getListingByName(b)
        let res = L.getContent();
        console.log("CONTENT", b, res)
        for (let pair in res) {
            this.updateKey(b, pair, res)
        }
        this.sortGrid();
        this.cd.markForCheck();

    }

    ngOnDestroy() {
        this.unsubscribeAndStopAllRefresh()
        this.unsubscribeAllEvents()
        this.appConfigService.possibleBrokers.forEach((b) => {
            let key = "public-" + b + "-grid";
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


    show(r) {
        console.log("rshow", r)
    }


    sortedGrid = [];
    displayed = {}

    sortGrid() {
        let r: SortedListItem[] = [];
        for (let k in this.grid) {
            let l = this.grid[k]
            if (l.spread > 0)
                r.push({infra: l.infra, supra: l.supra, pair: k, spread: l.spread / l.cheapestask * 100, askdepth: [], biddepth: [], list: l})
        }
        this.sortedGrid = r.sort(function (a, b) {
            let as = a.spread;
            let bs = b.spread;
            return bs - as;
        })

        console.log("thisso", this.sortedGrid)
    }

    toggleDisplay(pair) {
        if (pair in this.displayed) delete this.displayed[pair]
        else this.displayed[pair] = true
    }


    getObjectKeys(obj): string[] {
        return Object.keys(obj)
    }

    open(pair, broker) {
        console.log("op", pair)
        window.open(this.appConfigService.getTradeScreen(broker, pair), "_blank")
    }

    filterData() {
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
