import {Component, Injectable, OnDestroy, OnInit, ViewChild} from '@angular/core';
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

@Component({
    selector: 'app-listing',
    templateUrl: 'template.html'

})
@Injectable()
export class AppSymbolAllPage extends PageWithTabs implements OnInit, OnDestroy {
    listing: CryptoPair[] = new Array();
    supports = {}

    isLoading = true;

    displayedColumnsRef = ['traded', 'inptf', 'pair', 'broker','volume', '24hevol', 'bid', 'ask'];

    showGraphs = false;
    canShow = [];
    sortby = "has_been_traded"
    possibleSorts = ["name", "bid_ask_volume_ratio", "has_some_in_portfolio", "has_been_traded"]
    possiblePriceviews = ["crypto", "fiat", "crypto_and_fiat"]
    priceview = "both"

    maxVolume = {}

    @ViewChild(MatSort) sort: MatSort;

    constructor(public refreshService: RefreshService, public requestService: RequestService, public eventService: EventService, public tradingService: TradingService, public dataService: DataService, public appConfigService: AppConfigService, public logic: Logic, public authService: AuthService) {
        super(refreshService, eventService)
        this.firstloadData();
    }
    ngOnInit(){

        this.tradingService.EnabledBrokersLoadingFinishedEvent.subscribe((val) => {
            this.brokerLoaded(val)
            this.tradingService.enabledBrokers.forEach((b)=>{
                let f = () => {                    this.loadDataByBroker(b);                }
                this.subscribeToRefresh(b + "-bidask", f,true)
            })

        })
        this.tradingService.enabledBrokers.forEach((b)=>{
            let f = () => {                this.loadDataByBroker(b);            }
            this.subscribeToRefresh(b + "-bidask", f,true)
        })

    }

    ngOnDestroy() {
        console.log("listdes")
        this.unsubscribeAndStopAllRefresh()


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

    searchCallback(searchedText:string) {
        this.setTab(-1)
        this.searched = []
        let s: string = searchedText.trim()
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


    dataSource;

    loadData() {
        console.log("loaddata",this.tradingService.enabledBrokers)
        if (this.tradingService.enabledBrokers)
            this.tradingService.enabledBrokers.forEach((b) => {
                this.loadDataByBroker(b)
            })
    }

    loadDataByBroker(b) {


        let B = this.tradingService.getBrokerByName(b);
        console.log("loaddata",b,B)
        if (!B) return
        this.listing = B.getListing().getList(this.sortby, "change");
        this.maxVolume = B.getTicker().maxVolume;

        this.listing.forEach((l) => {
            if (l.infra && l.infra in this.maxVolume && l.volume) {
                l.relativeVolume = l.volume / this.maxVolume[l.infra];
            } else l.relativeVolume = -1

            this.supports[l.infra] = {symbol: l.infra, active: true}

        })

        this.filterData()
        this.dataSource = new MatTableDataSource(this.filteredData);
        this.dataSource.sort = this.sort;
        this.loadTime = new Date()
        this.refreshTimer = this.refreshEvery;
        this.isRefreshing = false
        if (this.listing && this.listing.length > 0) this.isLoading = false
        console.log("loaddata",this.filteredData)
    }

    filteredData;

    getObjectKeys(obj): string[] {
        return Object.keys(obj)
    }

    filterData() {
        this.filteredData = []
        this.listing.forEach((l) => {
            if (this.supports[l.infra].active)
                this.filteredData.push(l)
        })
        this.dataSource = new MatTableDataSource(this.filteredData);
    }

    lastListing = {};

    canShowItem(index, s): boolean {
        return true
    }

    setGraphView() {

        this.showGraphs = !this.showGraphs
    }


}
