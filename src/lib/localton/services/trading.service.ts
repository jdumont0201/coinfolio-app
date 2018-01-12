import {EventEmitter, Injectable, OnInit, Output} from "@angular/core"
import {AuthService} from "../../globalton/core/services/auth.service";
import {Logic} from "../../../logic/Logic";
import {ConsoleService} from "../../globalton/core/services/console.service";
import {Broker, BrokerCollection} from "../structures/Broker";
import {EventService} from "./event.service";
import {AppConfigService} from "./appconfig.service";
import {Crypto} from "../../../lib/localton/utils/utils";
import {Structures} from "../../../lib/globalton/core/utils/utils"
import {RefreshService} from "./refresh.service";

import {Strings} from "../../../lib/globalton/core/utils/utils"

@Injectable()
export class TradingService {
    brokers: BrokerCollection;
    globalBroker: Broker;
    brokersConnected = false;

    InfraSupra: { [pair: string]: { infra: string, supra: string } } = {}

    @Output() BidAskUpdatedEvent: EventEmitter<any> = new EventEmitter<boolean>()
    @Output() PriceChangeUpdatedEvent: EventEmitter<any> = new EventEmitter<boolean>()
    @Output() EnabledBrokersLoadingFinishedEvent: EventEmitter<any> = new EventEmitter<boolean>()
    @Output() PriceUpdatedEvent: EventEmitter<any> = new EventEmitter<boolean>()
    @Output() ListingUpdatedEvent: EventEmitter<any> = new EventEmitter<boolean>()
    @Output() PortfolioUpdatedEvent: EventEmitter<any> = new EventEmitter<boolean>()
    @Output() TickerUpdatedEvent: EventEmitter<any> = new EventEmitter<boolean>()


    constructor(public authService: AuthService, public appConfigService: AppConfigService, public consoleService: ConsoleService, public eventService: EventService, public refreshService: RefreshService, public logic: Logic) {
        consoleService.trade("+", this.authService, this.authService.loginChanged)
        this.consoleService.trade(" + tradingservice", this.authService, this.authService.loginChanged)
        this.authService.loginChanged.subscribe(value => this.loginUpdated(value), error => console.log("Error reading loginupdated" + error), () => console.log('done'));
        this.refreshService.setTradingService(this);
        this.brokers = new BrokerCollection(logic, eventService, this, this.refreshService, this.consoleService);
        this.globalBroker = new Broker(logic, "global", eventService, this.refreshService, this, this.consoleService)
        if (this.authService.isAuthenticated())
            this.init()
        else {
            this.brokers.createAll(this.appConfigService.possibleBrokers)
            this.consoleService.trade("waiting for auth")
            this.eventService.hideLoading()
        }
        //this.refreshService.createPool("ticker")
    }

    getInfraSupra(pair: string) {
        if (pair in this.InfraSupra) return this.InfraSupra[pair]
        else {
            this.InfraSupra[pair] = Crypto.getSymbolsFromPair(pair)
        }
    }

    getInfra(pair: string): string {
        let p = this.getInfraSupra(pair);
        return p ? p.infra : null
    }

    getSupra(pair: string): string {
        let p = this.getInfraSupra(pair);
        return p ? p.supra : null
    }

    isBrokerLoaded(key: string) {
        return this.getBrokerByName(key).isLoaded
    }

    loginUpdated(val) {
        this.consoleService.trade(" loginupdated")
        if (this.authService.isAuthenticated())
            this.init();
    }

    getListing() {
        let res = {}
        let B = this.brokers.getBrokers();
        //console.log("brokers",B)
        for (let j in B) {
            let b: Broker = B[j]
            let L = b.getListing().content;
            for (let k in L)
                if (L[k].pair in res) {
                    res[L[k].pair].brokers.push(b.key)
                } else {
                    res[L[k].pair] = {brokers: [b.key], name: L[k].pair}
                }
        }
        //console.log("brokers",B,"listing",res)
        let A = Structures.objectToArray(res);

        let C = Structures.ArraySort(A, "name", -1);
        //console.log("brokers",B,"listing",A,C)
        return C
    }

    enabledBrokers: string[]

    fetchBrokerEnabledArray(f: Function) {
        let r = [];
        this.logic.getMe((user) => {
            console.log("user", user);
            this.appConfigService.possibleBrokers.forEach((k) => {
                let prop = "Connection" + Strings.Capitalize(k)
                console.log("check", prop)
                if (user[prop]==="true") {
                    r.push(k)
                }
            })
            console.log("enabledBrokers",r,user);
            this.enabledBrokers = r;
            f(r)
        })
    }

    init() {
        this.consoleService.trade(" init")
        this.fetchBrokerEnabledArray((list) => {
            console.log("LADING", list)

            this.brokers.init(this.appConfigService.possibleBrokers, (broker: Broker) => {
                this.globalBroker.combineWith(broker.getPortfolio())
                this.globalBroker.isLoaded = true
                this.brokersConnected = true;
                //this.eventService.brokerLoadedEvent.emit({key: "global", loaded: true})
            }, list)
        })
    }

    getListTickerRefresh() {
        let L: { pair: string, broker }[] = [];
        //this.logic.getMe((user)=>{

        let F = this.authService.favoritePairs;
        if (F) {
            F.forEach((f: any) => {
                L.push(f)
            })
        }
        this.enabledBrokers.forEach((b) => {
            //console.log("LISTTOREf broker", b)
            let P = this.getBrokerByName(b).getPortfolio().getSymbols();
            P.forEach((symbol: string) => {
                let pair = this.getBrokerByName(b).getTicker().getPair(symbol)
                let idx = Structures.getIndexByMatch(L, {broker: b, pair: pair});
                if (idx == -1) L.push({pair: pair, broker: b})
                //console.log("LISTTOREf", symbol, "--> ", pair, idx)
            })

        })

        console.log("LISTTOREf", L)
        //        f(L)
        return L;
        //  });
    }

    loadingFinished() {
        this.consoleService.eventSent("EnabledBrokersLoadingFinishedEvent <-- tradingService")
        this.EnabledBrokersLoadingFinishedEvent.emit(this.enabledBrokers)
        this.eventService.hideLoading()
    }

    getGlobalBroker() {
        return this.getBrokerByName("global")
    }

    getBrokerByName(name: string): Broker {
        if (name == "global") return this.globalBroker
        return this.brokers.getByName(name)
    }

    isAnyBrokerConfigured() {
        return this.brokersConnected;
    }

    getConnectedBrokers(): { [name: string]: Broker } {
        return this.brokers.getConnectedBrokers()

    }

    getConnectedBrokersArray(): string[] {
        return this.brokers.connectedBrokersArray;
    }

    getConnectedBrokersKeys(): string[] {
        return this.brokers.connectedBrokersArray;
    }

    reload() {
        if (this.authService.isAuthenticated()) {
            this.consoleService.trade(" reload")
            this.init();
        }
    }

    getProbablePairs(symbol) {
        if (symbol == "USDT") return []
        else {
            let A = [symbol + "USDT", symbol + "BTC", symbol + "BNB", symbol + "ETH"]
            let B = []
            for (let i = 0; i < A.length; ++i) {
                if (this.checkIfPairExists(A[i])) {
                    B.push(A[i])
                }
            }
            return B;
        }
    }

    checkIfPairExists(pair): boolean {
        return this.getBrokerByName("binance").getTicker().hasPair(pair)
    }


}