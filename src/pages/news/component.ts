import {Component, Injectable, OnDestroy, ViewChild} from '@angular/core';
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

@Component({
    selector: 'app-news',
    templateUrl: 'template.html'

})
@Injectable()
export class AppNewsPage extends PageWithTabs implements OnDestroy {
    possibleSymbols=['cryptocurrency','BTC','ETH','BNB'];
    possibleSources=['Google News']
    searchedText="";
    symbol="BTC";
    constructor(public logic: Logic, public appConfigService: AppConfigService, public eventService:EventService,public refreshService:RefreshService) {
        super(refreshService,eventService)

    }
    ngOnDestroy(){

    }

    searchCallback(searchedText:string){

    }
}
