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
import {Tick} from "../../lib/localton/structures/Ticker";

@Component({
    selector: 'app-page-arbitrage',
    templateUrl: 'template.html'

})
@Injectable()
export class AppArbitragePage extends PageWithTabs implements OnInit, OnDestroy {
    listing: Tick[] = new Array();
    supports = {}
    brokerOptions={}
    isLoading = true;

    displayedColumnsRef = ['pair','broker','bid','ask'];

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

    @ViewChild(MatSort) sort: MatSort;

    constructor(public refreshService: RefreshService, public requestService: RequestService, public eventService: EventService, public tradingService: TradingService, public dataService: DataService, public appConfigService: AppConfigService, public logic: Logic, public authService: AuthService) {
        super(refreshService, eventService)
        this.firstloadData();


    }
    initPossibleBrokers(){

    }
    ngOnInit(){

        this.eventService.searchUpdatedEvent.subscribe((val) => {    this.searchUpdated(val)             })
        this.tradingService.EnabledBrokersLoadingFinishedEvent.subscribe((val) => {
            this.brokerLoaded(val)
            this.tradingService.enabledBrokers.forEach((b)=>{
                let f = () => {                    this.loadDataByBroker(b);                }
                this.subscribeToRefresh(b + "-ticker", f,true)
                this.brokerOptions[b]={active:true}
            })

        })
        this.tradingService.enabledBrokers.forEach((b)=>{
            let f = () => {                this.loadDataByBroker(b);            }
            this.subscribeToRefresh(b + "-ticker", f,true)
            this.brokerOptions[b]={active:true}
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


    searchUpdated(filterValue) {
        console.log("search",filterValue,this,this.dataSource)
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
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


    dataSource;

    loadData() {
        console.log("loaddata",this.tradingService.enabledBrokers)
        if (this.tradingService.enabledBrokers)
            this.tradingService.enabledBrokers.forEach((b) => {
                this.loadDataByBroker(b)
            })
    }

    indexes={}
    updateListing(b){
        let B = this.tradingService.getBrokerByName(b);
        let L= B.getTicker().getList(this.sortby);//getList(this.sortby, "change");
        //update listing
        if(!(b in this.indexes))
            this.indexes[b]={}
        L.forEach((li)=>{
            if(b in this.indexes && li.pair in this.indexes[b]) { //already added
                let i=this.indexes[b][li.pair]
                this.listing[i]=li
            }else{
                this.indexes[b][li.pair]=this.listing.length;
                this.listing.push(li)
            }
        })
    }
    commonPairs:any[]=[]
    loadDataByBroker(b) {
        let B = this.tradingService.getBrokerByName(b);
        let L= B.getTicker().getList(this.sortby);//getList(this.sortby, "change");
        console.log("loaddata",b,B)
        if (!B) return
//        this.listing

        this.commonPairs=[]
        this.updateListing(b)

        this.listing.forEach((l)=>{
            this.commonPairs[l.pair]=[]
            this.listing.forEach((l2)=>{
                   if(l.supra == l2.supra && l.infra == l2.infra && l.broker != l2.broker){
                       //this.commonPairs[l.pair].push({broker:l2.broker})
                       //this.commonPairs[l.pair].push({broker:l.broker} )
                       this.commonPairs.push({pair:l.pair,isFirst:true,first:l,second:l2})
                       this.commonPairs.push({pair:l.pair,isFirst:false,first:l,second:l2})

                   }
            })
        })


        this.maxVolume = B.getTicker().maxVolume;

        this.listing.forEach((l) => {
            if (l.infra && l.infra in this.maxVolume && l.volume) {
                l.relativeVolume = l.volume / this.maxVolume[l.infra];
            } else l.relativeVolume = -1

            this.supports[l.infra] = {symbol: l.infra, active: l.infra in this.supports?(this.supports[l.infra].active):true}
            this.brokerOptions[l.broker] = {active: l.broker in this.brokerOptions?(this.brokerOptions[l.broker].active):true}

        })

        //this.filterData()
        this.dataSource = new MatTableDataSource(this.commonPairs);
        this.dataSource.sort = this.sort;
        this.loadTime = new Date()
        this.refreshTimer = this.refreshEvery;
        this.isRefreshing = false
        if (this.listing && this.listing.length > 0) this.isLoading = false
        console.log("loaddata",this.listing)
    }



    getObjectKeys(obj): string[] {
        return Object.keys(obj)
    }

    filterData() {

        this.listing.forEach((l) => {
            let isBrokerSelected= this.brokerOptions[l.broker].active
            if (this.supports[l.infra].active )
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

    searchCallback(){

    }
    applyFilter(event) {
        console.log("target",event)
        let filterValue=event.target.value;
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }
}
