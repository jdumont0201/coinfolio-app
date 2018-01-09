import {Component, Injectable, OnDestroy, ViewChild} from '@angular/core';
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
export class AppPairItemPage implements OnDestroy {
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

    supra: string;
    infra: string;
    trades: any[];
    loadTime;

    constructor(public logic: Logic, public tradingService: TradingService, public requestService: RequestService, public websocketService: WebsocketService, public dataService: DataService, private route: ActivatedRoute) {
        //console.log("+pair")
        this.decimalSpan = [];
        for (var i = 0; i < 10; ++i) this.decimalSpan.push(i)
        this.route.params.subscribe((params) => {
            this.pairId = params["pairId"];
            const symbols = Crypto.getSymbolsFromPair(this.pairId)
            this.supra = symbols.supra;
            this.infra = symbols.infra;
            this.brokerId = params["brokerId"];
            this.logic.BinanceGetMyTrades(this.pairId, (trades) => {
                this.trades = trades;
            })

            this.runLastPriceWS()
        });


    }

    prevLastPrice;
    lastPrice;
    numberFormat = "1.5-5"
    numberFormatNDecimals: number = 5;

    ngOnDestroy() {
        this.messagesSubscription.unsubscribe()
    }

    messagesSubscription

    runLastPriceWS() {
        const url = "wss://stream.binance.com:9443/ws/" + this.pairId.toLowerCase() + "@aggTrade"
        const {messages, connectionStatus} = websocketConnect(url, new QueueingSubject<string>())
        console.log("connectionStatus", connectionStatus)
        const connectionStatusSubscription = connectionStatus.subscribe(numberConnected => {
            console.log('number of connected websockets:', numberConnected)
        })


        this.messagesSubscription = messages.subscribe((message: string) => {
            console.log("runLastPriceWS", message)
            const m = JSON.parse(message)
            this.prevLastPrice = this.lastPrice
            this.lastPrice = parseFloat(m.p)
            this.setNbFormat()
        })
    }

    setNbFormat() {
        if (this.lastPrice > 10000) {this.numberFormat = "1.1-1";this.nbDecimal=1}
        else if (this.lastPrice > 1000){ this.numberFormat = "1.2-2";this.nbDecimal=2}
        else if (this.lastPrice > 100) {this.numberFormat = "1.3-3";this.nbDecimal=3}
        else if (this.lastPrice > 10) {this.numberFormat = "1.4-4";this.nbDecimal=4}
        else if (this.lastPrice > 1) {this.numberFormat = "1.5-5";this.nbDecimal=5}
        else if (this.lastPrice > 0.1){ this.numberFormat = "1.6-6";this.nbDecimal=6}
        else if (this.lastPrice > 0.01){ this.numberFormat = "1.7-7";this.nbDecimal=7}
        else{ this.numberFormat = "1.7-7";this.nbDecimal=7}
        console.log(this.lastPrice, this.numberFormatNDecimals, this.numberFormat)



    }


}
