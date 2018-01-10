import {Logic} from "../../../logic/Logic";
import {EventService} from "../services/event.service";
import {Crypto as C} from "../utils/utils"
import {TradingService} from "../services/trading.service";


import * as async from 'async';

export type Trade = { id: string, price: number, symbol: string, direction: string, time: number, commission: number, commissionunit: string, q: number, broker: string }

export class Trades {
    content: { [name: string]: Trade } = {}
    dataTime: Date;
    progress: number;
    symbolCount = {}
    mostTradedPairs;

    constructor(public logic: Logic, public eventService: EventService, public tradingService: TradingService, public key: string) {

    }

    has(symbol): boolean {
        return symbol in this.content
    }

    refresh() {
        this.load(() => {
        })
    }

    load(f: Function) {
        console.log("TRADE : LOAD LISTING", this.key)
        if (this.key == "binance") {
            this.loadBinance(f);
        }
    }

    getTrades(): Trade[] {

        let r = []
        for (let k in this.content)
            r.push(this.content[k])
        r.sort((a: any, b: any) => {
            const keyA = a.time, keyB = b.time
            if (keyA < keyB) return 1
            if (keyA > keyB) return -1;
            else return a.symbol < b.symbol ? -1 : 1
        });
        return r;
    }

    saveMostTraded() {
        this.logic.getMe((me) => {
            me.mostTradedPairs = JSON.stringify(this.getPairCount());
            console.log("stats save most")
            this.logic.saveUser(me, (res) => {
                console.log("stats saved")
            })
        });
    }
    getMostTraded(f){
        this.logic.getMe((me) => {
            console.log("MOSTTRADED",me.mostTradedPairs)
            let mt=me.mostTradedPairs
            if(mt) mt=JSON.parse(mt)
            this.mostTradedPairs=mt
           f(mt);
        });
    }

    processLoad(e,cb){
        setTimeout(() => {
            this.loadBinanceSymbol(typeof e=="string"? e:e.symbol, (res) => {
                this.progress++;
                this.loadCount++
                if(this.loadCount % 20==0)                     this.saveMostTraded()
                cb()
            })
        }, 300)
    }
    loadCount=0
    loadBinance(f: Function) {
        let L = this.tradingService.getBrokerByName(this.key).getListing();
        let max = 4;
        let count = 0;
        let keys = Object.keys(L.content);
        this.getMostTraded((res)=>{

            console.log("MOSTTRADED",res)
            async.eachSeries(res, (e, cb) => {
                this.processLoad(e,cb)
            }, (e) => {
                console.log("MOSTTRADED END LIST",keys)
                async.eachSeries(keys, (e, cb) => {
                    if(res.indexOf(e)>-1){
                        cb()
                    }else{
                        this.processLoad(e,cb)

                    }

                }, (e) => {
                    f();
                })
            })


            this.progress = 0;
            console.log("TRADE LOAD TRADES BINANCE", L.content, L.isLoaded, keys)

        })
    }

    loadBinanceSymbol(symbol: string, f: Function) {
        this.logic.BinanceGetMyTrades(symbol, (trades) => {
            this.dataTime = new Date();
            if (trades) {
                for (let k in trades) {
                    let l = trades[k]
                    this.add(l.id, symbol, "binance", parseFloat(l.price), l.isBuyer ? "long" : "short", parseFloat(l.qty), parseFloat(l.commission), l.commissionunit, l.time)
                }
                f();
            }
        })
    }

    getCount() {
        return Object.keys(this.content).length
    }
    hasTraded(pair:string){
        return pair in this.symbolCount
    }

    getPairCount(pair?: string) {
        if (pair)
            if (pair in this.symbolCount)
                return this.symbolCount[pair]
            else return 0
        else {
            let res = []
            for (var k in this.symbolCount) res.push({symbol: k, count: this.symbolCount[k]})
            res.sort((a: any, b: any) => {
                const keyA = a.count, keyB = b.count
                if (keyA < keyB) return 1
                if (keyA > keyB) return -1;
                else return a.symbol < b.symbol ? -1 : 1
            });
            return res;
        }
    }

    add(id: string, symbol: string, broker: string, price: number, direction: string, q: number, commission: number, commissionunit: string, time: number) {
        if (this.key !== "global")
            this.tradingService.globalBroker.getTrades().add(id, symbol, broker, price, direction, q, commission, commissionunit, time)
        if (symbol in this.symbolCount) this.symbolCount[symbol]++
        else this.symbolCount[symbol] = 1;
        //console.log("add trade",id,this.progress)
        if (id in this.content) {
            this.content[id].direction = direction;
            this.content[id].price = price;
            this.content[id].symbol = symbol;
            this.content[id].commission = commission;
            this.content[id].q = q;
            this.content[id].broker = broker;
            this.content[id].time = time;
            this.content[id].commissionunit = commissionunit;

        } else {
            this.content[id] = {
                id: id,
                commissionunit: commissionunit,
                price: price,
                symbol: symbol,
                direction: direction,
                broker: broker,
                q: q,
                commission: commission,
                time: time
            }
        }

    }
}
