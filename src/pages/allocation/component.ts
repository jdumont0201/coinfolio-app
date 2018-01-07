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
@Component({
    selector: 'app-allocation',
    templateUrl: 'template.html'

})
@Injectable()
export class AppAllocationPage extends DataAndChartTemplate {
    allocation = [];
    isDataSourceArray = true;
    prices = [];
    type = "plain"
    showDataTable = true;
    providers = ["global"]

    displayedColumns = ['symbol', 'available', 'price', 'value'];

    optionsBase={
        chart: {type: 'pie', margin: 0,},
        title: {text: "Portfolio"},
        credits: {enabled: false},
        plotOptions: {
            series: {
                animation: false
            }
        }
    };
    options:any  = {
        chart: {type: 'pie', margin: 0,},
        title: {text: "Portfolio"},
        credits: {enabled: false},
        plotOptions: {
            series: {
                animation: false
            }
        }
    }

    constructor(public authService: AuthService, public appConfigService: AppConfigService, public requestService: RequestService, public dataService: DataService, public eventService: EventService, public logic: Logic, public snackBar: MatSnackBar) {
        super(logic, appConfigService, "plain")

        this.options = [];

    }

    charts = [];

    dataSource = [];


resetSnapshot(){
    this.logic.set("user",{lastsnapshot:Math.round(new Date().getTime()/1000)},(res)=>{

    })
}
    updateBinance() {
        console.log("updatebinance")

        const key = "binance";
        this.prepareUpdate(key)
        this.logic.BinanceGetAllocation((res) => {
            this.logic.BinanceGetLivePrices((P) => {
            this.logic.BinanceGetMyTrades((P) => {
                this.prices[key] = P;
                let V = 0;
                let data = [];
                for (let k in res.result)
                    if (parseInt(res.result[k].available) > 0) {
                        let q = res.result[k].available;
                        let p;
                        if (k === "USDT") {
                            p = 1;
                        } else if ((k + "USDT") in this.prices) {
                            p = parseFloat(P[k + "USDT"]);
                        } else {
                            let pb = parseFloat(P[k + "BTC"]);
                            let btcv = pb;
                            let b = parseFloat(P["BTCUSDT"]);
                            p = btcv * b;
                        }
                        V += p * q;
//                        if (k !== "USDT")
                            data.push({name: k, y: p * q})
                        this.allocation[key].push({symbol: k, available: q, price: p, value: p * q})
                        this.addToGlobal(k, p, q)

                    }
                this.allocation[key].push({symbol: "TOTAL", available: null, price: null, value: V})
                this.dataSource[key] = new MatTableDataSource(this.allocation[key]);
                this.updateOptions({title: {text: " "}, series: [{name: "Portfolio", data: data}], yAxis: {}}, key)
                this.chart = new Chart(this.options[key]);
                this.charts[key] = new Chart(this.options[key]);
                this.updateGlobal()
            });
        });
        });
    }

    addToGlobal(k, p, q) {
        const key:string = "global"
        let f: boolean = false;
        let data = [];
        for (let i = 0; i < this.allocation["global"].length; ++i) {
            data.push({name: k, y: p * q});

            if (this.allocation["global"][i].symbol === k) {
                this.allocation["global"][k].available += q;
                this.allocation["global"][k].value += p * q;
                f = true;
                return;

            }
        }

            this.allocation[key].push({symbol: k, available: q, price: p, value: p * q})
            this.updateOptions({title: {text: " "}, series: [{name: "Portfolio", data: data}], yAxis: {}}, key)
            this.charts[key] = new Chart(this.options[key]);


    }
        updateGlobal()
        {
            const key = "global"
            let data = [];
            for (let i = 0; i < this.allocation["global"].length; ++i) {
                let a = this.allocation["global"][i];
                data.push({name: a.symbol, y: a.value})
            }

            this.dataSource[key] = new MatTableDataSource(this.allocation[key]);
            this.updateOptions({title: {text: " "}, series: [{name: "Portfolio", data: data}], yAxis: {}})
            this.charts[key] = new Chart(this.options[key]);
console.log("GLOB",this.allocation,this.dataSource,this.charts)
        }

        prepareUpdate(key)
        {
            if (this.providers.indexOf(key) === -1)
                this.providers.push(key)
            this.allocation[key] = [];
        }
        updateKraken()
        {
            console.log("updatekraken")
            const key = "kraken";
            this.prepareUpdate(key)
            this.logic.KrakenGetAllocation((res) => {
                this.logic.KrakenGetLivePrices((P) => {
                    this.prices[key] = P;
                    let V = 0;
                    let data = [];
                    for (let k in res.result)
                        if (parseInt(res.result[k].available) > 0) {
                            let q = res.result[k].available;
                            let p;
                            if (k === "USDT") {
                                p = 1;
                            } else if ((k + "USDT") in this.prices) {
                                p = parseFloat(P[k + "USDT"]);
                            } else {
                                let pb = parseFloat(P[k + "BTC"]);
                                let btcv = pb;
                                let b = parseFloat(P["BTCUSDT"]);
                                p = btcv * b;
                            }
                            V += p * q;
                           // if (k !== "USDT")
                                data.push({name: k, y: p * q})
                            this.allocation[key].push({symbol: k, available: q, price: p, value: p * q})
                            this.addToGlobal(k, p, q)
                        }
                    this.allocation[key].push({symbol: "TOTAL", available: null, price: null, value: V})
                    this.dataSource[key] = new MatTableDataSource(this.allocation[key]);
                    this.updateOptions({title: {text: " "}, series: [{name: "Portfolio", data: data}], yAxis: {}}, key)
                    this.charts[key] = new Chart(this.options[key]);
                    if(P) this.updateGlobal()
                });
            });
        }

        updateData()
        {
            this.allocation = [];

            this.allocation["global"] = [];
            if (this.authService.isAuthenticated()) {
                this.logic.getMe((user) => {
                    console.log("logged", user)
                    if (user.ConnectionBinance)
                        this.updateBinance()

                    if (user.ConnectionKraken)
                        this.updateKraken()

                });

            }
        }
    }
