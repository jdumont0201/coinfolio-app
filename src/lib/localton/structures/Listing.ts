import {Logic} from "../../../logic/Logic";
import {EventService} from "../services/event.service";
import {Crypto as C} from "../utils/utils"
import {TradingService} from "../services/trading.service";
import {RefreshService} from "../services/refresh.service";
import {ConsoleService} from "../../globalton/core/services/console.service";
import {AppConfigService} from "../services/appconfig.service";
import {PublicDataService} from "../services/publicdata.service";

export type CryptoPair = {
    pair: string,
    last?: number,
    spread?: number,
    spreadpct?: number,
    bids?: number,
    bid?: number,
    oldask?: number,
    oldbid?: number,
    asks?: number,
    usdask?: number,
    hasTraded?: boolean,
    usdbid?: number,
    ask?: number,
    ratio?: number,
    infra?: string,
    broker: string,
    supra?: string,
    inptf?: boolean,
    volume?: number,
    change?: number,
    changelastprice?: number,
    pricemoy?: number,
    changelasttime?: number,
    relativeVolume?: number
}

export class Listing {
    content: { [name: string]: CryptoPair } = {}
    dataTime: Date;
    isLoaded: boolean;
    fee: Fee;

    constructor(public logic: Logic, public eventService: EventService, public publicDataService: PublicDataService, public refreshService: RefreshService, public broker: string, public consoleService: ConsoleService, public appConfigService: AppConfigService) {
        console.log("listing", broker)
        this.fee = new Fee(this.broker, this.appConfigService);
        let poolkey = "public-" + broker + "-listing";
        this.refreshService.createPool(poolkey);
        this.refreshService.getPool(poolkey).define(5000, (f) => {
            this.logic.getFromPublic(broker, "bidask", (res) => {
                this.addAll(res)
                f();
            });
        })


        this.logic.getFromPublic(broker, "bidask", (res) => {
            this.addAll(res)

        });
    }

    addAll(res) {
        for (let i in res) {
            if(i!=="123456")
            this.add(i, res[i]);
        }
    }

    has(pair): boolean {
        return pair in this.content
    }

    refresh(f) {
        this.loadListing(f)
    }

    getContent() {
        return this.content
    }

    loadListing(f: Function) {
        console.log("TRADE : LOAD LISTING", this.broker)
        f()
    }

    bases = ["USDT", "BTC", "BNB", "ETH"]

    getBasePair(symbol: string): string {
        this.bases.forEach((b) => {
            if (this.has(symbol + "b"))
                return symbol + "b";
        })
        return null
    }

    getRawName(infra: string, supra: string) {
        console.log("infrasupra", infra, supra, this.broker)
        if (!(infra in this.appConfigService.infrasupra)) return null
        if (!(supra in this.appConfigService.infrasupra[infra])) return null
        if (!(this.broker in this.appConfigService.infrasupra[infra][supra])) return null
        return this.appConfigService.infrasupra[infra][supra][this.broker];
    }

    getUSDValue(supra: string): { ask: number, bid: number, last: number } {
        //try direct usdt conversion
        let pair = this.getRawName("USD", supra);
        if (pair)
            return {ask: this.content[pair].ask, bid: this.content[pair].bid, last: this.content[pair].last}

        //try usdt
        else if (supra === "USDT") return {ask: 1, bid: 1, last: 1}
        else if (supra === "USD") return {ask: 1, bid: 1, last: 1}

        //try direct usdt conversion
        let infra = "BTC"
        if (supra + infra in this.content) {
            let supraBTC = this.getBidask(supra + infra)
            let pair = this.getRawName("USD", "BTC");
            if (pair) {
                let BTCUSD = this.getBidask(pair)
                return {ask: supraBTC.ask * BTCUSD.bid, bid: supraBTC.bid * BTCUSD.ask, last: supraBTC.last * BTCUSD.last}
            }
        } else {
            let infra = "ETH"
            if (supra + infra in this.content) {
                let supraBTC = this.getBidask(supra + infra)
                let pair = this.getRawName("USD", "ETH");
                if (pair) {
                    let BTCUSD = this.getBidask(pair)
                    return {ask: supraBTC.ask * BTCUSD.bid, bid: supraBTC.bid * BTCUSD.ask, last: supraBTC.last * BTCUSD.last}
                }
            }
            else {
                console.log("getusdval not found")
            }
        }

        //console.log("err", "unknown pair in listing", pair, listing)
    }

    getBidask(pair) {
        if (pair in this.content)
            return {ask: this.content[pair].ask, bid: this.content[pair].bid, last: this.content[pair].last}
    }

    add(pair, row: any) {

        if (pair in this.content) {
            this.content[pair].oldask = this.content[pair].ask;
            this.content[pair].oldbid = this.content[pair].bid;
            this.content[pair].ask = row.ask;
            this.content[pair].bid = row.bid;
            this.content[pair].last = row.last;
            this.content[pair].spread = row.ask - row.bid;
            this.content[pair].spreadpct = row.ask ? ((row.ask - row.bid) / row.ask) * 100 : null;
            //this.content[pair].asks = row.asks;
            //this.content[pair].bids = row.bids;
            //this.content[pair].hasTraded = row.hasTraded;
            //this.content[pair].usdbid = usdbid;
            //this.content[pair].usdask = usdask;
            //this.content[pair].inptf = row.inptf;
            //this.content[pair].ratio = row.bids / (asks + bids);
        } else {
            this.content[pair] = {
                pair: pair,
                //inptf: inptf,
                //infra: infra,
                broker: this.broker,
                //supra: supra,
                bid: row.bid,
                //hasTraded: hasTraded,
                ask: row.ask,
                last: row.last,
                spread: row.ask - row.bid,
                spreadpct: row.ask ? ((row.ask - row.bid) / row.ask) * 100 : null
                //          bids: bids,
                //            asks: asks,
                //              ratio: bids / (bids + asks),
                //  usdask: usdask,
//                usdbid: usdbid
            }
        }

    }

}

export class Fee {
    constructor(public broker: string, public appConfigService: AppConfigService) {

    }

    getWithdrawFee(symbol: string, amount: number): number {
        let fees = this.appConfigService.getFeesPerBroker(this.broker);
        return fees[symbol]
    }

    getTradingFee(pair: string, amount: number) {
        let fees = this.appConfigService.getFeesPerBroker(this.broker);
        return fees.trading.pc * amount;
    }

    getDepositFee(pair: string, amount: number) {
        let fees = this.appConfigService.getFeesPerBroker(this.broker);
        return fees.deposit
    }
}