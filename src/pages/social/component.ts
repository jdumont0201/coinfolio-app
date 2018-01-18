import {Component, Injectable, Input, OnDestroy, ViewChild} from '@angular/core';
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
import {ConsoleService} from "../../lib/globalton/core/services/console.service";

@Component({
    selector: 'app-social',
    templateUrl: 'template.html'

})
@Injectable()
export class AppSocialPage extends PageWithTabs implements OnDestroy {
    possibleSymbols = ['cryptocurrency','BTC', 'ETH', 'BNB'];
    searchedText = "";
    supra = "BTC";
    infra = "USDT";
    @Input() pairId;

    constructor(public requestService: RequestService,public refreshService:RefreshService,public consoleService:ConsoleService, public eventService: EventService, public tradingService: TradingService, public dataService: DataService, public appConfigService: AppConfigService, public logic: Logic, public authService: AuthService) {
        super(refreshService,eventService,consoleService)
        if(this.pairId){
            let p=Crypto.getSymbolsFromPair(this.pairId, this.getAllPossibleInfras())
            if(p){
                this.supra=p.supra;
                this.infra=p.infra
            }
        }


    }
    getAllPossibleInfras(){
        let r=[];
        this.tradingService.enabledBrokers.forEach((b)=>{
            r.push.apply(r,this.appConfigService.getPossibleInfrasPerBroker(b))
        })
        return r;
            }
    searchCallback(searchedText:string){

    }
    ngOnDestroy() {

    }

}
