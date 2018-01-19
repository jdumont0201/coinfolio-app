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


    loadOHLC(f: Function) {
        //console.log("  PTF LOAD", this.key)
        if (this.key == "binance") {
            this.loadUniversal( f)
        } else if (this.key === "kraken") {
            this.loadUniversal(f)
        } else if (this.key === "hitbtc") {
            this.loadUniversal( f)
        } else if (this.key === "bitmex") {
            this.loadUniversal( f)
        } else {
            f(false)
        }
    }
    loadUniversal(f:Function){

    }
}

