import {Logic} from "../../../logic/Logic";
import {TradingService} from "../services/trading.service";

import {Crypto} from "../utils/utils"

export type Tick = {
    p: number,
    ask?: number,
    bid?: number,
    oldask?: number,
    oldbid?: number,
    volume?: number,
    change?: number, changepips?: number, changelastprice?: number, changelasttime?: number, changeCloseTime?: number, changeLastTime?: number,
    usdvalue?: number, unitvalue?: number,
    infra: string, supra: string, broker: string, pair: string, relativeVolume?: number
}
import * as async from 'async';
import {CryptoPair} from "./Listing";
import {RefreshService} from "../services/refresh.service";
import {ConsoleService} from "../../globalton/core/services/console.service";
import {CurrencyService} from "../../globalton/core/services/currency.service";
import {AppConfigService} from "../services/appconfig.service";
import {Assert} from "../../globalton/core/utils/assert";

export type Raw24hTicker = { symbol, quoteVolume, priceChange, priceChangePercent, prevClosePrice }


export class Ticker {
    key: string;
    content: { [pair: string]: Tick } = {}
    connected: boolean = false;
    dataTime: Date
    possibleInfras: string[]
    ignoredPairs: string[]
    maxVolume: Object = {};

    isConnected(): boolean {
        return this.connected
    }

