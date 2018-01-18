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
import {ConsoleService} from "../../lib/globalton/core/services/console.service";
@Component({
  selector: 'app-workers',
  templateUrl: 'template.html'

})
@Injectable()
export class AppWorkersComponent extends AppSubscribeComponent{
  pools
  constructor(public logic: Logic,public consoleService:ConsoleService,public refreshService:RefreshService, public tradingService:TradingService, public authService: AuthService, public appConfigService: AppConfigService, public eventService: EventService, public apiService: ApiService, public requestService: RequestService) {
    super(logic,consoleService,authService,appConfigService,eventService,apiService,requestService)

this.update()
      this.eventService.poolDefinedEvent.subscribe((val)=>{
      this.update()
      })
  }
  update(){


this.pools=Structures.objectToArray(this.refreshService.getPools())
  }
  close(){
    this.eventService.hideLoading();
    this.eventService.hideVeil()
  }
}
