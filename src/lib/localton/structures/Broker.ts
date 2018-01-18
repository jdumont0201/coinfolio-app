import {Logic} from "../../../logic/Logic";
import {Portfolio} from "./Portofolio";
import {Ticker} from "./Ticker";
import {EventService} from "../services/event.service";
import {Listing} from "./Listing";
import {TradingService} from "../services/trading.service";
import {Trades} from "./Trades";
import {isSuccess} from "@angular/http/src/http_utils";
import {RefreshService} from "../services/refresh.service";
import {ConsoleService} from "../../globalton/core/services/console.service";
import {CurrencyService} from "../../globalton/core/services/currency.service";
import {AppConfigService} from "../services/appconfig.service";

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
        //console.log("getTotalUSDValue init", this.key, "val")
        /*if (this.key == "global") {
            let res = 0;

            let brokers = this.tradingService.getConnectedBrokersArray();
            console.log("getTotalUSDValue ", this.key, "br", brokers)
            brokers.forEach((b) => {
                const v = this.tradingService.getBrokerByName(b).getPortfolio().getTotalUSDValue();
                res += v
                console.log("getTotalUSDValue ", this.key, "add", b, "val=", v, "co=", this.tradingService.getBrokerByName(b).getPortfolio().content)
            })
            return res;
        } else {*/
            return this.getPortfolio().getTotalUSDValue()
        //}
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
    constructor(public logic: Logic,public currencyService:CurrencyService, public key: string, public eventService: EventService, public refreshService: RefreshService, public tradingService: TradingService, public consoleService: ConsoleService,public appConfigService:AppConfigService) {
        //console.log("NEW BROKER ", key)
        this.portfolio = new Portfolio(this.logic, this.tradingService, this.refreshService, this.key)
        this.ticker = new Ticker(this.logic, this.currencyService,this.tradingService, this.refreshService, this.key, this.consoleService,this.appConfigService)
        this.listing = new Listing(this.logic, this.eventService, this.tradingService, this.refreshService, this.key, this.consoleService,this.appConfigService)
        this.trades = new Trades(this.logic, this.eventService, this.tradingService, this.refreshService, this.key)
    }

    loadBroker(f: (Broker) => any) {
        //console.log("LOAD BROKER", this.key)
        this.refreshService.createPool(this.key + "-ticker")
        this.refreshService.createPool(this.key + "-portfolio")
        this.refreshService.createPool(this.key + "-bidask")

        this.portfolio.loadPortfolio((isSuccess) => {
            this.ticker.loadTicker((isSuccess2) => {
                this.portfolio.setUSDValues(this.ticker);

                    //this.listing.loadListing((isSuccess3) => {
                        //    this.backgroundLoad()
                        //if(isSuccess3 && isSuccess2 && isSuccess)
                        if(isSuccess2 && isSuccess)
                        this.setLoaded(true)
                        let res={portfolio: isSuccess?"done":"failed", ticker: isSuccess2?"done":"failed", bidask: isSuccess2?"done":"failed"};
                        console.log("loadres",res)
                        f(res)
                    //})
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
        console.log("SETLOADED")
        if (val) {
            this.isLoaded = true;
            this.consoleService.eventSent("brokerLoadedEvent <-- Broker", {key: this.key, loaded: true})
            this.eventService.brokerLoadedEvent.emit({key: this.key, loaded: true})
            if (this.tradingService.brokers.connectedBrokersArray.indexOf(this.key) == -1)
                this.tradingService.brokers.connectedBrokersArray.push(this.key)
        } else {
            this.isLoaded = false
            let idx = this.tradingService.brokers.connectedBrokersArray.indexOf(this.key)
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
    connectedBrokersKeys: string[] = [];
    isLoaded = false;

    getBrokers(): { [name: string]: Broker } {
        return this.brokers
    }

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

    constructor(public logic: Logic,public currencyService:CurrencyService, public eventService: EventService, public tradingService: TradingService, public refreshService: RefreshService, public consoleService: ConsoleService,public appConfigService:AppConfigService) {

    }

    createAll(keys) {
        keys.forEach((key: string) => {
            this.create(key)

        })
    }

    init(keys: string[], f: Function, selectiveInit?: string[]) {
        this.createAll(keys)
        if (selectiveInit) this.loadBrokers(selectiveInit, f)
        else this.loadAllBrokers(f);
    }

    getByName(name): Broker {
        //console.log("getbyname",key,this.brokers)
        if (name in this.brokers)
            return this.brokers[name]
        else
            return null;
    }

    reset() {
        this.brokers = {};
    }


    create(name: string) {
        //console.log("CREATING BROK", name)
        let P = new Broker(this.logic,this.currencyService, name, this.eventService, this.refreshService, this.tradingService, this.consoleService,this.appConfigService);
        this.brokers[name] = P;
    }

    hasAttemptedLoginAllBrokers = false;
    loadStatus = {}

    checkLoadFinished(broker, status) {

        this.loadStatus[broker] = status;
        let r = true;
        for (let k in this.loadStatus) {
            if (this.loadStatus[k].portfolio == "todo" || this.loadStatus[k].ticker == "todo" || this.loadStatus[k].bidask == "todo")
                r = false;
            if (this.loadStatus[k].portfolio == "done" || this.loadStatus[k].ticker == "done" || this.loadStatus[k].bidask == "done")
                this.loadStatus[k].operational=true
        }
        this.hasAttemptedLoginAllBrokers = r;
        //console.log("broker loadfinished",broker,this.hasAttemptedLoginAllBrokers,this.loadStatus)
        return this.hasAttemptedLoginAllBrokers
    }
    isBrokerOperational(b){
        return this.loadStatus[b].operational;
    }
    loadAllBrokers(f: Function) {
        //console.log("TRADE : ALL LOAD BROKER COL", this.brokers)

        for (let k in this.brokers) {
            this.loadStatus[k] = {portfolio: "todo", ticker: "todo","bidask":"todo",operational:false}
            this.brokers[k].loadBroker((res) => {
                if (res) {
                    this.isLoaded = true
                }
                if (this.checkLoadFinished(k, res)) this.tradingService.loadingFinished()
                f(this.brokers[k]);
            });
        }
    }

    loadBrokers(keys: string[], f: Function) {
        //console.log("TRADE : LOAD BROKER COL", keys)
        keys.forEach((k) => {
            this.loadStatus[k] = {portfolio: "todo", ticker: "todo","bidask":"todo"}
            this.brokers[k].loadBroker((res) => {
                if (res) {
                    this.isLoaded = true
                }
                if (this.checkLoadFinished(k, res)) this.tradingService.loadingFinished()
                f(this.brokers[k]);
            });
        });
    }
}