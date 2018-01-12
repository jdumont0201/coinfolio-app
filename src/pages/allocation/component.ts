import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Injectable, ViewChild} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {EventService} from "../../lib/localton/services/event.service";
import {Logic} from "../../logic/Logic";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {MatSnackBar, MatTableDataSource} from "@angular/material";
import {FormGroup} from "@angular/forms";

import {StockChart, Chart} from 'angular-highcharts';


import {DataAndChartTemplate} from "../../lib/localton/components/DataWithChart/component";
import {AppConfigService} from "../../lib/localton/services/appconfig.service";
import {TradingService} from "../../lib/localton/services/trading.service";
import {RefreshService} from "../../lib/localton/services/refresh.service";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";

@Component({
    selector: 'app-allocation',
    templateUrl: 'template.html',
    changeDetection: ChangeDetectionStrategy.Default

})
@Injectable()
export class AppAllocationPage extends DataAndChartTemplate {
    allocation = [];
    filteredAllocation = [];
    isDataSourceArray = true;
    prices = [];
    type = "plain"
    showDataTable = true;


    isLoading = true;
    displayedColumns = ['symbol', 'available', 'price', 'value', 'pairs'];
    show = "hide_small_balances"
    possibleShow = ["hide_small_assets", "show_all_balances"]
    optionsBase = {
        chart: {
            type: 'pie', margin: 0, backgroundColor: {
                linearGradient: {x1: 0, y1: 0, x2: 1, y2: 1},
                stops: [
                    [0, 'transparent'],
                    [1, 'transparent']
                ]
            }
        },

        title: {text: "Portfolio"},
        credits: {enabled: false},
        plotOptions: {
            pie: {colors: ["#CBF078", "#e4c828", "#F1B963", "#E46161", "#35B0AB", "#226B80", "#8785A2"]},
            line: {dataLabels: {style: {textOutline: false}}},
            series: {
                animation: false
            }
        }
    };
    options: any = {
        chart: {type: 'pie', margin: 0,},
        title: {text: "Portfolio"},
        credits: {enabled: false},
        plotOptions: {
            series: {
                animation: false
            }
        }
    }

    brokers: string[] = []
    poolDefinedSubscription
    dataRefreshSubscription

    ngOnInit() {

        let updateForAllBrokers = (val) => {
            this.consoleService.eventReceived("POOL-ticker --> allocation")
            this.tradingService.enabledBrokers.forEach((b) => {
                console.log("POOL REFRESHED!")
                this.update(b, false)
            });
        }
        let pool = "binance-portfolio-ticker"
        this.dataRefreshSubscription=this.refreshService.subscribe(pool, updateForAllBrokers)
        console.log("init try pool subscription",this.dataRefreshSubscription)
        if (!this.dataRefreshSubscription)
            this.poolDefinedSubscription = this.eventService.poolDefinedEvent.subscribe((val: { name: string, delay: number }) => {
                //console.log("allocation new pool defined checking", val.name)
                if (val.name == pool) {
                    console.log("allocation new pool defined", val.name)
                    this.dataRefreshSubscription = this.refreshService.subscribe(pool, updateForAllBrokers)
                    console.log("pool " + pool + " successfully subscribed", this.dataRefreshSubscription)
                }
            })
    }

    ngOnDestroy() {
        console.log("pool def unsubscribe")
        if (this.poolDefinedSubscription)
            this.poolDefinedSubscription.unsubscribe()
        console.log("pool unsubscribe")
        if (this.dataRefreshSubscription)
            this.dataRefreshSubscription.unsubscribe()
    }

    constructor(public authService: AuthService, public consoleService: ConsoleService, public refreshService: RefreshService, public appConfigService: AppConfigService, public tradingService: TradingService, public requestService: RequestService, public dataService: DataService, public eventService: EventService, public logic: Logic, public snackBar: MatSnackBar, private cd: ChangeDetectorRef) {
        super(logic, appConfigService, eventService, "plain")

        this.eventService.brokerLoadedEvent.subscribe((val) => {
            this.brokerLoaded(val)
            this.brokers = tradingService.getConnectedBrokersKeys();
            this.hasConnected = true;
        })
        this.brokers = tradingService.getConnectedBrokersKeys();
        console.log("TEST", this.authService.isAuthenticated(), !this.isLoading, !this.hasConnected)
        this.options = [];

    }

    brokerLoaded(val: { key: string, loaded: boolean }) {
        this.update(val.key, true)
        //this.update("global")
    }


    charts = [];
    portfolios = {}
    dataSource = [];
    hasConnected = false;

    resetSnapshot() {
        this.logic.set("user", {lastsnapshot: Math.round(new Date().getTime() / 1000)}, (res) => {

        })
    }


    data;

    update(key, isInitial) {

        this.prepareUpdate(key)
        if (this.tradingService.isBrokerLoaded(key)) {
            let P = this.tradingService.getBrokerByName(key).getPortfolio();

            if (key == "global" || isInitial)
                this.processData(key, P)
            else {
                this.processData(key, P)
                P.refresh(() => {
                    this.processData(key, P)
                });
            }


        } else {
            console.log("broker", key, "not ready")
        }
    }

    processData(key, P) {
        let alloc = P.getAllocation(this.isShowingAllBalances() ? null : 15)
        alloc.gridData.push({symbol: "TOTAL", value: P.getTotalUSDValue()})
        this.portfolios[key] = P;
        this.dataSource[key] = new MatTableDataSource(alloc.gridData);
        this.updateOptions({
            title: {text: " "},
            series: [{name: "Portfolio", data: alloc.chartData}],
            yAxis: {}
        }, key)
        this.charts[key] = new Chart(this.options[key]);
        this.isLoading = false
        this.cd.markForCheck()
    }

    isShowingAllBalances() {
        return this.show == "show_all_balances"
    }

    refreshFilter(key) {
        for (let keyb in this.tradingService.getConnectedBrokers())
            this.update(keyb, true)

        //this.update("global")
    }


    prepareUpdate(key) {
        this.options[key] = this.optionsBase;
        this.allocation[key] = [];
        this.filteredAllocation[key] = [];
    }

    updateData() {
        this.allocation = [];
        if (this.authService.isAuthenticated()) {
            this.logic.getMe((user) => {
                console.log("logged", user)
                if (user.ConnectionBinance)
                    this.update("binance", false)
                if (user.ConnectionKraken)
                    this.update("kraken", false)
                // this.update("global")
            });

        }
    }
}
