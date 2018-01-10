import {Logic} from "../../../logic/Logic";
import {EventService} from "../services/event.service";
import {Crypto as C} from "../utils/utils"
import {TradingService} from "../services/trading.service";

export type Crypto = { symbol: string, bids?: number, bid?: number,oldask?:number,oldbid?:number, asks?: number, usdask: number,hasTraded?:boolean, usdbid: number, ask?: number, ratio?: number, infra: string, supra: string, inptf?: boolean }

export class Listing {
    content: { [name: string]: Crypto } = {}
    dataTime: Date;
    isLoaded:boolean
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

    loadBinance(f: Function) {
        console.log("TRADE LOAD LISTING BINANCE")
        this.logic.BinanceGetBookTickers((listing) => {
            this.dataTime = new Date();
            console.log("LOADBINLIST RES", listing)
            if (listing) {
                for (let k in listing) {
                    let l = listing[k]
                    if (k !== "123456") {
                        let pair = C.getSymbolsFromPair(k)

                        let inptf = this.tradingService.globalBroker.getPortfolio().has(pair.supra)
                        let hasTraded = this.tradingService.globalBroker.getTrades().hasTraded(k)
                        let usdref = this.getUSDValue(pair.infra, listing)

                        this.add(k, parseFloat(l.bid), parseFloat(l.ask), parseFloat(l.bids), parseFloat(l.asks), pair.infra, pair.supra, inptf, usdref.ask, usdref.bid,hasTraded)
                    }

                }
                this.isLoaded=true
                f();
            }
        })
    }

    getUSDValue(infra: string, listing: any[]): { ask: number, bid: number } {
        const pair = infra + "USDT"
        if (pair in listing)
            return {ask: parseFloat(listing[pair].ask), bid: parseFloat(listing[pair].bid)}
        else if (infra === "USDT") return {ask: 1, bid: 1}
        else
            console.log("err", "unknown pair in listing", pair, listing)
    }

    getSortField(sortby, a) {
        if (sortby === "name") return a.supra;
        else if (sortby === "bid_ask_volume_ratio") return a.ratio
        else if (sortby === "has_some_in_portfolio") return a.inptf
        else if (sortby === "has_been_traded") return a.hasTraded
    }

    getSortOrder(sortby): number {
        if (sortby === "name") return -1;
        else if (sortby === "bid_ask_volume_ratio") return 1
        else if (sortby === "has_some_in_portfolio") return 1
        else if (sortby === "has_been_traded") return 1
    }

    sort(sortby) {
        console.log("SORTA", this.content)
        let order = this.getSortOrder(sortby)
        let C = [];
        for (var k in this.content) C.push(this.content[k])
        C.sort((a: Crypto, b: Crypto) => {
            const keyA = this.getSortField(sortby, a), keyB = this.getSortField(sortby, b);
            if (keyA < keyB) return order;
            if (keyA > keyB) return -1 * order;
            else return a.supra < b.supra ? -1 : 1
        });
        return C;
    }

    getList(sortby) {
        return this.sort(sortby)
    }

    add(symbol: string, bid: number, ask: number, bids: number, asks: number, infra: string, supra: string, inptf: boolean, usdask, usdbid,hasTraded) {
        if (symbol in this.content) {
            this.content[symbol].oldask = this.content[symbol].ask;
            this.content[symbol].oldbid = this.content[symbol].bid;
            this.content[symbol].ask = ask;
            this.content[symbol].bid = bid;
            this.content[symbol].asks = asks;
            this.content[symbol].bids = bids;
            this.content[symbol].hasTraded = hasTraded;
            this.content[symbol].usdbid = usdbid;
            this.content[symbol].usdask = usdask;
            this.content[symbol].inptf = inptf;
            this.content[symbol].ratio = bids / (asks + bids);
        } else {
            this.content[symbol] = {
                symbol: symbol,
                inptf: inptf,
                infra: infra,
                supra: supra,
                bid: bid,
                hasTraded: hasTraded,
                ask: ask,
                bids: bids,
                asks: asks,
                ratio: bids / (bids + asks),
                usdask: usdask,
                usdbid: usdbid
            }
        }

    }
}