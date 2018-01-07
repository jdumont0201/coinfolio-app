import {Component, Injectable, ViewChild}         from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";
import {QueueingSubject} from 'queueing-subject'
import websocketConnect from 'rxjs-websockets'

import {WebsocketService} from '../../lib/globalton/core/services/websocket.service';
import {StockChart, Chart} from 'angular-highcharts';
import {ActivatedRoute} from "@angular/router";
import {Logic} from "../../logic/Logic";

export interface Message {
    author: string,
    message: string
}

@Component({
    selector: 'app-pair-item',
    templateUrl: 'template.html',
    styleUrls:['styles.css']

})
@Injectable()
export class AppPairItemPage {
    pairId: string;
    brokerId: string;
    maxVol = 0;
    bids;
    asks;
    bidLevels = {};
    askLevels = {};
    askArray:{p:number,v:number}[];
    askArrayFiltered;
    bidArray:{p:number,v:number}[];
    bidArrayFiltered;
    nMsg = 0;
    symbol = "ETHBTC"
    nbDecimal=5;
    decimalSpan;

    supra:string;
    infra:string;
    constructor(public logic: Logic, public requestService: RequestService, public websocketService: WebsocketService, public dataService: DataService, private route: ActivatedRoute) {
        //console.log("+pair")
        this.decimalSpan= [];
        for(var i=0;i<10;++i)            this.decimalSpan.push(i)
        this.route.params.subscribe((params) => {
            this.pairId = params["pairId"];
            const symbols=this.getSymbolsFromPair(this.pairId)
            this.supra=symbols.supra;
            this.infra=symbols.infra;
            this.brokerId = params["brokerId"];

        });


    }
    getSymbolsFromPair(pair:string){
        let a,b;
        const n=pair.length;
        const right=pair.substring(n-3,n);
        const rightB=pair.substring(n-4,n);
        if(right==="BTC"){ a=pair.substring(0,n-3);b=right;}
        else if(right==="ETH") {a=pair.substring(0,n-3);b=right;}
        else if(rightB==="USDT") { a=pair.substring(0,n-4);b=rightB;}
        return {supra:a,infra:b}
    }
    runPriceWS(){
        const url = "wss://stream.binance.com:9443/ws/" + this.symbol.toLowerCase() + "@kline_1m"
        const {messages, connectionStatus} = websocketConnect(url, new QueueingSubject<string>())
        const messagesSubscription = messages.subscribe((message: string) => {
            const m = JSON.parse(message)
        console.log(m)
        })

    }

}
