import {Logic} from "../../../logic/Logic";
import {Ticker} from "./Ticker";
import {Crypto} from "../utils/utils"
import {TradingService} from "../services/trading.service";
import {RefreshService} from "../services/refresh.service";

export type Asset = { symbol: string, q: number, usdvalue?: number, unitvalue?: number, broker: string }


export class Portfolio {
    key: string;
    content: { [symbol: string]: Asset } = {}
    connected: boolean = false;
    dataTime: Date;
    totalUSDValue: number;

    constructor(public logic: Logic, public tradingService: TradingService, public refreshService: RefreshService, key: string) {
        console.log("NEW BROKER PTF", key)
        this.key = key;
        this.content = {}
    }

    getTotalUSDValue(): number {
        if (!this.connected) return -1
        let res = 0;

        for (let k in this.content) {
            if(this.content[k].q>0)
            res += this.content[k].usdvalue
            //        console.log("  ", k, "=", this.content[k].usdvalue)
        }
        console.log(this.key + " getTotalUSDValue",res,this.content)
        return Math.round(100 * res) / 100;
    }

    refresh(f, force?: boolean) {
        if (force) this.content = {}
        this.loadPortfolio(() => {
            this.refreshTotal()
            f()
        })
    }

    refreshTotal() {
        this.totalUSDValue = this.getTotalUSDValue()
    }

    getSymbols() {
        return Object.keys(this.content)
    }

    loadPortfolio(f: Function) {
        //console.log("  PTF LOAD", this.key)
        if (this.key == "binance") {
            this.loadUniversal(this.key, f)
        } else if (this.key === "kraken") {
            this.loadUniversal(this.key, f)
        } else if (this.key === "hitbtc") {
            this.loadUniversal(this.key, f)
        } else {
            f(false)
        }
    }

    combineWith(P: Portfolio) {
        for (let k in P.content) {
            if (k in this.content)
                this.content[k].q += P.content[k].q
            else
                this.content[k] = P.content[k]
        }
    }

    add(symbol: string, q: number, broker: string) {
        //console.log("TRADE PTF ADD ", symbol, q)
        if (symbol in this.content)
            this.content[symbol].q = q;
        else {
            this.content[symbol] = {symbol: symbol, q: q, broker: broker}
        }

    }

    setUSDValues(ticker: Ticker) {
        for (let s in this.content) {
            this.setUSDValue(ticker, s)
        }
    }

    setUSDValue(ticker: Ticker, s: string) {
        const asset: Asset = this.content[s]
        const USD = ticker.getUSDValue(s)

        this.content[s].usdvalue = USD * asset.q
        this.content[s].unitvalue = USD
        //console.log("setusdvalue ",s," USDunit=",USD,"q=","USDVal=",asset.q,this.content[s].usdvalue)
    }

    has(symbol, threshold?): boolean {
        if (!threshold)
            return symbol in this.content
        else {
            //let usdvalue=this.tradingService.getBrokerByName(this.key).getTicker().getUSDValue(symbol);

            return symbol in this.content && this.content[symbol].usdvalue > threshold
        }


    }

    getAllocation(threshold?: number): { chartData: any[], gridData: any[], objData: Object } {
        let resData = [];
        let gridData = [];
        let objData = {}
        //    this.setUSDValues(this.tradingService.getBrokerByName(this.key).getTicker());
        console.log("  -> alloc PORTFOLIO GETALLOC", this.key, this.content)
        for (let k in this.content) {
            let asset = this.content[k];
            let T = this.tradingService.getBrokerByName(asset.broker).getTicker();
            let v;
            let y;
            if (asset.q > 0) {
                    if(!T.connected){
                        let r = {name: asset.symbol, y: y, change: T.getSymbolChange(asset.symbol)};
                        resData.push(r);
                        let rr = {symbol: asset.symbol, available: asset.q, price: v, value: y, broker: asset.broker}
                        gridData.push(rr)
                        objData[asset.symbol] = rr;

                    }else if (asset.usdvalue > threshold){



                        v = Math.round(100 * T.getUSDValue(asset.symbol)) / 100;
                        y = Math.round(100 * v * asset.q) / 100
                        let r = {name: asset.symbol, y: y, change: T.getSymbolChange(asset.symbol)};
                        resData.push(r);
                        let rr = {symbol: asset.symbol, available: asset.q, price: v, value: y, broker: asset.broker}
                        gridData.push(rr)
                        objData[asset.symbol] = rr;
                    }
            }

        }
        return {chartData: resData, gridData: gridData, objData: objData}
    }


    afterLoad() {
        let isInitialLoad = !this.connected
        if (isInitialLoad) {
            this.refreshService.createPool(this.key + "-portfolio")
            this.tradingService.PortfolioUpdatedEvent.emit({broker: this.key, success: true})
        }

        this.connected = true;


    }

    loadUniversal(broker, f: Function) {
        //console.log("TRADE PTF LOAD BINANCE")
        this.logic.getFromBroker(broker, "balance", (alloc) => {
            this.dataTime = new Date();
            //console.log("TRADE PTF LOAD ", this.key, " RES", alloc)
            if (alloc) {
                for (let k in alloc)
                    this.add(k, alloc[k].total, this.key)
                this.afterLoad()
                f(this.connected);
            } else {
                f(false)
            }
        })
    }

    getAsset(s: string): Asset {
        if (s in this.content)
            return this.content[s]
        else

            return null;
    }

    isInPortfolio(s: string): boolean {
        return this.getAsset(s) ? true : false;
    }
}

