import {Component, Input, OnInit, Injectable, ViewChild} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {StockChart, Chart} from 'angular-highcharts';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';
import {FormControl} from '@angular/forms';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {MatTableDataSource} from '@angular/material';
import {Logic} from "../../logic/Logic";

import {DataAndChartTemplate} from "../../lib/localton/components/DataWithChart/component";
@Component({
    selector: 'app-live-price',
    templateUrl: 'template.html'

})
@Injectable()
export class AppLivePriceWidget extends DataAndChartTemplate {
    displayedColumns = ['ts', 'open', 'high', 'low', 'close'];
    isLoading=true;
    @Input() pair: string
    @Input() period: string = "1m"
    @Input() base: string = "USD"
    source: string = "binance"

    options = {
        chart: {type: 'candlestick', margin: 0,},
        credits: {enabled: false},
        exporting:{enabled: false},
        plotOptions: {
            candlestick: {color: 'red', upColor: 'green', downColor: 'red'},
            series: {
                animation: false
            }
        }, navigator: {
            enabled: false,
            series: {
                fillColor: '#cccccc',
                fillOpacity: 0.1,
                lineColor: 'grey'
            }
        },
        rangeSelector: {
            enabled:false,
            selected: 4,
            inputEnabled: false,
            buttonTheme: {
                visibility: 'hidden'
            },
            labelStyle: {
                visibility: 'hidden'
            }
        }
    }

    constructor(public logic: Logic, public appConfigService: AppConfigService) {
        super(logic, appConfigService, "stock")
    }

    ngOnInit() {
        this.updateData()
    }

    updateData() {
        this.logic.BinanceGetOHLC(this.pair, this.period, (res) => {
            this.isLoading=false;
            this.checkData();
            let D = [];
            let minVal = 10000000;
            for (let i = 0; i < res.length; ++i) {
                const line = [parseInt(res[i][0]), parseFloat(res[i][1]), parseFloat(res[i][2]), parseFloat(res[i][3]), parseFloat(res[i][4])];
                minVal = Math.min(minVal, parseFloat(res[i][3]))
                D.push(line);
            }
            this.dataSource = new MatTableDataSource(res);
            this.data = D;
            this.updateOptions({
            exporting:{enabled: false},
                navigator:{enabled: false},
                series: [{
                    name: this.pair,
                    data: D
                }], yAxis: {}
            })
            this.chart = new StockChart(this.options);

        })
    }


    setValue(v: string) {
        this.pair = v;
        this.updateData();
    }

    setBase(v: string) {
        this.base = v;
        this.updateData();
    }

    setInterval(v: number) {
        this.period = v.toString();
        this.updateData();
    }

}
