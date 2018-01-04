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
    allocation;
    prices;
    type="plain"
    showDataTable = true
    ;
    displayedColumns = ['symbol', 'available', 'price', 'value'];


    options = {
        chart: {type: 'pie' ,      margin: 0,},
        title:{text:"Portfolio"},
        credits: {enabled: false},
        plotOptions: {
            series: {
                animation: false
            }
        }
    }

    constructor(public authService: AuthService, public appConfigService: AppConfigService, public requestService: RequestService, public dataService: DataService, public eventService: EventService, public logic: Logic, public snackBar: MatSnackBar) {
        super(logic, appConfigService,"plain")


    }

    updateData() {
        if (this.authService.isAuthenticated()) {
            console.log("logged")
            this.logic.getMe((user) => {
                this.logic.BinanceGetAllocation((res) => {
                    this.logic.BinanceGetLivePrices((P) => {

                        this.prices = P;
                        this.prices = P;
                        // for (let k=0;k<P.length;++k)
                        //    this.prices[P[k].symbol]=parseFloat(P[k].price)

                        this.allocation = [];
                        let V=0;
                        let data=[]
                        for (let k in res.result)
                            if (parseInt(res.result[k].available) > 0) {
                                let q = res.result[k].available;
                                let p;
                                if(k == "USDT") {
                                    p=1;
                                }else if((k + "USDT") in this.prices){
                                    p =  parseFloat(this.prices[k + "USDT"]);

                                }else {
                                    let pb=    parseFloat(this.prices[k + "BTC"]);
                                    let btcv=pb;
                                    let b=    parseFloat(this.prices["BTCUSDT"]);
                                    p = btcv*b ;

                                }
                                V+=p*q;
                                if(k!=="USDT")
                                    data.push({name:k,y:p*q})
                                this.allocation.push({symbol: k, available: q, price: p, value: p * q})
                            }
                        this.allocation.push({symbol: "TOTAL", available: null, price: null, value: V})

                        console.log("all", this.allocation)

                        this.dataSource = new MatTableDataSource(this.allocation);

                        this.updateOptions({title:{text:" "},series: [{
                            name: "Portfolio",
                            data: data
                        }],yAxis : {

                        }})
                        this.chart = new Chart(this.options);

                    });
                });


            });

        }
    }
}
