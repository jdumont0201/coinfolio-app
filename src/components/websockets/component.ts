import {Component, Input, OnInit, Injectable, ViewChild} from '@angular/core';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {EventService} from "../../lib/localton/services/event.service";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {AppSubscribeComponent} from "../subscribe/component";
import {Logic} from "../../logic/Logic";
import {RequestService} from "../../lib/globalton/core/services/request.service";
import {ApiService} from "../../lib/globalton/core/services/api.service";
import {TradingService} from "../../lib/localton/services/trading.service";
import {RefreshService} from "../../lib/localton/services/refresh.service";
import {Structures} from "../../lib/globalton/core/utils/utils"
import {WebsocketService} from "../../lib/globalton/core/services/websocket.service";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";

@Component({
    selector: 'app-websockets',
    templateUrl: 'template.html'

})
@Injectable()
export class AppWebsocketsComponent extends AppSubscribeComponent {
    sockets

    constructor(public logic: Logic,public consoleService:ConsoleService, public websocketService:WebsocketService,public refreshService: RefreshService, public tradingService: TradingService, public authService: AuthService, public appConfigService: AppConfigService, public eventService: EventService, public apiService: ApiService, public requestService: RequestService) {
        super(logic,consoleService, authService, appConfigService, eventService, apiService, requestService)

        this.update()
        this.eventService.socketDefinedEvent.subscribe((val) => {
            this.update()
        })
    }

    update() {
        this.sockets = Structures.objectToArray(this.websocketService.getSockets())
    }

    close() {
        this.eventService.hideLoading();
        this.eventService.hideVeil()
    }
}
