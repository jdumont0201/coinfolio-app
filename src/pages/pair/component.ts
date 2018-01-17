import {Component, Injectable, OnDestroy, ViewChild, OnChanges, SimpleChanges} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";
import {QueueingSubject} from 'queueing-subject'
import websocketConnect from 'rxjs-websockets'

import {WebsocketService} from '../../lib/globalton/core/services/websocket.service';
import {StockChart, Chart} from 'angular-highcharts';
import {ActivatedRoute} from "@angular/router";
import {Logic} from "../../logic/Logic";
import {Crypto} from "../../lib/localton/utils/utils";
import {TradingService} from "../../lib/localton/services/trading.service";
import {AppConfigService} from "../../lib/localton/services/appconfig.service";

export interface Message {
    author: string,
    message: string
}

@Component({
    selector: 'app-pair-item',
    templateUrl: 'template.html',
    styleUrls: ['styles.css']

})
@Injectable()
export class AppPairItemPage implements OnDestroy,OnChanges {
    pairId: string;
    brokerId: string;
    maxVol = 0;

    bids;
    asks;
    bidLevels = {};
    askLevels = {};
    askArray: { p: number, v: number }[];
    askArrayFiltered;
    bidArray: { p: number, v: number }[];
    bidArrayFiltered;
    nMsg = 0;
    symbol = "ETHBTC"
    nbDecimal = -1;
    decimalSpan;
    isLoading = true;
    supra: string;
    infra: string;
    trades: any[];
    broker: string;
    loadTime;
    refreshInterval
    refreshTimerInterval
    refreshTimer;
    refreshEvery = 4000;

    isErrored = false;
    errorMessage;

    constructor(public logic: Logic, public tradingService: TradingService, public requestService: RequestService, public websocketService: WebsocketService, public dataService: DataService, private route: ActivatedRoute, public appConfigService: AppConfigService) {
        route.params.subscribe(val => this.init())

        console.log("+pairpage")
            //this.init()


    }
    init(){
        console.log("pairpage init")
        this.decimalSpan = [];
        for (var i = 0; i < 10; ++i) this.decimalSpan.push(i)
        this.route.params.subscribe((params) => {

            this.pairId = params["pairId"];
            this.broker = params["broker"];
            if (!this.broker) {
                this.isErrored=true;
                this.errorMessage = "Invalid broker"+ this.broker
            }
            if (!this.pairId) {
                this.isErrored=true;
                this.errorMessage = "Invalid pair"+ this.pairId
            }
            if (!this.isErrored) {
                const symbols = Crypto.getSymbolsFromPair(this.pairId, this.appConfigService.getPossibleInfrasPerBroker(this.broker))
                this.supra = symbols.supra;
                this.infra = symbols.infra;
                this.brokerId = params["brokerId"];
                this.logic.BinanceGetMyTrades(this.pairId, (trades) => {
                    this.trades = trades;
                })
                this.runLastPriceWS()
            }
        });
    }
    ngOnChanges(changes: SimpleChanges) {
     console.log("pairpage change",this.pairId)
    }
    prevLastPrice;
    lastPrice;
    numberFormat = "1.5-5"
    numberFormatNDecimals: number = 5;

    ngOnDestroy() {
        console.log("- pairpage")
        this.messagesSubscription.unsubscribe()
    }

    messagesSubscription

    runLastPriceWS() {
        const url = "wss://stream.binance.com:9443/ws/" + this.pairId.toLowerCase() + "@aggTrade"
        const {messages, connectionStatus} = websocketConnect(url, new QueueingSubject<string>())
        //console.log("connectionStatus", connectionStatus)
        const connectionStatusSubscription = connectionStatus.subscribe(numberConnected => {
            console.log('number of connected websockets:', numberConnected)
        })


        this.messagesSubscription = messages.subscribe((message: string) => {
            //  console.log("runLastPriceWS", message)
            const m = JSON.parse(message)
            this.prevLastPrice = this.lastPrice
            this.lastPrice = parseFloat(m.p)
            this.numberFormat = Crypto.getNbFormat(this.lastPrice)
        })
    }


}
