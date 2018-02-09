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
import {Listing} from "../structures/Listing";

@Injectable()
export class PublicDataService extends CheckValid {
    brokers: BrokerCollection;
    globalBroker: Broker;
    brokersConnected = false;
    listings:{[broker:string]:Listing}={};
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

    isLoadingDone = false;

    constructor(public authService: AuthService, public currencyService: CurrencyService, public appConfigService: AppConfigService, public consoleService: ConsoleService, public eventService: EventService, public refreshService: RefreshService, public logic: Logic) {
        super(consoleService)
        consoleService.trade("+", this.authService, this.authService.loginChanged)
        //this.brokers = new BrokerCollection(logic, currencyService,eventService, this, this.refreshService, this.consoleService,this.appConfigService);

        this.init()
    }


    enabledBrokers: string[] = []

    init() {
        console.log("pubdatainit",this.appConfigService.possibleBrokers);
        //this.eventService.showLoading()
        this.consoleService.trade(" init")

        this.appConfigService.possibleBrokers.forEach((b)=>{



            this.listings[b]=new Listing(this.logic,this.eventService,this,this.refreshService,b,this.consoleService,this.appConfigService);
        });


    }




    loadingFinished() {
        this.isLoadingDone = true;
        this.consoleService.eventSent("EnabledBrokersLoadingFinishedEvent <-- tradingService")
        this.EnabledBrokersLoadingFinishedEvent.emit(this.enabledBrokers)
        this.eventService.hideLoading()
    }

isLoaded(broker:string):boolean{
        return this.getListingByName(broker).isLoaded
}
getStatus(broker:string):string{
        return this.getListingByName(broker).status
}
    getListingByName(broker: string): Listing {
        if(broker in this.listings)
        return this.listings[broker]
        else
            console.log("err listing no loaded");
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




}