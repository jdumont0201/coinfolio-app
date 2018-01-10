import {Logic} from "../../../logic/Logic";
import {Portfolio} from "./Portofolio";
import {Ticker} from "./Ticker";
import {EventService} from "../services/event.service";
import {Listing} from "./Listing";
import {TradingService} from "../services/trading.service";
import {Trades} from "./Trades";
import {isSuccess} from "@angular/http/src/http_utils";

export type Asset = { symbol: string, q: number, v?: number }


export class Broker {
    private portfolio: Portfolio;
    private ticker: Ticker;
    private trades: Trades;
    private listing: Listing;
    //trades:Trades;
    isLoaded: boolean;
    connected: boolean;


    getTotalUSDValue(): number {
        console.log("getTotalUSDValue init", this.name, "val")
        if (this.name == "global") {
            let res = 0;

            let brokers = this.tradingService.getConnectedBrokersArray();
            console.log("getTotalUSDValue ", this.name, "br", brokers)
            brokers.forEach((b) => {
                const v = this.tradingService.getBrokerByName(b).getPortfolio().getTotalUSDValue();
                res += v
                console.log("getTotalUSDValue ", this.name, "add", b, "val=", v, "co=", this.tradingService.getBrokerByName(b).getPortfolio().content)
            })
            return res;
        } else {
            return this.getPortfolio().getTotalUSDValue()
        }
    }

    getPortfolio(): Portfolio {
        return this.portfolio;
    }

    getListing(): Listing {
        return this.listing;
    }

    getTrades(): Trades {

        return this.trades;
    }

    getTicker() {
        return this.ticker;
    }

    constructor(public logic: Logic, public name: string, public eventService: EventService, public tradingService: TradingService) {
        console.log("NEW BROKER ", name)
        this.portfolio = new Portfolio(this.logic, this.tradingService, this.name)
        this.ticker = new Ticker(this.logic, this.tradingService, this.name)
        this.listing = new Listing(this.logic, this.eventService, this.tradingService, this.name)
        this.trades = new Trades(this.logic, this.eventService, this.tradingService, this.name)
    }

    load(f: (Broker) => any) {
        console.log("TRADE : LOAD BROKER", this.name)
        this.portfolio.load((isSuccess) => {
            this.ticker.load((isSuccess2) => {
                this.portfolio.setLivePrices(this.ticker);
                this.eventService.brokerLoadedEvent.emit({key: this.name, loaded: true})
                this.listing.load((isSuccess3) => {
                    this.backgroundLoad()
                    this.setLoaded(true)
                })
                f({portfolio:isSuccess,ticker:isSuccess2})
            })
        })
    }

    backgroundLoad(f?) {
        this.trades.load(() => {
        })
        this.ticker.load24ChangeBinance(() => {
        })
    }

    setLoaded(val) {
        if (val) {
            this.isLoaded = true;
            if (this.tradingService.brokers.connectedBrokersArray.indexOf(this.name) == -1)
                this.tradingService.brokers.connectedBrokersArray.push(this.name)
        } else {
            this.isLoaded = false
            let idx = this.tradingService.brokers.connectedBrokersArray.indexOf(this.name)
            if (idx > -1)
                this.tradingService.brokers.connectedBrokersArray.splice(idx, 1)
        }
    }

    combineWith(P: Portfolio) {
        this.portfolio.combineWith(P)


    }
}

export class BrokerCollection {
    private brokers: { [name: string]: Broker } = {}
    connectedBrokersArray: string[] = [];
    isLoaded = false;

    getConnected() {
        return this.connectedBrokersArray;
    }

    getConnectedBrokers(): { [name: string]: Broker } {
        let res = {}
        for (let k in this.brokers)
            if (this.brokers[k].isLoaded)
                res[k] = this.brokers[k]
        return res;
    }

    constructor(public logic: Logic, public eventService: EventService, public tradingService: TradingService) {

    }
    createAll(keys){
        keys.forEach((k: string) => {
            this.create(k)
            this.loadStatus[k]={portfolio:"todo",ticker:"todo"}
        })
    }
    init(keys: string[], f: Function) {
        this.createAll(keys)

        this.loadAllBrokers(f);
    }

    getByName(name): Broker {
        console.log("getbyname",name,this.brokers)
        if (name in this.brokers)
            return this.brokers[name]
        else
            return null;
    }

    reset() {
        this.brokers = {};
    }


    create(name: string) {
        let P = new Broker(this.logic, name, this.eventService, this.tradingService);
        this.brokers[name] = P;
    }
    hasAttemptedLoginAllBrokers=false;
    loadStatus={}
    checkLoadFinished(broker,status){
        this.loadStatus[broker]=status;
        let r=true;
        for(let k in this.loadStatus){
            if(this.loadStatus[k].portfolio=="todo" || this.loadStatus[k].ticker=="todo")
                r=false;
        }
        this.hasAttemptedLoginAllBrokers=r;
        return this.hasAttemptedLoginAllBrokers
    }
    loadAllBrokers(f: Function) {
        console.log("TRADE : LOAD BROKER COL", this.brokers)
        for (let k in this.brokers) {
            this.brokers[k].load((res) => {
                if (res) {
                    this.isLoaded = true
                }
                if(this.checkLoadFinished(k,res)) this.tradingService.loadingFinished()

                f(res);
            });
        }
    }
}