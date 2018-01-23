import {Component, Input, OnInit, Injectable, ViewChild, ViewEncapsulation, OnDestroy} from '@angular/core';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {EventService} from "../../lib/localton/services/event.service";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {AppSubscribeComponent} from "../subscribe/component";
import {Logic} from "../../logic/Logic";
import {RequestService} from "../../lib/globalton/core/services/request.service";
import {ApiService} from "../../lib/globalton/core/services/api.service";
import {TradingService} from "../../lib/localton/services/trading.service";
import {MessageService} from "../../lib/globalton/core/services/message.service";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";

@Component({
    selector: 'app-events',
    templateUrl: 'template.html',
    styleUrls: ['styles.css'],
    encapsulation: ViewEncapsulation.None

})
@Injectable()
export class AppEventsComponent extends AppSubscribeComponent implements OnDestroy{

    constructor(public logic: Logic,public consoleService:ConsoleService, public tradingService: TradingService, public authService: AuthService, public messageService: MessageService, public appConfigService: AppConfigService, public eventService: EventService, public apiService: ApiService, public requestService: RequestService) {
        super(logic,consoleService, authService, appConfigService, eventService, apiService, requestService)
        this.doSubscribe("errorsChanged",this.messageService.errorsChanged,  (err) => this.errorsUpdated(err))
    }
    ngOnDestroy(){
        this.unsubscribeAllEvents()
    }
    events = []

    updateNb(){
     this.eventService.updateNbUnseenEvents()
    }
    errorsUpdated(err) {
        this.consoleService.eventReceived("errorsChanged --> events")

        this.events.unshift({type: "error", val: err,date:new Date().getTime(),seen:this.eventService.isMenu2Displayed})
        if(!this.eventService.isMenu2Displayed)  {this.eventService.nbNonSeenEvents++;this.updateNb();}
    }
    closeMenu(){
        this.eventService.closeMenu2();
    }
}
