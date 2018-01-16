import {Logic} from "../../../logic/Logic";
import {TradingService} from "../services/trading.service";

export type Tick = { p: number, volume?: number, change?: number, changepips?: number, changelastprice?: number, changelasttime?: number, changeCloseTime?: number, changeLastTime?: number, usdvalue?: number, unitvalue?: number }
import * as async from 'async';
import {CryptoPair} from "./Listing";
import {RefreshService} from "../services/refresh.service";
import {ConsoleService} from "../../globalton/core/services/console.service";

export type Raw24hTicker = { symbol, quoteVolume, priceChange, priceChangePercent, prevClosePrice }

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

    constructor(public logic: Logic, public tradingService: TradingService, public refreshService: RefreshService, key: string, public consoleService: ConsoleService) {
        console.log("NEW BROKER TICKER", key)
        this.key = key;
        this.content = {}
    }

    getPairChange(pair: string, f, force?: boolean) {
        //console.log("getpairchange",pair);
        let c: Tick = this.getTick(pair)
        if (c) {
            //  console.log("getpairchange exist ?" ,pair,JSON.stringify(c));
            if (c.change && !force) { //*if tick change data is already loaded
                f({last: c.changelastprice, change: c.change, current: c.p, changeCloseTime: c.changeCloseTime, changeLastTime: c.changeLastTime, p: c.p})
            } else {
                this.load24hChangePerPair(pair, (res) => {
                    /*add tick change data*/
                    c.change = res.change;
                    c.p = res.current;
                    c.changeCloseTime = res.closeTime;
                    c.changeLastTime = res.lastTime;
                    c.changelastprice = res.last;
                    //        console.log("getpairchange update" ,pair,JSON.stringify(this.content[pair]));
                    f({last: res.last, current: res.current, change: res.change, p: c.p, changeCloseTime: c.changeCloseTime, changeLastTime: c.changeLastTime});
                });
            }
        } else {
            f(null)
        }
    }

    loadTicker(f: Function) {
        console.log("TICKER LOAD ")
        if (this.key == "binance") {
            this.loadBinance((success) => {
                if (success) {
                    this.consoleService.eventSent("PriceUpdatedEvent <-- Ticker", {broker: this.key, pair: "all"})
                    this.tradingService.PriceUpdatedEvent.emit({pair: "all", broker: this.key})
                    f(true)
                } else {
                    f(false)
                }
            });
        } else if (this.key == "kraken") {
            f(false)
        } else if (this.key == "hitbtc") {
            this.loadUniversal((success) => {
                if (success) {
                    this.consoleService.eventSent("PriceUpdatedEvent <-- Ticker", {broker: this.key, pair: "all"})
                    this.tradingService.PriceUpdatedEvent.emit({pair: "all", broker: this.key})
                    f(true)
                } else {
                    f(false)
                }
            });
        }else {
            f(false)
        }
    }

    loadBackground24hChange(f: Function) {
        if (this.key == "binance") {
            this.loadBinance(f);
        }
    }

    add(pair: string, p: number) {
        let sendEvent = false;
        if (pair in this.content)
            this.content[pair].p = p;
        else
            this.content[pair] = {p: p};
        if (sendEvent) {
            this.consoleService.eventSent("PriceUpdatedEvent <-- Ticker", {broker: this.key, pair: pair, price: p})
            this.tradingService.PriceUpdatedEvent.emit({broker: this.key, pair: pair, price: p})
        }
    }

    loadBinance(f: Function) {
        console.log("TICKER LOAD BIN")
        this.logic.BinanceGetLivePrices((prices) => {
            this.dataTime = new Date();
            console.log("TICKER LOAD BIN RES", prices)
            if (prices) {
                for (let symbol in prices) {
                    const p = parseFloat(prices[symbol])
                    this.add(symbol, p)
                }
                this.afterLoad()
                f(this.connected);
            } else {
                f(null)
            }
        });
    }
    loadUniversal(f: Function) {
        console.log("TICKER LOAD BIN")
        this.logic.getFromBroker(this.key,"ticker",(prices) => {
            this.dataTime = new Date();
            console.log("TICKER LOAD BIN RES", prices)
            if (prices) {
                for (let symbol in prices) {
                    const p = parseFloat(prices[symbol])
                    this.add(symbol, p)
                }
                this.afterLoad()
                f(this.connected);
            } else {
                f(null)
            }
        });
    }

    afterLoad() {
        let isInitialLoad = !this.connected
        if (isInitialLoad) {
            this.refreshService.createPool(this.key + "-ticker")
            //this.refreshService.createPool(this.key + "-portfolio-ticker")
            this.tradingService.TickerUpdatedEvent.emit({broker: this.key, success: true})
        }

        this.connected = true;

    }

    refresh(f, force?: boolean) {
        console.log("TICKER ", this.key, "refresh")
        if (force) this.content = {}
        this.loadTicker(() => {
            this.tradingService.getBrokerByName(this.key).getPortfolio().refreshTotal();
            f();
        })
    }

    processLoadBinance(e, cb) {
        setTimeout(() => {
            this.loadBinance24ChangeSymbol(typeof e == "string" ? e : e.symbol, (res) => {
                cb()
            })
        }, 3000)
    }

    load24hChangePerPair(pair, f: Function) {
        console.log("load24hChangePerPair")
        if (this.key == "binance")
            this.loadBinance24ChangeSymbol(pair, (res) => {
                f({last: res.prevClosePrice, change: res.priceChange, current: res.lastPrice, lastTime: res.openTime, closeTime: res.closeTime})
            })
        else
            console.error("not configured")

    }

    loadBinance24ChangeSymbol(pair: string, f: Function) {
        console.log("loadBinance24ChangeSymbol")
        this.logic.BinanceGet24hChange(pair, (ticker) => {
            //console.log(" -> gpc=", ticker)
            if (ticker) {
                this.add24hChange(ticker.symbol, ticker.quoteVolume, ticker.priceChange, ticker.priceChangePercent, ticker.prevClosePrice, ticker.lastPrice)
                f(ticker);
            } else {
                f(null)
            }
        })
    }

    /* adds the changes data from Ticker to the Listing Cryptopair*/
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
                this.processLoadBinance(e, cb)
            }, (e) => {
                console.log("MOSTTRADED END LIST", keys)
                async.eachSeries(keys, (e, cb) => {
                    if (res.indexOf(e) > -1) {
                        cb()
                    } else {
                        this.processLoadBinance(e, cb)

                    }

                }, (e) => {
                    f();
                })
            })


            console.log("TCIEKR LOAD 24h BINANCE")

        })
    }

    setMaxVolume(pair: string, volume: number) {
        let L = this.tradingService.getBrokerByName(this.key).getListing();
        let infra = pair in L.content ? L.content[pair].infra : null;
        //console.log("setmaxvol",this.maxVolume,infra in this.maxVolume)
        if (infra)
            if (!(infra in this.maxVolume)) {
                //console.log("setmaxvol newinfra",infra,volume);
                this.maxVolume[infra] = volume
            } else {
                // console.log("setmaxvol pair" ,pair,infra,this.maxVolume[infra],volume)
                this.maxVolume[infra] = Math.max(volume, this.maxVolume[infra])
                // console.log("  setmaxvol pair af" ,pair,infra,this.maxVolume[infra],volume)
            }

    }

    add24hChange(pair: string, volume: number, priceChange: number, priceChangePercent: number, ChangeLastPrice: number, lastPrice: number) {
        this.setMaxVolume(pair, volume);
        if (!pair) {
            console.log("ticker no pair");
            return
        }

        if (pair in this.content) {
            this.content[pair].volume = volume;
            this.content[pair].changepips = priceChange;
            this.content[pair].p = lastPrice;
            this.content[pair].change = priceChangePercent;
            this.content[pair].changelastprice = ChangeLastPrice;
            this.tradingService.PriceChangeUpdatedEvent.emit({pair: pair, broker: this.key})
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

    getPair(symbol) {
        if (symbol == "USDT") return "USDT";
        let candidate = symbol + "USDT";
        if (this.hasPair(candidate))
            return candidate;
        else if (this.hasPair(symbol + "BTC"))
            return symbol + "BTC"
        else if (this.hasPair(symbol + "BNB"))
            return symbol + "BNB"
        else console.log("cannot find pair for symbol" + symbol)
    }

    getUSDValue(symbol: string): number {
        if (symbol == "USDT") return 1;
        let candidate = symbol + "USDT";
        if (this.hasPair(candidate))
            return this.getPrice(candidate);
        else if (this.hasPair(symbol + "BTC"))
            return this.getPrice(symbol + "BTC") * this.getPrice("BTCUSDT");
        else if (this.hasPair(symbol + "BNB"))
            return this.getPrice(symbol + "BNB") * this.getPrice("BNBUSDT");
    }

    /*getUSDValuePair(pair:string):number{
        let L=this.tradingService.getBrokerByName(this.key).getListing()
        let p=L[pair];

    }*/
}

