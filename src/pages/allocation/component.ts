import {Component, Injectable, ViewChild} from '@angular/core';
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

@Component({
    selector: 'app-allocation',
    templateUrl: 'template.html'

})
@Injectable()
export class AppAllocationPage extends DataAndChartTemplate {
    allocation = [];
    filteredAllocation = [];
    isDataSourceArray = true;
    prices = [];
    type = "plain"
    showDataTable = true;
    providers = ["global"]
    isLoading = true;
    displayedColumns = ['symbol', 'available', 'price', 'value',  'pairs'];
    show = "hide_small_balances"
    possibleShow = ["hide_small_assets",  "show_all_balances"]
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


    constructor(public authService: AuthService, public appConfigService: AppConfigService, public tradingService: TradingService, public requestService: RequestService, public dataService: DataService, public eventService: EventService, public logic: Logic, public snackBar: MatSnackBar) {
        super(logic, appConfigService, eventService, "plain")

        this.eventService.brokerLoadedEvent.subscribe((val) => {
            this.brokerLoaded(val)
            this.hasConnected = true;
        })
        console.log("TEST", this.authService.isAuthenticated(), !this.isLoading, !this.hasConnected)
        this.options = [];

    }

    brokerLoaded(val: { key: string, loaded: boolean }) {
        this.update(val.key)
        this.update("global")
    }


    charts = [];
    portfolios = {}
    dataSource = [];
    fdata = []
    hasConnected = false;

    resetSnapshot() {
        this.logic.set("user", {lastsnapshot: Math.round(new Date().getTime() / 1000)}, (res) => {

        })
    }


    data;

    update(key) {
        console.log("updatealloc", key)
        this.prepareUpdate(key)
        if (this.tradingService.isBrokerLoaded(key)) {
            let P = this.tradingService.getBrokerByName(key).getPortfolio();
            console.log("alloc", key, this.isShowingAllBalances() ? null : 15, JSON.stringify(P.content))
            if (key == "global")
                this.processData(key, P)
            else
                P.refresh(() => {

                    this.processData(key, P)
                });

        } else {
            console.log("broker", key, "not ready")
        }
    }

    processData(key, P) {
        console.log("alloc refresh", key, this.isShowingAllBalances() ? null : 15, JSON.stringify(P.content))

        let alloc = P.getAllocation(this.isShowingAllBalances() ? null : 15)
        console.log("alloc getalloc", key, this.isShowingAllBalances() ? null : 15, alloc, JSON.stringify(P.content))
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
        console.log("TEST", this.authService.isAuthenticated(), !this.isLoading, !this.hasConnected)
    }

    isShowingAllBalances() {
        return this.show == "show_all_balances"
    }

    refreshFilter(key) {
        for (let keyb in this.tradingService.getConfiguredBrokers())
            this.update(keyb)

        this.update("global")
    }


    prepareUpdate(key) {
        if (this.providers.indexOf(key) === -1)
            this.providers.push(key)
        this.options[key] = this.optionsBase;
        this.allocation[key] = [];
        this.filteredAllocation[key] = [];
    }

    updateData() {
        this.allocation = [];

        this.allocation["global"] = [];
        if (this.authService.isAuthenticated()) {
            this.logic.getMe((user) => {


                console.log("logged", user)
                if (user.ConnectionBinance)
                    this.update("binance")

                if (user.ConnectionKraken)
                    this.update("kraken")
                this.update("global")

            });

        }
    }
}
