import {Logic} from "../../../logic/Logic";
import {Ticker} from "./Ticker";
import {Crypto} from "../utils/utils"
import {TradingService} from "../services/trading.service";
import {RefreshService} from "../services/refresh.service";
import {PublicDataService} from "../services/publicdata.service";

export type Asset = { symbol: string, q: number, usdvalue?: number, unitvalue?: number, broker: string }


export class Portfolio {
    key: string;
    content: { [symbol: string]: Asset } = {}
    connected: boolean = false;
    dataTime: Date;
    totalUSDValue: number;

    constructor(public logic: Logic, public tradingService: TradingService, public publicDataService: PublicDataService, public refreshService: RefreshService, key: string) {
        console.log("NEW BROKER PTF", key)
        this.key = key;
        this.content = {}
    }

    getTotalUSDValue(): number {
        let L = this.publicDataService.getListingByName(this.key);
        console.log("gettotalusd", this.key, Object.keys(L.content).length, this.content)
        if (!this.connected) return -1
        let res = 0;

        for (let k in this.content) {
            if (this.content[k].q > 0) {
                console.log("gettotalusdv", k,this.content[k].q , L.getUSDValue(k))

                //if (k in L.content) {
                let V=L.getUSDValue(k);
                if(V)
                    res += V.last * this.content[k].q
                //}
            }
            //        console.log("  ", k, "=", this.content[k].usdvalue)
        }
        //console.log(this.key + " getTotalUSDValue",res,this.content)
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
        this.loadUniversal(f)

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
        console.log("  -> alloc PORTFOLIO GETALLOC", this.key, this.content)
        for (let k in this.content) {

            let asset = this.content[k];
            console.log("alloch",k,asset)
            let L = this.publicDataService.getListingByName(asset.broker);
            let v;
            let y;
            if (asset.q > 0) {

                let ba = L.getUSDValue(asset.symbol);
                console.log("alloch",this.key,k ,asset,ba)
                if (ba) {
                    v = Math.round(100 * ba.last) / 100;
                    y = Math.round(100 * v * asset.q) / 100
                    let ch = null;
                    if (asset.symbol in L.content) ch = L.content[asset.symbol].change;
                    let r = {name: asset.symbol, y: y, change: ch};
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

    loadUniversal(f: Function) {
        console.log("TRADE PTF LOAD BINANCE")
        this.logic.getFromBroker(this.key, "balance", (alloc) => {
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

