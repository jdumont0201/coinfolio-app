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
import {CurrencyService} from "../../globalton/core/services/currency.service";
import {CheckValid} from "../components/CheckValid/component";

@Injectable()
export class PublicDataService extends CheckValid {
    brokers: BrokerCollection;
    globalBroker: Broker;
    brokersConnected = false;

    InfraSupra: { [pair: string]: { infra: string, supra: string } } = {}

    @Output() BidAskUpdatedEvent: EventEmitter<any> = new EventEmitter<boolean>()
    @Output() PriceChangeUpdatedEvent: EventEmitter<any> = new EventEmitter<boolean>()
    @Output() EnabledBrokersLoadingFinishedEvent: EventEmitter<any> = new EventEmitter<boolean>()
    @Output() brokersLoadedAfterConfigEvent: EventEmitter<any> = new EventEmitter<boolean>()
    @Output() brokerUnloadedAfterConfigEvent: EventEmitter<any> = new EventEmitter<boolean>()
    @Output() PriceUpdatedEvent: EventEmitter<any> = new EventEmitter<boolean>()
    @Output() ListingUpdatedEvent: EventEmitter<any> = new EventEmitter<boolean>()
    @Output() PortfolioUpdatedEvent: EventEmitter<any> = new EventEmitter<boolean>()
    @Output() TickerUpdatedEvent: EventEmitter<any> = new EventEmitter<boolean>()

    isLoadingDone=false;


    constructor(public authService: AuthService,public currencyService:CurrencyService, public appConfigService: AppConfigService, public consoleService: ConsoleService, public eventService: EventService, public refreshService: RefreshService, public logic: Logic) {
        super(consoleService)
        consoleService.trade("+", this.authService, this.authService.loginChanged)
    }

    getListing() {
        let res = {}
        let B = this.brokers.getBrokers();
        //console.log("brokers",B)
        for (let j in B) {
            let b: Broker = B[j]
            let L = b.getTicker().content;
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

    enabledBrokers: string[]=[]


    unloadAllBrokers(){
        this.enabledBrokers.forEach((b)=>{
            this.getBrokerByName(b).unloadBroker()
        })
    }
    init() {
        this.eventService.showLoading()
        this.consoleService.trade(" init")

            this.brokers.init("public",this.appConfigService.possibleBrokers, (broker: Broker) => {

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
        this.isLoadingDone=true;
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
                if (this.checkIfPairExists(A[i])=="yes") {
                    B.push(A[i])
                }
            }
            return B;
        }
    }

    checkIfPairExists(pair): string {
        let B=this.getBrokerByName("binance");
        if(B)
        return B.getTicker().hasPair(pair)?"yes":"no"
        else
            return null;
    }


}