import {Component, Input, OnInit, Injectable, ViewChild} from '@angular/core';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {EventService} from "../../lib/localton/services/event.service";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {AppSubscribeComponent} from "../subscribe/component";
import {Logic} from "../../logic/Logic";
import {RequestService} from "../../lib/globalton/core/services/request.service";
import {ApiService} from "../../lib/globalton/core/services/api.service";
import {TradingService} from "../../lib/localton/services/trading.service";

@Component({
  selector: 'app-loading',
  templateUrl: 'template.html'

})
@Injectable()
export class AppLoadingComponent extends AppSubscribeComponent{
  constructor(public logic: Logic, public tradingService:TradingService, public authService: AuthService, public appConfigService: AppConfigService, public eventService: EventService, public apiService: ApiService, public requestService: RequestService) {
    super(logic,authService,appConfigService,eventService,apiService,requestService)

  }
  close(){
    this.eventService.hideLoading();
    this.eventService.hideVeil()
  }
}
