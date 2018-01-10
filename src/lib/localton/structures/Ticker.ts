import {Logic} from "../../../logic/Logic";
import {TradingService} from "../services/trading.service";

export type Tick = { p: number, volume?: number, change?: number, changepips?: number, changelastprice?: number, changelasttime?: number }
import * as async from 'async';
import {CryptoPair} from "./Listing";
export type Raw24hTicker={symbol, quoteVolume, priceChange, priceChangePercent, prevClosePrice}
function getUSDValue(k, P) {
    let p;

    if (k === "USDT") {
        p = 1;
    } else if (k === "BTC") {
        p = parseFloat(P["BTCUSDT"]);
    } else if ((k + "USDT") in this.prices) {
        p = parseFloat(P[k + "USDT"]);
    } else {
        let pb = parseFloat(P[k + "BTC"]);
        let btcv = pb;
        let b = parseFloat(P["BTCUSDT"]);
        p = btcv * b;
    }
    return p;
}

export class Ticker {
    key: string;
    content: { [pair: string]: Tick } = {}
    connected: boolean = false;
    dataTime: Date

    maxVolume: Object = {};

    constructor(public logic: Logic, public tradingService: TradingService, key: string) {
        console.log("NEW BROKER TICKER", key)
        this.key = key;
        this.content = {}
    }

    getPairChange(pair: string,f) {
        console.log("gpc","pair",pair)
        if (pair in this.content) {
            if (this.content[pair].change){
                console.log("gpc get existing",pair, this.content[pair].change)
                f( this.content[pair].change)
            }

            else{
                console.log("gpc get new",pair, this.content[pair].change)
                this.loadBinance24ChangeSymbol(pair, (res:Raw24hTicker)=>{
                    this.content[pair].change=res.priceChange;
                    console.log("gpc get new res",pair, this.content[pair].change)
                    f(res);
                });
            }

        }
    }

    load(f: Function) {
        if (this.key == "binance") {
            this.loadBinance(f);
        }
    }

    loadBackground24hChange(f: Function) {
        if (this.key == "binance") {
            this.loadBinance(f);
        }
    }

    add(symbol: string, p: number) {
        this.content[symbol] = {p: p};
    }

    loadBinance(f: Function) {
        console.log("TICKER LOADBIN")
        this.logic.BinanceGetLivePrices((prices) => {
            this.dataTime = new Date();
            console.log("LOADBIN RES", prices)
            if (prices) {
                for (let symbol in prices) {
                    let p = parseFloat(prices[symbol])
                    this.add(symbol, p)
                }
                this.connected = true;
                f(this.connected);
            }
        });
    }

    processLoad(e, cb) {
        setTimeout(() => {
            this.loadBinance24ChangeSymbol(typeof e == "string" ? e : e.symbol, (res) => {
                cb()
            })
        }, 300)
    }

    loadBinance24ChangeSymbol(pair: string, f: Function) {
        this.logic.BinanceGet24hChange(pair, (ticker) => {
            if (ticker) {
                this.add24hChange(ticker.symbol, ticker.quoteVolume, ticker.priceChange, ticker.priceChangePercent, ticker.prevClosePrice)
                f(ticker);
            }
        })
    }

    appendChange(L: CryptoPair[]) {
        L.forEach((l) => {
            const t = this.content[l.pair]
            l.change = t.change

            l.changelastprice = t.changelastprice
            l.changelasttime = t.changelasttime
            l.pricemoy = (l.bid + l.ask) / 2
            l.volume = t.volume ? Math.floor(t.volume) : null
        })
    }

    load24ChangeBinance(f: Function) {

        let L = this.tradingService.getBrokerByName(this.key).getListing();
        let max = 4;
        let count = 0;
        let keys = Object.keys(L.content);
        this.tradingService.getBrokerByName(this.key).getTrades().getMostTraded((res) => {
            console.log("MOSTTRADED", res)
            async.eachSeries(res, (e, cb) => {
                this.processLoad(e, cb)
            }, (e) => {
                console.log("MOSTTRADED END LIST", keys)
                async.eachSeries(keys, (e, cb) => {
                    if (res.indexOf(e) > -1) {
                        cb()
                    } else {
                        this.processLoad(e, cb)

                    }

                }, (e) => {
                    f();
                })
            })


            console.log("TCIEKR LOAD 24h BINANCE")

        })
    }

