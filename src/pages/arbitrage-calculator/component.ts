import {Component, Injectable, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RequestService} from '../../lib/globalton/core/services/request.service';
import {DataService} from "../../lib/localton/services/data.service";

import {AppConfigService} from "../../lib/localton/services/appconfig.service";
import {Logic} from "../../logic/Logic";
import {Crypto} from "../../lib/localton/utils/utils";
import {TradingService} from "../../lib/localton/services/trading.service";
import {PageWithTabs} from "../../lib/localton/components/PageWithTabs/component";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {RefreshedPage} from "../../lib/localton/components/RefreshedPage/component";
import {EventService} from "../../lib/localton/services/event.service";
import {CryptoPair} from "../../lib/localton/structures/Listing";
import {RefreshService} from "../../lib/localton/services/refresh.service";
import {MatTableDataSource, MatSort} from '@angular/material';
import {Structures} from "../../lib/globalton/core/utils/utils";
import {Tick} from "../../lib/localton/structures/Ticker";

@Component({
    selector: 'app-page-arbitrage-calculator',
    templateUrl: 'template.html'

})
@Injectable()
export class AppArbitrageCalculatorPage extends PageWithTabs implements OnInit, OnDestroy {
    brokerA1;
    brokerA2;
    brokerB1;
    brokerB2;
    budget=10000;
    amount=1;
    supraA;
    infraA;
    supraB;
    infraB;
    brokerA1bid;
    brokerA1ask;
    brokerA2bid;
    brokerA2ask;
    possibleInfraA = [];
    @ViewChild(MatSort) sort: MatSort;

    constructor(public refreshService: RefreshService, public requestService: RequestService, public eventService: EventService, public tradingService: TradingService, public dataService: DataService, public appConfigService: AppConfigService, public logic: Logic, public authService: AuthService) {
        super(refreshService, eventService)


    }

    setInfra() {
        let A = []
        let T = this.tradingService.getBrokerByName(this.brokerA1).getTicker()
        for (let pair  in T.content) {
            if (T.content[pair].infra == this.infraA)
                A.push(pair)
        }
        this.possibleSupraA = A;
    }

    getObjectKeys(obj): string[] {
        return Object.keys(obj)
    }

    possibleSupraA = []

    setBrokerA1() {

        this.possibleInfraA = this.appConfigService.getPossibleInfrasPerBroker(this.brokerA1)
    }

    setBrokerA2() {
        let T = this.tradingService.getBrokerByName(this.brokerA2).getTicker()
        this.brokerA2bid = T.content[this.supraA].bid
        this.brokerA2ask = T.content[this.supraA].ask

    }
setSupraA(){
    let T = this.tradingService.getBrokerByName(this.brokerA1).getTicker()
    console.log("pair",this.supraA+this.infraA,T.content[this.supraA+this.infraA])
    this.brokerA1bid=T.content[this.supraA].bid
    this.brokerA1ask=T.content[this.supraA].ask
}
    ngOnInit() {

    }


}