    constructor(public logic: Logic, public currencyService: CurrencyService, public tradingService: TradingService, public refreshService: RefreshService, key: string, public consoleService: ConsoleService, public appConfigService: AppConfigService) {
        //console.log("NEW BROKER TICKER", key)
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
        //console.log("TICKER LOAD ", this.key)
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
            this.loadUniversal((success) => {
                if (success) {
                    this.consoleService.eventSent("PriceUpdatedEvent <-- Ticker", {broker: this.key, pair: "all"})
                    this.tradingService.PriceUpdatedEvent.emit({pair: "all", broker: this.key})
                    f(true)
                } else {
                    f(false)
                }
            });
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
        } else {
            f(false)
        }
    }

    loadBackground24hChange(f: Function) {
        if (this.key == "binance") {
            this.loadBinance(f);
        }
    }

    add(pair: string, r: any) {
        let sendEvent = false;
        //console.log("add",this.key,pair,r)
        if (this.ignoredPairs.indexOf(pair) == -1) {
            if (pair in this.content) {
                this.content[pair].oldbid = this.content[pair].bid;
                this.content[pair].oldask = this.content[pair].ask;
                this.content[pair].p = r.last;
                this.content[pair].bid = r.bid;
                this.content[pair].ask = r.ask;
                this.content[pair].volume = r.volume
            } else {
                //console.log("addticker",this.key,pair,this.possibleInfras)
                const symbols = Crypto.getSymbolsFromPair(pair, this.possibleInfras)

                this.content[pair] = {
                    p: r.last,
                    bid: r.bid,
                    ask: r.ask,
                    volume: r.volume,

                    broker: this.key,
                    supra: symbols.supra, pair: pair,
                    infra: symbols.infra
                };
            }

            if (sendEvent) {
                this.consoleService.eventSent("PriceUpdatedEvent <-- Ticker", {broker: this.key, pair: pair, price: r.last})
                this.tradingService.PriceUpdatedEvent.emit({broker: this.key, pair: pair, price: r.last})
            }
        }
    }

    loadBinance(f: Function) {
        this.beforeLoad()
        this.logic.BinanceGetLivePrices((prices) => {

            this.dataTime = new Date();
            //console.log("TICKER LOAD BIN RES", prices)
            if (prices) {

                this.logic.BinanceGetBookTickers((listing) => {
                    if (listing) {

                        for (let symbol2 in listing) {
                            let l = listing[symbol2]
                            /*let pair = Crypto.getSymbolsFromPair(symbol2,this.appConfigService.getPossibleInfrasPerBroker(this.key))
                            let inptf = this.tradingService.globalBroker.getPortfolio().has(pair.supra,20)
                            let hasTraded = this.tradingService.globalBroker.getTrades().hasTraded(symbol2)
                            let usdref = this.getUSDValue(pair.infra, listing)

                            parseFloat(l.bid), parseFloat(l.ask), parseFloat(l.bids), parseFloat(l.asks), pair.infra, pair.supra, inptf, usdref.ask, usdref.bid,hasTraded
                            */
                            this.add(symbol2,{
                                last:parseFloat(prices[symbol2]),
                                bid:parseFloat(l.bid),
                                ask:parseFloat(l.ask)
                            })

                        }
                        this.afterLoad()
                        f(this.connected);
                    }
                });

            } else {
                f(null)
            }
        });

    }

    loadUniversal(f: Function) {

        this.beforeLoad()
        this.logic.getFromBroker(this.key, "ticker", (prices: { [s: string]: any }) => {
            this.dataTime = new Date();
            //console.log("TICKER LOAD ", this.key + " RES", prices)
            if (prices) {
                for (let symbol in prices) {
                    this.add(symbol, prices[symbol])
                }
                this.afterLoad()

                f(this.connected);
            } else {
                f(null)
            }
        });
    }

    beforeLoad() {
        //console.log("TICKER LOAD ", this.key)
        let isInitialLoad = !this.connected
        if (isInitialLoad) {
            this.possibleInfras = this.appConfigService.getPossibleInfrasPerBroker(this.key)
            this.ignoredPairs = this.appConfigService.getIgnoredPairsPerBroker(this.key)
        }

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
        //console.log("TICKER ", this.key, "refresh")
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
        //console.log("load24hChangePerPair")
        if (this.key == "binance")
            this.loadBinance24ChangeSymbol(pair, (res) => {
                f({last: res.prevClosePrice, change: res.priceChange, current: res.lastPrice, lastTime: res.openTime, closeTime: res.closeTime})
            })
        else
            console.log("not configured")

    }

    loadBinance24ChangeSymbol(pair: string, f: Function) {
        //console.log("loadBinance24ChangeSymbol")
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
            //console.log("MOSTTRADED", res)
            async.eachSeries(res, (e, cb) => {
                this.processLoadBinance(e, cb)
            }, (e) => {
                //console.log("MOSTTRADED END LIST", keys)
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


            //console.log("TCIEKR LOAD 24h BINANCE")

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
        Assert.exists(symbol)
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
        Assert.exists(symbol)
        if (symbol == "USDT") return 1;

        if (symbol == "EUR") return this.currencyService.convert({value: 1, currencyCode: "EUR"}, "USD").value
        let candidate = symbol + "USDT";
        if (this.hasPair(candidate))
            return this.getPrice(candidate);
        candidate = symbol + "USD";
        if (this.hasPair(candidate))
            return this.getPrice(candidate);
        else if (this.hasPair(symbol + "BTC"))
            return this.getPrice(symbol + "BTC") * this.getPrice("BTCUSDT");
        else if (this.hasPair(symbol + "BNB"))
            return this.getPrice(symbol + "BNB") * this.getPrice("BNBUSDT");
        else console.log("ERROR cannot get usd value!!", symbol)
    }


    sort(sortby: string): any[] {
        Assert.exists(sortby)
        //console.log("SORTA", this.content)
        let order = this.getSortOrder(sortby)
        let C = [];
        for (let k in this.content) C.push(this.content[k])
        C.sort((a: Tick, b: Tick) => {
            const keyA = this.getSortField(sortby, a), keyB = this.getSortField(sortby, b);
            if (keyA < keyB) return order;
            if (keyA > keyB) return -1 * order;
            else return a.supra < b.supra ? -1 : 1
        });
        return C;
    }

    getList(sortby, format?: string): Tick[] {
        let res = this.sort(sortby);
        //if(format=="change") this.tradingService.getBrokerByName(this.key).getTicker().appendChange(res)
        return res;
    }


    getSortField(sortby: string, a) {
        Assert.exists(sortby)
        if (sortby === "name") return a.supra;
        else if (sortby === "bid_ask_volume_ratio") return a.ratio
        else if (sortby === "has_some_in_portfolio") return a.inptf
        else if (sortby === "has_been_traded") return a.hasTraded
    }

    getSortOrder(sortby: string): number {
        Assert.exists(sortby)
        if (sortby === "name") return -1;
        else if (sortby === "bid_ask_volume_ratio") return 1
        else if (sortby === "has_some_in_portfolio") return 1
        else if (sortby === "has_been_traded") return 1
    }


}

