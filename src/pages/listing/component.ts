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
    selector: 'app-listing',
    templateUrl: 'template.html',
    changeDetection: ChangeDetectionStrategy.OnPush})
@Injectable()
export class AppSymbolAllPage extends PageWithTabs implements OnInit, OnDestroy {
    listing: CryptoPair[] = new Array();
    supports = {}
    brokerOptions = {}
    isLoading = true;

    displayedColumnsRef = ['pair', 'broker','bid', 'ask',  'spreadpct'];

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

    constructor(public refreshService: RefreshService, public publicDataService:PublicDataService,public requestService: RequestService, public consoleService: ConsoleService, public eventService: EventService, public tradingService: TradingService, public dataService: DataService, public appConfigService: AppConfigService, public logic: Logic, public authService: AuthService, public cd: ChangeDetectorRef) {
        super(refreshService, eventService, consoleService)

        this.dataSource = new MatTableDataSource(this.listing);

    }

    initPossibleBrokers() {

    }

    ngOnInit() {
        this.doSubscribe("searchUpdatedEvent", this.eventService.searchUpdatedEvent, (val) => {
            this.searchUpdated(val)
        })

        this.appConfigService.possibleBrokers.forEach((b)=>{
            let key = "public-" + b + "-listing";
            this.refreshService.getPool(key).enable()
            this.refreshService.getPool(key).addHook("listing-table",()=>{
               this.updateListing(b)
            })
        })


    }
    updateListing(b:string){
        if (!(b in this.indexes))
            this.indexes[b] = {}
        let L=this.publicDataService.getListingByName(b)
        let res=L.getContent();
        console.log("CONTENT",b,res)
        for (let pair in res) {
            const key = b + "-" + pair;
            const r = res[pair];

            if (b in this.indexes && pair in this.indexes[b]) { //already added

                const j: number = this.indexes[b][pair];
                this.listing[j]=r;
            }else{

                this.indexes[b][pair] = this.listing.length;
                this.listing.push(r);
            }
        }
        console.log(this.listing)
        this.dataSource = new MatTableDataSource(this.listing)
        this.dataSource.filter = this.filterValue;
        this.dataSource.sort = this.sort;
        this.cd.markForCheck();

    }
    ngOnDestroy() {
        this.unsubscribeAndStopAllRefresh()
        this.unsubscribeAllEvents()
        this.appConfigService.possibleBrokers.forEach((b)=>{
            let key = "public-" + b + "-listing";
            this.refreshService.getPool(key).stop()
        })

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
        for (let i = 0; i < this.listing.length; ++i) {
            let a: string = this.listing[i].pair.toLowerCase();
            let b: string = word.toLowerCase();
            if (a.indexOf(b) > -1) {
                this.searched.push(this.listing[i])
            }
        }
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
                    L.changelastprice = 100 * L.last / r.close-100;
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

    changeSort() {
        console.log("changesort",this.sort)
        this.cd.markForCheck();
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