    setMaxVolume(pair: string, volume: number) {
        let infra = this.tradingService.getBrokerByName(this.key).getListing().content[pair].infra;
        //console.log("setmaxvol",this.maxVolume,infra in this.maxVolume)
        if (!(infra in this.maxVolume)) {
            //console.log("setmaxvol newinfra",infra,volume);
            this.maxVolume[infra] = volume
        } else {
            // console.log("setmaxvol pair" ,pair,infra,this.maxVolume[infra],volume)
            this.maxVolume[infra] = Math.max(volume, this.maxVolume[infra])
            // console.log("  setmaxvol pair af" ,pair,infra,this.maxVolume[infra],volume)
        }

    }

    add24hChange(pair: string, volume: number, priceChange: number, priceChangePercent: number, ChangeLastPrice: number) {
        this.setMaxVolume(pair, volume);
        if (!pair) {
            console.log("ticker no pair");
            return
        }
        console.log("add change", pair, priceChangePercent, "vol=", volume)
        if (pair in this.content) {
            this.content[pair].volume = volume;
            this.content[pair].changepips = priceChange;
            this.content[pair].change = priceChangePercent;
            this.content[pair].changelastprice = ChangeLastPrice;
        } else {
            console.log("ticker new item at live", pair)
        }

    }

    getSymbolChange(symbol: string): number {
        let pair: string = this.tradingService.getBrokerByName(this.key).getListing().getBasePair(symbol)
        if (pair)
            return this.content[pair].change;
    }

    getTick(s: string): Tick {
        if (s in this.content)
            return this.content[s];
        else return null;
    }

    hasPair(s) {
        return s in this.content
    }

    getPrice(s: string): number {
        if (s in this.content)
            return this.content[s].p;
        else return null;
    }

    getUSDValue(symbol: string): number {
        if (symbol == "USDT") return 1;
        let candidate = symbol + "USDT";
        if (this.hasPair(candidate))
            return this.getPrice(candidate);
        else if (this.hasPair(symbol + "BTC"))
            return this.getPrice(symbol + "BTC") * this.getPrice("BTCUSDT");
        else if (this.hasPair(symbol + "BNB"))
            return this.getPrice(symbol + "BNB") * this.getPrice("BTCUSDT");


    }

}

/*
export class TickerCollection {
    portfolios: Ticker[] = []
    isLoaded = false;

    getConnected(): Ticker[] {
        return this.portfolios.filter((p: Ticker) => {
            return p.connected;
        })
    }

    constructor(public logic: Logic,public tradingService) {

    }

    init(keys: string[], f: Function) {

        this.create("global")
        keys.forEach((k: string) => {
            this.create(k)
        })


        this.load(f);
    }

    add(key: string, symbol: string, q: number) {
        this.getPortfolioByName(key).add(symbol, q);
        this.getPortfolioByName("global").add(symbol, q);
    }

    addBatch(key: string, batch: { symbol: string, q: number }[]) {
        let idx = this.getPortofolioIndex(key);
        batch.forEach((b) => {
            this.portfolios[idx].add(b.symbol, b.q)
        })
    }

    getPortfolioByName(key): Ticker {
        return this.portfolios[this.getPortofolioIndex(key)];
    }

    getPortofolioIndex(key): number {
        let res = -1;
        this.portfolios.forEach((p: Ticker, i: number) => {
            if (p.key == key) res = i;
        })
        return res;
    }

    reset() {
        this.portfolios = [];
    }


    create(name: string) {
        let P = new Ticker(this.logic,this.tradingService, name);
    }

    load(f: Function) {

        this.portfolios.forEach((p: Ticker) => {
            p.load((res) => {
                if (res) this.isLoaded = true
            });
        })
    }
}*/