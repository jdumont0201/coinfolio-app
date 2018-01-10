import {EventEmitter, Injectable, OnInit, Output} from "@angular/core"
import {AuthService} from "../../globalton/core/services/auth.service";
import {Logic} from "../../../logic/Logic";
import {ConsoleService} from "../../globalton/core/services/console.service";
import {Broker, BrokerCollection} from "../structures/Broker";
import {EventService} from "./event.service";
import {AppConfigService} from "./appconfig.service";

@Injectable()
export class TradingService {
    brokers: BrokerCollection;
    globalBroker: Broker;
    brokersConnected = false;


    @Output() BidAskUpdatedEvent: EventEmitter<any> = new EventEmitter<boolean>()
    @Output() PriceUpdatedEvent: EventEmitter<any> = new EventEmitter<boolean>()


    constructor(public authService: AuthService, public appConfigService: AppConfigService, public consoleService: ConsoleService, public eventService: EventService, public logic: Logic) {
        consoleService.trade("+", this.authService, this.authService.loginChanged)
        this.consoleService.trade(" + tradingservice", this.authService, this.authService.loginChanged)
        this.authService.loginChanged.subscribe(value => this.loginUpdated(value), error => console.log("Error reading loginupdated" + error), () => console.log('done'));

        //this.portfolioCollection=new PortfolioCollection(logic)
        this.brokers = new BrokerCollection(logic, eventService, this);
        this.globalBroker = new Broker(logic, "global", eventService, this)
        if (this.authService.isAuthenticated())
            this.init()
        else
            this.brokers.createAll(this.appConfigService.possibleBrokers)
            this.consoleService.trade("waiting for auth")
        this.eventService.hideLoading()
    }

    isBrokerLoaded(key: string) {
        return this.getBrokerByName(key).isLoaded
    }

    loginUpdated(val) {
        this.consoleService.trade(" loginupdated")
        if (this.authService.isAuthenticated())
            this.init();
    }

    init() {
        this.consoleService.trade(" init")
        this.brokers.init(this.appConfigService.possibleBrokers, (broker: Broker) => {
            this.globalBroker.combineWith(broker.getPortfolio())
            this.globalBroker.isLoaded = true
            this.brokersConnected = true;
            this.eventService.brokerLoadedEvent.emit({key: "global", loaded: true})
        })
    }
    loadingFinished(){
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
            for (let i = 0; i < A.length; ++i) {
                if (!this.checkIfPairExists(A[i])) {
                    A.splice(i, 1);
                }
            }
            return A;
        }
    }

    checkIfPairExists(pair): boolean {
        return this.getBrokerByName("binance").getTicker().hasPair(pair)
    }


}