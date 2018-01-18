import {Component, Input, OnInit, Injectable, ViewChild, ViewEncapsulation} from '@angular/core';
import {AppConfigService} from "../../lib/localton/services/appconfig.service"
import {EventService} from "../../lib/localton/services/event.service";
import {AuthService} from "../../lib/globalton/core/services/auth.service";
import {AppSubscribeComponent} from "../subscribe/component";
import {Logic} from "../../logic/Logic";
import {RequestService} from "../../lib/globalton/core/services/request.service";
import {ApiService} from "../../lib/globalton/core/services/api.service";
import {TradingService} from "../../lib/localton/services/trading.service";
import {ConsoleService} from "../../lib/globalton/core/services/console.service";

@Component({
  selector: 'app-loading',
  templateUrl: 'template.html',
    styleUrls:['styles.css'],
    encapsulation: ViewEncapsulation.None

})
@Injectable()
export class AppLoadingComponent extends AppSubscribeComponent{
  @Input() force:boolean
  constructor(public logic: Logic, public consoleService:ConsoleService,public tradingService:TradingService, public authService: AuthService, public appConfigService: AppConfigService, public eventService: EventService, public apiService: ApiService, public requestService: RequestService) {
    super(logic,consoleService,authService,appConfigService,eventService,apiService,requestService)

  }
  progress=0
  close(){
    this.eventService.hideLoading();
    this.eventService.hideVeil()
  }
  getProgress() {
      let res = 0;
      if (this.apiService.isUp) res += 5
      if (this.authService.isAuthenticated()) res += 5
      this.tradingService.enabledBrokers.forEach((b) => {
        let share=90/this.tradingService.enabledBrokers.length
        if(this.tradingService.brokers.loadStatus[b].portfolio=="done") res+=share/3
        if(this.tradingService.brokers.loadStatus[b].ticker=="done") res+=share/3
        if(this.tradingService.brokers.loadStatus[b].bidask=="done") res+=share/3
      })
      this.progress=res;
      return res;
  }
}
