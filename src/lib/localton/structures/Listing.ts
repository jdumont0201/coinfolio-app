import {Logic} from "../../../logic/Logic";
import {EventService} from "../services/event.service";
import {Crypto as C} from "../utils/utils"
import {TradingService} from "../services/trading.service";
import {RefreshService} from "../services/refresh.service";
import {ConsoleService} from "../../globalton/core/services/console.service";
import {AppConfigService} from "../services/appconfig.service";

export type CryptoPair = {
    pair: string,
    bids?: number,
    bid?: number,
    oldask?:number,
    oldbid?:number,
    asks?: number,
    usdask: number,
    hasTraded?:boolean,
    usdbid: number,
    ask?: number,
    ratio?: number,
    infra: string,
    broker:string,
    supra: string,
    inptf?: boolean ,
    volume?:number,
    change?:number,
    changelastprice?:number,
    pricemoy?:number,
    changelasttime?:number,
    relativeVolume?:number}

export class Listing {
    content: { [name: string]: CryptoPair } = {}
    dataTime: Date;
    isLoaded:boolean
    constructor(public logic: Logic, public eventService: EventService, public tradingService: TradingService,  public refreshService:RefreshService,public key: string,public consoleService:ConsoleService,public appConfigService:AppConfigService) {

    }

    has(pair): boolean {
        return pair in this.content
    }

    refresh(f) {
        this.loadListing(f)
    }

    loadListing(f: Function) {
        console.log("TRADE : LOAD LISTING", this.key)
        if (this.key == "binance") {
            this.loadBinance((success)=>{
                if(success){
                    this.consoleService.eventSent("ListingUpdatedEvent <-- Listing",{broker:this.key})
                    this.tradingService.ListingUpdatedEvent.emit({key:this.key,loaded:true})
                    f(true)
                }else{
                    f(false)
                }
            });
        }else{
            f(false)
        }
    }

    loadBinance(f: Function) {
        let broker="binance"
        console.log("TRADE LOAD LISTING BINANCE")
        this.logic.BinanceGetBookTickers((listing) => {
            this.dataTime = new Date();
            console.log("TRADE LOAD LISTING BINANCE RES", listing)
            if (listing) {
                for (let k in listing) {
                    let l = listing[k]
                    if (k !== "123456") {
                        let pair = C.getSymbolsFromPair(k,this.appConfigService.getPossibleInfrasPerBroker(this.key))
                        let inptf = this.tradingService.globalBroker.getPortfolio().has(pair.supra,20)
                        let hasTraded = this.tradingService.globalBroker.getTrades().hasTraded(k)
                        let usdref = this.getUSDValue(pair.infra, listing)

                        this.add(k, broker,parseFloat(l.bid), parseFloat(l.ask), parseFloat(l.bids), parseFloat(l.asks), pair.infra, pair.supra, inptf, usdref.ask, usdref.bid,hasTraded)
                    }
                }
                this.isLoaded=true
                f(true);
            }else{
                f(false)
            }
        })
    }
    bases=["USDT","BTC","BNB","ETH"]
    getBasePair(symbol:string):string{
        this.bases.forEach((b)=>{
            if(this.has(symbol+"b"))
                return symbol+"b";
        })
        return null
    }
    getUSDValue(infra: string, listing: any[]): { ask: number, bid: number } {
        const pair = infra + "USDT"
        if (pair in listing)
            return {ask: parseFloat(listing[pair].ask), bid: parseFloat(listing[pair].bid)}
        else if (infra === "USDT") return {ask: 1, bid: 1}
        else
            console.log("err", "unknown pair in listing", pair, listing)
    }



    add(pair: string, broker:string,bid: number, ask: number, bids: number, asks: number, infra: string, supra: string, inptf: boolean, usdask, usdbid,hasTraded) {
        if (pair in this.content) {
            this.content[pair].oldask = this.content[pair].ask;
            this.content[pair].oldbid = this.content[pair].bid;
            this.content[pair].ask = ask;

            this.content[pair].bid = bid;
            this.content[pair].asks = asks;
            this.content[pair].bids = bids;
            this.content[pair].hasTraded = hasTraded;
            this.content[pair].usdbid = usdbid;
            this.content[pair].usdask = usdask;
            this.content[pair].inptf = inptf;
            this.content[pair].ratio = bids / (asks + bids);
        } else {
            this.content[pair] = {
                pair: pair,
                inptf: inptf,
                infra: infra,
                broker:broker,
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