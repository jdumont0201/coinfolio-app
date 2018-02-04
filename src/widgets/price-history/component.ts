import {Component, ComponentFactoryResolver, Input, OnInit, Injectable, ViewChild, OnChanges, SimpleChanges, AfterViewInit} from '@angular/core';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {MatSnackBar, MatTableDataSource} from '@angular/material';
import {Logic} from "../../logic/Logic";
import {Crypto} from "../../lib/localton/utils/utils";

import {EventService} from "../../lib/localton/services/event.service";
import {RefreshService} from "../../lib/localton/services/refresh.service";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";
import {TradingService} from "../../lib/localton/services/trading.service";
import {Refreshing} from "../../lib/localton/components/Refreshing/component";
import {Strings} from "../../lib/globalton/core/utils/utils";
import {DataAndChartTemplate} from "../../lib/localton/components/DataWithChart/component";
import {ZoomableRefreshable} from "../../lib/localton/components/ZoomableRefreshable/component";
import {WebsocketService} from "../../lib/globalton/core/services/websocket.service";
import * as socketio from "socket.io-client"

@Component({
    selector: 'app-price-history',
    templateUrl: 'template.html'

})
@Injectable()
export class AppPriceHistoryWidget extends ZoomableRefreshable implements OnInit, OnChanges, AfterViewInit {
    displayedColumns = ['ts', 'open', 'high', 'low', 'close'];
    isLoading = true;
    isError = false;
    @Input() pair: string
    @Input() broker: string
    @Input() period: string;
    @Input() base: string = "USD"
    @Input() showTitle: boolean = false;
    @Input() trades
    @Input() type = "stock";
    @Input() refresh = false;
    infra;
    supra;
    chartId;

    source: string = "binance"
    possiblePeriods = ['1m', '5m', '15m', '30m', '1h', '2h', '4h', '1d', '1w']

    draw() {
    }

    constructor(public consoleService: ConsoleService, public websocketService: WebsocketService, public tradingService: TradingService, public logic: Logic, public appConfigService: AppConfigService, public eventService: EventService, public refreshService: RefreshService) {
        super(refreshService, eventService, consoleService)
        this.chartId = Strings.getRandom(7);
        this.consoleService.chart("before chart charid", this.chartId);
        window.addEventListener('beforeunload', () => {
            console.log("beforeunload")
            const id = this.broker + "-" + this.pair + "-mini-" + this.period;
            let s=this.websocketService.getSocket(id);
            if(s)
            s.close()
        });
    }


    ngOnChanges(changes: SimpleChanges) {
        console.log("preChart  change", JSON.stringify(changes))
        if (this.isInit)
            this.init()
    }

    init() {
        console.log("preChart  init", this.period, this.pair)
        //console.log("init liveprice", this.period,this.pair)
        this.checkValid(this.pair, "Undefined pair")
        this.checkValid(this.broker, "Undefined broker")
        if (!this.isErrored) {
            const pair = Crypto.getSymbolsFromPair(this.pair, this.appConfigService.getPossibleInfrasPerBroker(this.broker))
            this.supra = pair.supra;
            this.infra = pair.infra;
            //if(this.supra!=="123")
            this.firstLoadData()
        }
    }

    isInit = false;

    ngOnInit() {
        console.log("preChart  --> oninit")
        this.isInit = true
        this.init()

    }


    firstLoadData() {
        console.log("preChart  firstLoadData", this.period, this.pair)
        this.isLoading = true;
        this.updateData()
    }

    barClick() {
        //this.zoom()
    }

    chartData;
    lastCandle;

    updateData() {
        console.log("preChart  updatedata", this.period, this.pair)
        this.isLoading = true;
        this.isError = false;
        this.logic.getPrice(this.broker, (res) => {
            console.log("getprice", this.pair, res)
            this.loadTime = new Date()
            if (!res || res.error) {
                this.isError = true;
                this.isLoading = false;
                return
            }
            const id = this.broker + "-" + this.pair + "-mini-" + this.period;
            let task = "ohlc";
            const url = "ws://34.243.147.139:3014/" + this.broker + "/" + this.pair.toUpperCase() + "/" + this.period;
            this.websocketService.create(id, url, (m: any) => {
                //console.log("msdg", JSON.stringify(m),new Date(parseInt(m.ts)*1000).toISOString())
                if (m) {
                    this.lastCandle = {ts: new Date(parseInt(m.ts)*1000).toISOString().split('.')[0], o:parseFloat( m.o), h: parseFloat(m.h), l:parseFloat( m.l), c: parseFloat(m.c), v: parseFloat(m.v)};
                } else {
                                      console.log("errmsg",m,typeof m);
                }
            }, "simple");


            this.chartData = res;
            this.isLoading = false;
        }, this.pair, this.period, 40)
    }

    ngOnDestroy() {
        console.log("ondestroy")
        const id = this.broker + "-" + this.pair + "-mini-" + this.period;
        let s=this.websocketService.getSocket(id);
        if(s)
            s.close()
    }


    setValue(v: string) {
        this.pair = v;
        this.updateData();
    }

    setBase(v: string) {
        this.base = v;
        this.updateData();
    }

    setInterval(v: string) {
        console.log("setinterval");
        const id = this.broker + "-" + this.pair + "-live-" + this.period
        this.websocketService.close(id)

        this.period = v;//Crypto.getIntervalSeconds(v)

        this.updateData();
    }

}
