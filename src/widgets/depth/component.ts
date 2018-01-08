import {Component, Input, OnInit, Injectable, ViewChild} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {Logic} from "../../logic/Logic";

import {DataAndChartTemplate} from "../../lib/localton/components/DataWithChart/component";
import {QueueingSubject} from 'queueing-subject'
import websocketConnect from 'rxjs-websockets'

import {WebsocketService} from '../../lib/globalton/core/services/websocket.service';
import {StockChart, Chart} from 'angular-highcharts';
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'app-live-depth',
    templateUrl: 'template.html'

})
@Injectable()
export class AppDepthWidget {
    @Input() pairId: string;
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

    nbDecimal = 5;
    decimalSpan;
    isLoading = true;
    nbShow = 20;

    constructor(public logic: Logic, public appConfigService: AppConfigService, public requestService: RequestService, public websocketService: WebsocketService, public dataService: DataService) {

        this.decimalSpan = [];
        for (let i = 0; i < 10; ++i) this.decimalSpan.push(i)


    }

    ngOnInit() {
        this.initDepth((res) => {
          //  this.runDepthWS()
        })

    }

    askFilterMethod = "ceil"
    bidFilterMethod = "floor"

    setDecimals(i) {
        this.nbDecimal = i;
        this.aggregateArrays()
    }
    aggregateArrays(){
        this.bidArrayFiltered = this.filterArray(this.bidFilterMethod, this.nbDecimal, this.bidArray,true);
        this.askArrayFiltered = this.filterArray(this.askFilterMethod, this.nbDecimal, this.askArray,true);
    }
    iterRefresh = 0;

    runDepthWS() {
        const url = "wss://stream.binance.com:9443/ws/" + this.pairId.toLowerCase() + "@depth"
        const {messages, connectionStatus} = websocketConnect(url, new QueueingSubject<string>())
        const messagesSubscription = messages.subscribe((message: string) => {

            this.iterRefresh++;
            if (this.iterRefresh == 20) {
                this.iterRefresh = 0;
                this.initDepth((res) => {

                });
            } else {
                const m = JSON.parse(message)
                this.bids = m.b;
                this.asks = m.a;
                this.parseTable(this.bids, this.bidLevels);
                this.parseTable(this.asks, this.askLevels);
                this.listToArray();

                this.aggregateArrays()
            }
        })
    }


    initDepth(f: Function) {
        this.logic.BinanceGetDepth(this.pairId, (res) => {

            this.parseObject(res.bids, this.bidLevels)
            this.parseObject(res.asks, this.askLevels)
            this.listToArray()

            this.aggregateArrays()
            this.isLoading = false;
            f()
        })
    }

    parseTable(table, res) {
        for (let i = 0; i < table.length; ++i) {
            let b = table[i];
            const p = parseFloat(b[0])
            const v = parseFloat(b[1])
            if (v === 0)
                delete res[p]
            else if (p in res && res[p])
                res[p] += v
            else
                res[p] = v
        }
    }

    parseObject(table, res) {
        for (let p in table) {
            const v = table[p]
            const pp = parseFloat(p)
            if (v === 0)
                delete res[pp]
            else if (pp in res && res[pp])
                res[pp] += v
            else
                res[pp] = v
        }
    }

    listToArray() {
        this.maxVol = 0;
        this.askArray = []
        for (let k in this.askLevels) {
            const v: number = this.askLevels[k];
            this.askArray.push({p: parseFloat(k), v: v})
            if (v > this.maxVol) this.maxVol = v;
        }
        this.bidArray = []
        for (let k in this.bidLevels) {
            const v: number = this.bidLevels[k];
            this.bidArray.push({p: parseFloat(k), v: v})
            if (v > this.maxVol) this.maxVol = v;
        }
    }

    sortArray(A: any[], inverted: boolean) {
        A.sort(function (a, b) {
            const keyA = a.p, keyB = b.p;
            if (keyA < keyB) return inverted ? 1 : -1;
            if (keyA > keyB) return inverted ? -1 : 1;
            return 0;
        });
    }

    filterArray(method: string, nbdecimal, A: { p: number, v: number }[],inverted:boolean): { p: number, v: number }[] {
        this.maxVol = 0;
        let R = {}
        const d: number = Math.pow(10, nbdecimal)
        for (let i = 0; i < A.length; ++i) {

            let pf;
            if (method == "floor") pf = Math.floor(d * A[i].p) / d;
            if (method == "ceil") pf = Math.ceil(d * A[i].p) / d;
            if (method == "round") pf = Math.round(d * A[i].p) / d;
            console.log(A[i].p, "x", d, " --> ", pf)
            if (pf in R && R[pf])
                R[pf] += A[i].v
            else
                R[pf] = A[i].v
        }
        let F = [];

        for (let p in R) {
            let v: number = R[p];
            F.push({p: parseFloat(p), v: v})
            if (v > this.maxVol) this.maxVol = v;
        }
        this.sortArray(F,inverted);
        return F;
    }
}
