import {Component, ComponentFactoryResolver, Input, OnInit, Injectable, ViewChild, OnChanges, SimpleChanges} from '@angular/core';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {Logic} from "../../logic/Logic";
import {Crypto} from "../../lib/localton/utils/utils";

import {DataAndChartTemplate} from "../../lib/localton/components/DataWithChart/component";
import {EventService} from "../../lib/localton/services/event.service";
import {RefreshService} from "../../lib/localton/services/refresh.service";

@Component({
    selector: 'app-live-price',
    templateUrl: 'template.html'

})
@Injectable()
export class AppLivePriceWidget extends DataAndChartTemplate implements OnInit,OnChanges {
    displayedColumns = ['ts', 'open', 'high', 'low', 'close'];
    isLoading = true;
    isError = false;
    @Input() pair: string
    @Input() broker: string
    @Input() period: string = "1m"
    @Input() base: string = "USD"
    @Input() showTitle: boolean = false;
    @Input() trades
    @Input() type = "stock";
    @Input() refresh = false;
    infra;
    supra;

    source: string = "binance"
    possiblePeriods = ['1m', '5m', '15m', '30m', '1h', '2h', '4h', '1d', '1w']
    options = {
        scrollbar: {
            barBackgroundColor: "#ff00cc"
        },
        chart: {
            margin: [0, 0, 0, 0],
            type: 'candlestick',
            backgroundColor: null,
            zoomType: 'none'
        },
        title: {text: ""},
        legend: {enabled: false},
        credits: {enabled: false},

        exporting: {enabled: false},
        plotOptions: {
            candlestick: this.appConfigService.ohlcColors['spec'],

            series: {
                animation: false
            }
        },
        yAxis: {
            crosshair: true,
            gridLineColor: '#707073',
            labels: {
                style: {
                    color: '#E0E0E3'
                }
            },

            lineColor: 'red',
            minorGridLineColor: '#505053'
        }
        , navigator: {
            enabled: true,
            series: {
                fillColor: '#cccccc',
                fillOpacity: 0.1,
                lineColor: 'grey'
            }
        },
        rangeSelector: {
            enabled: false,
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

    constructor(public logic: Logic, public appConfigService: AppConfigService, public eventService: EventService, public refreshService: RefreshService) {
        super(refreshService, logic, appConfigService, eventService, "stock")
        console.log("+ liveprice")


    }
    ngOnChanges(changes: SimpleChanges) {
        console.log("liveprice change")
        this.init()
    }
    init(){
        console.log("init liveprice", this.period,this.pair)
        this.checkValid(this.pair, "Undefined pair")
        this.checkValid(this.broker, "Undefined broker")
        if (!this.isErrored) {
            const pair = Crypto.getSymbolsFromPair(this.pair, this.appConfigService.getPossibleInfrasPerBroker(this.broker))
            this.supra = pair.supra;
            this.infra = pair.infra;
            //if(this.refresh)
            //this.initRefresh()
            this.firstLoadData()
        }
    }
    ngOnInit() {
        this.init()

    }

    refreshData() {
        this.isRefreshing = true;
        this.updateData()
    }

    firstLoadData() {
        this.isLoading = true;
        this.updateData()
    }

    barClick() {
        //this.zoom()
    }

    getRange() {
        let nb = 150;
        if (this.period === "1m") return 1000 * 60 * nb
        else if (this.period === "5m") return 1000 * 60 * 5 * nb;
        else if (this.period === "15m") return 1000 * 60 * 15 * nb
        else if (this.period === "1h") return 1000 * 60 * 60 * nb
    }

    addRightMarginData(D: any[]) {
        let diff = D[D.length - 1][0] - D[D.length - 2][0];
        for (var i = 0; i < 10; ++i) {
            const line = [D[D.length - 1][0] + diff * i, null, null, null, null];
            D.push(line);
        }
    }

    chartData;

    updateData() {
        console.log("liveprice upd ", this.period, this.pair)
        this.isLoading = true;
        this.isError = false;
        this.logic.BinanceGetOHLC(this.pair, this.period, (res) => {
            this.loadTime = new Date().getTime()
            console.log("BinanceGetOHLC", res)

            if (!res || res.error) {
                this.isError = true;
                this.isLoading = false;
                //this.snackBar.open('ErrYou signed off', null, {duration: 3000});
                return
            }
            this.chartData = res;
            this.checkData();
            let D = [];
            let minVal = 10000000;

            for (let i = 0; i < res.length; ++i) {
                const line = [parseInt(res[i][0]), parseFloat(res[i][1]), parseFloat(res[i][2]), parseFloat(res[i][3]), parseFloat(res[i][4])];
                minVal = Math.min(minVal, parseFloat(res[i][3]))
                D.push(line);
            }
            //if(this.trades)

            this.addRightMarginData(D)
            this.dataSource = new MatTableDataSource(res);
            this.data = D;
            this.updateOptions({
                exporting: {enabled: false},
                yAxis: {
                    crosshair: {
                        snap: false,
                        color: "#437173",
                        label: {
                            enabled: true,
                            padding: 8
                        }
                    },
                    gridLineColor: '#2f5c64',
                    labels: {
                        style: {
                            color: '#E0E0E3'
                        }, opposite: false
                    },

                    lineColor: '#707073',
                    minorGridLineColor: '#505053'
                },
                xAxis: {
                    crosshair: {snap: false, color: '#437173'},
                    range: this.getRange(),
                    alternateGridColor: '#10789e',
                    labels: {
                        style: {
                            backgroundColor: "red",
                            color: "#ccc"
                        }
                    },
                    plotBands: [{}]
                },
                scrollbar: {
                    barBackgroundColor: "#0e9ba1",
                    trackBackgroundColor: "#437173",
                    trackBorderColor: "#437173"
                },
                navigator: {enabled: false},
                series: [{
                    name: this.pair,
                    data: D
                }]
            })

            this.draw()
            let maxd = this.data[this.data.length - 1][0];
            let mind = this.data[this.data.length - 10][0];
            console.log("ma", maxd, mind, this.chart)
            this.isLoading = false;
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
